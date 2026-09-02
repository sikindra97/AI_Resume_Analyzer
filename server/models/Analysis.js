const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        resume: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume",
            required: true
        },

        jobDescription: {
            type: String,
            required: true
        },

        atsScore: {
            type: Number,
            default: 0
        },

        matchedKeywords: {
            type: [String],
            default: []
        },

        missingKeywords: {
            type: [String],
            default: []
        },

        breakdown: {

            skillScore: {
                type: Number,
                default: 0
            },

            experienceScore: {
                type: Number,
                default: 0
            },

            educationScore: {
                type: Number,
                default: 0
            },

            responsibilityScore: {
                type: Number,
                default: 0
            },

            resumeQualityScore: {
                type: Number,
                default: 0
            }
        }
    },

    {
        timestamps: true
    }
);

module.exports =
    mongoose.model("Analysis", analysisSchema);