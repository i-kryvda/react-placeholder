export default {
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  importOrder: ["^react$", "<THIRD_PARTY_MODULES>", "^@/(.*)$", "", "^[./]"],
  importOrderSeparation: false,
};
