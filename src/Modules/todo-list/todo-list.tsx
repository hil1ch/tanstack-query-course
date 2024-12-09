import { useState } from "react"; 
import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";

export default function TodoList() {

   const [page, setPage] = useState()

   //queryKey - это ключ помогает react-query отличать запросы между друг другом
   //queryKey: ['tasks', 'list'] - это массив, где 'tasks' - это имя ключа для этого запроса, 'list' - это имя для этого запроса в массиве ключей

   //queryFn - это любая асинхронная функция, которая возвращает Promise, который затем будет использоваться в качестве результата запроса
   const {data: todoItems, error, isPending} = useQuery({
      queryKey: ["tasks", "list", {page}], 
      queryFn: (meta) => todoListApi.getTodoList({page}, meta),
   });

   if (isPending) return <div>Loading...</div>

   if (error) return <div>error: {JSON.stringify(error)}</div>

   return (
      <div className="p-5 mx-auto max-w-[1200px] mt-10">
         <h1 className="text-3xl font-bold underline mb-5">Todo List</h1>

         <div className="flex flex-col gap-4">
            {todoItems.data.map(todo => (
               <div className="border border-slate-300 rounded p-3" key={todo.id}>{todo.text}</div>
            ))}
         </div>
         <div className=" flex gap-2 mt-4">
            <button onClick={() => setPage(p => Math.max(p - 1, 1)} className="p-3 rounded border border-teal-500">prev</button>
            <button onClick={() => setPage(p => Math.min(p + 1, todoItems.pages)} className="p-3 rounded border border-teal-500">next</button>
         </div>
      </div>
   )
}