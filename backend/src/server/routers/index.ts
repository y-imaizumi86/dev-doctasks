import { router } from '../trpc';

export const appRouter = router({
  // ここに後でルートを追加します
});

export type AppRouter = typeof appRouter;
