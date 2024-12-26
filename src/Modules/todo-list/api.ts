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
   id: number,
   text: string,
   done: boolean,
}

export const todoListApi = {

   //AbortSignal - позволяет отменить запрос, если он в какой-то момент оказался уже не нужен

   getTodoListQueryOptions: ({page}: {page: number}) => {
      return queryOptions({
         queryKey: ["tasks", "list", {page}], 
         queryFn: (meta) => jsonApiInstance<PaginatedResult<TodoDto>>(`/tasks?_page=${page}&_per_page=10`, {signal: meta.signal}),
      });
   },

   getTodoListInfinityQueryOptions: () => {
      return infiniteQueryOptions({
         queryKey: ["tasks", "list"], 
         queryFn: (meta) => jsonApiInstance<PaginatedResult<TodoDto>>(`/tasks?_page=${meta.pageParam}&_per_page=10`, {signal: meta.signal}),
         initialPageParam: 1,
         getNextPageParam: (result) => result.next,
         select: result => result.pages.flatMap(page => page.data)
      });
   }
}