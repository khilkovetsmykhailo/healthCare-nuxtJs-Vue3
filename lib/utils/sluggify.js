export default (slug = '') => slug.toUpperCase()
  .replace(/-/g, '_')
  .replace(/ /g, '_');
