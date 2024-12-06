import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../Shared/api/query-client';
import NoteList from '../Modules/note-list/note-list';

function App() {
  

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <NoteList />
      </div>
    </QueryClientProvider>
  )
}

export default App
