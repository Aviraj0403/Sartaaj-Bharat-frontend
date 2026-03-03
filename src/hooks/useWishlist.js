import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWishlist, addToWishlist, removeFromWishlist, checkInWishlist, clearWishlist } from '../services/wishlistApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export const useWishlist = () => {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const { data: wishlist, isLoading } = useQuery({
        queryKey: ['wishlist'],
        queryFn: getWishlist,
        enabled: isAuthenticated,
        select: (data) => data.items || [],
    });

    const addMutation = useMutation({
        mutationFn: addToWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            toast.success('Artifact added to your collection');
        },
        onError: (error) => {
            toast.error(error.message || 'Transmission failed');
        }
    });

    const removeMutation = useMutation({
        mutationFn: removeFromWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            toast.info('Artifact removed from collection');
        },
    });

    const clearMutation = useMutation({
        mutationFn: clearWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            toast.info('Collection cleared');
        },
    });

    return {
        wishlist,
        isLoading,
        addToWishlist: (productId) => addMutation.mutate(productId),
        removeFromWishlist: (productId) => removeMutation.mutate(productId),
        clearWishlist: () => clearMutation.mutate(),
        isWishlisted: (productId) => wishlist?.some(item => (item.productId?._id || item.productId) === productId)
    };
};
