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

          <div className="content trust-marquee-mask overflow-hidden mt-8">
            <div className="trust-marquee gap-5 md:gap-10">
              {[...trustList, ...trustList].map((item, index) => (
                <div key={index} className="flex items-center justify-center shrink-0 w-[90px] md:w-[140px] rounded-lg">
                  <div className="flex items-center justify-center">
                    <Image src={item.profile} alt={item.profile} className="w-full h-full rounded-full object-contain flex items-center justify-center" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Trust