var mcache = require('memory-cache')

module.exports = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            //send data in json format
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.parse(cachedBody))
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                // store data in json format
                mcache.put(key, JSON.stringify(body), duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}