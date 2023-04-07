//instanciation du cache
const NodeCache = require('node-cache');
const cache = new NodeCache();

module.exports = duration => (req, res, next) => {
    if (req.method !== 'GET') {
        console.log('Le cache ne peut être utilisé que pour les requêtes GET');
        next();
    }
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        console.log('Cache utilisé pour ' + key);
        res.send(cachedResponse);
    } else {
        console.log('Cache non utilisé pour  ' + key);
        res.sendResponse = res.send;
        res.send = body => {
            res.sendResponse(body);
            cache.set(key, body, duration);
        };
        next();
    }
}