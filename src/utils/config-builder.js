import fs from 'fs';

let ConfigBuilder = {
    build: function () {
        const configJson = JSON.parse(fs.readFileSync('./src/config.json', 'utf8'));

        if(process.env.NODE_ENV === 'production'){
            return configJson.production;
        }else{
            return configJson.development;
        }
    }
};

module.exports = ConfigBuilder;
