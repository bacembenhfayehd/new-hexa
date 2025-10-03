'use client'
import { Container, Heading } from "@/app/common/Design";
import { productlists } from "@/assets/data";
import ProductCard from "./ProductCard";

import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";

function ProductList() {
  const {getAllProducts} = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts();
      const allProducts = response?.data?.products || response?.products || [];
      setProducts(allProducts.slice(0, 10));
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

  return (
    <>
      <section className="product-home">
        <Container>
          <Heading
            title="Les nouveaux produits"
            subtitle="Explorez le meilleur et le plus grand marché de produits agricoles avec nos engrais de qualité. Nous souhaitons contribuer à votre réussite, à votre succès et à votre croissance future."
          />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-8">
            {products?.slice(0, 8)?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export default ProductList;
