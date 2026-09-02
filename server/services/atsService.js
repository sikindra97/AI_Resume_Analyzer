const extractResumeSkills =
    require("../utils/extractResumeSkills");

const extractJDSkills =
    require("../utils/extractJDSkills");

const extractEducation =
    require("../utils/extractEducation");

const extractResponsibilities =
    require("../utils/extractResponsibilities");

const generateATS =
    require("../utils/generateATS");

const calculateResumeQuality =
    require("../utils/resumeQuality");

function normalizeText(text) {
    return String(text || "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
}


function calculateExperienceScore(
    resumeText,
    jobDescription
) {
    const resume = normalizeText(resumeText);
    const jd = normalizeText(jobDescription);

    const experienceRequired =
        /\b(\d+)\+?\s*(years?|yrs?)\b/i.exec(jd);


    const mentionsExperience =
        /\b(experience|internship|intern|entry[- ]level|fresher|graduate)\b/i.test(
            jd
        );


    // If JD does not mention experience,
    // do not penalize the resume.

    if (!mentionsExperience) {
        return 100;
    }


    if (experienceRequired) {

        const requiredYears =
            Number(experienceRequired[1]);


        const resumeExperience =
            /\b(\d+)\+?\s*(years?|yrs?)\b/i.exec(
                resume
            );


        // Resume explicitly mentions years
        if (resumeExperience) {

            const resumeYears =
                Number(resumeExperience[1]);


            if (resumeYears >= requiredYears) {
                return 100;
            }


            return Math.min(
                100,
                Math.round(
                    (resumeYears / requiredYears) * 100
                )
            );
        }


        // Student / fresher with internship,
        // training or projects

        if (
            /\b(internship|intern|training|project|projects)\b/i.test(
                resume
            )
        ) {
            return 70;
        }


        return 0;
    }


    if (
        /\b(internship|intern)\b/i.test(jd)
    ) {

        return /\b(internship|intern|training)\b/i.test(
            resume
        )
            ? 100
            : 0;
    }


    if (
        /\b(entry[- ]level|fresher|graduate)\b/i.test(
            jd
        )
    ) {
        return 100;
    }


    return /\b(experience|internship|intern|training|project|projects)\b/i.test(
        resume
    )
        ? 80
        : 0;
}

function analyzeResume(
    resumeText,
    jobDescription
) {

    const resume =
        normalizeText(resumeText);

    const jd =
        normalizeText(jobDescription);

    const resumeSkills =
        extractResumeSkills(resume);

    const jdSkills =
        extractJDSkills(jd);


    const matchedSkills =
        jdSkills.filter(
            skill =>
                resumeSkills.includes(skill)
        );


    const missingSkills =
        jdSkills.filter(
            skill =>
                !resumeSkills.includes(skill)
        );


    const skillScore =
        jdSkills.length > 0
            ? generateATS(
                matchedSkills.length,
                jdSkills.length
            )
            : 100;

    const resumeEducation =
        extractEducation(resume);

    const jdEducation =
        extractEducation(jd);


    const matchedEducation =
        jdEducation.filter(
            item =>
                resumeEducation.includes(item)
        );


    const missingEducation =
        jdEducation.filter(
            item =>
                !resumeEducation.includes(item)
        );


    const educationScore =
        jdEducation.length > 0
            ? generateATS(
                matchedEducation.length,
                jdEducation.length
            )
            : 100;

    const resumeResponsibilities =
        extractResponsibilities(resume);

    const jdResponsibilities =
        extractResponsibilities(jd);


    const matchedResponsibilities =
        jdResponsibilities.filter(
            item =>
                resumeResponsibilities.includes(item)
        );


    const missingResponsibilities =
        jdResponsibilities.filter(
            item =>
                !resumeResponsibilities.includes(item)
        );


    const responsibilityScore =
        jdResponsibilities.length > 0
            ? generateATS(
                matchedResponsibilities.length,
                jdResponsibilities.length
            )
            : 100;

    const experienceScore =
        calculateExperienceScore(
            resume,
            jd
        );

    const resumeQualityScore =
        calculateResumeQuality(resume);

    const atsScore =
        Math.round(

            (skillScore * 0.50) +

            (experienceScore * 0.15) +

            (educationScore * 0.10) +

            (responsibilityScore * 0.15) +

            (resumeQualityScore * 0.10)

        );
    return {

        atsScore,

        matched: matchedSkills,

        missing: missingSkills,

        matchedSkills,

        missingSkills,
        matchedEducation,
        missingEducation,
        matchedResponsibilities,

        missingResponsibilities,
        breakdown: {

            skillScore,

            experienceScore,

            educationScore,

            responsibilityScore,

            resumeQualityScore

        },

        resumeSkills,

        jdSkills,

        resumeEducation,

        jdEducation,

        resumeResponsibilities,

        jdResponsibilities

    };
}


module.exports = analyzeResume;