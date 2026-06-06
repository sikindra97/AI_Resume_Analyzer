const Resume =
require("../models/Resume");

const extractPDFText =
require("../services/pdfService");


// Upload Resume

exports.uploadResume =
async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message:
                    "Please upload a PDF"
            });
        }

        const extractedText =
            await extractPDFText(
                req.file.path
            );

        const resume =
            await Resume.create({

                user:
                    req.user.id,

                fileName:
                    req.file.originalname,

                extractedText
            });

        res.status(201).json({

            success: true,

            message:
                "Resume Uploaded",

            resume
        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message
        });
    }
};


// Get All Resumes

exports.getAllResumes =
async (req, res) => {

    try {

        const resumes =
            await Resume.find({
                user:
                    req.user.id
            });

        res.status(200).json({
            success: true,
            resumes
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                error.message
        });
    }
};


// Get Single Resume

exports.getResume =
async (req, res) => {

    try {

        const resume =
            await Resume.findById(
                req.params.id
            );

        if (!resume) {

            return res.status(404).json({
                success: false,
                message:
                    "Resume Not Found"
            });
        }

        res.status(200).json({
            success: true,
            resume
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                error.message
        });
    }
};