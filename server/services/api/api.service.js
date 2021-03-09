module.exports = {
    error: error,
    success: success
};

function error(res, Response) {
    res.json({
        Response: Response
    });
}

function success(res, Response = {}) {
    res.json({
        Response: Response
    });
}
