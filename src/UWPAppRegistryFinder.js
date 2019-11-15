let regedit = require('regedit');
let regEntryKey = 'HKCU\\Software\\Classes\\Local Settings\\Software\\Microsoft\\Windows\\CurrentVersion\\AppContainer\\Mappings';


class UWPAppRegistryFinder {

  list = (key) => {
    return new Promise((resolve, reject) => {
      regedit.list(key, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  getAppContainedApps = async (entryKey) => {
    const results = await this.list(entryKey);
    const appKeys = results[entryKey].keys;
    let apps = [];
    for (const appKey of appKeys) {
      try {
        let appEntry = entryKey + '\\' + appKey;
        const app = await this.list(appEntry);
        apps.push({
          entry: appEntry,
          appKey,
          displayName: app[appEntry].values.DisplayName.value,
          unlockCmds: `CheckNetIsolation.exe loopbackexempt -a -p=${appKey}`
        });
      } catch (e) {
        console.error(e);
      }
    }
    return Promise.resolve(apps);
  };

  searchContainedApps = (keyword) => {
    return this.getAppContainedApps(regEntryKey).then(apps => {
      let searchResults = [];
      for (const app of apps) {
        try {
          if (app.displayName.toLowerCase().indexOf(keyword.toLowerCase()) >= 0) {
            searchResults.push(app);
          }
        } catch (e) {
          console.log(e);
        }
      }
      return Promise.resolve(searchResults);
    });
  };
}

module.exports = UWPAppRegistryFinder;


