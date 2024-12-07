import { useQuery } from "@tanstack/react-query";

type Todo = {
   id: number,
   text: string,
   done: boolean,
   
}

export const getTasks = () => {
   return new Promise<Todo[]>(res => {
      setTimeout(() => {
         res([
            { 
               id: 1, 
               text: 'todo1', 
               done: false 
            },
            { 
               id: 2, 
               text: 'todo2', 
               done: false 
            }
         ]);
      }, 1000)
   });
};

export default function TodoList() {

   //queryKey - это ключ помогает react-query отличать запросы между друг другом
   //queryKey: ['tasks', 'list'] - это массив, где 'tasks' - это имя ключа для этого запроса, 'list' - это имя для этого запроса в массиве ключей

   //queryFn - это любая асинхронная функция, которая возвращает Promise, который затем будет использоваться в качестве результата запроса
   const {data, error, isPending} = useQuery({
      queryKey: ['tasks', 'list'], 
      queryFn: getTasks
   })

   if (isPending) return <div>Loading...</div>

   if (error) return <div>error: {JSON.stringify(error)}</div>

   return (
      <div>
         TodoList
         {data.map(todo => ( 
            <div key={todo.id}> {todo.text}</div>
         ))}
      </div>
   )
}