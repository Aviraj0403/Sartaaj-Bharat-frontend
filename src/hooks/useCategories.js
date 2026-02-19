import { useQuery } from '@tanstack/react-query';
import { getMenuCategories } from '../services/categoryApi';

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getMenuCategories,
        staleTime: 30 * 60 * 1000, // 30 minutes (categories don't change often)
        select: (data) => data || [],
    });
};
