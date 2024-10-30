/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./.sst/platform/config.d.ts" />

// const PERMANENT_STAGES = ["production", "development"];

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
    const vpc = new sst.aws.Vpc("TSSVpc", { bastion: true, nat: "ec2" });

    const database = new sst.aws.Postgres("TssDatabase", { vpc, proxy: true });

    const webApp = new sst.aws.TanstackStart("TSSWebApp", {
      link: [database],
      dev: { command: "pnpm run dev:app" },
    });

    // new sst.x.DevCommand("Studio", {
    //   link: [database],
    //   dev: {
    //     command: "pnpm db:studio",
    //     autostart: true,
    //   },
    // });

    return { webApp: webApp.url, databaseId: database.id, proxyId: database.proxyId };
  },
});