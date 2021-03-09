const APIService = require('../../../server/services/api/api.service');
const UrlsModel = require('./urls.model');

const moment = require('moment');
moment.locale('pt-BR');
const momenttz = require('moment-timezone');
momenttz.locale('pt-BR');

module.exports = {
    shorten: shorten,
    unshorten: unshorten
};

// add ---

function shorten(req, res) {
    let url = req.body.url;

    let NewUrl = new UrlsModel({
        url_original: url,
        url_encurtada_expiracao: moment(new Date()).add(5, 'minutes').toDate()
    });

    NewUrl.save(_onShortenUrl(res));
}

function _onShortenUrl(res) {
    return function (ErrorSaveUrl, UrlSaved) {
        if (ErrorSaveUrl) {
            return APIService.error(res, ErrorSaveUrl);
        }

        return APIService.success(res, { newUrl: 'http://localhost:8081/' + UrlSaved.url_encurtada});
    };
}

function unshorten(req, res) {
    const QueryGetUrl = {
        url_encurtada: req.params.idEncurtado
    };

    UrlsModel
        .findOne(QueryGetUrl)
        .lean()
        .exec(_onUnshortenUrl(res));
}

function _onUnshortenUrl(res) {
    return function (ErrorGetUrl, UrlFound) {
        if (ErrorGetUrl) {
            res.sendStatus(404);
        }

        if(moment(new Date()) > moment(UrlFound.url_encurtada_expiracao).toDate())
            res.sendStatus(404);

        res.redirect(UrlFound.url_original);
    };
}