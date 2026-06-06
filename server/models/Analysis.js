const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume"
    },

    jobDescription: {
        type: String,
        required: true
    },

    atsScore: {
        type: Number
    },

    matchedKeywords: [
        String
    ],

    missingKeywords: [
        String
    ]
},
{
    timestamps: true
});

module.exports = mongoose.model(
    "Analysis",
    analysisSchema
);