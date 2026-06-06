const extractResumeSkills =
require("../utils/extractResumeSkills");

const extractJDSkills =
require("../utils/extractJDSkills");

const generateATS =
require("../utils/generateATS");


// ======================
// EDUCATION MATCHING
// ======================

function getEducation(text) {

    text = text.toLowerCase();

    const education = [];

    const educationAliases = {

        bachelor: [
            "bachelor",
            "b.tech",
            "be",
            "b.e."
        ],

        "computer science": [
            "computer science",
            "information technology",
            "it",
            "software engineering"
        ]
    };

    for (
        const [mainSkill, aliases]
        of Object.entries(
            educationAliases
        )
    ) {

        if (
            aliases.some(
                alias =>
                text.includes(alias)
            )
        ) {

            education.push(
                mainSkill
            );
        }
    }

    return education;
}


// ======================
// RESPONSIBILITY MATCHING
// ======================

function getResponsibilities(text) {

    text = text.toLowerCase();

    const responsibilities = [];

    const responsibilityAliases = {

        develop: [
            "develop",
            "developed",
            "implemented",
            "built",
            "created"
        ],

        maintain: [
            "maintain",
            "maintained"
        ],

        design: [
            "design",
            "designed"
        ],

        frontend: [
            "frontend",
            "front-end"
        ],

        backend: [
            "backend",
            "back-end"
        ],

        api: [
            "api",
            "apis",
            "rest api",
            "backend api"
        ],

        responsive: [
            "responsive",
            "mobile responsive"
        ],

        collaborate: [
            "collaborate",
            "collaboration",
            "team player",
            "team work"
        ],

        "code review": [
            "code review",
            "review"
        ],

        debug: [
            "debug",
            "debugging"
        ],

        testing: [
            "testing",
            "tested"
        ]
    };

    for (
        const [mainSkill, aliases]
        of Object.entries(
            responsibilityAliases
        )
    ) {

        if (
            aliases.some(
                alias =>
                text.includes(alias)
            )
        ) {

            responsibilities.push(
                mainSkill
            );
        }
    }

    return responsibilities;
}


// ======================
// EXPERIENCE MATCHING
// ======================

function getExperience(text) {

    text = text.toLowerCase();

    const experience = [];

    const experienceAliases = {

        experience: [
            "experience"
        ],

        internship: [
            "internship",
            "intern"
        ],

        training: [
            "training"
        ],

        developer: [
            "developer"
        ],

        project: [
            "project",
            "projects"
        ]
    };

    for (
        const [mainSkill, aliases]
        of Object.entries(
            experienceAliases
        )
    ) {

        if (
            aliases.some(
                alias =>
                text.includes(alias)
            )
        ) {

            experience.push(
                mainSkill
            );
        }
    }

    return experience;
}


// ======================
// MAIN ATS FUNCTION
// ======================

function analyzeResume(
    resumeText,
    jobDescription
) {

    const resumeSkills =
        extractResumeSkills(
            resumeText
        );

    const jdSkills =
        extractJDSkills(
            jobDescription
        );

    const matched = [];
    const missing = [];

    jdSkills.forEach(
        skill => {

            if (
                resumeSkills.includes(
                    skill
                )
            ) {

                matched.push(
                    skill
                );

            } else {

                missing.push(
                    skill
                );
            }
        }
    );

    const skillScore =
        generateATS(
            matched.length,
            jdSkills.length
        );

    // Education

    const resumeEducation =
        getEducation(
            resumeText
        );

    const jdEducation =
        getEducation(
            jobDescription
        );

    const matchedEducation =
        jdEducation.filter(
            item =>
            resumeEducation.includes(
                item
            )
        );

    const educationScore =
        generateATS(
            matchedEducation.length,
            jdEducation.length
        );

    // Experience

    const resumeExperience =
        getExperience(
            resumeText
        );

    const jdExperience =
        getExperience(
            jobDescription
        );

    const matchedExperience =
        jdExperience.filter(
            item =>
            resumeExperience.includes(
                item
            )
        );

    const experienceScore =
        generateATS(
            matchedExperience.length,
            jdExperience.length
        );

    // Responsibilities

    const resumeResponsibilities =
        getResponsibilities(
            resumeText
        );

    const jdResponsibilities =
        getResponsibilities(
            jobDescription
        );

    const matchedResponsibilities =
        jdResponsibilities.filter(
            item =>
            resumeResponsibilities.includes(
                item
            )
        );

    const responsibilityScore =
        generateATS(
            matchedResponsibilities.length,
            jdResponsibilities.length
        );

    // Final ATS Score

    const atsScore =
        Math.round(

            (skillScore * 0.60)

            +

            (experienceScore * 0.15)

            +

            (educationScore * 0.10)

            +

            (responsibilityScore * 0.15)
        );

    return {

        atsScore,

        matched,

        missing,

        breakdown: {

            skillScore,

            experienceScore,

            educationScore,

            responsibilityScore
        }
    };
}

module.exports =
analyzeResume;