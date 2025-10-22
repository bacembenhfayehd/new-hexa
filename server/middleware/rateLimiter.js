import rateLimit from 'express-rate-limit';

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes par IP
  message: "Trop de requêtes. Veuillez attendre quelques minutes avant de réessayer.",
  statusCode: 429,
  standardHeaders: false, 
  skip: (req) => process.env.NODE_ENV !== 'production'
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: "Trop de tentatives de connexion, réessayez dans 15 minutes.",
  skipSuccessfulRequests: true 
});