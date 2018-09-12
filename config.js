/*
* Create and export configuration variables
*
 */

 // Container for all the environment
let environments = {};

// Staging enironment - default
environments.staging = {
    'port': 3000,
    'envName' : 'staging'
};

environments.production = {
    'port': 5000,
    'envName' : 'production'
};

// Determine which environment was passed as a command-line argument
const currentEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environemnts above. If not, default to staging
const envToExport = typeof(environments[currentEnv]) == 'object' ? environments[currentEnv] : environments.staging;

// Export the module
module.exports = envToExport;