import Axios from '../utils/Axios';

/**
 * Fetch all active banners
 * GET /v1/api/content/banners
 */
export const getBanners = async () => {
    try {
        const response = await Axios.get('/content/banners');
        if (response.data && response.data.success) {
            return response.data.banners || [];
        }
        return [];
    } catch (error) {
        console.error('Error fetching banners:', error);
        return [];
    }
};

/**
 * Fetch all active homepage sections
 * GET /v1/api/content/sections
 */
export const getSections = async () => {
    try {
        const response = await Axios.get('/content/sections');
        if (response.data && response.data.success) {
            return response.data.sections || [];
        }
        return [];
    } catch (error) {
        console.error('Error fetching sections:', error);
        return [];
    }
};
