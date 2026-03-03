import { useQuery } from '@tanstack/react-query';
import { getProductBySlug } from '../services/productApi';

export const useProduct = (slug) => {
    return useQuery({
        queryKey: ['product', slug],
        queryFn: () => getProductBySlug(slug),
        staleTime: 10 * 60 * 1000, // 10 minutes
        enabled: !!slug,
        select: (data) => data?.product || data || null,
    });
};
