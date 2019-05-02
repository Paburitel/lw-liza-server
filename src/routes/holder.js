import  { Holder } from '../schemas/holder-schema';
import Logger from '../utils/logger';

export default (app) => {
    app.get('/v0/holders', (req, res) => {
        return Holder.find({}, (err, holder) => {
            if(!holder) {
                res.statusCode = 404;
                Logger.notify('no  holders');
                return res.send({ error: 'Not found' });
            };
            if (!err) {
                Logger.notify('send holders');
                return res.send({ status: 'OK', data: holder });
            } else {
                res.statusCode = 500;
                Logger.notify('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });

    app.post('/v0/holders', (req, res) => {
        const {name, useModel, price, amount, description, useManufacturer} = req.body;
        const holder = new Holder({
            name, useModel, price, amount, description, useManufacturer
        });
        return holder.save((err) => {
            if (!err) {
                Logger.notify('Holder created');
                return res.send({ status: 'OK', data: holder });
            } else {
                if(err.name === 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                Logger.notify('Internal error(%d): %s',res.statusCode, err.message);
            }
        });
    });

    app.put('/V0/holders/:id', (req, res) => {
        return Holder.findById(req.params.id, (err, holder) => {
            if(!holder) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }

            Object.assign(holder, req.body);
            return holder.save((err) => {
                if (!err) {
                    Logger.notify("holder updated");
                    return res.send({ status: 'OK', data: holder });
                } else {
                    if( err.name === 'ValidationError' ) {
                        res.statusCode = 400;
                        res.send({ error: 'Validation error' });
                    } else {
                        res.statusCode = 500;
                        res.send({ error: 'Server error' });
                    }
                    Logger.notify('Internal error(%d): %s',res.statusCode, err.message);
                }
            });
        });
    });

    app.delete('/V0/holders/:id', (req, res) => {
        return Holder.findById(req.params.id, (err, holder) => {
            if(!holder) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            return holder.remove((err) => {
                if (!err) {
                    Logger.notify("holder removed");
                    return res.send({ status: 'OK' });
                } else {
                    res.statusCode = 500;
                    Logger.notify('Internal error(%d): %s',res.statusCode,err.message);
                    return res.send({ error: 'Server error' });
                }
            });
        });
    });
}