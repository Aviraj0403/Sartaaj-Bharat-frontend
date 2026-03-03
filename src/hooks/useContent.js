import { useQuery } from '@tanstack/react-query';
import { getBanners, getSections } from '../services/contentApi';

export const useBanners = () => {
    return useQuery({
        queryKey: ['banners'],
        queryFn: getBanners,
        staleTime: 60 * 60 * 1000, // 1 hour
    });
};

export const useSections = () => {
    return useQuery({
        queryKey: ['sections'],
        queryFn: getSections,
        staleTime: 60 * 60 * 1000,
    });
};
