import { useQuery } from '@tanstack/react-query';
import { getMiniProducts, getProductBySlug } from '../services/productApi';

export const useProducts = (params = {}) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => getMiniProducts(
            params.page || 1,
            params.limit || 10,
            params.search || '',
            params.category || '',
            params.isHotProduct || '',
            params.isBestseller || '',
            params.isFeatured || '',
            params.isCombo || ''
        ),
        staleTime: 5 * 60 * 1000, // 5 minutes
        keepPreviousData: true,
    });
};

export const useProductDetail = (slug) => {
    return useQuery({
        queryKey: ['product', slug],
        queryFn: () => getProductBySlug(slug),
        enabled: !!slug,
        staleTime: 10 * 60 * 1000,
    });
};
