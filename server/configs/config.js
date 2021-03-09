var  environment = 'production';
var  Config;

try {
    Config = require(`./config.${environment}`);
} catch (exception) {
    Config = require('./config.development');
}

Config.name = 'encurtador_url_db';

Config.Credentials = {
    secret: 'y#9wer@ypqw267345'
};

module.exports = Config;