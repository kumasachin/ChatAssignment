module.exports = {
  "frontend/**/*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "frontend/**/*.{json,md,css}": "prettier --write",
};
