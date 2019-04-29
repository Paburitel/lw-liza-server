import mongoose  from 'mongoose';
import Logger from '../utils/logger';
import Promise from 'bluebird';

const Mongoose = {
    configure: (Config) => {
        mongoose.Promise = Promise;
        mongoose.connect(Config.connectionString, { useMongoClient: true });
        const db = mongoose.connection;

        db.on('error', function (err) {
            Logger.notify('connection error:', err.message);
        });
        db.once('open', function callback () {
            Logger.notify("Connected to DB!");
        });
    }
};

export default Mongoose;
