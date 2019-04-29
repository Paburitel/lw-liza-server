import nodeLogger from 'simple-node-logger';

const Logger = {
    logger: nodeLogger.createSimpleLogger('logfile.log'),
    notify: function (data) {
        this.logger.info(`*** ${data} *** `, new Date().toJSON());
    }
};

export default Logger;
