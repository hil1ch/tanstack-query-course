const BASE_URL = "http://localhost:3000";

export type PaginatedResult<T> = {
   data: T[];
   first: number;
   items: number;
   last: number;
   next: number | null;
   pages: number;
   prev: number | null;
}

export type TodoDto = {
   id: number,
   text: string,
   done: boolean,
}

export const todoListApi = {

   //AbortSignal - позволяет отменить запрос, если он в какой-то момент оказался уже не нужен
   getTodoList: ({page}: {page: number}, {signal}: {signal:AbortSignal}) => {
      fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, {
         signal
      }).then(res => res.json() as Promise<PaginatedResult<TodoDto>>)
   }
}