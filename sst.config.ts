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
          profile: input?.stage === "production" ? "taylor-production" : "taylor-dev",
        },
      },
    };
  },
  async run() {
    new sst.aws.TanstackStart("TTS-Web-App");
  },
});
