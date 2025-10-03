'use client'
import { FiPhoneOutgoing } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { CiLinkedin, CiTwitter } from "react-icons/ci";
import { AiOutlineYoutube } from "react-icons/ai";

import logo from "@/assets/images/common/logo200.png";
import { Container, PrimaryButton, ProfileCard, Title } from "@/app/common/Design";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function Footer ()  {
  const pathname = usePathname()
  const isHomePage = pathname === "/";
  return (
    
      <footer className=" relative bg-primary py-16 mt-16">
        {isHomePage && <div className="bg-white w-full py-20 -mt-10 rounded-b-[40px] z-10 absolute top-0"></div>}

        <Container className={`${isHomePage ? "mt-32" : "mt-0"} flex flex-col md:flex-row justify-between gap-12`}>
          <div className="w-full md:w-1/3">
            <Image src={logo} className="w-40"  alt="logo" />
            <br />
            <p className="text-gray-300">Nos solutions innovantes sont conçues pour optimiser les rendements et favoriser une agriculture durable.</p>
            <div className="bg-gray-300 h-[1px] my-8"></div>
            <Title className=" font-normal text-gray-300">Recevez les dernières mises à jour sur nos engrais</Title>
            <div className="flex items-center justify-between mt-5">
              <input type="text" placeholder="Enter your email" className="w-full h-full p-3.5 py-[15px] text-sm border-none bg-white outline-none rounded-l-md" />
              <PrimaryButton className="rounded-none py-3.5 px-8 text-sm cursor-pointer rounded-r-md">Envoyer</PrimaryButton>
            </div>
            <p className="text-gray-300 text-sm mt-3">Email sécurisé. Pas de spam.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full md:w-2/3">
            <div>
             <Link href='/all-products'> <Title level={5} className="text-white font-normal">
              Produits
              </Title></Link>
              <ul className="flex flex-col gap-5 mt-8 text-gray-200">
                <p>Actifert</p>
                <p>Hexaboost</p>
                <p>Hexagel</p>
                <p>Hexabeads</p>
                <p>Hexaraw</p>
                <p>Hexasol</p>
               
              
              </ul>
            </div>
            <div>
              <Title level={5} className="text-white font-normal">
              À propos
              </Title>
              <ul className="flex flex-col gap-5 mt-8 text-gray-200">
                <p>Qui sommes-nous ?</p>
               {/* <p>Aide</p>*/}
                <p>Livraison</p>
                <p>Comment passer une commande</p>
                {/*<p>Loading...</p>*/}
               
                {/*<p>Portail des collaborateurs</p>*/}
              </ul>
            </div>
            <div>
              <Title level={5} className="text-white font-normal">
              Nous vous aidons
              </Title>
              <ul className="flex flex-col gap-5 mt-8 text-gray-200">
                <p>services</p>
                {/*<p>Sécurité</p>*/}
                <Link href='/formule'><p>Composer sa formule</p></Link>
                <Link href='/' onClick={() => window.scroll(0,0)}><p>Contactez-nous</p></Link>
                <p>Aide et FAQ</p>
              </ul>
            </div>
            <div>
              <Title level={5} className="text-white font-normal">
              Suivez-nous
              </Title>
              <ul className="flex flex-col gap-5 mt-8 text-gray-200">
                <div className="flex items-center gap-2">
                  <FiPhoneOutgoing size={19} />
                  <span>(213) 775-085609</span>
                </div>
                {/*<div className="flex items-center gap-2">
                  <MdOutlineAttachEmail size={22} />
                  <span>hexagrow@hexagrow-indus.com</span>
                </div>*/}
                <div className="flex items-center gap-2">
                  <IoLocationOutline size={22} />
                  <span>Promotion Médibat <br /> N° 02 RDC 2 N°11 Dist. <br /> 48 El Bouni Annaba</span>
                </div>
              </ul>
              <div className="flex items-center mt-5 gap-5">
               
                <ProfileCard className="bg-white">
                  <a href="https://www.facebook.com/profile.php?id=61569518152567"><FaFacebook size={22} /></a>
                </ProfileCard>
                <ProfileCard className="bg-white">
                  <a href="https://www.linkedin.com/company/hexagrow/"><CiLinkedin size={22} /></a>
                </ProfileCard>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    
  );
};

export default Footer