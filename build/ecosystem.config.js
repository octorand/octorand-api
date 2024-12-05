module.exports = {
    apps: [
        {
            name: 'octorand-api',
            script: './bin/server.js',
            instances: 'max',
            exec_mode: 'cluster',
            autorestart: true,
        },
    ],
}