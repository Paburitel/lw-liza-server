import Server from './server/server';
import Mongoose from './mongoose/mongoose';
import ConfigBuilder from './utils/config-builder';
export const Config = ConfigBuilder.build();

Server.configure();
Mongoose.configure(Config);