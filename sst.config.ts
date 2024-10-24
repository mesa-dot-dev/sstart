/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "tss",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: process.env.GITHUB_ACTIONS
            ? undefined
            : input?.stage === "production"
              ? "production"
              : "dev",
        },
      },
    };
  },
  async run() {
    new sst.aws.TanstackStart("TSS-Web-App", { dev: { command: "pnpm run dev:app" } });
  },
});
