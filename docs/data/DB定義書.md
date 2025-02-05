# DB定義書

## 1. テーブル一覧

| No  | データ名（論理）           | データ名（物理）  | 概要 | 
| --- | -------------------------- | ----------------- | ---- | 
| 1   | プロジェクト               | projects          | チーム作業の最上位単位。関連するボードやドキュメントをグループ化 | 
| 2   | ボード                     | boards            | タスク管理のキャンバス。リストとカードを配置する作業スペース | 
| 3   | リスト                     | lists             | ボード内のカードを状態や種類でグループ化する列 | 
| 4   | カード                     | cards             | 具体的なタスクや作業項目。詳細、担当者、期限などの情報を含む | 
| 5   | ラベル                     | labels            | カードを分類・色分けするためのタグ | 
| 6   | チェックリスト             | checklists        | カード内の詳細なサブタスクをグループ化 | 
| 7   | チェックリストアイテム     | checklist_items   | チェックリスト内の個別のタスク項目 | 
| 8   | ドキュメント               | documents         | プロジェクト関連の情報を記録する文書。階層構造を持つ | 
| 9   | ドキュメントバージョン     | document_versions | ドキュメントの変更履歴を追跡 | 
| 10  | タグ                       | tags              | ドキュメントを分類・検索するためのキーワード | 
| 11  | 添付ファイル               | attachments       | カードやドキュメントに関連する外部ファイル | 
| 12  | コメント                   | comments          | カードやドキュメントへのユーザーフィードバック | 
| 13  | ユーザー                   | users             | システム利用者のアカウント情報 | 
| 14  | ユーザー権限               | user_roles        | ユーザーのアクセスレベルと権限 | 
| 15  | 色                         | colors            | インターフェース要素の色設定 | 
| 16  | プロジェクトユーザー紐付け | project_user      | プロジェクトとユーザーの関連付け | 
| 17  | ボードユーザー紐付け       | board_user        | ボードとユーザーの関連付け | 
| 18  | カードユーザー紐付け       | card_user         | カードとユーザーの関連付け | 
| 19  | カードラベル紐付け         | card_label        | カードとラベルの関連付け | 
| 20  | ドキュメントタグ紐付け     | document_tag      | ドキュメントとタグの関連付け |

## 2. カラム一覧

### 2.1 projects

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | プロジェクトID | project_id | bigint |  | ○ | ○ |  |  | プロジェクトの一意識別子 |
| 2   | プロジェクト名 | name | varchar | 255 | ○ |  |  |  | プロジェクトの名称 |
| 3   | 説明 | description | text |  |  |  |  |  | プロジェクトの詳細説明 |
| 4   | 作成日時 | created_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード作成日時 |
| 5   | 作成者 | created_by | bigint |  | ○ |  |  |  | レコード作成者 |
| 6   | 更新日時 | updated_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード更新日時 |
| 7   | 更新者 | updated_by | bigint |  | ○ |  |  |  | レコード更新者 |

### 2.2 boards

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | ボードID | board_id | bigint |  | ○ | ○ |  |  | ボードの一意識別子 |
| 2   | プロジェクトID | project_id | bigint |  | ○ |  | ○ |  | 所属するプロジェクトの外部キー |
| 3   | タイトル | title | varchar | 255 | ○ |  |  |  | ボードのタイトル |
| 4   | 色ID | color_id | smallint |  | ○ |  | ○ |  | ボードの背景色の外部キー |
| 5   | 作成日時 | created_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード作成日時 |
| 6   | 作成者 | created_by | bigint |  | ○ |  |  |  | レコード作成者 |
| 7   | 更新日時 | updated_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード更新日時 |
| 8   | 更新者 | updated_by | bigint |  | ○ |  |  |  | レコード更新者 |

### 2.3 lists

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | リストID | list_id | bigint |  | ○ | ○ |  |  | リストの一意識別子 |
| 2   | ボードID | board_id | bigint |  | ○ |  | ○ |  | 所属するボードの外部キー |
| 3   | タイトル | title | varchar | 255 | ○ |  |  |  | リストのタイトル |
| 4   | 位置 | position | smallint |  | ○ |  |  |  | ボード内でのリストの表示順序 |
| 5   | 作成日時 | created_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード作成日時 |
| 6   | 作成者 | created_by | bigint |  | ○ |  |  |  | レコード作成者 |
| 7   | 更新日時 | updated_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード更新日時 |
| 8   | 更新者 | updated_by | bigint |  | ○ |  |  |  | レコード更新者 |

### 2.4 cards

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | カードID | card_id | bigint |  | ○ | ○ |  |  | カードの一意識別子 |
| 2   | リストID | list_id | bigint |  | ○ |  | ○ |  | 所属するリストの外部キー |
| 3   | タイトル | title | varchar | 255 | ○ |  |  |  | カードのタイトル |
| 4   | 説明 | description |text |  |  |  |  |  | カードの詳細説明 |
| 5   | 位置 | position | smallint |  | ○ |  |  |  | リスト内でのカードの表示順序 |
| 6   | 期限 | due_date | timestamp |  |  |  |  |  | カードの期限日時 |
| 8   | 作成日時 | created_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード作成日時 |
| 8   | 作成者 | created_by | bigint |  | ○ |  |  |  | レコード作成者 |
| 9   | 更新日時 | updated_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード更新日時 |
| 10  | 更新者 | updated_by | bigint |  | ○ |  |  |  | レコード更新者 |

### 2.5 labels

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | ラベルID | label_id | bigint |  | ○ | ○ |  |  | ラベルの一意識別子 |
| 2   | プロジェクトID | project_id | bigint |  | ○ |  | ○ |  | 所属するプロジェクトの外部キー |
| 3   | 名前 | name | varchar | 50 | ○ |  |  |  | ラベルの名前 |
| 4   | 色ID | color_id | smallint |  | ○ |  | ○ |  | ボードの背景色の外部キー |
| 5   | 作成日時 | created_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード作成日時 |
| 6   | 作成者 | created_by | bigint |  | ○ |  |  |  | レコード作成者 |
| 7   | 更新日時 | updated_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード更新日時 |
| 8   | 更新者 | updated_by | bigint |  | ○ |  |  |  | レコード更新者 |

### 2.6 checklists

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | チェックリストID | checklist_id | bigint |  | ○ | ○ |  |  | チェックリストの一意識別子 |
| 2   | カードID | card_id | bigint |  | ○ |  | ○ |  | 所属するカードの外部キー |
| 3   | 名前 | name | varchar | 50 | ○ |  |  |  | チェックリストの名前 |
| 4   | 位置 | position | smallint |  | ○ |  |  |  | カード内でのチェックリストの表示順序 |
| 5   | 作成日時 | created_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード作成日時 |
| 6   | 作成者 | created_by | bigint |  | ○ |  |  |  | レコード作成者 |
| 7   | 更新日時 | updated_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード更新日時 |
| 8   | 更新者| updated_by | bigint |  | ○ |  |  |  | レコード更新者 |

### 2.7 checklist_items

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | チェックリスト項目ID | checklist_item_id | bigint |  | ○ | ○ |  |  | チェックリスト項目の一意識別子 |
| 2   | チェックリストID | checklist_id | bigint |  | ○ |  | ○ |  | 所属するチェックリストの外部キー |
| 3   | タイトル | title | varchar | 255 | ○ |  |  |  | チェックリスト項目のタイトル |
| 4   | 完了フラグ | is_completed | boolean |  | ○ |  |  | false | 項目が完了しているかどうかのフラグ |
| 5   | 位置 | position | smallint |  | ○ |  |  |  | チャックリスト内でのチェックリスト項目の表示順序 |
| 6   | 作成日時 | created_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード作成日時 |
| 7   | 作成者 | created_by | bigint |  | ○ |  |  |  | レコード作成者 |
| 8   | 更新日時 | updated_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード更新日時 |
| 9   | 更新者 | updated_by | bigint |  | ○ |  |  |  | レコード更新者 |

### 2.8 documents

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | ドキュメントID | document_id | bigint |  | ○ | ○ |  |  | ドキュメントの一意識別子 |
| 2   | プロジェクトID | project_id | bigint |  | ○ |  | ○ |  | 所属するプロジェクトの外部キー |
| 3   | タイトル | title | varchar | 255 | ○ |  |  |  | ドキュメントのタイトル |
| 4   | 内容 | content | text |  |  |  |  |  | ドキュメントの本文 |
| 5   | 親ドキュメントID | parent_id | bigint |  |  |  | ○ |  | 親ドキュメントの外部キー |
| 6   | 公開フラグ | is_public | boolean |  | ○ |  |  | false | ドキュメントが公開されているかどうかのフラグ |
| 7   | 作成日時 | created_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード作成日時 |
| 8   | 作成者 | created_by | bigint |  | ○ |  |  |  | レコード作成者 |
| 9   | 更新日時 | updated_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード更新日時 |
| 10  | 更新者 | updated_by | bigint |  | ○ |  |  |  | レコード更新者 |

### 2.9 document_versions

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | バージョンID | version_id | bigint |  | ○ | ○ |  |  | ドキュメントバージョンの一意識別子 |
| 2   | ドキュメントID | document_id | bigint |  | ○ |  | ○ |  | 関連するドキュメントの外部キー |
| 3   | タイトル | title | varchar | 255 | ○ |  |  |  | バージョン時点でのドキュメントのタイトル |
| 4   | 内容 | content | text |  |  |  |  |  | バージョン時点でのドキュメントの本文 |
| 5   | 親ドキュメントID | parent_id | bigint |  |  |  | ○ |  | バージョン時点での親ドキュメントの外部キー |
| 6   | バージョン番号 | version_number | integer |  | ○ |  |  |  | ドキュメントのバージョン番号 |
| 7   | 作成日時 | created_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード作成日時 |
| 8   | 作成者 | created_by | bigint |  | ○ |  |  |  | レコード作成者 |

### 2.10 tags

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | タグID | tag_id | bigint |  | ○ | ○ |  |  | タグの一意識別子 |
| 2   | プロジェクトID | project_id | bigint |  | ○ |  | ○ |  | 所属するプロジェクトの外部キー |
| 3   | 名前 | name | varchar | 50 | ○ |  |  |  | タグの名前 |
| 4   | 色ID | color_id | smallint |  | ○ |  | ○ |  | タグの色を指定する外部キー |
| 5   | 作成日時 | created_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード作成日時 |
| 6   | 作成者 | created_by | bigint |  | ○ |  |  |  | レコード作成者 |
| 7   | 更新日時 | updated_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード更新日時 |
| 8   | 更新者 | updated_by | bigint |  | ○ |  |  |  | レコード更新者 |

### 2.11 attachments

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | 添付ファイルID | attachment_id | bigint |  | ○ | ○ |  |  | 添付ファイルの一意識別子 |
| 2   | 関連タイプ | related_type | varchar | 50 | ○ |  |  |  | 添付先のテーブル名 |
| 3   | 関連ID | related_id | bigint |  | ○ |  | ○ |  | 関連するレコードの外部キー |
| 4   | ファイル名 | name | varchar | 255 | ○ |  |  |  | 添付ファイルの名前 |
| 5   | ファイルパス | path | varchar | 500 | ○ |  |  |  | ファイルの保存パス |
| 6   | ファイルタイプ | type | varchar | 100 | ○ |  |  |  | MIMEタイプまたはファイル拡張子 |
| 7   | ファイルサイズ | size | bigint |  | ○ |  |  |  | ファイルサイズ（バイト） |
| 8   | 作成日時 | created_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード作成日時 |
| 9   | 作成者 | created_by | bigint |  | ○ |  |  |  | レコード作成者 |

### 2.12 comments

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | コメントID | comment_id | bigint |  | ○ | ○ |  |  | コメントの一意識別子 |
| 2   | 関連タイプ | related_type | varchar | 50 | ○ |  |  |  | コメント先のテーブル名 |
| 3   | 関連ID | related_id | bigint |  | ○ |  | ○ |  | 関連するレコードの外部キー |
| 4   | 内容 | content | text |  | ○ |  |  |  | コメントの本文 |
| 5   | 作成日時 | created_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード作成日時 |
| 6   | 作成者 | created_by | bigint |  | ○ |  |  |  | レコード作成者 |
| 7   | 更新日時 | updated_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード更新日時 |
| 8   | 更新者 | updated_by | bigint |  | ○ |  |  |  | レコード更新者 |

### 2.13 users

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | ユーザーID | user_id | bigint |  | ○ | ○ |  |  | ユーザーの一意識別子 |
| 2   | 名前 | name | varchar | 50 | ○ |  |  |  | ユーザーの名前 |
| 3   | メールアドレス | email | varchar | 255 | ○ |  |  |  | ユーザーのメールアドレス |
| 4   | パスワードハッシュ | hashed_password | varchar | 255 | ○ |  |  |  | ハッシュ化されたパスワード |
| 5   | 権限ID | role_id | smallint |  | ○ |  | ○ |  | ユーザー権限の外部キー |
| 6   | 色ID | color_id | smallint |  | ○ |  | ○ |  | ユーザーアイコンの色を指定する外部キー |
| 7   | 作成日時 | created_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード作成日時 |
| 8   | 更新日時 | updated_at | timestamp |  | ○ |  |  | CURRENT_TIMESTAMP | レコード更新日時 |

### 2.14 user_roles

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | 権限ID | role_id | smallint |  | ○ | ○ |  |  | 権限の一意識別子 |
| 2   | 権限名 | name | varchar | 50 | ○ |  |  |  | 権限の名称 |

### 2.15 colors

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | 色ID | color_id | snallint |  | ○ | ○ |  |  | 色の一意識別子 |
| 2   | 色名 | name | varchar | 50 | ○ |  |  |  | 色の名称 |

### 2.16 project_user

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | 紐付けID | project_user_id | bigint |  | ○ | ○ |  |  | プロジェクトユーザー紐付けの一意識別子 |
| 2   | プロジェクトID | project_id | bigint |  | ○ |  | ○ |  | プロジェクトの外部キー |
| 3   | ユーザーID | user_id | bigint |  | ○ |  | ○ |  | ユーザーの外部キー |

### 2.17 board_user

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | 紐付けID | board_user_id | bigint |  | ○ | ○ |  |  | ボードユーザー紐付けの一意識別子 |
| 2   | ボードID | board_id | bigint |  | ○ |  | ○ |  | ボードの外部キー |
| 3   | ユーザーID | user_id | bigint |  | ○ |  | ○ |  | ユーザーの外部キー |

### 2.18 card_user

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | 紐付けID | card_user_id | bigint |  | ○ | ○ |  |  | カードユーザー紐付けの一意識別子 |
| 2   | カードID | card_id | bigint |  | ○ |  | ○ |  | カードの外部キー |
| 3   | ユーザーID | user_id | bigint |  | ○ |  | ○ |  | ユーザーの外部キー |

### 2.19 card_label

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | 紐付けID | card_label_id | bigint |  | ○ | ○ |  |  | カードラベル紐付けの一意識別子 |
| 2   | カードID | card_id | bigint |  | ○ |  | ○ |  | カードの外部キー |
| 3   | ラベルID | label_id | bigint |  | ○ |  | ○ |  | ラベルの外部キー |

### 2.20 document_tag

| No. | 論理名 | 物理名 | データ型 | 長さ | NOT NULL | 主キー | 外部キー | デフォルト値 | 説明 |
|-----|--------|--------|----------|------|----------|--------|----------|--------------|------|
| 1   | 紐付けID | document_tag_id | bigint |  | ○ | ○ |  |  | ドキュメントタグ紐付けの一意識別子 |
| 2   | ドキュメントID | document_id | bigint |  | ○ |  | ○ |  | ドキュメントの外部キー |
| 3   | タグID | tag_id | bigint |  | ○ |  | ○ |  | タグの外部キー |

## 3. ユニーク制約

| No. | テーブル名 | 制約名 | 対象カラム | 説明 |
|-----|----------|----------|----------|----------|
| 1   | users | UQ_users_email | email | 同じメールアドレスで複数のアカウントを作成できないようにする |
| 2   | projects | UQ_projects_name | name | 同じ名前のプロジェクトを作成できないようにする |
| 3   | labels | UQ_labels_project_name | project_id<br>name | 同じプロジェクト内で同名のラベルを作成できないようにする |
| 4   | tags | UQ_tags_project_name | project_id<br>name | 同じプロジェクト内で同名のタグを作成できないようにする |

## 4. デフォルト値

| No. | テーブル名 | カラム名 | デフォルト値 | 説明 |
|-----|----------|----------|----------|----------|
| 1   | projects | created_at | CURRENT_TIMESTAMP | レコード作成時の日時を自動設定 |
| 2   | projects | updated_at | CURRENT_TIMESTAMP | レコード更新時の日時を自動設定 |
| 3   | boards | created_at | CURRENT_TIMESTAMP | レコード作成時の日時を自動設定 |
| 4   | boards | updated_at | CURRENT_TIMESTAMP | レコード更新時の日時を自動設定 |
| 5   | lists | created_at | CURRENT_TIMESTAMP | レコード作成時の日時を自動設定 |
| 6   | lists | updated_at | CURRENT_TIMESTAMP | レコード更新時の日時を自動設定 |
| 7   | cards | created_at | CURRENT_TIMESTAMP | レコード作成時の日時を自動設定 |
| 8   | cards | updated_at | CURRENT_TIMESTAMP | レコード更新時の日時を自動設定 |
| 9   | labels | created_at | CURRENT_TIMESTAMP | レコード作成時の日時を自動設定 |
| 10  | labels | updated_at | CURRENT_TIMESTAMP | レコード更新時の日時を自動設定 |
| 11  | checklists | created_at | CURRENT_TIMESTAMP | レコード作成時の日時を自動設定 |
| 12  | checklists | updated_at | CURRENT_TIMESTAMP | レコード更新時の日時を自動設定 |
| 13  | checklist_items | is_completed | false | チェックリスト項目の初期状態を未完了に設定 |
| 14  | checklist_items | created_at | CURRENT_TIMESTAMP | レコード作成時の日時を自動設定 |
| 15  | checklist_items | updated_at | CURRENT_TIMESTAMP | レコード更新時の日時を自動設定 |
| 16  | documents | is_public | false | ドキュメントの初期状態を非公開に設定 |
| 17  | documents | created_at | CURRENT_TIMESTAMP | レコード作成時の日時を自動設定 |
| 18  | documents | updated_at | CURRENT_TIMESTAMP | レコード更新時の日時を自動設定 |
| 19  | tags | created_at | CURRENT_TIMESTAMP | レコード作成時の日時を自動設定 |
| 20  | tags | updated_at | CURRENT_TIMESTAMP | レコード更新時の日時を自動設定 |
| 21  | attachments | created_at | CURRENT_TIMESTAMP | レコード作成時の日時を自動設定 |
| 22  | comments | created_at | CURRENT_TIMESTAMP | レコード作成時の日時を自動設定 |
| 23  | comments | updated_at | CURRENT_TIMESTAMP | レコード更新時の日時を自動設定 |
| 24  | users | created_at | CURRENT_TIMESTAMP | レコード作成時の日時を自動設定 |
| 25  | users | updated_at | CURRENT_TIMESTAMP | レコード更新時の日時を自動設定 |

## 5. 制約条件

| No. | テーブル名 | 制約名 | 制約種類| 対象カラム | 参照先 | 説明 |
|-----|----------|----------|----------|----------|----------|----------|
| 1   | boards | FK_boards_project | FOREIGNKEY | project_id | projects(project_id) | ボードが属するプロジェクトを指定 |
| 2   | lists | FK_lists_board | FOREIGNKEY | board_id | boards(board_id) | リストが属するボードを指定 |
| 3   | cards | FK_cards_list | FOREIGNKEY | list_id | lists(list_id) | カードが属するリストを指定 |
| 4   | labels | FK_labels_project | FOREIGNKEY | project_id | projects(project_id) | ラベルが属するプロジェクトを指定 |
| 5   | labels | FK_labels_color | FOREIGNKEY | color_id | colors(color_id) | ラベルの色を指定 |
| 6   | checklists | FK_checklists_card | FOREIGNKEY | card_id | cards(card_id) | チェックリストが属するカードを指定 |
| 7   | checklist_items | FK_checklist_items_checklist | FOREIGNKEY | checklist_id | checklists(checklist_id) | チェックリスト項目が属するチェックリストを指定 |
| 8   | documents | FK_documents_project | FOREIGNKEY | project_id | projects(project_id) | ドキュメントが属するプロジェクトを指定 |
| 9   | documents | FK_documents_parent | FOREIGNKEY | parent_id | documents(document_id) | ドキュメントの親ドキュメントを指定 |
| 10  | document_versions | FK_document_versions_document | FOREIGNKEY | document_id | documents(document_id) | ドキュメントバージョンが属するドキュメントを指定 |
| 11  | tags | FK_tags_project | FOREIGNKEY | project_id | projects(project_id) | タグが属するプロジェクトを指定 |
| 12  | tags | FK_tags_color | FOREIGNKEY | color_id | colors(color_id) | タグの色を指定 |
| 13  | users | FK_users_role | FOREIGNKEY | role_id | user_roles(role_id) | ユーザーの権限を指定 |
| 14  | users | FK_users_color | FOREIGNKEY | color_id | colors(color_id) | ユーザーアイコンの色を指定 |
| 15  | project_user | FK_project_user_project | FOREIGNKEY | project_id | projects(project_id) | プロジェクトユーザー紐付けのプロジェクトを指定 |
| 16  | project_user | FK_project_user_user | FOREIGNKEY | user_id | users(user_id) | プロジェクトユーザー紐付けのユーザーを指定 |
| 17  | board_user | FK_board_user_board | FOREIGNKEY | board_id | boards(board_id) | ボードユーザー紐付けのボードを指定 |
| 18  | board_user | FK_board_user_user | FOREIGNKEY | user_id | users(user_id) | ボードユーザー紐付けのユーザーを指定 |
| 19  | card_user | FK_card_user_card | FOREIGNKEY | card_id | cards(card_id) | カードユーザー紐付けのカードを指定 |
| 20  | card_user | FK_card_user_user | FOREIGNKEY | user_id | users(user_id) | カードユーザー紐付けのユーザーを指定 |
| 21  | card_label | FK_card_label_card | FOREIGNKEY | card_id | cards(card_id) | カードラベル紐付けのカードを指定 |
| 22  | card_label | FK_card_label_label | FOREIGNKEY | label_id | labels(label_id) | カードラベル紐付けのラベルを指定 |
| 23  | document_tag | FK_document_tag_document | FOREIGNKEY | document_id | documents(document_id) | ドキュメントタグ紐付けのドキュメントを指定 |
| 24  | document_tag | FK_document_tag_tag | FOREIGNKEY | tag_id | tags(tag_id) | ドキュメントタグ紐付けのタグを指定 |