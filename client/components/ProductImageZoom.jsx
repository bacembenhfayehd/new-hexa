import { useState, useRef } from 'react';

export default function ProductImageZoom({ imageUrl }) {
  // État pour suivre si la souris est sur l'image et sa position
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Référence à l'élément d'image pour calculer les positions relatives
  const imageRef = useRef(null);
  
  // Gère le mouvement de la souris sur l'image
  const handleMouseMove = (e) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      
      // Calcule la position relative de la souris (0 à 1)
      const x = Math.max(0, Math.min(1, (e.clientX - left) / width));
      const y = Math.max(0, Math.min(1, (e.clientY - top) / height));
      
      setMousePosition({ x, y });
    }
  };
  
  // Le facteur de zoom
  const zoomFactor = 2.5;

  return (
    <div className="w-1/2">
      <div 
        className="relative h-64 md:h-96 lg:h-screen max-h-96 overflow-hidden rounded-xl"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Image principale */}
        <img
          ref={imageRef}
          src={imageUrl || "/api/placeholder/600/400"}
          alt="Product image"
          className="w-full h-full object-cover rounded-xl"
        />
        
        {/* Conteneur de zoom qui apparaît au survol */}
        {isHovering && (
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div 
              className="absolute w-full h-full"
              style={{
                backgroundImage: `url(${imageUrl || "/api/placeholder/600/400"})`,
                backgroundPosition: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
                backgroundSize: `${zoomFactor * 100}%`,
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

