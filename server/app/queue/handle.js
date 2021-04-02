'use strict';
module.exports = app => {
  return async job => {
    const ctx = app.createAnonymousContext();
    const JobName = job.name;
    console.log(JobName);
  }
};
