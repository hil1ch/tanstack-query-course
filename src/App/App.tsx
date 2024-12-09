import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../Shared/api/query-client';
import TodoList from '../Modules/todo-list/todo-list';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
