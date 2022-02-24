module.exports = {
  schema: {
    output: {
      mode: "tags",
      target: "app/api/index.ts",
      client: "react-query",
      override: {
        mutator: {
          path: "./app/apiClient/useMutator.ts",
          name: "useAuthenticated",
        },
        operations: {
          force_token: {
            mutator: {
              path: "./app/apiClient/useMutator.ts",
              name: "useStaff",
            },
          },
        },
      },
    },
    input: {
      target: "../backend/schema.yml",
    },
  },
}
