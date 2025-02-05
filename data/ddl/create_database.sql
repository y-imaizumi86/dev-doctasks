DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS lists CASCADE;
DROP TABLE IF EXISTS cards CASCADE;
DROP TABLE IF EXISTS labels CASCADE;
DROP TABLE IF EXISTS checklists CASCADE;
DROP TABLE IF EXISTS checklist_items CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS document_versions CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS attachments CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS colors CASCADE;
DROP TABLE IF EXISTS project_user CASCADE;
DROP TABLE IF EXISTS board_user CASCADE;
DROP TABLE IF EXISTS card_user CASCADE;
DROP TABLE IF EXISTS card_label CASCADE;
DROP TABLE IF EXISTS document_tag CASCADE;

-- 1. プロジェクト (projects)
CREATE TABLE projects (
    project_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

-- 2. ボード (boards)
CREATE TABLE boards (
    board_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    color_id SMALLINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

-- 3. リスト (lists)
CREATE TABLE lists (
    list_id BIGSERIAL PRIMARY KEY,
    board_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    position SMALLINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

-- 4. カード (cards)
CREATE TABLE cards (
    card_id BIGSERIAL PRIMARY KEY,
    list_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    position SMALLINT NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

-- 5. ラベル (labels)
CREATE TABLE labels (
    label_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,
    color_id SMALLINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

-- 6. チェックリスト (checklists)
CREATE TABLE checklists (
    checklist_id BIGSERIAL PRIMARY KEY,
    card_id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,
    position SMALLINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

-- 7. チェックリストアイテム (checklist_items)
CREATE TABLE checklist_items (
    checklist_item_id BIGSERIAL PRIMARY KEY,
    checklist_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    position SMALLINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

-- 8. ドキュメント (documents)
CREATE TABLE documents (
    document_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    parent_id BIGINT,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

-- 9. ドキュメントバージョン (document_versions)
CREATE TABLE document_versions (
    version_id BIGSERIAL PRIMARY KEY,
    document_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    parent_id BIGINT,
    version_number INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL
);

-- 10. タグ (tags)
CREATE TABLE tags (
    tag_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,
    color_id SMALLINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

-- 11. 添付ファイル (attachments)
CREATE TABLE attachments (
    attachment_id BIGSERIAL PRIMARY KEY,
    related_type VARCHAR(50) NOT NULL,
    related_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(500) NOT NULL,
    type VARCHAR(100) NOT NULL,
    size BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL
);

-- 12. コメント (comments)
CREATE TABLE comments (
    comment_id BIGSERIAL PRIMARY KEY,
    related_type VARCHAR(50) NOT NULL,
    related_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

-- 13. ユーザー (users)
CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    role_id SMALLINT NOT NULL,
    color_id SMALLINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. ユーザー権限 (user_roles)
CREATE TABLE user_roles (
    role_id SMALLINT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- 15. 色 (colors)
CREATE TABLE colors (
    color_id SMALLINT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- 16. プロジェクトユーザー紐付け (project_user)
CREATE TABLE project_user (
    project_user_id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL
);

-- 17. ボードユーザー紐付け (board_user)
CREATE TABLE board_user (
    board_user_id BIGSERIAL PRIMARY KEY,
    board_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL
);

-- 18. カードユーザー紐付け (card_user)
CREATE TABLE card_user (
    card_user_id BIGSERIAL PRIMARY KEY,
    card_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL
);

-- 19. カードラベル紐付け (card_label)
CREATE TABLE card_label (
    card_label_id BIGSERIAL PRIMARY KEY,
    card_id BIGINT NOT NULL,
    label_id BIGINT NOT NULL
);

-- 20. ドキュメントタグ紐付け (document_tag)
CREATE TABLE document_tag (
    document_tag_id BIGSERIAL PRIMARY KEY,
    document_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL
);
