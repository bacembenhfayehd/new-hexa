'use client'
import React, { useContext, useEffect, useState } from "react";
import { Container, Heading } from "@/app/common/Design";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";

function Products() {
  const { getAllProducts } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts();
      const allProducts = response?.data?.products || response?.products || [];
      setProducts(allProducts);
    } catch (error) {
      console.error("Erreur:", error.message);
      toast.error(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!products) {
    return <Loading/>
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <div>Aucun produit trouvé</div>;
  }
  const filteredProducts = products.filter((product) => {
    if (product.category) {
      return product.category.toLowerCase() === category.toLowerCase();
    }
    return false; // skip products without category
  });
  return (
    <>
      <section className="py-40">
        <Container>
          <Heading
            title="Vente en direct"
            subtitle="Explorez le meilleur et le plus grand marché de produits agricoles avec nos engrais de qualité. Nous souhaitons contribuer à votre réussite, à votre succès et à votre croissance future."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 my-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))
            ) : (
              <div>Aucun produit trouvé pour cette catégorie</div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

export default Products;
