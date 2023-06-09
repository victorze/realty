module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 100,
  pugClassNotation: 'attribute',
  pugIdNotation: 'as-is',
  pugSingleQuote: false,
  pugSemi: false,
  pugAttributeSeparator: 'none',
  pugWrapAttributesThreshold: 1,
  pugExplicitDiv: true,

  plugins: [require.resolve('@prettier/plugin-pug'), require('prettier-plugin-tailwindcss')],
  pluginSearchDirs: false,
};
