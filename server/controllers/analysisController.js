const Resume =
require("../models/Resume");

const Analysis =
require("../models/Analysis");

const {
    generateSuggestions,
    generateCoverLetter
} = require("../services/aiService");

const analyzeResume =
require("../services/atsService");


// ======================
// ATS ANALYSIS
// ======================

exports.analyze = async (req, res) => {

    try {

        const {
            resumeId,
            jobDescription
        } = req.body;

        const resume =
            await Resume.findById(
                resumeId
            );

        if (!resume) {

            return res.status(404).json({

                success: false,

                message:
                "Resume not found"
            });
        }

        const result =
            await analyzeResume(

                resume.extractedText,

                jobDescription
            );

        console.log(
            "\n===== ATS RESULT ====="
        );

        console.log(result);

        const analysis =
            await Analysis.create({

                user:
                req.user.id,

                resume:
                resumeId,

                jobDescription,

                atsScore:
                result.atsScore,

                matchedKeywords:
                result.matched,

                missingKeywords:
                result.missing
            });

        res.status(200).json({

            success: true,

            atsScore:
            result.atsScore,

            matchedKeywords:
            result.matched,

            missingKeywords:
            result.missing,

            breakdown:
            result.breakdown,

            analysis
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
            error.message
        });
    }
};

// ======================
// AI FEEDBACK
// ======================

exports.aiAnalysis =
async (req, res) => {

    try {

        const {
            resumeId,
            jobDescription
        } = req.body;

        const resume =
            await Resume.findById(
                resumeId
            );

        if (!resume) {

            return res.status(404)
            .json({

                success: false,

                message:
                "Resume not found"
            });
        }

        const feedback =
            await generateSuggestions(

                resume.extractedText,

                jobDescription
            );

        res.status(200).json({

            success: true,

            feedback
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
            error.message
        });
    }
};


// ======================
// COVER LETTER
// ======================

exports.coverLetter =
async (req, res) => {

    try {

        const {
            resumeId,
            jobDescription
        } = req.body;

        const resume =
            await Resume.findById(
                resumeId
            );

        if (!resume) {

            return res.status(404)
            .json({

                success: false,

                message:
                "Resume not found"
            });
        }

        const coverLetter =
            await generateCoverLetter(

                resume.extractedText,

                jobDescription
            );

        res.status(200).json({

            success: true,

            coverLetter
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
            error.message
        });
    }
};