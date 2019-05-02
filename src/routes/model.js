import  { Model } from '../schemas/model-schema';
import Logger from '../utils/logger';

export default (app) => {
    app.get('/v0/models', (req, res) => {
        return Model.find({}, (err, brand) => {
            if(!brand) {
                res.statusCode = 404;
                Logger.notify('no  brand');
                return res.send({ error: 'Not found' });
            };
            if (!err) {
                Logger.notify('send brand');
                return res.send({ status: 'OK', data: brand });
            } else {
                res.statusCode = 500;
                Logger.notify('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });

    app.get('/v0/models-by-brand/:id', (req, res) => {
        return Model.find({brand: req.params.id}, (err, models) => {
            if(!models) {
                res.statusCode = 404;
                Logger.notify('no  models');
                return res.send({ error: 'Not found' });
            };
            if (!err) {
                Logger.notify('send models');
                return res.send({ status: 'OK', data: models });
            } else {
                res.statusCode = 500;
                Logger.notify('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });

    // app.post('/v0/models', (req, res) => {
    //     const {name, brand} = req.body;
    //     const model = new Model({name, brand});
    //     return model.save((err) => {
    //         if (!err) {
    //             Logger.notify('model created');
    //             return res.send({ status: 'OK', data: model });
    //         } else {
    //             if(err.name === 'ValidationError') {
    //                 res.statusCode = 400;
    //                 res.send({ error: 'Validation error' });
    //             } else {
    //                 res.statusCode = 500;
    //                 res.send({ error: 'Server error' });
    //             }
    //             Logger.notify('Internal error(%d): %s',res.statusCode, err.message);
    //         }
    //     });
    // });
}