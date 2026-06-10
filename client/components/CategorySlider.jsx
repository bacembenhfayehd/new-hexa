"use client";
import { Container, Heading } from "@/app/common/Design";
import { categorylists } from "@/assets/data";
import Link from "next/link";
import CategoryCard from "./CategoryCard";

function CategorySlider() {
  return (
    <>
      <section className="catgeory-slider pb-16">
        <Container>
          <Heading
            title=" Parcourir les catégories"
            subtitle="Catégories les plus vues et les plus vendues de tous les temps"
          />
          
          <div className="flex flex-wrap justify-center gap-5 my-8">
            {categorylists.map((item) => (
              <Link
                key={item.id}  // ✅ Key ici sur Link
                href={`/products/${encodeURIComponent(item.title)}`}  // ✅ Encoder l'URL
                onClick={() => window.scrollTo(0, 0)}
                className="block w-[calc((100%_-_20px)/2)] md:w-[calc((100%_-_120px)/7)] hover:scale-105 transition-transform duration-200"
              >
                <CategoryCard item={item} />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export default CategorySlider;