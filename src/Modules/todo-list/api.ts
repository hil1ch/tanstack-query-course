const BASE_URL = "http://localhost:3000";

export type TodoDto = {
   id: number,
   text: string,
   done: boolean,
}

export const todoListApi = {

   //AbortSignal - позволяет отменить запрос, если он в какой-то момент оказался уже не нужен
   getTodoList: ({signal}: {signal:AbortSignal}) => {
      fetch(`${BASE_URL}/tasks`, {
         signal
      }).then(res => res.json() as Promise<TodoDto[]>)
   }
}