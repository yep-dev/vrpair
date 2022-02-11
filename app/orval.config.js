module.exports = {
  schema: {
    output: {
      mode: "tags",
      target: "app/apiClient/index.ts",
      client: "react-query",
    },
    input: {
      target: "../backend/schema.yml",
    },
  },
}
