const mongoose = require("mongoose");

const resumeSchema =
new mongoose.Schema(
{
    user: {
        type:
            mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    fileName: {
        type: String,
        required: true
    },

    extractedText: {
        type: String
    },

    atsScore: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

module.exports =
mongoose.model(
    "Resume",
    resumeSchema
);