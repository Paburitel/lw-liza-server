import express from 'express';
import bodyParser from 'body-parser';
import Logger from '../utils/logger';
import path from 'path';
import Routers from '../routes/routers'

const Server = {
    configure: function () {
        this.app = express();
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        /** Set options */
        this.app.use((req, res, next) => {
            const allowedOrigins = ['http://localhost:8080'];
            const origin = req.headers.origin;
            if(allowedOrigins.indexOf(origin) > -1){
                res.header('Access-Control-Allow-Origin', origin);
            }
            return next();
        });
        this.app.options('/*', (req, res) => {
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, application/x-www-form-urlencoded');
            res.sendStatus(200);
        });

        /** Start routing */
        Routers(this.app);

        /** Error catching */
        this.app.use((req, res, next) => {
            res.status(404);
            Logger.notify('Not found URL: %s', req.url);
            res.send({ error: 'Not found' });
            return next();
        });

        this.app.use((err, req, res, next) => {
            Logger.notify('500 Handler');
            res.status(err.status || 500);
            Logger.notify('Internal error(%d): %s', res.statusCode, err.message);
            res.send({ error: err.message });
            return next();
        });

        this.app.listen(process.env.PORT || 3000, () => {
            Logger.notify('Server started at 3000 !!!');
        });
    }
};
export default Server;
