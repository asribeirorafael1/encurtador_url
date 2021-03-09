const shortId = require('shortid');
shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÂÃ');

module.exports = {
    url_original: {
        type: String
    },
    url_encurtada: {
        type: String,
        default: shortId.generate
    },
    url_encurtada_expiracao: {
        type: Date
    }
};