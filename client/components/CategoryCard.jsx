import Image from "next/image";

const { Title } = require("@/app/common/Design");

function CategoryCard({ item }) {
  return (
    <div className="flex items-center flex-col gap-2 py-8 rounded-lg bg-green_1000 shadow-s1">
      <div className="h-24">
        <Image
          src={item.image}
          width={96}
          height={96}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      <Title level={6} className=" uppercase">
        {item.title}
      </Title>
    </div>
  );
}

export default CategoryCard;
