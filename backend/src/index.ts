import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from './server/routes';
import { createContext } from './server/context';

const app = new Hono();

// tRPCハンドラーの設定
app.use('/trpc/*', async (c) => {
  const res = await fetchRequestHandler({
    endpoint: '/trpc',
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
  return res;
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
