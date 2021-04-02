'use strict';
const fs = require('fs');
const REDLOCK = Symbol('Application#redlock');
const Redlock = require('redlock');
const Redis = require('ioredis');
const _ = require('lodash');

module.exports = {
  get redlock() {
    if (!this[REDLOCK]) {
      const config = this.config;
      const clients = [];
      if (this.redis) {
        clients.push(this.redis);
      } else {
        if (_.isArray(config.redis)) {
          _.forEach(config.redis, v => {
            clients.push(new Redis(v));
          })
        } else if (_.isObject(config.redis)) {
          clients.push(new Redis(config.redis));
        } else {
          clients.push(new Redis());
        }
      }
      const redlockInstance = new Redlock(
        clients,
        config.redlock.options
      );
      this[REDLOCK] = redlockInstance;
    }
    return this[REDLOCK];
  },
};
