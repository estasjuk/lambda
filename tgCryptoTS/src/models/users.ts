const { Schema, model } = require("mongoose");
const handleMongooseError = require("../utils/handleMongooseError");

const userSchema = new Schema(
    {
        chatId: Number,
        name: String,
        favorite_coins: [String],
    },
    { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = {
    User,
}

export {}