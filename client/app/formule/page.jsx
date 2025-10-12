"use client";

import { useEffect, useState } from "react";
import {
  Calculator,
  Leaf,
  Package,
  Plus,
  Trash2,
  User,
  MapPin,
  CheckCircle,
  AlertCircle,
  Mail,
} from "lucide-react";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from "@/lib/emailjs-config";
import { PDFDocument } from "@/components/PDFDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";

export const Formuler = () => {
  const [composition, setComposition] = useState({
    N: 0,
    P: 0,
    K: 0,
    CaO: 0,
    MgO: 0,
    SO3: 0,
  });

  const [additionalElements, setAdditionalElements] = useState([]);
  const [cropType, setCropType] = useState("");
  const [applicationMethod, setApplicationMethod] = useState("");
  const [soilType, setSoilType] = useState("");
  const [notes, setNotes] = useState("");

  const [userInfo, setUserInfo] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [deliveryInfo, setDeliveryInfo] = useState({
    deliveryAddress: "",
    deliveryCity: "",
    deliveryPostalCode: "",
    deliveryCountry: "France",
    sameAsUserAddress: true,
    deliveryNotes: "",
  });

  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [packaging, setPackaging] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
const [submitMessage, setSubmitMessage] = useState("");

const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

useEffect(() => {
  // Initialize EmailJS
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}, []);

  const handleCompositionChange = (element, value) => {
    const numValue = Number.parseFloat(value) || 0;
    setComposition((prev) => ({
      ...prev,
      [element]: Math.min(100, Math.max(0, numValue)),
    }));
  };

  const addAdditionalElement = () => {
    const newElement = {
      id: Date.now().toString(),
      name: "",
      value: 0,
      unit: "%",
    };
    setAdditionalElements((prev) => [...prev, newElement]);
  };

  const updateAdditionalElement = (id, field, value) => {
  setAdditionalElements((prev) =>
    prev.map((element) =>
      element.id === id ? { ...element, [field]: value } : element
    )
  );
};

  const removeAdditionalElement = (id) => {
    setAdditionalElements((prev) =>
      prev.filter((element) => element.id !== id)
    );
  };

  const getTotalPercentage = () => {
    const mainElements = Object.values(composition).reduce(
      (sum, value) => sum + value,
      0
    );
    const additionalSum = additionalElements.reduce(
      (sum, element) => sum + element.value,
      0
    );
    return mainElements + additionalSum;
  };

  const generateFormula = () => {
    const { N, P, K } = composition;
    return `${N}-${P}-${K}`;
  };

  const handleUserInfoChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeliveryInfoChange = (field, value) => {
    setDeliveryInfo((prev) => ({ ...prev, [field]: value }));
  };


  const handleSubmit = async (e) => {
  if (e) e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus(null);

  // Validate required fields
  if (!userInfo.name || !userInfo.phone || !userInfo.email || !userInfo.address || !userInfo.city || !userInfo.postalCode) {
    setSubmitStatus("error");
    setSubmitMessage("Veuillez remplir tous les champs obligatoires (*)");
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  if (!quantity) {
    setSubmitStatus("error");
    setSubmitMessage("Veuillez spécifier la quantité souhaitée");
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Prepare email template parameters
  const templateParams = {
    // Client Information
    client_name: userInfo.name,
    client_company: userInfo.company || "N/A",
    client_phone: userInfo.phone,
    client_email: userInfo.email,
    client_address: userInfo.address,
    client_city: userInfo.city,
    client_postal_code: userInfo.postalCode,
    client_country: userInfo.country || "Algérie",
    
    // NPK Formula
    npk_formula: generateFormula(),
    nitrogen: composition.N,
    phosphorus: composition.P,
    potassium: composition.K,
    calcium: composition.CaO,
    magnesium: composition.MgO,
    sulfur: composition.SO3,
    
    // Additional Elements
    additional_elements: additionalElements.length > 0 
      ? additionalElements.map(el => `${el.name}: ${el.value}${el.unit}`).join(", ")
      : "Aucun",
    
    // Application Info
    crop_type: cropType || "Non spécifié",
    soil_type: soilType || "Non spécifié",
    application_method: applicationMethod || "Non spécifié",
    notes: notes || "Aucune note",
    
    // Quantity & Packaging
    quantity: quantity,
    unit: unit,
    packaging: packaging || "Non spécifié",
    delivery_date: deliveryDate || "Non spécifié",
    
    // Delivery Address
    delivery_address: deliveryInfo.sameAsUserAddress 
      ? `${userInfo.address}, ${userInfo.postalCode} ${userInfo.city}, ${userInfo.country || "Algérie"}`
      : `${deliveryInfo.deliveryAddress}, ${deliveryInfo.deliveryPostalCode} ${deliveryInfo.deliveryCity}, ${deliveryInfo.deliveryCountry}`,
    delivery_notes: deliveryInfo.deliveryNotes || "Aucune instruction",
    
    // Total composition
    total_percentage: getTotalPercentage().toFixed(1),
    
    // Timestamp
    submission_date: new Date().toLocaleString('fr-FR', {
      timeZone: 'Africa/Tunis',
      dateStyle: 'full',
      timeStyle: 'short'
    }),
  };

  try {
    // Send email
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );
    
    console.log('Email sent successfully:', response);
    setSubmitStatus("success");
    setSubmitMessage("Votre demande a été envoyée avec succès! Nous vous contacterons bientôt.");
    
    // Optional: Reset form after 3 seconds
    setTimeout(() => {
      // Uncomment if you want to clear the form
       resetForm();
    }, 3000);
    
  } catch (error) {
    console.error('Error sending email:', error);
    setSubmitStatus("error");
    setSubmitMessage("Une erreur s'est produite lors de l'envoi. Veuillez réessayer ou nous contacter directement.");
  } finally {
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Optional: Reset form function
const resetForm = () => {
  setComposition({ N: 0, P: 0, K: 0, CaO: 0, MgO: 0, SO3: 0 });
  setAdditionalElements([]);
  setCropType("");
  setApplicationMethod("");
  setSoilType("");
  setNotes("");
  setUserInfo({
    name: "",
    company: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  setDeliveryInfo({
    deliveryAddress: "",
    deliveryCity: "",
    deliveryPostalCode: "",
    deliveryCountry: "Algérie",
    sameAsUserAddress: true,
    deliveryNotes: "",
  });
  setQuantity("");
  setUnit("kg");
  setPackaging("");
  setDeliveryDate("");
  setSubmitStatus(null);
  setSubmitMessage("");
};

  return (
    <div className="fertilizer-composer ">
      <style jsx>{`
        .fertilizer-composer {
          max-width: 1200px;
          margin: 120px auto 40px auto; /* Added top and bottom margins */
          padding: 24px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
          
          min-height: auto; /* Changed from 100vh to auto */
        }

        .header {
          text-align: center;
          margin-bottom: 32px;
        }

        .header h1 {
          font-size: 2rem;
          font-weight: bold;
          color: #166534;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .header p {
          color: #64748b;
          font-size: 1rem;
        }

        .grid {
          display: grid;
          gap: 24px;
        }

        .grid-3 {
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        }

        .grid-2 {
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        }

        .card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1),
            0 1px 2px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          margin-bottom: 20px;
        }

        .card-header {
          padding: 24px 24px 0 24px;
          border-bottom: 1px solid #f1f5f9;
          margin-bottom: 24px;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #1e293b;
        }

        .card-description {
          color: #64748b;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .card-content {
          padding: 0 24px 24px 24px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 16px;
        }

        .form-group-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 16px;
        }

        .label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 6px;
          color: #374151;
        }

        .input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.875rem;
          transition: all 0.2s;
          background: white;
        }

        .input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .input-with-unit {
          position: relative;
        }

        .input-unit {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          font-size: 0.875rem;
          pointer-events: none;
        }

        .select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.875rem;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.875rem;
          resize: vertical;
          min-height: 80px;
          font-family: inherit;
          transition: all 0.2s;
        }

        .textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .button {
          padding: 10px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-decoration: none;
        }

        .button-primary {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .button-primary:hover {
          background: #2563eb;
          border-color: #2563eb;
        }

        .button-outline {
          background: white;
          color: #374151;
          border-color: #d1d5db;
        }

        .button-outline:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .button-small {
          padding: 6px 12px;
          font-size: 0.75rem;
        }

        .button-icon {
          padding: 8px;
          width: 40px;
          height: 40px;
        }

        .separator {
          height: 1px;
          background: #e5e7eb;
          margin: 20px 0;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .badge-secondary {
          background: #f1f5f9;
          color: #475569;
        }

        .badge-destructive {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        .badge-outline {
          border: 1px solid #d1d5db;
          background: white;
          font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono",
            Consolas, "Courier New", monospace;
          font-size: 1rem;
          padding: 6px 12px;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .checkbox {
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }

        .info-box {
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 8px;
          padding: 16px;
          margin-top: 16px;
        }

        .info-box h4 {
          font-weight: 500;
          color: #1e40af;
          margin-bottom: 8px;
          font-size: 0.875rem;
        }

        .info-box ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .info-box li {
          color: #1e40af;
          font-size: 0.875rem;
          margin-bottom: 4px;
        }

        .additional-element {
          display: flex;
          gap: 8px;
          align-items: end;
          margin-bottom: 12px;
        }

        .additional-element .input {
          flex: 1;
        }

        .additional-element .select {
          width: 80px;
        }

        .additional-element .input-small {
          width: 80px;
        }

        .total-percentage {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          margin-bottom: 32px;
        }

        .summary-section h4 {
          font-weight: 500;
          margin-bottom: 12px;
          color: #1e293b;
        }

        .summary-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          font-size: 0.875rem;
          color: #475569;
        }

        .summary-text {
          font-size: 0.875rem;
          line-height: 1.5;
          color: #475569;
        }

        .summary-box {
          background: #f8fafc;
          padding: 16px;
          border-radius: 8px;
          font-size: 0.875rem;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .button-group {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .button-group .button {
          flex: 1;
        }

        .formula-display {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .formula-display span {
          font-weight: 500;
          color: #1e293b;
        }

        @media (max-width: 1024px) {
          .grid-3 {
            grid-template-columns: 1fr;
          }
        }

        .notification-banner {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  max-width: 500px;
  width: 90%;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideDown 0.3s ease-out;
}

.notification-success {
  background: #5BBB7B;
  color: white;
}

.notification-error {
  background: #ef4444;
  color: white;
}

.notification-close {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 24px;
  padding: 0 4px;
  line-height: 1;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.notification-close:hover {
  opacity: 1;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button-loading {
  position: relative;
}

.button-loading::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin-left: -8px;
  margin-top: -8px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spinner 0.6s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

        @media (max-width: 768px) {
          .fertilizer-composer {
            margin: 60px 16px 32px 16px; /* Adjusted margins for mobile */
            padding: 16px;
          }

          .grid-2,
          .form-group-2,
          .form-group-3 {
            grid-template-columns: 1fr;
          }

          .button-group {
            flex-direction: column;
          }

          .summary-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>


      {/* Notification Banner */}
    {submitStatus && (
      <div className={`notification-banner notification-${submitStatus}`}>
        {submitStatus === "success" ? (
          <CheckCircle className="h-6 w-6" />
        ) : (
          <AlertCircle className="h-6 w-6" />
        )}
        <span style={{ flex: 1 }}>{submitMessage}</span>
        <button
          onClick={() => setSubmitStatus(null)}
          className="notification-close"
          aria-label="Fermer"
        >
          ×
        </button>
      </div>
    )}



      <div className="grid grid-3">
        {/* Informations utilisateur */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <User className="h-5 w-5" />
              Informations client
            </h2>
            <p className="card-description">Vos coordonnées pour la commande</p>
          </div>
          <div className="card-content">
            <div className="form-group-2">
              <div className="form-group">
                <label className="label" htmlFor="name">
                  Nom complet *
                </label>
                <input
                  id="name"
                  className="input"
                  value={userInfo.name}
                  onChange={(e) => handleUserInfoChange("name", e.target.value)}
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div className="form-group">
                <label className="label" htmlFor="company">
                  Entreprise
                </label>
                <input
                  id="company"
                  className="input"
                  value={userInfo.company}
                  onChange={(e) =>
                    handleUserInfoChange("company", e.target.value)
                  }
                  placeholder="Nom de l'entreprise"
                />
              </div>
            </div>

            <div className="form-group-2">
              <div className="form-group">
                <label className="label" htmlFor="phone">
                  Téléphone *
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="input"
                  value={userInfo.phone}
                  onChange={(e) =>
                    handleUserInfoChange("phone", e.target.value)
                  }
                  placeholder="+213 "
                  required
                />
              </div>
              <div className="form-group">
                <label className="label" htmlFor="email">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  className="input"
                  value={userInfo.email}
                  onChange={(e) =>
                    handleUserInfoChange("email", e.target.value)
                  }
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label" htmlFor="address">
                Adresse *
              </label>
              <input
                id="address"
                className="input"
                value={userInfo.address}
                onChange={(e) =>
                  handleUserInfoChange("address", e.target.value)
                }
                placeholder="Numéro et nom de rue"
                required
              />
            </div>

            <div className="form-group-3">
              <div className="form-group">
                <label className="label" htmlFor="city">
                  Ville *
                </label>
                <input
                  id="city"
                  className="input"
                  value={userInfo.city}
                  onChange={(e) => handleUserInfoChange("city", e.target.value)}
                  placeholder="Ville"
                  required
                />
              </div>
              <div className="form-group">
                <label className="label" htmlFor="postalCode">
                  Code postal *
                </label>
                <input
                  id="postalCode"
                  className="input"
                  value={userInfo.postalCode}
                  onChange={(e) =>
                    handleUserInfoChange("postalCode", e.target.value)
                  }
                  placeholder="75000"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Composition NPK */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Calculator className="h-5 w-5" />
              Composition NPK + Éléments secondaires
            </h2>
            <p className="card-description">
              Définissez les pourcentages des éléments nutritifs principaux
            </p>
          </div>
          <div className="card-content">
            <div className="form-group-3">
              <div className="form-group">
                <label className="label" htmlFor="nitrogen">
                  N (Azote)
                </label>
                <div className="input-with-unit">
                  <input
                    id="nitrogen"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="input"
                    value={composition.N}
                    onChange={(e) =>
                      handleCompositionChange("N", e.target.value)
                    }
                  />
                  <span className="input-unit">%</span>
                </div>
              </div>
              <div className="form-group">
                <label className="label" htmlFor="phosphorus">
                  P (Phosphore)
                </label>
                <div className="input-with-unit">
                  <input
                    id="phosphorus"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="input"
                    value={composition.P}
                    onChange={(e) =>
                      handleCompositionChange("P", e.target.value)
                    }
                  />
                  <span className="input-unit">%</span>
                </div>
              </div>
              <div className="form-group">
                <label className="label" htmlFor="potassium">
                  K (Potassium)
                </label>
                <div className="input-with-unit">
                  <input
                    id="potassium"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="input"
                    value={composition.K}
                    onChange={(e) =>
                      handleCompositionChange("K", e.target.value)
                    }
                  />
                  <span className="input-unit">%</span>
                </div>
              </div>
            </div>

            <div className="separator"></div>

            <div className="form-group-3">
              <div className="form-group">
                <label className="label" htmlFor="cao">
                  CaO (Calcium)
                </label>
                <div className="input-with-unit">
                  <input
                    id="cao"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="input"
                    value={composition.CaO}
                    onChange={(e) =>
                      handleCompositionChange("CaO", e.target.value)
                    }
                  />
                  <span className="input-unit">%</span>
                </div>
              </div>
              <div className="form-group">
                <label className="label" htmlFor="mgo">
                  MgO (Magnésium)
                </label>
                <div className="input-with-unit">
                  <input
                    id="mgo"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="input"
                    value={composition.MgO}
                    onChange={(e) =>
                      handleCompositionChange("MgO", e.target.value)
                    }
                  />
                  <span className="input-unit">%</span>
                </div>
              </div>
              <div className="form-group">
                <label className="label" htmlFor="so3">
                  SO₃ (Soufre)
                </label>
                <div className="input-with-unit">
                  <input
                    id="so3"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="input"
                    value={composition.SO3}
                    onChange={(e) =>
                      handleCompositionChange("SO3", e.target.value)
                    }
                  />
                  <span className="input-unit">%</span>
                </div>
              </div>
            </div>

            {/* Éléments additionnels */}
            <div className="form-group">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <label className="label">Éléments additionnels</label>
                <button
                  type="button"
                  className="button button-outline button-small"
                  onClick={addAdditionalElement}
                >
                  <Plus className="h-4 w-4" />
                  Ajouter
                </button>
              </div>

              {additionalElements.map((element) => (
                <div key={element.id} className="additional-element">
                  <input
                    className="input"
                    placeholder="Nom de l'élément"
                    value={element.name}
                    onChange={(e) =>
                      updateAdditionalElement(
                        element.id,
                        "name",
                        e.target.value
                      )
                    }
                  />
                  <input
                    className="input input-small"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={element.value}
                    onChange={(e) =>
                      updateAdditionalElement(
                        element.id,
                        "value",
                        Number.parseFloat(e.target.value) || 0
                      )
                    }
                  />
                  <select
                    className="select"
                    value={element.unit}
                    onChange={(e) =>
                      updateAdditionalElement(
                        element.id,
                        "unit",
                        e.target.value
                      )
                    }
                  >
                    <option value="%">%</option>
                    <option value="ppm">ppm</option>
                    <option value="mg/kg">mg/kg</option>
                  </select>
                  <button
                    type="button"
                    className="button button-outline button-icon"
                    onClick={() => removeAdditionalElement(element.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="total-percentage">
              <span>Total composition:</span>
              <span
                className={`badge ${
                  getTotalPercentage() > 100
                    ? "badge-destructive"
                    : "badge-secondary"
                }`}
              >
                {getTotalPercentage().toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Deuxième rangée */}
      <div className="grid grid-2">
        {/* Informations d'application */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Package className="h-5 w-5" />
              Informations d'application
            </h2>
            <p className="card-description">
              Spécifiez les conditions d'utilisation de votre engrais
            </p>
          </div>
          <div className="card-content">
            <div className="form-group">
              <label className="label" htmlFor="crop-type">
                Type de culture
              </label>
              <select
                className="select"
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
              >
                <option value="">Sélectionnez une culture</option>
                <option value="cereales">Céréales</option>
                <option value="legumes">Légumes</option>
                <option value="fruits">Fruits</option>
                <option value="vignes">Vignes</option>
                <option value="prairie">Prairie</option>
                <option value="oleagineux">Oléagineux</option>
                <option value="autres">Autres</option>
              </select>
            </div>

            <div className="form-group">
              <label className="label" htmlFor="soil-type">
                Type de sol
              </label>
              <select
                className="select"
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
              >
                <option value="">Sélectionnez un type de sol</option>
                <option value="argileux">Argileux</option>
                <option value="limoneux">Limoneux</option>
                <option value="sableux">Sableux</option>
                <option value="calcaire">Calcaire</option>
                <option value="humifere">Humifère</option>
              </select>
            </div>

            <div className="form-group">
              <label className="label" htmlFor="application-method">
                Méthode d'application
              </label>
              <select
                className="select"
                value={applicationMethod}
                onChange={(e) => setApplicationMethod(e.target.value)}
              >
                <option value="">Sélectionnez une méthode</option>
                <option value="epandage">Épandage au sol</option>
                <option value="enfouissement">Enfouissement</option>
                <option value="fertigation">Fertigation</option>
                <option value="pulverisation">Pulvérisation foliaire</option>
                <option value="localise">Apport localisé</option>
              </select>
            </div>

            <div className="form-group">
              <label className="label" htmlFor="notes">
                Notes et recommandations
              </label>
              <textarea
                id="notes"
                className="textarea"
                placeholder="Ajoutez des notes sur l'utilisation, la période d'application, les précautions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Quantité et conditionnement */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Package className="h-5 w-5" />
              Quantité et conditionnement
            </h2>
            <p className="card-description">
              Spécifiez la quantité et le type de conditionnement souhaité
            </p>
          </div>
          <div className="card-content">
            <div className="form-group-2">
              <div className="form-group">
                <label className="label" htmlFor="quantity">
                  Quantité *
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  className="input"
                  placeholder="1000"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label" htmlFor="unit">
                  Unité
                </label>
                <select
                  className="select"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                >
                  <option value="kg">Kilogrammes (kg)</option>
                  <option value="tonnes">Tonnes (t)</option>
                  <option value="sacs">Sacs de 25kg</option>
                  <option value="big-bags">Big Bags (500-1000kg)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="label" htmlFor="packaging">
                Type de conditionnement
              </label>
              <select
                className="select"
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
              >
                <option value="">Sélectionnez un conditionnement</option>
                <option value="sacs-25kg">Sacs de 25kg</option>
                <option value="sacs-50kg">Sacs de 50kg</option>
                <option value="big-bags-500kg">Big Bags 500kg</option>
                <option value="big-bags-1000kg">Big Bags 1000kg</option>
                <option value="vrac">Vrac (camion-citerne)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="label" htmlFor="delivery-date">
                Date de livraison souhaitée
              </label>
              <input
                id="delivery-date"
                type="date"
                className="input"
                min={new Date().toISOString().split("T")[0]}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Résumé de la formulation */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Résumé de votre formulation</h2>
        </div>
        <div className="card-content">
          <div className="summary-grid">
            <div className="summary-section">
              <div className="formula-display">
                <span>Formule NPK:</span>
                <span className="badge badge-outline">{generateFormula()}</span>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <h4>Composition détaillée:</h4>
                <div className="summary-details">
                  <div>N (Azote): {composition.N}%</div>
                  <div>P (Phosphore): {composition.P}%</div>
                  <div>K (Potassium): {composition.K}%</div>
                  <div>CaO (Calcium): {composition.CaO}%</div>
                  <div>MgO (Magnésium): {composition.MgO}%</div>
                  <div>SO₃ (Soufre): {composition.SO3}%</div>
                </div>
              </div>

              {additionalElements.length > 0 && (
                <div>
                  <h4>Éléments additionnels:</h4>
                  <div className="summary-text">
                    {additionalElements.map((element) => (
                      <div key={element.id}>
                        {element.name}: {element.value}
                        {element.unit}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="summary-section">
              <div className="summary-text" style={{ marginBottom: "16px" }}>
                {cropType && (
                  <div>
                    <span style={{ fontWeight: "500" }}>Culture:</span>{" "}
                    {cropType}
                  </div>
                )}
                {soilType && (
                  <div>
                    <span style={{ fontWeight: "500" }}>Sol:</span> {soilType}
                  </div>
                )}
                {applicationMethod && (
                  <div>
                    <span style={{ fontWeight: "500" }}>Application:</span>{" "}
                    {applicationMethod}
                  </div>
                )}
              </div>

              {notes && (
                <div>
                  <h4>Notes:</h4>
                  <div className="summary-box">{notes}</div>
                </div>
              )}
            </div>

            <div className="summary-section">
              <h4>Informations client:</h4>
              <div className="summary-text" style={{ marginBottom: "16px" }}>
                {userInfo.name && (
                  <div>
                    <span style={{ fontWeight: "500" }}>Nom:</span>{" "}
                    {userInfo.name}
                  </div>
                )}
                {userInfo.company && (
                  <div>
                    <span style={{ fontWeight: "500" }}>Entreprise:</span>{" "}
                    {userInfo.company}
                  </div>
                )}
                {userInfo.phone && (
                  <div>
                    <span style={{ fontWeight: "500" }}>Téléphone:</span>{" "}
                    {userInfo.phone}
                  </div>
                )}
                {userInfo.email && (
                  <div>
                    <span style={{ fontWeight: "500" }}>Email:</span>{" "}
                    {userInfo.email}
                  </div>
                )}
              </div>

              {(userInfo.address || deliveryInfo.deliveryAddress) && (
                <div>
                  <h4>Livraison:</h4>
                  <div className="summary-box">
                    {deliveryInfo.sameAsUserAddress ? (
                      <div>
                        {userInfo.address}
                        <br />
                        {userInfo.postalCode} {userInfo.city}
                        <br />
                        {userInfo.country}
                      </div>
                    ) : (
                      <div>
                        {deliveryInfo.deliveryAddress}
                        <br />
                        {deliveryInfo.deliveryPostalCode}{" "}
                        {deliveryInfo.deliveryCity}
                        <br />
                        {deliveryInfo.deliveryCountry}
                      </div>
                    )}
                    {deliveryInfo.deliveryNotes && (
                      <div
                        style={{
                          marginTop: "12px",
                          paddingTop: "12px",
                          borderTop: "1px solid #e2e8f0",
                        }}
                      >
                        <span style={{ fontWeight: "500" }}>Instructions:</span>{" "}
                        {deliveryInfo.deliveryNotes}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

         <div className="button-group" style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
  <button 
    type="button"
    className={`button button-primary ${isSubmitting ? 'button-loading' : ''}`}
    onClick={handleSubmit}
    disabled={isSubmitting}
    style={{
      background: isSubmitting ? "#9ca3af" : "#16a34a",
      borderColor: isSubmitting ? "#9ca3af" : "#16a34a",
      cursor: isSubmitting ? "not-allowed" : "pointer",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      flex: '1', // Prend 50% de la largeur
      minWidth: '0', // Permet au bouton de rétrécir
    }}
  >
    {!isSubmitting && <Mail className="h-4 w-4" />}
    <span style={{ whiteSpace: 'nowrap' }}>{isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}</span>
  </button>

  {isClient ? (
    <PDFDownloadLink
      document={
        <PDFDocument
          composition={composition}
          userInfo={userInfo}
          deliveryInfo={deliveryInfo}
          cropType={cropType}
          soilType={soilType}
          applicationMethod={applicationMethod}
          notes={notes}
          quantity={quantity}
          unit={unit}
          packaging={packaging}
          deliveryDate={deliveryDate}
          additionalElements={additionalElements}
        />
      }
      fileName={`formulation-${userInfo.name || 'engrais'}-${new Date().toISOString().split('T')[0]}.pdf`}
      style={{ 
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '10px 16px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '0.875rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s',
        background: 'white',
        color: '#374151',
        flex: '1', // Prend 50% de la largeur
        minWidth: '0',
      }}
    >
      {({ loading }) => (
        <>
          <Package className="h-4 w-4" />
          <span style={{ whiteSpace: 'nowrap' }}>{loading ? 'Génération...' : 'Télécharger PDF'}</span>
        </>
      )}
    </PDFDownloadLink>
  ) : (
    <button 
      className="button button-outline" 
      disabled
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        opacity: '0.6',
        cursor: 'not-allowed',
        flex: '1', // Prend 50% de la largeur
        minWidth: '0',
      }}
    >
      <Package className="h-4 w-4" />
      <span style={{ whiteSpace: 'nowrap' }}>Chargement...</span>
    </button>
  )}
</div>
        </div>
      </div>
    </div>
  );
};

export default Formuler;
