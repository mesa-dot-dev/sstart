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
    const isPermanentStage = $app.stage === "production" || $app.stage === "dev";

    const vpc = isPermanentStage
      ? new sst.aws.Vpc("TSSVpc", { bastion: true, nat: "ec2" })
      : sst.aws.Vpc.get("TTSVpc", "vpc-057d1174bade06382");

    const database = isPermanentStage
      ? new sst.aws.Postgres("TSSDatabase", { vpc: vpc as sst.aws.Vpc, proxy: true })
      : sst.aws.Postgres.get("TSSDatabase", {
          id: "tss-dev-tssdatabaseinstance",
          proxyId: "tss-dev-tssdatabaseproxy",
        });

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

    return {
      webApp: webApp.url,
      vpc: vpc.id,
    };
  },
});
