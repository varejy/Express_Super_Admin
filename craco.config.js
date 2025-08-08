const path = require("path");

/* FIXME: "@emotion/react", "@mui/styled-engine-sc" added only for fix problem with notistak and tailwind. Need to be deleted when @mui/styled-engine has been updated */
module.exports = {
  style: {
    postcss: {
      // eslint-disable-next-line global-require,import/no-extraneous-dependencies
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    configure: (originWebpackConfig) => {
      // console.log(originWebpackConfig.resolve);
      originWebpackConfig.resolve.alias["@mui/styled-engine"] = path.resolve(
        __dirname,
        "./node_modules/@mui/styled-engine-sc"
      );
      return originWebpackConfig;
    },
  },
};
