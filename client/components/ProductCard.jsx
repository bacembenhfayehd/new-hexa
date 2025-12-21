
import Image from "next/image";
import { Caption, PrimaryButton, Title } from "@/app/common/Design";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const { addToCart} = useAppContext();
  const router = useRouter();
  const [stockLabel, setStockLabel] = useState("");
  const [stockStatus, setStockStatus] = useState(""); // Ajout d'un état pour le statut
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    const result = await addToCart(product._id, 1);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (product.stock === 0) {
      setStockLabel("Rupture");
      setStockStatus("rupture"); // Définir le statut comme rupture
    } else {
      setStockLabel("En stock");
      setStockStatus("enStock"); // Définir le statut comme en stock
    }
  }, [product.stock]);

  return (
    <>
      {/* Card compacte avec hover effect moderne */}
      <div className="group bg-white rounded-lg p-3 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col min-w-0 overflow-hidden">
        {/* Container image compact */}
        <div
          onClick={() => {
            router.push(`/product/${product._id}`);
            window.scrollTo(0, 0);
          }}
          className="relative overflow-hidden rounded-lg mb-3"
        >
          <div className="aspect-square relative">
            <Image
              src={product.images && product.images[0]?.url}
              alt={product?.name}
              loading="lazy"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="absolute top-2 left-2 z-10">
  {stockStatus === "rupture" ? (
    <Caption className="text-red-700 bg-red-50 border border-red-200 px-3 py-1 text-sm font-medium rounded-full shadow-sm">
      {stockLabel}
    </Caption>
  ) : (
    <Caption className="text-green-700 bg-green-50 border border-green-200 px-3 py-1 text-sm font-medium rounded-full shadow-sm">
      {stockLabel}
    </Caption>
  )}
</div>
        </div>

        {/* Contenu simplifié */}
        <div className="space-y-3 min-w-0">
          <div className="min-w-0 w-full">
            <Title
              level={6}
               className="uppercase text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors duration-300 truncate w-full block"
            >
              {product.name}
            </Title>
          </div>

          {/* Bouton unique centré */}
          <div className="pt-1 w-full min-w-0">
            <PrimaryButton onClick={() => handleAddToCart(product._id)} className="w-full rounded-lg py-2 text-sm font-medium transition-all cursor-pointer duration-300 hover:scale-105 min-w-0 whitespace-nowrap flex items-center justify-center">
              Panier
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
