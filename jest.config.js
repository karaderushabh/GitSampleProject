// jest.config.js

module.exports = {
  transformIgnorePatterns: ["/node_modules/", "\\.css$"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
};
