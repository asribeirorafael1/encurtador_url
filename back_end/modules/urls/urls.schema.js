const shortId = require('shortid')

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