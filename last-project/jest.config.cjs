module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
