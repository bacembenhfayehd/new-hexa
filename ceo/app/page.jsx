"use client";
import React, { useContext, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { AdminContext } from "@/context/AdminContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [category, setCategory] = useState("Actifert");
  const [price, setPrice] = useState("");
  
  // Complex data arrays
  const [benefices, setBenefices] = useState([""]);
  const [caracteristiques, setCaracteristiques] = useState([{ element: "", value: "", unit: "" }]);
  const [composition, setComposition] = useState([{ element: "", value: "", unit: "%" }]);
  const [recommendations, setRecommendations] = useState([{ type: "", value: "" }]);

  const { createProduct } = useContext(AdminContext);

  // Helper functions for managing arrays
  const addBenefice = () => setBenefices([...benefices, ""]);
  const removeBenefice = (index) => setBenefices(benefices.filter((_, i) => i !== index));
  const updateBenefice = (index, value) => {
    const updated = [...benefices];
    updated[index] = value;
    setBenefices(updated);
  };

  const addCaracteristique = () => setCaracteristiques([...caracteristiques, { element: "", value: "", unit: "" }]);
  const removeCaracteristique = (index) => setCaracteristiques(caracteristiques.filter((_, i) => i !== index));
  const updateCaracteristique = (index, field, value) => {
    const updated = [...caracteristiques];
    updated[index][field] = value;
    setCaracteristiques(updated);
  };

  const addComposition = () => setComposition([...composition, { element: "", value: "", unit: "%" }]);
  const removeComposition = (index) => setComposition(composition.filter((_, i) => i !== index));
  const updateComposition = (index, field, value) => {
    const updated = [...composition];
    updated[index][field] = value;
    setComposition(updated);
  };

  const addRecommendation = () => setRecommendations([...recommendations, { type: "", value: "" }]);
  const removeRecommendation = (index) => setRecommendations(recommendations.filter((_, i) => i !== index));
  const updateRecommendation = (index, field, value) => {
    const updated = [...recommendations];
    updated[index][field] = value;
    setRecommendations(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validFiles = files.filter(
      (file) => file !== null && file !== undefined
    );
    
    const productData = {
      name,
      shortDescription,
      detailedDescription,
      category,
      price,
      stock,
      benefices: JSON.stringify(benefices.filter(b => b.trim() !== "")),
      caracteristiques: JSON.stringify(caracteristiques.filter(c => c.element.trim() !== "" && c.value.trim() !== "")),
      composition: JSON.stringify(composition.filter(c => c.element.trim() !== "" && c.value.trim() !== "")),
      recommendations: JSON.stringify(recommendations.filter(r => r.type.trim() !== "" && r.value.trim() !== ""))
    };

    toast.promise(
      createProduct(productData, validFiles),
      {
        loading: 'Création du produit en cours...',
        success: 'Produit créé avec succès!',
        error: (err) => {
          if (err.response?.data?.data?.errors) {
            const errorMessages = err.response.data.data.errors
              .map(error => `${error.field}: ${error.message}`)
              .join('\n');
            
            return `Erreurs de validation:\n${errorMessages}`;
          }
          
          return `Erreur: ${err.message}`;
        }
      }
    ).then(() => {
      setFiles([]);
      setName("");
      setShortDescription("");
      setDetailedDescription("");
      setCategory("Actifert");
      setPrice("");
      setStock("");
      setBenefices([""]);
      setCaracteristiques([{ element: "", value: "", unit: "" }]);
      setComposition([{ element: "", value: "", unit: "%" }]);
      setRecommendations([{ type: "", value: "" }]);
    }).catch(() => {
      
    });
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Images</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                <Image
                  key={index}
                  className="max-w-24 cursor-pointer"
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Nom du produit
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="produit"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="short-description">
            Description courte
          </label>
          <textarea
            id="short-description"
            rows={2}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Description courte du produit"
            onChange={(e) => setShortDescription(e.target.value)}
            value={shortDescription}
            required
          ></textarea>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="detailed-description">
            Description détaillée
          </label>
          <textarea
            id="detailed-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Description détaillée du produit"
            onChange={(e) => setDetailedDescription(e.target.value)}
            value={detailedDescription}
            required
          ></textarea>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Categorie
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
            >
              <option value="Actifert">Actifert</option>
              <option value="Hexaboost">Hexaboost</option>
              <option value="Hexabeads">Hexabeads</option>
              <option value="Hexagel">Hexagel</option>
              <option value="Hexaraw">Hexaraw</option>
              <option value="Hexasol">Hexasol</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Prix
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Stock
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
              required
            />
          </div>
        </div>

        {/* Bénéfices Section */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium">Bénéfices</label>
          {benefices.map((benefice, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Bénéfice"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 flex-1"
                value={benefice}
                onChange={(e) => updateBenefice(index, e.target.value)}
              />
              {benefices.length > 1 && (
                <button type="button" onClick={() => removeBenefice(index)} className="px-3 py-2 bg-red-500 text-white rounded">×</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addBenefice} className="px-4 py-2 bg-blue-500 text-white rounded self-start">+ Ajouter bénéfice</button>
        </div>

        {/* Caractéristiques Section */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium">Caractéristiques</label>
          {caracteristiques.map((carac, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Élément"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 flex-1"
                value={carac.element}
                onChange={(e) => updateCaracteristique(index, 'element', e.target.value)}
              />
              <input
                type="text"
                placeholder="Valeur"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 flex-1"
                value={carac.value}
                onChange={(e) => updateCaracteristique(index, 'value', e.target.value)}
              />
              <input
                type="text"
                placeholder="Unité"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-20"
                value={carac.unit}
                onChange={(e) => updateCaracteristique(index, 'unit', e.target.value)}
              />
              {caracteristiques.length > 1 && (
                <button type="button" onClick={() => removeCaracteristique(index)} className="px-3 py-2 bg-red-500 text-white rounded">×</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addCaracteristique} className="px-4 py-2 bg-blue-500 text-white rounded self-start">+ Ajouter caractéristique</button>
        </div>

        {/* Composition Section */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium">Composition</label>
          {composition.map((comp, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Élément"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 flex-1"
                value={comp.element}
                onChange={(e) => updateComposition(index, 'element', e.target.value)}
              />
              <input
                type="text"
                placeholder="Valeur"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 flex-1"
                value={comp.value}
                onChange={(e) => updateComposition(index, 'value', e.target.value)}
              />
              <input
                type="text"
                placeholder="Unité"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-20"
                value={comp.unit}
                onChange={(e) => updateComposition(index, 'unit', e.target.value)}
              />
              {composition.length > 1 && (
                <button type="button" onClick={() => removeComposition(index)} className="px-3 py-2 bg-red-500 text-white rounded">×</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addComposition} className="px-4 py-2 bg-blue-500 text-white rounded self-start">+ Ajouter composition</button>
        </div>

        {/* Recommandations Section */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium">Recommandations</label>
          {recommendations.map((rec, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Type"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 flex-1"
                value={rec.type}
                onChange={(e) => updateRecommendation(index, 'type', e.target.value)}
              />
              <input
                type="text"
                placeholder="Valeur"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 flex-1"
                value={rec.value}
                onChange={(e) => updateRecommendation(index, 'value', e.target.value)}
              />
              {recommendations.length > 1 && (
                <button type="button" onClick={() => removeRecommendation(index)} className="px-3 py-2 bg-red-500 text-white rounded">×</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addRecommendation} className="px-4 py-2 bg-blue-500 text-white rounded self-start">+ Ajouter recommandation</button>
        </div>

        <button
          type="submit"
          className="px-8 py-2.5 bg-green-600 text-white font-medium rounded"
        >
          Ajouter
        </button>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default AddProduct;