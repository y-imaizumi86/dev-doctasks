import { PrismaClient } from '@prisma/client';
import { title } from 'process';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  try {
    // トランザクション開始
    await prisma.$transaction(async (tx) => {
      // スキーマ名を指定（PostgreSQLのデフォルトは "public"）
      const schemaName = 'public';

      // テーブル名を取得（_prisma_migrations を除外）
      const tableNames = await tx.$queryRaw<
        Array<{ tablename: string }>
      >`SELECT tablename FROM pg_tables WHERE schemaname=${schemaName}`;

      const tables = tableNames
        .map(({ tablename }) => `"${schemaName}"."${tablename}"`)
        .filter((name) => name !== `"${schemaName}"."_prisma_migrations"`) // マイグレーションテーブルは除外
        .join(', ');

      // TRUNCATE TABLE を実行して全データ削除＆IDリセット
      await tx.$executeRawUnsafe(`TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE;`);
      console.log('All tables have been truncated, IDs reset, and dependencies handled.');

      // ユーザー権限
      const userRoles = await tx.userRole.createMany({
        data: [
          { role_id: 1, name: 'admin' },
          { role_id: 2, name: 'user' },
        ],
      });
      console.log(`${userRoles.count} user roles have been created.`);

      // 色
      const colors = await tx.color.createMany({
        data: [
          { color_id: 1, name: 'red' },
          { color_id: 2, name: 'blue' },
          { color_id: 3, name: 'green' },
          { color_id: 4, name: 'yellow' },
          { color_id: 5, name: 'purple' },
          { color_id: 6, name: 'orange' },
          { color_id: 7, name: 'pink' },
          { color_id: 8, name: 'black' },
        ],
      });
      console.log(`${colors.count} colors have been created.`);

      // ユーザー
      const userData = [
        {
          name: '山田 太郎',
          email: 'yamada.taro@example.com',
          hashed_password: 'Yamadataro1',
          role_id: 1,
          color_id: 1,
        },
        {
          name: '鈴木 花子',
          email: 'suzuki.hanako@example.com',
          hashed_password: 'Suzukihanako1',
          role_id: 2,
          color_id: 3,
        },
        {
          name: '佐藤 健',
          email: 'sato.ken@example.com',
          hashed_password: 'Satoken1',
          role_id: 2,
          color_id: 4,
        },
        {
          name: '高橋 美咲',
          email: 'takahashi.misaki@example.com',
          hashed_password: 'Takahashimisaki1',
          role_id: 2,
          color_id: 5,
        },
      ];
      const users = await Promise.all(userData.map((user) => tx.user.create({ data: user })));
      console.log(`${users.length} users have been created.`);

      // プロジェクトデータ
      const projectData = [
        {
          name: 'ウェブサイトリニューアル',
          description: 'コーポレートウェブサイトの全面的な刷新と最適化',
          created_by: 1,
          updated_by: 1,
        },
        {
          name: 'モバイルアプリ開発',
          description: '新規顧客向けのクロスプラットフォームモバイルアプリケーション開発',
          created_by: 2,
          updated_by: 2,
        },
      ];
      const projects = await Promise.all(
        projectData.map((project) => tx.project.create({ data: project }))
      );
      console.log(`${projects.length} projects have been created.`);

      // ボードデータ
      const boardData = [
        {
          project_id: projects[0].project_id,
          title: 'ウェブサイトデザイン',
          color_id: 2,
          created_by: 1,
          updated_by: 1,
        },
        {
          project_id: projects[0].project_id,
          title: 'コンテンツ戦略',
          color_id: 7,
          created_by: 2,
          updated_by: 2,
        },
        {
          project_id: projects[1].project_id,
          title: 'アプリUI/UX',
          color_id: 3,
          created_by: 3,
          updated_by: 3,
        },
        {
          project_id: projects[1].project_id,
          title: 'モバイル機能設計',
          color_id: 5,
          created_by: 4,
          updated_by: 4,
        },
      ];
      const boards = await Promise.all(boardData.map((board) => tx.board.create({ data: board })));
      console.log(`${boards.length} boards have been created.`);

      // リスト
      const listData = [
        {
          board_id: boards[0].board_id,
          title: '未対応',
          position: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          board_id: boards[0].board_id,
          title: '処理中',
          position: 2,
          created_by: 1,
          updated_by: 1,
        },
        {
          board_id: boards[0].board_id,
          title: '処理済み',
          position: 3,
          created_by: 1,
          updated_by: 1,
        },
        { board_id: boards[0].board_id, title: '完了', position: 4, created_by: 1, updated_by: 1 },
        {
          board_id: boards[1].board_id,
          title: '未対応',
          position: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          board_id: boards[1].board_id,
          title: '処理中',
          position: 2,
          created_by: 1,
          updated_by: 1,
        },
        {
          board_id: boards[1].board_id,
          title: '処理済み',
          position: 3,
          created_by: 1,
          updated_by: 1,
        },
        { board_id: boards[1].board_id, title: '完了', position: 4, created_by: 1, updated_by: 1 },
        {
          board_id: boards[2].board_id,
          title: '未対応',
          position: 1,
          created_by: 3,
          updated_by: 3,
        },
        {
          board_id: boards[2].board_id,
          title: '処理中',
          position: 2,
          created_by: 3,
          updated_by: 3,
        },
        {
          board_id: boards[2].board_id,
          title: '処理済み',
          position: 3,
          created_by: 3,
          updated_by: 3,
        },
        { board_id: boards[2].board_id, title: '完了', position: 4, created_by: 3, updated_by: 3 },
        {
          board_id: boards[3].board_id,
          title: '未対応',
          position: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          board_id: boards[3].board_id,
          title: '処理中',
          position: 2,
          created_by: 1,
          updated_by: 1,
        },
        {
          board_id: boards[3].board_id,
          title: '処理済み',
          position: 3,
          created_by: 1,
          updated_by: 1,
        },
        { board_id: boards[3].board_id, title: '完了', position: 4, created_by: 1, updated_by: 1 },
      ];
      const lists = await Promise.all(listData.map((list) => tx.list.create({ data: list })));
      console.log(`${lists.length} lists have been created.`);

      // カード
      const cardData = [
        {
          list_id: lists[0].list_id,
          title: 'サイトマップ作成',
          description: 'ウェブサイトの全体構造を設計',
          position: 1,
          due_date: new Date('2025-03-01'),
          created_by: 1,
          updated_by: 1,
        },
        {
          list_id: lists[0].list_id,
          title: 'ワイヤーフレーム作成',
          description: '各ページのレイアウトを設計',
          position: 2,
          due_date: new Date('2025-03-15'),
          created_by: 2,
          updated_by: 2,
        },
        {
          list_id: lists[1].list_id,
          title: 'メインビジュアル制作',
          description: 'トップページの主要画像を制作',
          position: 1,
          due_date: new Date('2025-04-01'),
          created_by: 2,
          updated_by: 2,
        },
        {
          list_id: lists[1].list_id,
          title: 'カラースキーム決定',
          description: 'ウェブサイト全体の配色を決定',
          position: 2,
          due_date: new Date('2025-03-20'),
          created_by: 3,
          updated_by: 3,
        },
        {
          list_id: lists[2].list_id,
          title: 'デザインレビュー',
          description: '制作したデザインの確認と修正',
          position: 1,
          due_date: new Date('2025-04-15'),
          created_by: 1,
          updated_by: 1,
        },
        {
          list_id: lists[3].list_id,
          title: 'デザイン確定',
          description: '最終デザインの承認',
          position: 1,
          due_date: new Date('2025-04-30'),
          created_by: 1,
          updated_by: 1,
        },
        {
          list_id: lists[4].list_id,
          title: 'コンテンツ監査',
          description: '既存コンテンツの分析と評価',
          position: 1,
          due_date: new Date('2025-03-10'),
          created_by: 1,
          updated_by: 1,
        },
        {
          list_id: lists[4].list_id,
          title: 'キーメッセージ策定',
          description: '企業の主要メッセージを定義',
          position: 2,
          due_date: new Date('2025-03-20'),
          created_by: 2,
          updated_by: 2,
        },
        {
          list_id: lists[5].list_id,
          title: '新規コンテンツ作成',
          description: 'ブログ記事や製品説明の執筆',
          position: 1,
          due_date: new Date('2025-04-15'),
          created_by: 2,
          updated_by: 2,
        },
        {
          list_id: lists[5].list_id,
          title: 'SEO最適化',
          description: 'キーワード分析と最適化',
          position: 2,
          due_date: new Date('2025-04-30'),
          created_by: 1,
          updated_by: 1,
        },
        {
          list_id: lists[6].list_id,
          title: 'コンテンツレビュー',
          description: '作成したコンテンツの確認と修正',
          position: 1,
          due_date: new Date('2025-05-15'),
          created_by: 1,
          updated_by: 1,
        },
        {
          list_id: lists[7].list_id,
          title: 'コンテンツ公開準備',
          description: '承認されたコンテンツの最終確認',
          position: 1,
          due_date: new Date('2025-05-31'),
          created_by: 2,
          updated_by: 2,
        },
        {
          list_id: lists[8].list_id,
          title: '要件定義',
          description: 'アプリの機能と目的を明確化',
          position: 1,
          due_date: new Date('2025-02-20'),
          created_by: 3,
          updated_by: 3,
        },
        {
          list_id: lists[8].list_id,
          title: 'ユーザーペルソナ作成',
          description: '主要ユーザー層の特徴を定義',
          position: 2,
          due_date: new Date('2025-02-25'),
          created_by: 4,
          updated_by: 4,
        },
        {
          list_id: lists[8].list_id,
          title: 'ユーザーストーリー作成',
          description: '主要機能のユーザーストーリーを定義',
          position: 3,
          due_date: new Date('2025-03-01'),
          created_by: 3,
          updated_by: 3,
        },
        {
          list_id: lists[9].list_id,
          title: 'ワイヤーフレーム設計',
          description: '主要画面のレイアウトを設計',
          position: 1,
          due_date: new Date('2025-03-10'),
          created_by: 3,
          updated_by: 3,
        },
        {
          list_id: lists[9].list_id,
          title: 'プロトタイプ作成',
          description: '基本機能のプロトタイプを開発',
          position: 2,
          due_date: new Date('2025-03-25'),
          created_by: 4,
          updated_by: 4,
        },
        {
          list_id: lists[10].list_id,
          title: 'ユーザビリティテスト',
          description: 'プロトタイプの使用感をテスト',
          position: 1,
          due_date: new Date('2025-04-05'),
          created_by: 3,
          updated_by: 3,
        },
        {
          list_id: lists[10].list_id,
          title: 'フィードバック分析',
          description: 'テスト結果の分析とデザイン改善点の特定',
          position: 2,
          due_date: new Date('2025-04-10'),
          created_by: 4,
          updated_by: 4,
        },
        {
          list_id: lists[11].list_id,
          title: 'UI/UXデザイン確定',
          description: '最終デザインの承認',
          position: 1,
          due_date: new Date('2025-04-15'),
          created_by: 4,
          updated_by: 4,
        },
        {
          list_id: lists[12].list_id,
          title: 'コア機能リスト作成',
          description: 'アプリの主要機能を定義',
          position: 1,
          due_date: new Date('2025-02-28'),
          created_by: 1,
          updated_by: 1,
        },
        {
          list_id: lists[12].list_id,
          title: 'データモデル設計',
          description: 'アプリのデータ構造を設計',
          position: 2,
          due_date: new Date('2025-03-05'),
          created_by: 4,
          updated_by: 4,
        },
        {
          list_id: lists[12].list_id,
          title: '機能優先順位付け',
          description: '開発順序を決めるための機能優先順位付け',
          position: 3,
          due_date: new Date('2025-03-10'),
          created_by: 1,
          updated_by: 1,
        },
        {
          list_id: lists[13].list_id,
          title: 'API設計',
          description: 'バックエンドとの通信インターフェースを設計',
          position: 1,
          due_date: new Date('2025-03-20'),
          created_by: 1,
          updated_by: 1,
        },
        {
          list_id: lists[13].list_id,
          title: 'セキュリティ要件定義',
          description: 'データ保護とユーザー認証方式を決定',
          position: 2,
          due_date: new Date('2025-03-30'),
          created_by: 4,
          updated_by: 4,
        },
        {
          list_id: lists[14].list_id,
          title: '機能テスト計画作成',
          description: '各機能のテスト方法を計画',
          position: 1,
          due_date: new Date('2025-04-10'),
          created_by: 1,
          updated_by: 1,
        },
        {
          list_id: lists[14].list_id,
          title: 'テストケース作成',
          description: '主要機能のテストケースを作成',
          position: 2,
          due_date: new Date('2025-04-15'),
          created_by: 4,
          updated_by: 4,
        },
        {
          list_id: lists[15].list_id,
          title: '開発環境セットアップ',
          description: '開発チームの環境を準備',
          position: 1,
          due_date: new Date('2025-04-20'),
          created_by: 4,
          updated_by: 4,
        },
      ];
      const cards = await Promise.all(cardData.map((card) => tx.card.create({ data: card })));
      console.log(`${cards.length} cards have been created.`);

      // ラベル
      const labelData = [
        {
          project_id: projects[0].project_id,
          name: '緊急',
          color_id: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          project_id: projects[0].project_id,
          name: '重要',
          color_id: 2,
          created_by: 1,
          updated_by: 1,
        },
        {
          project_id: projects[0].project_id,
          name: 'バグ',
          color_id: 3,
          created_by: 1,
          updated_by: 1,
        },
        {
          project_id: projects[0].project_id,
          name: '機能追加',
          color_id: 4,
          created_by: 1,
          updated_by: 1,
        },
        {
          project_id: projects[0].project_id,
          name: 'UI/UX',
          color_id: 5,
          created_by: 1,
          updated_by: 1,
        },
        {
          project_id: projects[0].project_id,
          name: 'パフォーマンス',
          color_id: 6,
          created_by: 1,
          updated_by: 1,
        },
        {
          project_id: projects[0].project_id,
          name: 'セキュリティ',
          color_id: 7,
          created_by: 1,
          updated_by: 1,
        },
        {
          project_id: projects[0].project_id,
          name: 'ドキュメント',
          color_id: 8,
          created_by: 1,
          updated_by: 1,
        },
        {
          project_id: projects[1].project_id,
          name: '緊急',
          color_id: 1,
          created_by: 3,
          updated_by: 3,
        },
        {
          project_id: projects[1].project_id,
          name: '重要',
          color_id: 2,
          created_by: 3,
          updated_by: 3,
        },
        {
          project_id: projects[1].project_id,
          name: 'バグ',
          color_id: 3,
          created_by: 3,
          updated_by: 3,
        },
        {
          project_id: projects[1].project_id,
          name: '機能追加',
          color_id: 4,
          created_by: 3,
          updated_by: 3,
        },
        {
          project_id: projects[1].project_id,
          name: 'UI/UX',
          color_id: 5,
          created_by: 3,
          updated_by: 3,
        },
        {
          project_id: projects[1].project_id,
          name: 'パフォーマンス',
          color_id: 6,
          created_by: 3,
          updated_by: 3,
        },
        {
          project_id: projects[1].project_id,
          name: 'セキュリティ',
          color_id: 7,
          created_by: 3,
          updated_by: 3,
        },
        {
          project_id: projects[1].project_id,
          name: 'ドキュメント',
          color_id: 8,
          created_by: 3,
          updated_by: 3,
        },
      ];
      const labels = await Promise.all(labelData.map((label) => tx.label.create({ data: label })));
      console.log(`${labels.length} labels have been created.`);

      // チェックリスト
      const checklistData = [
        {
          card_id: cards[0].card_id,
          name: 'サイトマップ作成手順',
          position: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          card_id: cards[1].card_id,
          name: 'ワイヤーフレーム確認事項',
          position: 1,
          created_by: 2,
          updated_by: 2,
        },
        {
          card_id: cards[2].card_id,
          name: 'ビジュアル制作ガイドライン',
          position: 1,
          created_by: 2,
          updated_by: 2,
        },
        {
          card_id: cards[4].card_id,
          name: 'デザインレビューチェックポイント',
          position: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          card_id: cards[4].card_id,
          name: 'フィードバック収集リスト',
          position: 2,
          created_by: 1,
          updated_by: 1,
        },
        {
          card_id: cards[5].card_id,
          name: '最終承認チェックリスト',
          position: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          card_id: cards[6].card_id,
          name: 'コンテンツ監査項目',
          position: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          card_id: cards[7].card_id,
          name: 'キーメッセージ策定ステップ',
          position: 1,
          created_by: 2,
          updated_by: 2,
        },
        {
          card_id: cards[8].card_id,
          name: '新規コンテンツ作成ガイドライン',
          position: 1,
          created_by: 2,
          updated_by: 2,
        },
        {
          card_id: cards[9].card_id,
          name: 'SEO最適化チェックリスト',
          position: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          card_id: cards[10].card_id,
          name: 'コンテンツレビュー基準',
          position: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          card_id: cards[11].card_id,
          name: '公開前最終チェック',
          position: 1,
          created_by: 2,
          updated_by: 2,
        },
      ];
      const checklists = await Promise.all(
        checklistData.map((checklist) => tx.checklist.create({ data: checklist }))
      );
      console.log(`${checklists.length} checklists have been created.`);

      const checklistItemData = [
        {
          checklist_id: checklists[0].checklist_id,
          title: 'ページ階層の決定',
          is_completed: false,
          position: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[0].checklist_id,
          title: 'ナビゲーション構造の設計',
          is_completed: false,
          position: 2,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[0].checklist_id,
          title: 'コンテンツカテゴリの洗い出し',
          is_completed: false,
          position: 3,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[1].checklist_id,
          title: 'レイアウトグリッドの設計',
          is_completed: false,
          position: 1,
          created_by: 2,
          updated_by: 2,
        },
        {
          checklist_id: checklists[1].checklist_id,
          title: 'コンポーネント配置の検討',
          is_completed: false,
          position: 2,
          created_by: 2,
          updated_by: 2,
        },
        {
          checklist_id: checklists[1].checklist_id,
          title: 'レスポンシブデザインの考慮',
          is_completed: false,
          position: 3,
          created_by: 2,
          updated_by: 2,
        },
        {
          checklist_id: checklists[2].checklist_id,
          title: 'ブランドガイドラインの確認',
          is_completed: false,
          position: 1,
          created_by: 2,
          updated_by: 2,
        },
        {
          checklist_id: checklists[2].checklist_id,
          title: 'イメージの選定基準',
          is_completed: false,
          position: 2,
          created_by: 2,
          updated_by: 2,
        },
        {
          checklist_id: checklists[3].checklist_id,
          title: 'デザインの一貫性チェック',
          is_completed: false,
          position: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[4].checklist_id,
          title: 'ユーザビリティ評価',
          is_completed: false,
          position: 2,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[4].checklist_id,
          title: 'アクセシビリティ確認',
          is_completed: false,
          position: 3,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[5].checklist_id,
          title: '経営陣の承認',
          is_completed: false,
          position: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[5].checklist_id,
          title: '最終デザインの保存',
          is_completed: false,
          position: 2,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[6].checklist_id,
          title: '既存コンテンツの棚卸',
          is_completed: false,
          position: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[6].checklist_id,
          title: 'コンテンツの質の評価',
          is_completed: false,
          position: 2,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[6].checklist_id,
          title: '重複コンテンツの特定',
          is_completed: false,
          position: 3,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[7].checklist_id,
          title: '企業ミッションの反映',
          is_completed: false,
          position: 1,
          created_by: 2,
          updated_by: 2,
        },
        {
          checklist_id: checklists[7].checklist_id,
          title: 'ターゲット顧客の明確化',
          is_completed: false,
          position: 2,
          created_by: 2,
          updated_by: 2,
        },
        {
          checklist_id: checklists[7].checklist_id,
          title: 'キーメッセージの文言作成',
          is_completed: false,
          position: 3,
          created_by: 2,
          updated_by: 2,
        },
        {
          checklist_id: checklists[8].checklist_id,
          title: '記事のアウトライン作成',
          is_completed: false,
          position: 1,
          created_by: 2,
          updated_by: 2,
        },
        {
          checklist_id: checklists[8].checklist_id,
          title: '執筆担当者の割り当て',
          is_completed: false,
          position: 2,
          created_by: 2,
          updated_by: 2,
        },
        {
          checklist_id: checklists[9].checklist_id,
          title: 'キーワード選定',
          is_completed: false,
          position: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[9].checklist_id,
          title: 'メタ情報の最適化',
          is_completed: false,
          position: 2,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[9].checklist_id,
          title: 'リンク戦略の検討',
          is_completed: false,
          position: 3,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[10].checklist_id,
          title: '文法チェック',
          is_completed: false,
          position: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[10].checklist_id,
          title: '事実確認',
          is_completed: false,
          position: 2,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[10].checklist_id,
          title: 'トーンの統一',
          is_completed: false,
          position: 3,
          created_by: 1,
          updated_by: 1,
        },
        {
          checklist_id: checklists[11].checklist_id,
          title: '法務確認',
          is_completed: false,
          position: 1,
          created_by: 2,
          updated_by: 2,
        },
        {
          checklist_id: checklists[11].checklist_id,
          title: 'プレビュー',
          is_completed: false,
          position: 2,
          created_by: 2,
          updated_by: 2,
        },
        {
          checklist_id: checklists[11].checklist_id,
          title: 'パブリッシュ準備',
          is_completed: false,
          position: 3,
          created_by: 2,
          updated_by: 2,
        },
      ];
      const checklistItems = await Promise.all(
        checklistItemData.map((checklistItem) => tx.checklistItem.create({ data: checklistItem }))
      );
      console.log(`${checklistItems.length} checklistItems have been created.`);

      // プロジェクトユーザー
      const projectUserData = [
        { project_id: projects[0].project_id, user_id: users[0].user_id },
        { project_id: projects[0].project_id, user_id: users[1].user_id },
        { project_id: projects[0].project_id, user_id: users[2].user_id },
        { project_id: projects[1].project_id, user_id: users[0].user_id },
        { project_id: projects[1].project_id, user_id: users[2].user_id },
        { project_id: projects[1].project_id, user_id: users[3].user_id },
      ];
      const projectUsers = await Promise.all(
        projectUserData.map((projectUser) => tx.projectUser.create({ data: projectUser }))
      );
      console.log(`${projectUsers.length} projectUsers have been created.`);

      // ボードユーザー
      const boardUserData = [
        { board_id: boards[0].board_id, user_id: users[0].user_id },
        { board_id: boards[0].board_id, user_id: users[1].user_id },
        { board_id: boards[0].board_id, user_id: users[2].user_id },
        { board_id: boards[1].board_id, user_id: users[0].user_id },
        { board_id: boards[1].board_id, user_id: users[1].user_id },
        { board_id: boards[2].board_id, user_id: users[2].user_id },
        { board_id: boards[2].board_id, user_id: users[3].user_id },
        { board_id: boards[3].board_id, user_id: users[0].user_id },
        { board_id: boards[3].board_id, user_id: users[3].user_id },
      ];
      const boardUsers = await Promise.all(
        boardUserData.map((boardUser) => tx.boardUser.create({ data: boardUser }))
      );
      console.log(`${boardUsers.length} boardUsers have been created.`);

      // カードユーザー
      const cardUserData = [
        { card_id: cards[0].card_id, user_id: users[0].user_id },
        { card_id: cards[0].card_id, user_id: users[1].user_id },
        { card_id: cards[1].card_id, user_id: users[1].user_id },
        { card_id: cards[1].card_id, user_id: users[2].user_id },
        { card_id: cards[2].card_id, user_id: users[1].user_id },
        { card_id: cards[3].card_id, user_id: users[2].user_id },
        { card_id: cards[4].card_id, user_id: users[0].user_id },
        { card_id: cards[4].card_id, user_id: users[1].user_id },
        { card_id: cards[4].card_id, user_id: users[2].user_id },
        { card_id: cards[5].card_id, user_id: users[0].user_id },
        { card_id: cards[6].card_id, user_id: users[0].user_id },
        { card_id: cards[6].card_id, user_id: users[1].user_id },
        { card_id: cards[7].card_id, user_id: users[1].user_id },
        { card_id: cards[8].card_id, user_id: users[0].user_id },
        { card_id: cards[8].card_id, user_id: users[1].user_id },
        { card_id: cards[9].card_id, user_id: users[0].user_id },
        { card_id: cards[10].card_id, user_id: users[0].user_id },
        { card_id: cards[10].card_id, user_id: users[1].user_id },
        { card_id: cards[11].card_id, user_id: users[1].user_id },
        { card_id: cards[12].card_id, user_id: users[2].user_id },
        { card_id: cards[12].card_id, user_id: users[3].user_id },
        { card_id: cards[13].card_id, user_id: users[3].user_id },
        { card_id: cards[14].card_id, user_id: users[2].user_id },
        { card_id: cards[15].card_id, user_id: users[2].user_id },
        { card_id: cards[15].card_id, user_id: users[3].user_id },
        { card_id: cards[16].card_id, user_id: users[3].user_id },
        { card_id: cards[17].card_id, user_id: users[2].user_id },
        { card_id: cards[17].card_id, user_id: users[3].user_id },
        { card_id: cards[18].card_id, user_id: users[3].user_id },
        { card_id: cards[19].card_id, user_id: users[3].user_id },
        { card_id: cards[20].card_id, user_id: users[0].user_id },
        { card_id: cards[20].card_id, user_id: users[3].user_id },
        { card_id: cards[21].card_id, user_id: users[0].user_id },
        { card_id: cards[22].card_id, user_id: users[0].user_id },
        { card_id: cards[22].card_id, user_id: users[3].user_id },
        { card_id: cards[23].card_id, user_id: users[3].user_id },
        { card_id: cards[24].card_id, user_id: users[0].user_id },
        { card_id: cards[24].card_id, user_id: users[3].user_id },
        { card_id: cards[25].card_id, user_id: users[0].user_id },
        { card_id: cards[26].card_id, user_id: users[3].user_id },
        { card_id: cards[27].card_id, user_id: users[3].user_id },
      ];
      const cardUsers = await Promise.all(
        cardUserData.map((cardUser) => tx.cardUser.create({ data: cardUser }))
      );
      console.log(`${cardUsers.length} cardUsers have been created.`);

      // カードラベル
      const cardLabelData = [
        { card_id: cards[0].card_id, label_id: labels[0].label_id },
        { card_id: cards[0].card_id, label_id: labels[1].label_id },
        { card_id: cards[1].card_id, label_id: labels[2].label_id },
        { card_id: cards[1].card_id, label_id: labels[3].label_id },
        { card_id: cards[2].card_id, label_id: labels[4].label_id },
        { card_id: cards[3].card_id, label_id: labels[5].label_id },
        { card_id: cards[4].card_id, label_id: labels[6].label_id },
        { card_id: cards[4].card_id, label_id: labels[7].label_id },
        { card_id: cards[5].card_id, label_id: labels[0].label_id },
        { card_id: cards[5].card_id, label_id: labels[1].label_id },
        { card_id: cards[6].card_id, label_id: labels[2].label_id },
        { card_id: cards[7].card_id, label_id: labels[3].label_id },
        { card_id: cards[8].card_id, label_id: labels[4].label_id },
        { card_id: cards[8].card_id, label_id: labels[5].label_id },
        { card_id: cards[9].card_id, label_id: labels[6].label_id },
        { card_id: cards[9].card_id, label_id: labels[7].label_id },
        { card_id: cards[10].card_id, label_id: labels[0].label_id },
        { card_id: cards[10].card_id, label_id: labels[1].label_id },
        { card_id: cards[12].card_id, label_id: labels[2].label_id },
        { card_id: cards[13].card_id, label_id: labels[3].label_id },
        { card_id: cards[14].card_id, label_id: labels[0].label_id },
        { card_id: cards[15].card_id, label_id: labels[1].label_id },
        { card_id: cards[16].card_id, label_id: labels[2].label_id },
        { card_id: cards[17].card_id, label_id: labels[3].label_id },
        { card_id: cards[18].card_id, label_id: labels[4].label_id },
        { card_id: cards[19].card_id, label_id: labels[5].label_id },
        { card_id: cards[20].card_id, label_id: labels[6].label_id },
        { card_id: cards[21].card_id, label_id: labels[7].label_id },
        { card_id: cards[21].card_id, label_id: labels[0].label_id },
        { card_id: cards[22].card_id, label_id: labels[1].label_id },
        { card_id: cards[23].card_id, label_id: labels[2].label_id },
        { card_id: cards[23].card_id, label_id: labels[3].label_id },
        { card_id: cards[24].card_id, label_id: labels[4].label_id },
        { card_id: cards[24].card_id, label_id: labels[5].label_id },
        { card_id: cards[25].card_id, label_id: labels[6].label_id },
        { card_id: cards[25].card_id, label_id: labels[7].label_id },
        { card_id: cards[26].card_id, label_id: labels[0].label_id },
        { card_id: cards[26].card_id, label_id: labels[1].label_id },
        { card_id: cards[27].card_id, label_id: labels[2].label_id },
        { card_id: cards[27].card_id, label_id: labels[3].label_id },
      ];
      const cardLabels = await Promise.all(
        cardLabelData.map((cardLabel) => tx.cardLabel.create({ data: cardLabel }))
      );
      console.log(`${cardLabels.length} cardLabels have been created.`);
    });

    console.log('Data seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('Error in main function:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
