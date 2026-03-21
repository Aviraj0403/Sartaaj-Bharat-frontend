import { useQuery } from '@tanstack/react-query';
import { getMenuCategories } from '../services/categoryApi';

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getMenuCategories,
        staleTime: 1 * 60 * 1000, // 1 minute (allow fast sync with admin adds)
        select: (data) => data || [],
    });
};
