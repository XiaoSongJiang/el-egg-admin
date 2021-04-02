'use strict';

module.exports = app => {
  return {
    async waiting() { },
    async active() { },
    async stalled() { },
    async progress() { },
    async paused() { },
    async resumed() { },
    async cleaned() { },
    async drained() { },
    async removed() { },
    async completed(job) {
      console.log('completed process id', process.pid)

    },
    async failed(job, error) {
      // do something
    },
  };
};
