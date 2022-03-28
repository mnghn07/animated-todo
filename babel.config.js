module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".ios.js", ".android.js", ".js", ".json"],
          root: ["./src"],
          alias: {
            app: "./src",
            assets: "./src/assets",
            components: "./src/components",
            containers: "./src/containers",
            hooks: "./src/hooks",
            // navigation: "./src/navigation",
            // stores: "./src/stores",
            // services: "./src/services",
            themes: "./src/themes",
            utils: "./src/utils",
          },
        },
      ],
    ],
  };
};
