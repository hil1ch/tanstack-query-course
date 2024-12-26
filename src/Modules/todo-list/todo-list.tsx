import { useTodoList } from "./useTodoList";


export default function TodoList() {
   const {cursor, error, isLoading, todoItems} = useTodoList();

   //queryKey - это ключ помогает react-query отличать запросы между друг другом
   //queryKey: ['tasks', 'list'] - это массив, где 'tasks' - это имя ключа для этого запроса, 'list' - это имя для этого запроса в массиве ключей

   //queryFn - это любая асинхронная функция, которая возвращает Promise, который затем будет использоваться в качестве результата запроса
   
   //Бесконечный скролл - когда отображаются данные при прокрутке страницы

      // placeholderData - это данные, которые будут показаны во время загрузки запроса. Это может помочь избежать пустого экрана при загрузке
      // keepPreviousData - предыдущие данные, показывающиеся при загрузке страницы
      

   if (isLoading) return <div>Loading...</div>

   if (error) return <div>error: {JSON.stringify(error)}</div>

   

   return (
      <div className="p-5 mx-auto max-w-[1200px] mt-10">
         <h1 className="text-3xl font-bold underline mb-5">Todo List</h1>

         <div className={"flex flex-col gap-4"}>
            {todoItems?.map(todo => (
               <div className="border border-slate-300 rounded p-3" key={todo.id}>{todo.text}</div>
            ))}
         </div>
         {cursor}
      </div>
   )
}

