import { Container, Heading } from "@/app/common/Design";
import { trustList } from "@/assets/data";
import Image from "next/image";


function Trust (){
  return (
    <>
      <section className="process py-12 relative z-10">
        <Container>
          <Heading
            title="Les entreprises qui nous font confiance"
            subtitle="Découvrez le meilleur et le plus grand marché  grâce à nos produits. Nous voulons contribuer à votre bonheur, à votre réussite et à votre croissance future."
          />

          <div className="content grid grid-cols-3 md:grid-cols-7 gap-5 mt-8">
            {trustList.map((item, index) => (
              <div key={index} className="flex items-center justify-between  rounded-lg">
                <div className="flex items-center justify-center">
                  <Image src={item.profile} alt={item.profile} className="w-full h-full rounded-full object-contain flex items-center justify-center" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Trust