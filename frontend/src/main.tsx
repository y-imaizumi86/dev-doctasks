import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import { App } from './App';

// QueryClient の作成とグローバルエラーハンドリングの設定
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error('Error in query:', error, query);
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
