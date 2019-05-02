import  { Brand } from '../schemas/brand-schema';
import Logger from '../utils/logger';

export default (app) => {
    app.get('/v0/brands', (req, res) => {
        return Brand.find({}, (err, brand) => {
            if(!brand) {
                res.statusCode = 404;
                Logger.notify('no  brand');
                return res.send({ error: 'Not found' });
            }
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

    app.get('/v0/brand/:id', (req, res) => {
        return Brand.findById(req.params.id, (err, brand) => {
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

    // app.post('/v0/brands', (req, res) => {
    //     const {name} = req.body;
    //     const brand = new Brand({name});
    //     return brand.save((err) => {
    //         if (!err) {
    //             Logger.notify('brand created');
    //             return res.send({ status: 'OK', data: brand });
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