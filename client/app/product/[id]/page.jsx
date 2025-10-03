"use client";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { useAppContext } from "@/context/AppContext";
import { useParams } from "next/navigation";
import { Body, Caption, Container, Title } from "../../common/Design";
import ProductImageZoom from "@/components/ProductImageZoom";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

function Product() {
  const [activeTab, setActiveTab] = useState("description");
  const { products = [], router, addToCart, getAllProducts } = useAppContext();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();

  const fetchProductData = useCallback(async () => {
    setLoading(true);
    try {
      const productArray = Array.isArray(products) ? products : [];

      // Recherche dans les produits existants
      let product = productArray.find((p) => String(p?._id) === String(id));

      // Si non trouvé, fetch depuis l'API
      if (!product) {
        const response = await getAllProducts();
        const apiProducts = Array.isArray(response)
          ? response
          : response.products || [];
        product = apiProducts.find((p) => p?._id === id);
      }

      if (product) {
        setProductData(product);
        setMainImage(product.images?.[0]?.url || "/placeholder.jpg");
      } else {
        router.push("/404"); // Redirection si produit non trouvé
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProductData();
    }
  }, [id, fetchProductData]);

  const handleAddToCart = async () => {
    setLoading(true);
    const result = await addToCart(productData._id, 1);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Helper function to get characteristic value
  const getCharacteristic = (element) => {
    return (
      productData.caracteristiques?.find((c) => c.element === element)?.value ||
      null
    );
  };

  

  return productData ? (
    <section className="pt-24 px-4 sm:px-6 lg:px-8">
      <Container>
        {/* Main Product Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-8">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="h-[50vh] sm:h-[60vh] lg:h-[70vh]">
              <ProductImageZoom
                imageUrl={mainImage || productData.images?.[0]?.url}
              />
            </div>
            
            {/* Enhanced Thumbnails Section */}
            {productData.images && productData.images.length > 1 && (
              <div className="mt-4">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {productData.images.map((image, index) => (
                    <button
                      key={image._id || index}
                      onClick={() => setMainImage(image.url)}
                      className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:border-green-400 hover:shadow-lg transform hover:scale-105 ${
                        mainImage === image.url 
                          ? 'border-green-500 ring-2 ring-green-200 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || `Image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300"
                        sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                      />
                      {/* Active indicator */}
                      {mainImage === image.url && (
                        <div className="absolute inset-0 bg-green-500 bg-opacity-10 flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Image counter for mobile */}
                <div className="flex justify-center mt-2 sm:hidden">
                  <Caption className="text-xs text-gray-500">
                    {productData.images.findIndex(img => img.url === mainImage) + 1} / {productData.images.length}
                  </Caption>
                </div>
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
            <Title level={2} className="capitalize text-xl sm:text-2xl lg:text-3xl">
              {productData.name}
            </Title>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-2">
              <div className="flex text-green">
                <IoIosStar size={18} className="sm:w-5 sm:h-5" />
                <IoIosStar size={18} className="sm:w-5 sm:h-5" />
                <IoIosStar size={18} className="sm:w-5 sm:h-5" />
                <IoIosStarHalf size={18} className="sm:w-5 sm:h-5" />
                <IoIosStarOutline size={18} className="sm:w-5 sm:h-5" />
              </div>
              <Caption className="text-sm">(2 customer reviews)</Caption>
            </div>
            
            <div className="mt-4">
              <Body className="text-sm sm:text-base leading-relaxed">{productData.shortDescription}</Body>
            </div>
            
            <div className="mt-4 space-y-3">
              <Title className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-base sm:text-lg">
                Category: <Caption className="text-sm sm:text-base">{productData.category}</Caption>
              </Title>
              
              {getCharacteristic("Apparence") && (
                <Title className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-base sm:text-lg">
                  Apparence: <Caption className="text-sm sm:text-base">{getCharacteristic("Apparence")}</Caption>
                </Title>
              )}
              
              {getCharacteristic("Couleur") && (
                <Title className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-base sm:text-lg">
                  Couleur: <Caption className="text-sm sm:text-base">{getCharacteristic("Couleur")}</Caption>
                </Title>
              )}
              
              {getCharacteristic("pH") && (
                <Title className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-base sm:text-lg">
                  pH: <Caption className="text-sm sm:text-base">{getCharacteristic("pH")}</Caption>
                </Title>
              )}
              
              {getCharacteristic("Densité") && (
                <Title className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-base sm:text-lg">
                  Densité:
                  <Caption className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                    {getCharacteristic("Densité")}
                  </Caption>
                </Title>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-6">
              <button
                onClick={() => handleAddToCart(productData._id)}
                className={`${
                  productData.stock === 0
                    ? "hidden"
                    : "py-3 px-6 sm:px-8 rounded-lg bg-gray-400 text-gray-700 cursor-pointer hover:bg-gray-200 transition text-sm sm:text-base"
                }`}
              >
                Ajouter au panier
              </button>
              
              <button
                onClick={() => {
                  addToCart(productData._id);
                  router.push("/cart");
                }}
                disabled={productData?.stock === 0}
                className={`w-full sm:flex-1 py-3 sm:py-3.5 transition text-sm sm:text-base ${
                  productData?.stock === 0
                    ? "px-6 sm:px-8 rounded-lg bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "px-6 sm:px-8 rounded-lg bg-green text-white cursor-pointer hover:bg-green-600"
                }`}
              >
                {productData?.stock === 0 ? "Rupture de stock" : "Acheter"}
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="details mt-8 lg:mt-12">
          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-5 overflow-x-auto pb-2">
            <button
              className={`flex-shrink-0 rounded-md px-4 sm:px-6 lg:px-10 py-3 lg:py-4 text-black shadow-s3 text-sm sm:text-base transition-colors ${
                activeTab === "description" ? "bg-green text-white" : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => handleTabClick("description")}
            >
              Description
            </button>
            
            <button
              className={`flex-shrink-0 rounded-md px-4 sm:px-6 lg:px-10 py-3 lg:py-4 text-black shadow-s3 text-sm sm:text-base transition-colors ${
                activeTab === "moreProducts"
                  ? "bg-green text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => handleTabClick("moreProducts")}
            >
              Bénéfices
            </button>
            
            <button
              className={`flex-shrink-0 rounded-md px-4 sm:px-6 lg:px-10 py-3 lg:py-4 text-black shadow-s3 text-sm sm:text-base transition-colors ${
                activeTab === "auctionHistory"
                  ? "bg-green text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => handleTabClick("auctionHistory")}
            >
              <span className="hidden sm:inline">Recommandations et dosage</span>
              <span className="sm:hidden">Dosage</span>
            </button>
            
            
          </div>

          {/* Tab Content */}
          <div className="tab-content mt-6 lg:mt-8">
            {activeTab === "description" && (
              <div className="description-tab shadow-s3 p-4 sm:p-6 lg:p-8 rounded-md">
                <Title level={4} className="text-lg sm:text-xl">Description</Title>
                <div className="mt-4">
                  <Caption className="leading-6 sm:leading-7 text-sm sm:text-base">
                    {productData.detailedDescription}
                  </Caption>
                </div>
                
                {productData.composition && productData.composition.length > 0 && (
                  <div className="mt-6 lg:mt-8">
                    <Title level={4} className="text-lg sm:text-xl mb-4">Composition</Title>
                    
                    <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-8">
                      {/* Composition Table */}
                      <div className="w-full lg:w-1/2">
                        <div className="overflow-x-auto">
                          <div className="min-w-full">
                            <div className="flex justify-between border-b py-3 bg-gray-50 px-2 rounded-t-lg">
                              <Title className="text-sm sm:text-base">Éléments nutritifs</Title>
                              <Caption className="text-sm sm:text-base">Valeur</Caption>
                            </div>
                            
                            {productData.composition.map((comp) => (
                              <div
                                key={comp._id}
                                className="flex justify-between border-b py-3 px-2 hover:bg-gray-25 transition-colors"
                              >
                                <Title className="text-sm sm:text-base capitalize">{comp.element}</Title>
                                <Caption className="text-sm sm:text-base font-medium">
                                  {comp.value}{comp.unit}
                                </Caption>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Product Image */}
                      <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                        <div className="h-48 sm:h-64 lg:h-[60vh] p-2 bg-green rounded-xl">
                          <Image
                            src={productData.images?.[0]?.url || "/placeholder.jpg"}
                            alt={productData.name}
                            width={500}
                            height={400}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "auctionHistory" && (
              <AuctionHistory productData={productData} />
            )}

            {activeTab === "moreProducts" && (
              <div className="more-products-tab shadow-s3 p-4 sm:p-6 lg:p-8 rounded-md">
                {productData.benefices && productData.benefices.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {productData.benefices.map((benefit, index) => (
                      <li key={index} className="text-sm sm:text-base leading-relaxed">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h1 className="text-center text-gray-500 py-8">Aucune information positive disponible</h1>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  ) : (
    <Loading />
  );
}

export default Product;

export const AuctionHistory = ({ productData }) => {
  return (
    <div className="shadow-s1 p-4 sm:p-6 lg:p-8 rounded-lg">
      <Title level={5} className="font-normal text-lg sm:text-xl">
        Recommandations et dosage
      </Title>
      <hr className="my-4 lg:my-5" />

      {productData.recommendations && productData.recommendations.length > 0 ? (
        <div className="relative overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-3 sm:px-6 py-3 sm:py-5">
                  Type
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3">
                  Recommandation
                </th>
              </tr>
            </thead>
            <tbody>
              {productData.recommendations.map((rec) => (
                <tr
                  key={rec._id}
                  className="bg-white border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 sm:px-6 py-4 font-medium text-xs sm:text-sm">{rec.type}</td>
                  <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm">{rec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">Aucune recommandation disponible</p>
      )}
    </div>
  );
};