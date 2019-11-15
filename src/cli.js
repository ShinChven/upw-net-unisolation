#!/usr/bin/env node
const Finder = require('./UWPAppRegistryFinder');
const finder = new Finder();

const argv = process.argv;
const keyword = argv[2];
if (keyword) {
  console.log(`Search uwp apps for ${keyword}`);

  finder.searchContainedApps(keyword).then(apps => {
    for (const app of apps) {
      console.log(`unlock ${app.displayName} with commands:`);
      console.log(app.unlockCmds);
    }
  }).catch(err => {
    console.error(err);
  });
}else{
  console.error(new Error("Please type app name to search"));
}







