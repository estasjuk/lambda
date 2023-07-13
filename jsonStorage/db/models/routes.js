const { Schema, model } = require("mongoose");

const handleMongooseError = require("../../utils/handleMongooseError");

const routeSchema = new Schema(
    {
        route: {
            type: String,
            required: true,
        },
        data: {
            type: Object || Array,
    }
},
    { versionKey: false, timestamps: true }
);

routeSchema.post("save", handleMongooseError);

const Route = model("route", routeSchema);

module.exports = {
    Route,
};