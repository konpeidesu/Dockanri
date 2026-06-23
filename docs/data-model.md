# データ永続化設計

Document Lifecycle Managerのフロントエンドプロトタイプを、PostgreSQLとPrismaへ接続するための初期データモデルです。

## GitHubの概念との対応

| GitHub | DLM | 主なテーブル |
| --- | --- | --- |
| Repository内のファイル | 管理対象ドキュメント | `documents` |
| Issue | 更新依頼 | `update_requests` |
| Pull Request | `IN_REVIEW`以降の更新依頼 | `update_requests` |
| Review / Discussion | コメント | `comments` |
| Commit History | 更新・承認・反映履歴 | `activity_logs` |
| User / Assignee / Reviewer | メンバー | `members` |

## 関係

```text
members
  ├─ documents（作成者・管理者・担当者）
  ├─ update_requests（依頼者・担当者・レビュー者・承認者）
  ├─ comments（投稿者）
  └─ activity_logs（操作実行者）

documents
  ├─ update_requests
  ├─ comments
  └─ activity_logs

update_requests
  ├─ comments
  └─ activity_logs
```

## 設計上の判断

- ファイル本体やバイナリデータは保存せず、`box_url`と`support_site_url`だけを保持します。
- `comments`は必ずドキュメントに属し、更新依頼に対する議論の場合のみ`update_request_id`も保持します。
- Pull Request専用テーブルは設けず、更新依頼の`IN_REVIEW`、`CHANGES_REQUESTED`、`COMPLETED`という状態遷移で表現します。
- `activity_logs`は監査証跡として追記専用にし、更新・削除を通常のアプリケーション操作として提供しない前提です。
- 状態変更時は、`update_requests.status`の更新と`activity_logs`への追加を同一トランザクションで実行します。
- URLの形式検証、コメントと更新依頼が同じドキュメントに属すること、完了時刻などの状態別必須条件はサービス層で検証します。
- メンバーやドキュメントは履歴保全のため原則として物理削除せず、`is_active`や`lifecycle_status`で無効化します。

## 主な状態遷移

```text
NOT_STARTED
  → IN_PROGRESS
  → IN_REVIEW
  → CHANGES_REQUESTED
  → IN_PROGRESS
  → IN_REVIEW
  → COMPLETED

任意の作業中ステータス
  → ON_HOLD
  → 元の作業ステータス

完了前
  → CANCELLED
```

## 次の実装候補

1. PostgreSQLを開発用Composeへ追加
2. Prisma CLIとPrisma Clientを依存関係へ追加
3. 初回マイグレーションを生成
4. 初期メンバー・ドキュメント用のseedを作成
5. REST APIを追加してフロントエンドのモックデータを置き換える
