import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: false,
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: [
      'Hexabeads',
      'Hexaboost', 
      'Hexasol',
      'Hexagel',
      'Actifert',
      'Hexaraw',
    ]
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  images: [{
    url: String,
    publicId: String, 
    alt: String
  }],

   shortDescription: {
    type: String,
    required: [true, "La description courte est obligatoire"],
    trim: true,
  },
  
 
  detailedDescription: {
    type: String,
    required: [true, "La description détaillée est obligatoire"],
    trim: true
  },
  
 
  benefices: [{
    type: String,
    trim: true
  }],
  
  
  caracteristiques: [{
    element: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      required: true,
      trim: true
    },
    unit: {
      type: String,
      trim: true,
      default: ""
    }
  }],
  
  
  composition: [{
    element: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      required: true,
      trim: true
    },
    unit: {
      type: String,
      trim: true,
      default: "%"
    }
  }],
  
  
  recommendations: [{
    type: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      required: true,
      trim: true
    }
  }]

}, {
  timestamps: true
});

productSchema.index({ category: 1 });
productSchema.index({ name: 'text', description: 'text' });

const Product = new mongoose.model('Product',productSchema);

export default Product;