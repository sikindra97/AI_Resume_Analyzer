const Resume = require("../models/Resume");
const Analysis = require("../models/Analysis");

const {
    generateSuggestions,
    generateCoverLetter
} = require("../services/aiService");

const analyzeResume = require("../services/atsService");

exports.analyze = async (req, res) => {
    try {
        const {
            resumeId,
            jobDescription
        } = req.body;

        if (!resumeId) {
            return res.status(400).json({
                success: false,
                message: "Resume ID is required"
            });
        }

        if (!jobDescription || !jobDescription.trim()) {
            return res.status(400).json({
                success: false,
                message: "Job description is required"
            });
        }

        if (jobDescription.trim().length < 100) {
            return res.status(400).json({
                success: false,
                message: "Please provide a complete job description"
            });
        }

        const resume = await Resume.findById(resumeId);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const result = analyzeResume(
            resume.extractedText,
            jobDescription
        );

        console.log("\n===== ATS RESULT =====");
        console.log(result);

        const analysis = await Analysis.create({
            user: req.user.id,
            resume: resumeId,
            jobDescription,
            atsScore: result.atsScore,
            matchedKeywords: result.matched,
            missingKeywords: result.missing,
            breakdown: result.breakdown
        });

        return res.status(200).json({
            success: true,
            atsScore: result.atsScore,
            matchedKeywords: result.matched,
            missingKeywords: result.missing,
            breakdown: result.breakdown,
            analysis
        });

    } catch (error) {
        console.error("ATS ANALYSIS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "ATS analysis failed"
        });
    }
};

exports.aiAnalysis = async (req, res) => {
    try {
        const {
            resumeId,
            jobDescription
        } = req.body;

        if (!resumeId || !jobDescription) {
            return res.status(400).json({
                success: false,
                message: "Resume ID and job description are required"
            });
        }

        const resume = await Resume.findById(resumeId);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const feedback = await generateSuggestions(
            resume.extractedText,
            jobDescription
        );

        return res.status(200).json({
            success: true,
            feedback
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.coverLetter = async (req, res) => {
    try {
        const {
            resumeId,
            jobDescription
        } = req.body;

        if (!resumeId || !jobDescription) {
            return res.status(400).json({
                success: false,
                message: "Resume ID and job description are required"
            });
        }

        const resume = await Resume.findById(resumeId);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const coverLetter = await generateCoverLetter(
            resume.extractedText,
            jobDescription
        );

        return res.status(200).json({
            success: true,
            coverLetter
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};