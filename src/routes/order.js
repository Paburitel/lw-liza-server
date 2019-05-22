import  { Order } from '../schemas/order-schema';
import Logger from '../utils/logger';

export default (app) => {
    app.get('/v0/orders/', (req, res) => {
        return Order.find({})
            .populate('smartphones')
            .populate('holders')
            .populate('manager')
            .populate('executor')
            .exec((err, order) => {
            if(!order) {
                res.statusCode = 404;
                Logger.notify('no  order');
                return res.send({ error: 'Not found' });
            };
            if (!err) {
                Logger.notify('send user');
                return res.send({ status: 'OK', data: order });
            } else {
                res.statusCode = 500;
                Logger.notify('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
    app.get('/v0/order/:id', (req, res) => {
        return Order.findById(req.params.id)
            .populate('smartphones')
            .populate('holders')
            .populate('manager')
            .populate('executor')
            .exec((err, order) => {
                if(!order) {
                    res.statusCode = 404;
                    Logger.notify('no  order');
                    return res.send({ error: 'Not found' });
                };
                if (!err) {
                    Logger.notify('send order');
                    return res.send({ status: 'OK', data: order });
                } else {
                    res.statusCode = 500;
                    Logger.notify('Internal error(%d): %s', res.statusCode, err.message);
                    return res.send({ error: 'Server error' });
                }
            });
    });
    app.post('/v0/order', (req, res) => {
        const {customer, manager, executor, address, deliveryTime, sum} = req.body;
        const newOrder = new Order({customer, manager, executor, address, deliveryTime, sum});
        newOrder.save((err, order) => {
            if (err) {
                res.statusCode = 500;
                Logger.notify('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({error: err.message});
            } else {
                Logger.notify("New newOrder - %s:%s");
                return res.send({status: 'OK', data: order});
            }
        });
    });
    app.put('/V0/order/:id', (req, res) => {
        return Order.update({_id: req.params.id}, req.body, (err, resp) => {
            if (!resp) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }
            if (!err) {
                Logger.notify("order updated");
                return res.send({status: resp.ok, data: {
                        nModified: resp.nModified
                    }});
            } else {
                if (err.name === 'ValidationError') {
                    res.statusCode = 400;
                    res.send({error: 'Validation error'});
                } else {
                    res.statusCode = 500;
                    res.send({error: 'Server error'});
                }
                Logger.notify('Internal error(%d): %s', res.statusCode, err.message);
            }

        });

    });
    app.put('/V0/add-phones-in-order/:id', (req, res) => {
        return Order.findById(req.params.id, (err, order) => {
            if(!order) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            order.smartphones = order.smartphones.concat(req.body.ids || []);
            return order.save((err) => {
                if (!err) {
                    Logger.notify("order updated");
                    return res.send({ status: 'OK' });
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
    // app.put('/V0/delete-phones-in-order/:id', (req, res) => {
    //     return Order.findById(req.params.id, (err, order) => {
    //         if(!order) {
    //             res.statusCode = 404;
    //             return res.send({ error: 'Not found' });
    //         }
    //
    //         order.smartphones = order.smartphones.filter((id) => !(req.body.ids || []).find(id));
    //         return order.save((err) => {
    //             if (!err) {
    //                 Logger.notify("order updated");
    //                 return res.send({ status: 'OK' });
    //             } else {
    //                 if( err.name === 'ValidationError' ) {
    //                     res.statusCode = 400;
    //                     res.send({ error: 'Validation error' });
    //                 } else {
    //                     res.statusCode = 500;
    //                     res.send({ error: 'Server error' });
    //                 }
    //                 Logger.notify('Internal error(%d): %s',res.statusCode, err.message);
    //             }
    //         });
    //     });
    // });
    app.put('/V0/add-holders-in-order/:id', (req, res) => {
        return Order.findById(req.params.id, (err, order) => {
            if(!order) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            order.holders = order.holders.concat(req.body.ids || []);
            return order.save((err) => {
                if (!err) {
                    Logger.notify("order updated");
                    return res.send({ status: 'OK' });
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
    // app.put('/V0/delete-holders-in-order/:id', (req, res) => {
    //     return Order.findById(req.params.id, (err, order) => {
    //         if(!order) {
    //             res.statusCode = 404;
    //             return res.send({ error: 'Not found' });
    //         }
    //         order.holders = order.holders.filter((id) => !(req.body.ids || []).find(id));
    //         return order.save((err) => {
    //             if (!err) {
    //                 Logger.notify("order updated");
    //                 return res.send({ status: 'OK' });
    //             } else {
    //                 if( err.name === 'ValidationError' ) {
    //                     res.statusCode = 400;
    //                     res.send({ error: 'Validation error' });
    //                 } else {
    //                     res.statusCode = 500;
    //                     res.send({ error: 'Server error' });
    //                 }
    //                 Logger.notify('Internal error(%d): %s',res.statusCode, err.message);
    //             }
    //         });
    //     });
    // });
}
