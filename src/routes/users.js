import  { User } from '../schemas/user-schema';
import Logger from '../utils/logger';

export default (app) => {
    app.post('/v0/user/reg', (req, res) => {
        const {email, fistName, lastName, roles, password} = req.body;
        const newUser = new User({email, fistName, lastName, roles, password});
        newUser.save((err, user) => {
            if (err) {
                res.statusCode = 500;
                Logger.notify('Internal error(%d): %s',res.statusCode, err.message);
                return res.send({ error: err.message });
            } else {
                Logger.notify("New user - %s:%s", user.fistName, user.password, user.email);
                return res.send({ status: 'OK' });
            }
        });
    });

    app.post('/v0/user/login', (req, res) => {
        const {email, password} = req.body;
        User.findOne({email}, (err, user) => {
            if(!user) {
                res.statusCode = 404;
                Logger.notify('no  user');
                return res.send({ error: 'Not found' });
            }
            if (!err) {
                if (!user.checkPassword(password)) {
                    Logger.notify('password does not match');
                    return res.send({ status: 'err', name: 'password does not match'});
                }
                Logger.notify('send user');
                const  {email, fistName, lastName, roles, token} = user;
                return res.send({ status: 'OK', data: {email, fistName, lastName, roles, token} });
            } else {
                res.statusCode = 500;
                Logger.notify('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({ error: 'Server error' });
            }
        })
    });
    app.get('/v0/user/:token', (req, res) => {
        return User.findOne({token: req.params.token}, (err, user) => {
            if(!user) {
                res.statusCode = 404;
                Logger.notify('no  user');
                return res.send({ error: 'Not found' });
            };
            if (!err) {
                Logger.notify('send user');
                const  {email, fistName, lastName, roles, token} = user;
                return res.send({ status: 'OK', data: {email, fistName, lastName, roles, token} });
            } else {
                res.statusCode = 500;
                Logger.notify('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });

    app.get('/v0/users', (req, res) => {
        return User.find({}, (err, users) => {
            if(!users) {
                res.statusCode = 404;
                Logger.notify('no  users');
                return res.send({ error: 'Users not found' });
            }
            if (!err) {
                Logger.notify('send users');
                const modifiedUsers = users.map((user)=>{
                    const {_id, email, fistName, lastName, roles} = user;
                    return {_id, email, fistName, lastName, roles};
                });
                return res.send({ status: 'OK', data:modifiedUsers  });
            } else {
                res.statusCode = 500;
                Logger.notify('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });

    app.get('/v0/userSalt', (req, res) => {
        Logger.notify('send salt');
        return res.send({ status: 'OK', data: 'may the force be with you' });
    })
}
