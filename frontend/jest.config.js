module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components/**/*.vue",
    "src/views/**/*.vue",
    "src/store/**/*.ts",
  ],
  coverageReporters: ["html", "text-summary"],
};
