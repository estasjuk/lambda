const { Schema, model } = require("mongoose");

const handleMongooseError = require("../utils/handleMongooseError");

const cryptoSchema = new Schema(
    {
        symbol: String,
        price: Number,
        market: String,
    },
    { versionKey: false, timestamps: true }
);

cryptoSchema.post("save", handleMongooseError);

const Crypto = model("crypto", cryptoSchema);

module.exports = {
    Crypto,
};