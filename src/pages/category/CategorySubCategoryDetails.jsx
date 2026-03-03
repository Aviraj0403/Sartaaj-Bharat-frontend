import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByCategoryAndSubCategorySlug } from "../../services/productApi"; // Assuming this is the correct API call
import ProductCard from "../../components/Product/ProductCard";

export default function CategorySubCategoryDetails() {
  const { categorySlug, subCategorySlug } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProductsByCategoryAndSubCategorySlug(categorySlug, subCategorySlug, page, 20);
      if (data.success) {
        setProducts(data.products);
        setPagination(data.pagination);
        setCurrentPage(page);
        setCategoryName(data.categoryName || categorySlug); // Assuming the API returns categoryName
        setSubCategoryName(data.subCategoryName || subCategorySlug); // Assuming the API returns subCategoryName
      } else {
        setError("Failed to load products");
      }
    } catch (error) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [categorySlug, subCategorySlug, currentPage]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh] text-blue-600 font-black uppercase tracking-[0.5em] italic animate-pulse">Syncing Artifacts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block italic">Topological Selection</span>
          <h2 className="text-3xl md:text-6xl font-black text-slate-950 italic uppercase tracking-tighter">
            {categoryName} <span className="text-blue-600">// {subCategoryName}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.length === 0 ? (
            <div>No products found in this category and subcategory.</div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))
          )}
        </div>

        <div className="mt-16 flex justify-center items-center gap-6">
          <button
            onClick={() => fetchProducts(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-8 py-3 bg-slate-950 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] italic disabled:opacity-20 hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            PREVIOUS
          </button>
          <span className="font-black text-xs italic text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
            {currentPage} <span className="text-blue-600">/</span> {pagination.totalPages}
          </span>
          <button
            onClick={() => fetchProducts(currentPage + 1)}
            disabled={currentPage >= pagination.totalPages}
            className="px-8 py-3 bg-slate-950 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] italic disabled:opacity-20 hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            NEXT
          </button>
        </div>
      </div>
    </section>
  );
}
