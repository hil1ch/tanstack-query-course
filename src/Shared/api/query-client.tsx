import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 1 * 60 * 1000,
      },
   },
});

//staleTime - время устаревания данных

//gcTime - время стирания данных из кэша (по умолчанию 5 минут = 5 * 60 * 1000 - время, 
// через которое inactive запросы будут удалены из кэша)