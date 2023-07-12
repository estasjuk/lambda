const { Route } = require('../db/models/routes');
const HttpError = require('../utils/HttpError');
const controllerWrapper = require("../utils/controllerWrapper");

const addJson = async (req, res) => {


};

const getJson = async (req, res) => {
    
    
};

module.exports = {
    addJson: controllerWrapper(addJson),
    getJson: controllerWrapper(getJson),
};