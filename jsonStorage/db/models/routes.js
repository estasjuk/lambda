const { Schema, model } = require("mongoose");

const handleMongooseError = require("../../utils/handleMongooseError");

const routeSchema = new Schema(
    {
        name: {
        type: String,
        required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

routeSchema.post("save", handleMongooseError);

const Route = model("route", routeSchema);

module.exports = {
    Route,
};