module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "QV Checker";
      args[0].description = "Qualifikationsverfahren Result-Checker for 2021.";
      return args;
    });
  },
  pwa: {
    manifestOptions: {
      name: "QV Checker",
      short_name: "QV Checker",
      display: "standalone",
      scope: "/",
      start_url: "/",
    },
    appleMobileWebAppCapable: "yes",
    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      exclude: [/css/, /_redirects/],
    },
  },
};
