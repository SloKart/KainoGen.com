module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginPWA, {
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
