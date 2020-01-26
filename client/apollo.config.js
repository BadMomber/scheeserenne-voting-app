module.exports = {
  client: {
    service: {
      name: "sva",
      url: "http://localhost:4000/graphql",
    },
    // Files processed by the extension
    includes: ["components/**/*.vue", "pages/**/*.vue"],
  },
}
