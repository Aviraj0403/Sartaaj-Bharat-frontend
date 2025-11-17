import Axios from '../utils/Axios';

export const getMenuCategories = async () => {
  try {
    const response = await Axios.get('/category/getMenuCategories');
    if (response.data.success) {
      return response.data.categories;
    } else {
      throw new Error('Failed to fetch categories');
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
