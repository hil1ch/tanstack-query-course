import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../Shared/api/query-client';
import TodoList from '../Modules/todo-list/todo-list';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <TodoList />
      </div>
    </QueryClientProvider>
  )
}

export default App
