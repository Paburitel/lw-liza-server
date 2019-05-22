import SmartPhones from './smartPhone';
import Holder from './holder';
import Brand from './brand';
import Model from './model';
import User from './users';
import Order from './order';

export default (app) => {
    SmartPhones(app);
    Holder(app);
    Brand(app);
    Model(app);
    User(app);
    Order(app);
}
