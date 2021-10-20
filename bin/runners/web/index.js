/**
 * Module dependencies.
 */

const httpRunner = require('./http');


const run = () => {
  const httpServer = httpRunner();
}


module.exports = run;
