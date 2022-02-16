module.exports = {
  schema: {
    output: {
      mode: "tags",
      target: "app/api/index.ts",
      client: "react-query",
      override: {
        mutator: {
          path: "./app/apiClient/useMutator.ts",
          name: "useMutator",
        },
      },
    },
    input: {
      target: "../backend/schema.yml",
    },
  },
}
