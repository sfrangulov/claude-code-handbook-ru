# Project: Terraform / IaC

> Шаблон `CLAUDE.md` для инфраструктуры на Terraform (AWS/GCP/Azure).
> Скопируйте в корень репозитория как `CLAUDE.md`, отредактируйте под своё облако.

## Стек

- **Terraform:** 1.13+ (текущая стабильная — 1.15). Версия пинится в `versions.tf`.
- **Cloud:** [AWS / GCP / Azure — указать].
- **State backend:** S3 + DynamoDB (AWS) / GCS (GCP) / Azure Storage. **Никогда не локальный `terraform.tfstate`** в репо.
- **Module structure:** официальные модули через registry + собственные в `modules/`.
- **Secrets:** AWS Secrets Manager / SOPS / Vault — **не tfvars, не коммитим**.
- **CI:** Atlantis / Terraform Cloud / GitHub Actions — указать.

## Команды

```bash
terraform init -backend-config=backend.hcl
terraform fmt -recursive
terraform validate
terraform plan -out=tfplan
terraform show -no-color tfplan        # review перед apply
terraform apply tfplan
tflint                                 # доп. линтер
tfsec . / trivy config .              # security scan
terraform-docs markdown table modules/<name>  # генерация docs
```

Перед PR — обязательно `terraform fmt -check -recursive && terraform validate && tflint && tfsec .`.

## Структура

```
environments/
  prod/
    main.tf           # вызовы модулей с prod-значениями
    backend.tf
    variables.tf
    terraform.tfvars  # НЕ секреты — только non-sensitive значения
  staging/
  dev/
modules/
  <module-name>/
    main.tf
    variables.tf
    outputs.tf
    versions.tf
    README.md         # автогенерируется terraform-docs
    examples/
global/
  iam/                # ресурсы, не привязанные к окружению
  dns/
```

## Правила и анти-паттерны

**State:**
- State backend настроен с самого начала. Никогда не работаем с локальным state.
- State lock обязателен (DynamoDB / GCS native locking).
- Не делать `terraform state rm/mv` без понимания последствий. Перед — backup state.
- Чувствительные значения в state — данность. Шифровать backend (SSE-KMS) и ограничивать доступ.

**Модули:**
- Использовать публичные модули из registry для типовых вещей (VPC, EKS, RDS).
- Свой модуль пишем, когда: (а) public не подходит, (б) есть переиспользование 2+ раз.
- Один модуль = одна логическая единица. Не «god-module» на 50 ресурсов.
- В модуле — `variables.tf` с описаниями и валидацией, `outputs.tf` со всем, что может понадобиться снаружи.

**Переменные:**
- Каждая переменная — с `description` и `type`. `default` — только когда есть разумный.
- Использовать `validation { }` для проверок (формат, диапазон).
- `sensitive = true` для всего, что не должно лежать в plan-логах.

**Plan и apply:**
- Никогда не `terraform apply` без предварительного `plan`.
- Если plan показывает delete — внимательно. Часто это refactor через `moved` блок, а не реальный destroy.
- Большие изменения — через `-target` для постепенного rollout, но не делать `-target` нормой.

**Naming:**
- Snake_case для ресурсов и переменных Terraform.
- Тэги ресурсов — через locals + merge: `Environment`, `Owner`, `ManagedBy = "terraform"`, `Project`.
- Имена облачных ресурсов — через переменные с префиксом окружения.

**Версии:**
- В `versions.tf` пинить required_version и required_providers с операторами совместимости (`~> 5.0`).
- Не использовать latest. Обновление провайдера — отдельный PR с тщательным review plan.

## Безопасность

- Никогда не коммитить tfvars с секретами. Использовать `*.auto.tfvars` локально, добавлять в `.gitignore`.
- IAM — least privilege. Не использовать `*` в Actions/Resources без явной причины (комментарий).
- Security groups — explicit deny, минимальные открытые порты.
- Шифрование at-rest и in-transit для всех stateful сервисов (RDS, S3, EBS).
- Использовать `tfsec` / `trivy config` / `checkov` в CI.
- Module supply chain — пинить версии модулей из registry по hash.

## Чего не делать

- Не работать с локальным state для shared инфраструктуры.
- Не редактировать ресурсы вне Terraform (console click-ops) — drift.
- Не использовать `count` для toggle ресурсов — используй `for_each` или отдельные модули.
- Не хардкодить ARN, IP, AMI ID — в data sources или variables.
- Не создавать один большой root module — разделять по окружениям и доменам.
- Не делать `terraform destroy` на production вручную. Только через CI с approval.
- Не использовать `null_resource` с `local-exec` для бизнес-логики — это анти-паттерн.

## Перед PR

- [ ] `terraform fmt -check -recursive` зелёный
- [ ] `terraform validate` зелёный во всех окружениях
- [ ] `tflint` без новых ошибок
- [ ] `tfsec .` / `trivy config .` без HIGH/CRITICAL
- [ ] `terraform plan` приложен к PR (можно через Atlantis-комментарий)
- [ ] В plan нет неожиданных `destroy`
- [ ] Если изменён модуль — обновлён `examples/` и README через `terraform-docs`

## Полезные паттерны

- `moved` блоки для рефакторинга без destroy/create.
- `import` блоки (TF 1.5+) — декларативный импорт существующих ресурсов.
- `for_each` с map вместо `count` — стабильные ключи при изменениях.
- `lifecycle { prevent_destroy = true }` на критических ресурсах (RDS, KMS).
- Workspaces — НЕ для разделения сред (используем директории `environments/`).
- Pre-commit hooks: `terraform_fmt`, `terraform_validate`, `terraform_docs`, `tflint`, `tfsec`.
