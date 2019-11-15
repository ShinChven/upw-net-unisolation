const Finder = require('./UWPAppRegistryFinder');
const finder = new Finder();

finder.searchContainedApps('netflix').then(results => {
  console.log(results);
}).catch(err => {
  console.error(err);
});






