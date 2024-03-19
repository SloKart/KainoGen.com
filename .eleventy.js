// Plugin Imports
const pluginDirectoryOutput = require("@11ty/eleventy-plugin-directory-output");
const pluginEleventyNavigation = require("@11ty/eleventy-navigation");
const pluginPWA = require("eleventy-plugin-pwa-v2");

// Filter Imports
const filterFormatDate = require("./src/config/filters/formatDate");
const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");
const pluginMinifier = require("@sherby/eleventy-plugin-files-minifier");
const pluginCritical = require("eleventy-critical-css");
const pluginImage = require("eleventy-plugin-img2picture");

// Config Imports
const configSitemap = require("./src/config/plugins/sitemap");
const configCritical = require("./src/config/plugins/critical");
const configImage = require("./src/config/plugins/image");
const configCss = require("./src/config/eleventy/css");
const configJs = require("./src/config/eleventy/javascript");

const isProduction = process.env.ELEVENTY_ENV === "PROD";
const pluginShopify = require("eleventy-plugin-shopify");

// Config Imports
const configShopify = require("./src/config/plugins/shopify");

// Filter Imports
const filterGetProductsInCollection = require("./src/config/filters/getProductsInCollection");

module.exports = function (eleventyConfig) {
  /**
   *  PLUGINS
   *      Adds additional eleventy functionality through official or community-created add-ons
   *      https://www.11ty.dev/docs/plugins/
   */

  // eleventy-plugin-pwa-v2

  module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginPWA, {
      swDest: "./service-worker.js",
      exclude: [/\.map$/, /_redirects/],
      cacheId: "/", // change this to your application id
      globIgnores: [
        // any files you don't want service worker to cache go here
        "share-*.jpg",
      ],
      runtimeCaching: [
        {
          // we always want fresh copy of the index page
          urlPattern: /\/$/,
          handler: "NetworkFirst",
        },
        {
          // we also want fresh copies of any HTML page
          urlPattern: /\.html$/,
          handler: "NetworkFirst",
        },
        {
          // we serve stale copies of static assets while they're refreshed
          urlPattern:
            /^.*\.(jpg|png|mp4|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,
          handler: "StaleWhileRevalidate",
        },
      ],
    });
  };

  // Provides benchmarks in the terminal when a website is built. Useful for diagnostics.
  // https://www.11ty.dev/docs/plugins/directory-output/
  eleventyConfig.addPlugin(pluginDirectoryOutput);

  // Allows navigation items to be defined in a scalable way via the front matter
  // https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(pluginEleventyNavigation);

  // Automatically generates a sitemap based on the HTML files being generated
  // https://github.com/quasibit/eleventy-plugin-sitemap
  eleventyConfig.addPlugin(pluginSitemap, configSitemap);

  // Converts <img> tags to responsive <picture>s. An opt-in feature. Please read config/plugins/image.js to find out more
  // https://github.com/saneef/eleventy-plugin-img2picture
  eleventyConfig.addPlugin(pluginImage, configImage);

  // Production only plugins. Only run when "npm run build" is used.
  if (isProduction) {
    // Minify all HTML, CSS, JSON, XML, XSL and webmanifest files. Keeps comments when developing and removes them when live, for a smaller filesize
    // https://github.com/benjaminrancourt/eleventy-plugin-files-minifier
    eleventyConfig.addPlugin(pluginMinifier);

    // Inlines any critical CSS that's above the fold on a 1080p display. Increases build times by 2s-3s, so only ran in prod.
    // https://github.com/gregives/eleventy-critical-css
    eleventyConfig.addPlugin(pluginCritical, configCritical);
  }
  // Queries your Shopify store at build time to expose product and collection data under the `shopify` global object
  // https://github.com/dleatherman/eleventy-plugin-shopify
  eleventyConfig.addPlugin(pluginShopify, configShopify);

  /**
   *  FILTERS
   *      Allows modification of data before it is outputted, denoted by {{ contentToPrint | filterName }}
   *          https://www.11ty.dev/docs/filters/
   */

  // Turns a date from ISO format to a more human-readable one
  eleventyConfig.addFilter("formatDate", filterFormatDate);

  /**
   *  PASSTHROUGH'S
   *      Copy/paste non-template files straight to /public, without any interference from the eleventy engine
   *      https://www.11ty.dev/docs/copy/
   */

  eleventyConfig.addPassthroughCopy("./src/assets/favicons");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/images");
  eleventyConfig.addPassthroughCopy("./src/assets/svgs");
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy({
    "./src/manifest.json": "./manifest.json",
  });
  eleventyConfig.addPassthroughCopy({
    "./src/superLogo-xl.svg": "./superLogo-xl.svg",
  });
  eleventyConfig.addPassthroughCopy({
    "./src/assets/images/images/logo.png": "./logo.png",
  });
  eleventyConfig.addPassthroughCopy({
    "./src/splash.png": "./splash.png",
  });

  eleventyConfig.addPassthroughCopy({
    "./src/favicon.ico": "./favicon.ico",
  });

  /**
   *  EXTENSIONS
   *      Sets up non-template languages to be processed by eleventy, typically to allow other technologies process code at build.
   *      https://www.11ty.dev/docs/languages/custom/
   */

  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", configCss);

  eleventyConfig.addTemplateFormats("js");
  eleventyConfig.addExtension("js", configJs);

  eleventyConfig.addFilter(
    "getProductsInCollection",
    filterGetProductsInCollection
  );

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
  };
};
