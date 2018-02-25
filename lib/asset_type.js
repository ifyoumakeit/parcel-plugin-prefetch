const { Asset } = require("parcel-bundler");
const fetch = require("isomorphic-fetch");
const chalk = require("chalk");
const { minify } = require("uglify-es");

const STATES = {
  FAILED: "FAILED",
  FETCHING: "FETCHING",
  FETCHED: "FETCHED",
};

class JSONFetchAssetType extends Asset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
    this.type = "js";
  }

  parse(code) {
    return JSON.parse(this.contents);
  }

  log(action, ...rest) {
    console.log("🐕 ", chalk.blue.bold(action), ...rest);
  }

  async fetch(data) {
    const fetchedData = await Promise.all(
      data.map(async ({ key, url }) => {
        try {
          const resp = await fetch(url);
          const data = await resp.json();
          return { url, key, data, state: STATES.FETCHED };
        } catch (error) {
          return { url, key, error, state: STATES.FAILED };
        }
      })
    );

    // Return keyed object.
    return this.transformData(fetchedData);
  }

  transformData(data) {
    return data.reduce(
      (memo, data) => {
        memo[data.key] = data;
        data.state === STATES.FETCHED
          ? this.log("Fetched", data.url)
          : this.log("Failed", data.url, data.error);
        return memo;
      },
      { STATES }
    );
  }

  setInitialData(data) {
    return data.reduce((memo, { url, key }) => {
      const hasUrl = Boolean(url);
      const hasKey = Boolean(key);
      hasUrl && hasKey
        ? this.log("Fetching", url)
        : this.log(
            "Not fetching",
            url,
            "due to missing",
            hasUrl ? "key" : "url"
          );
      return hasUrl && hasKey
        ? memo.concat({
            url,
            key,
            state: STATES.FETCHING,
          })
        : memo;
    }, []);
  }

  async generate() {
    const data = await this.fetch(this.setInitialData(this.ast));
    const code = `module.exports = ${JSON.stringify(data, null, 2)}`;

    this.log("Rewriting", this.name);
    this.log(""); // This may be swalllowed by "Built in..."

    if (this.options.minify) {
      let minified = minify(code);
      if (minified.error) {
        throw minified.error;
      }

      return { js: minified.code };
    }

    return { js: code };
  }
}

module.exports = JSONFetchAssetType;
