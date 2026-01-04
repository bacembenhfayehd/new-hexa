'use client'
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { AiOutlinePropertySafety } from "react-icons/ai";
import PropTypes from "prop-types";
import { CiCirclePlus } from "react-icons/ci";
import CountUp from "react-countup";
import {useState, useEffect, useRef } from "react";


export const User1 = "https://cdn-icons-png.flaticon.com/128/6997/6997662.png";
export const User2 = "https://cdn-icons-png.flaticon.com/128/236/236832.png";
export const User3 = "https://cdn-icons-png.flaticon.com/128/236/236831.png";
export const User4 = "https://cdn-icons-png.flaticon.com/128/1154/1154448.png";
import header from '@/assets/images/common/artboard-1.webp'
import { Body, Caption, Container, PrimaryButton, ProfileCard, Title } from "@/app/common/Design";


function Hero (){
  
  return (
    <>
      <section className="hero bg-primary pt-24 md:pt-8 pb-8">
        <Container className="flex items-center justify-between md:flex-row flex-col">
          <div className="w-full md:w-1/2 text-white pr-12">
            <Title level={3} className="text-white">
            Grow more with less — fertilize smart
            </Title>
            <Body className="leading-7 text-gray-200 my-8">
            Engagée pour un avenir durable et la sécurité alimentaire, HexaGrow innove pour relever les défis agricoles d'aujourd'hui et de demain.
            </Body>
           
            <div className="flex items-center gap-8 my-8">
              <div>
                <Title level={4} className=" text-white">
                <CountUp end={160} duration={2}  />
                </Title>
                <Body className="leading-7 text-gray-200">Total des produits</Body>
              </div>
              <div>
                <Title level={4} className=" text-white">
                <CountUp end={842} duration={2} suffix="M" />
                </Title>
                <Body className="leading-7 text-gray-200">Total des ventes</Body>
              </div>
              <div>
                <Title level={4} className=" text-white">
                <CountUp end={6} duration={1} />
                </Title>
                <Body className="leading-7 text-gray-200">Total des catégories</Body>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 my-16 relative py-16">
            <Image src={header}  alt="" />
            <div className="horiz-move absolute md:top-28 top-8 left-0">
              <Box title="Une preuve de qualité" />
            </div>
            <div className="horiz-move absolute bottom-72 right-0">
              <Box title="Sûr et sécurisé"  />
            </div>

            <div className="px-5 py-4 bg-white shadow-md flex items-center gap-5 rounded-xl ml-5 -mt-5 vert-move w-1/2">
              <Title>58K de clients satisfaits</Title>
              <div className="flex items-center">
                <ProfileCard className="border-2 border-white">
                  <img src={User1} alt="User1" className="w-full h-full object-cover" />
                </ProfileCard>
                <ProfileCard className="border-2 border-white -ml-4">
                  <img src={User2} alt="User1" className="w-full h-full object-cover" />
                </ProfileCard>
                <ProfileCard className="border-2 border-white -ml-4">
                  <img src={User3} alt="User1" className="w-full h-full object-cover" />
                </ProfileCard>
                <ProfileCard className="border-2 border-white -ml-4">
                  <img src={User4} alt="User1" className="w-full h-full object-cover" />
                </ProfileCard>

                <ProfileCard className="border-2 border-white -ml-4">
                  <CiCirclePlus size={27} />
                </ProfileCard>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <div className="bg-white w-full py-16 -mt-10 rounded-t-[40px]"></div>
    </>
  );
};

export default Hero

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  


  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filteredProducts = products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.Shortdescription && product.Shortdescription.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setSearchResults(filteredProducts);
    setShowResults(true);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

 
  const handleProductClick = (productId) => {
    navigate(`/details/${productId}`)
    setShowResults(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <form className="" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-800 sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-2 flex items-center ps-3 pointer-events-none">
            <IoIosSearch color="black" size={25} />
          </div>
          <input 
            type="search" 
            id="default-search" 
            className="block shadow-md w-full p-6 ps-16 text-sm text-gray-800 rounded-full bg-gray-50 outline-none" 
            placeholder="Rechercher un produit..." 
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <PrimaryButton className="absolute end-2.5 bottom-2" onClick={() => setShowResults(true)}>
            Rechercher
          </PrimaryButton>
        </div>
      </form>

      
      {showResults && searchResults.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-lg">Résultats de recherche</h3>
            <span className="text-sm text-gray-500">{searchResults.length} produit(s) trouvé(s)</span>
          </div>
          <ul>
            {searchResults.map((product) => (
              <li 
                key={product._id} 
                className="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="flex items-center p-4 border-b border-gray-100">
                  {product.image && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                      <img 
                        src={`http://localhost:5000${product.image}`} 
                        alt={product.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-900">{product.title}</h4>
                    {product.category && (
                      <span className="inline-block bg-green-100 text-gray-800 text-xs px-2 py-1 rounded-full mr-2">
                        {product.category}
                      </span>
                    )}
                    {product.newprice && (
                      <div className="flex items-center mt-1">
                        <span className="font-bold text-primary">{product.newprice} €</span>
                        {product.oldprice && product.oldprice > product.newprice && (
                          <span className="text-gray-500 line-through ml-2">{product.oldprice} €</span>
                        )}
                      </div>
                    )}
                    {product.Shortdescription && (
                      <p className="text-sm text-gray-600 mt-1 truncate">{product.Shortdescription}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-3 text-center border-t border-gray-200">
            <button 
              className="text-primary hover:underline font-medium"
              onClick={() => setShowResults(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}


      {showResults && searchTerm.trim() !== "" && searchResults.length === 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-gray-500 mb-2">
            <IoIosSearch size={40} className="mx-auto text-gray-400" />
          </div>
          <h4 className="font-medium text-lg text-gray-900">Aucun résultat trouvé</h4>
          <p className="text-gray-600 mt-1">
            Essayez avec d'autres mots-clés ou consultez notre catalogue complet.
          </p>
          <button 
            className="mt-4 text-primary hover:underline font-medium"
            onClick={() => setShowResults(false)}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

SearchBox.propTypes = {
  products: PropTypes.array.isRequired
};

const Box = ({ title, desc }) => {
  return (
    <>
      <div className="px-5 py-4 bg-white shadow-md flex items-center gap-5 rounded-xl w-auto">
        <div className="w-14 h-14 bg-green_100 flex items-center justify-center rounded-full">
          <AiOutlinePropertySafety size={27} className="text-primary" />
        </div>
        <div>
          <Title>{title}</Title>
          <Caption>{desc}</Caption>
        </div>
      </div>
    </>
  );
};

Box.propTypes = {
  title: PropTypes.any,
  desc: PropTypes.any,
};