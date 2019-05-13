import  { Smartphone } from '../schemas/index-schema';
import Logger from '../utils/logger';

export default (app) => {
    app.get('/v0/smartphones', (req, res) => {
        return Smartphone.find({})
            .populate('model')
            .populate('brand')
            .exec((err, phones) => {
                if(!phones) {
                    res.statusCode = 404;
                    Logger.notify('no  smartphones!');
                    return res.send({ error: 'Not found!' });
                }
                if (!err) {
                    Logger.notify('send smartphones');
                    return res.send({ status: 'OK', data: phones });
                } else {
                    res.statusCode = 500;
                    Logger.notify('!!Internal error(%d): %s', res.statusCode, err.message);
                    return res.send({ error: 'Server error' });
                }
        });
    });

    app.get('/v0/smartphones/:id', (req, res) => {
        return Smartphone.findById(req.params.id, (err, smartphone) => {
            if(!smartphone) {
                res.statusCode = 404;
                Logger.notify('no  smartphone');
                return res.send({ error: 'Not found' });
            };
            if (!err) {
                Logger.notify('send smartphone');
                return res.send({ status: 'OK', data: smartphone });
            } else {
                res.statusCode = 500;
                Logger.notify('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });

    app.post('/v0/smartphones', (req, res) => {
        const { brand, price, amount, operatingSystem, model} = req.body;
        const smartphone = new Smartphone({
            brand,
            price,
            amount,
            operatingSystem,
            model
        });
        return smartphone.save((err) => {
            console.log(err);
            if (!err) {
                Logger.notify('Smartphone created');
                return res.send({ status: 'OK', data: smartphone });
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

    app.put('/V0/smartphones/:id', (req, res) => {
        return Smartphone.findById(req.params.id, (err, smartphone) => {
            if(!smartphone) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }

            Object.assign(smartphone, req.body);
            return smartphone.save((err) => {
                if (!err) {
                    Logger.notify("smartphone updated");
                    return res.send({ status: 'OK', data: smartphone });
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

    app.delete('/V0/smartphones/:id', (req, res) => {
        return Smartphone.findById(req.params.id, (err, smartphone) => {
            if(!smartphone) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            return smartphone.remove((err) => {
                if (!err) {
                    Logger.notify("smartphone removed");
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
