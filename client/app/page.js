import CategorySlider from "@/components/CategorySlider";
import Certifications from "@/components/Certifications";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import ProductList from "@/components/ProductList";
import Trust from "@/components/Trust";


export default function Home() {
  return (
    <div>
    <Hero/>
    <CategorySlider/>
    <ProductList/>
    <Process/>
    <Certifications/>
    <Trust/>
    </div>
  );
}
