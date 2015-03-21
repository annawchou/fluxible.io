/**
 * This is a sample file for your Github client id and client secret
 * This is needed to collect the doc's from the fluxible repo.
 * You can generate the client/secret pair here: https://github.com/settings/applications/new
 */
module.exports = {
    github: {
        clientId: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
    }
};
