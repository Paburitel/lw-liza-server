import SmartPhones from './smartPhone';
import Holder from './holder';
import Brand from './brand';
import Model from './model';
import User from './users';

export default (app) => {
    SmartPhones(app);
    Holder(app);
    Brand(app);
    Model(app);
    User(app);
}