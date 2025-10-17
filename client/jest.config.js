const nextJest = require('next/jest');

// Crée une configuration Jest adaptée à Next.js
const createJestConfig = nextJest({
  dir: './', // chemin vers ton projet Next.js
});

// Configuration Jest personnalisée
const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};

// Exporte la config
module.exports = createJestConfig(customJestConfig);
