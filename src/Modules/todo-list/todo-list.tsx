import { useCallback, useRef, useState } from "react"; 
import { useInfiniteQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";

export default function TodoList() {

   const [enabled, setEnabled] = useState(false);

   //queryKey - это ключ помогает react-query отличать запросы между друг другом
   //queryKey: ['tasks', 'list'] - это массив, где 'tasks' - это имя ключа для этого запроса, 'list' - это имя для этого запроса в массиве ключей

   //queryFn - это любая асинхронная функция, которая возвращает Promise, который затем будет использоваться в качестве результата запроса
   
   //Бесконечный скролл - когда отображаются данные при прокрутке страницы
   const {data: todoItems, error, isLoading, isPlaceholderData, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
      ...todoListApi.getTodoListInfinityQueryOptions(),
      enabled: enabled,

      // placeholderData - это данные, которые будут показаны во время загрузки запроса. Это может помочь избежать пустого экрана при загрузке
      // keepPreviousData - предыдущие данные, показывающиеся при загрузке страницы
      
   });

   const cursorRef = useIntersection(() => {
      fetchNextPage();
   })

   if (isLoading) return <div>Loading...</div>

   if (error) return <div>error: {JSON.stringify(error)}</div>

   

   return (
      <div className="p-5 mx-auto max-w-[1200px] mt-10">
         <h1 className="text-3xl font-bold underline mb-5">Todo List</h1>
         <button onClick={() => setEnabled(e => !e)}>Toggle Enabled</button>

         <div className={"flex flex-col gap-4" + (isPlaceholderData ? "opacity-50":"")}>
            {todoItems?.map(todo => (
               <div className="border border-slate-300 rounded p-3" key={todo.id}>{todo.text}</div>
            ))}
         </div>
         <div className=" flex gap-2 mt-4" ref={cursorRef}>
            {!hasNextPage && <div>Нет данных для загрузки</div>}
            {isFetchingNextPage && <div>...Loading</div>}
         </div>
      </div>
   )
}

export function useIntersection(onIntersect: () => void) {

   const unsubscribe = useRef(() => {})

   return useCallback((el: HTMLDivElement | null) => {
      const observer = new IntersectionObserver((entries) => {
         entries.forEach(intersection => {
            if (intersection.isIntersecting) {
               onIntersect();
            }
         })
      })
      if (el) {
         observer.observe(el);
         unsubscribe.current = () => observer.disconnect();
      } else {
         unsubscribe.current();
      }
   }, [])
}