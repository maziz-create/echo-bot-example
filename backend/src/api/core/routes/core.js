module.exports = {
  routes: [
    {
      method: "POST",
      path: "/core/echo-bot",
      handler: "message.handleMessage",
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
