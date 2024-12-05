module.exports = {
    apps: [
        {
            name: 'octorand-api',
            script: './build/bin/server.js',
            instances: 'max',
            exec_mode: 'cluster',
            autorestart: true,
        },
    ],
}