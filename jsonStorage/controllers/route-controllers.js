const { Route } = require('../db/models/routes');
const HttpError = require('../utils/HttpError');
const controllerWrapper = require("../utils/controllerWrapper");

const addJson = async (req, res) => {
        const route = req.url.slice(1) //через req.params не подходит, потому что если юзер введет символ "?", то все, что после него в req.params не попадет
        const data = req.body;

        if (!route || route.includes('?') || route.includes(' ')) {
            throw HttpError.BadRequest("Please, enter the valid route")
        };  

        if ((JSON.stringify(data) === '{}')) {
            throw HttpError.BadRequest("Please, enter the request body")
        };      

        const duplicate = await Route.findOne({ route }).lean();

        if (duplicate) {
            throw HttpError.ConflictError("This route already in use")
        }

        const result = await Route.create({ route, data })

        res.status(201).json({
            result,
        });
};

const getJson = async (req, res) => {
    const route = req.url.slice(1);

    if (!route || route.includes('?') || route.includes(' ')) {
        throw HttpError.BadRequest("Please, enter the valid route")
    };  

    const result = await Route.findOne({route});
    console.log(result);

    if (!result) {
        throw HttpError.NotFoundError("Route not found");
      }
    
    res.status(200).json({
        info: result.data,
    });
    
};

module.exports = {
    addJson: controllerWrapper(addJson),
    getJson: controllerWrapper(getJson),
};