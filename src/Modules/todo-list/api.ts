import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../../Shared/api/api-instance";

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
   id: string,
   text: string,
   done: boolean,
   userId: string
}

export const todoListApi = {
   baseKey: 'tasks',

   //AbortSignal - позволяет отменить запрос, если он в какой-то момент оказался уже не нужен

   getTodoListQueryOptions: () => {
      return queryOptions({
         queryKey: [todoListApi.baseKey, "list"], 
         queryFn: (meta) => jsonApiInstance<TodoDto[]>(`/tasks`, {signal: meta.signal}),
      });
   },

   getTodoListInfinityQueryOptions: () => {
      return infiniteQueryOptions({
         queryKey: [todoListApi.baseKey, "list"], 
         queryFn: (meta) => jsonApiInstance<PaginatedResult<TodoDto>>(`/tasks?_page=${meta.pageParam}&_per_page=10`, {signal: meta.signal}),
         initialPageParam: 1,
         getNextPageParam: (result) => result.next,
         select: result => result.pages.flatMap(page => page.data)
      });
   },

   createTodo: (data: TodoDto) => {
      return jsonApiInstance<TodoDto>(`/tasks`, {
         method: 'POST',
         json: data
      })
   },

   updateTodo: (id: string, data: Partial<TodoDto>) => {
      return jsonApiInstance<TodoDto>(`/tasks/${id}`, {
         method: 'PATCH',
         json: data
      })
   },
   deleteTodo: (id: string) => {
      return jsonApiInstance(`/tasks/${id}`, {
         method: 'DELETE',
      })
   },
}