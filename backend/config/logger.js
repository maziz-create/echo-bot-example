// path: ./config/logger.js

"use strict";

const { winston } = require("@strapi/logger");

module.exports = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/warn.log",
      level: "warn",
    }),
    new winston.transports.File({
      filename: "logs/debug.log",
      level: "debug",
    }),
    new winston.transports.File({
      filename: "logs/http.log",
      level: "http",
    }),
  ],
};
