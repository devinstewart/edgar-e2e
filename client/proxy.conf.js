const PROXY_CONFIG = {
    "/api": {
	    "target": 'http://localhost:3000',
	    "secure": false,
	    "changeOrigin": true
    },
}

module.exports = PROXY_CONFIG;