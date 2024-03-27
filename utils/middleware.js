
const logger = require('./logger')

const requestLogger = ( request, response, next) => {
    logger.info('Body', request.body)
    logger.info('Path', request.path)
    logger.info('Method', request.method)
    next()
}


module.exports = {requestLogger}