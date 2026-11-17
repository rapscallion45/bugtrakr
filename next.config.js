module.exports = {
  turbopack: { root: __dirname },
  images: {
    remotePatterns: ["localhost", "bugtrakr.vercel.app", "secure.gravatar.com", "authjs.dev"].map((hostname) => ({
      protocol: hostname === "localhost" ? "http" : "https",
      hostname,
    })),
    formats: ["image/avif", "image/webp"],
  },
  env: {
    APP_NAME: `BugTrakR`,
    FB_APP_ID: "680726796221491",
    TWITTER_HANDLE: "bugtrakr",
    GOOGLE_ADSENSE_PUBLISHER_ID: "ca-pub-3649196559623661",
    GOOGLE_ADSENSE_TEST: "on",
    DEMO_LOGIN_USERNAME: "demo",
    DEMO_LOGIN_PASSWORD: "password",
  },
}
