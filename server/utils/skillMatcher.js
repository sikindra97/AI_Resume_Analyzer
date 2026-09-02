// utils/skillMatcher.js

const extractResumeSkills =
    require("./extractResumeSkills");

const extractJDSkills =
    require("./extractJDSkills");

function skillMatcher(
    resumeText = "",
    jobDescription = ""
) {

    const resumeSkills =
        extractResumeSkills(resumeText);

    const jdSkills =
        extractJDSkills(jobDescription);

    const matched =
        jdSkills.filter(skill =>
            resumeSkills.includes(skill)
        );

    const missing =
        jdSkills.filter(skill =>
            !resumeSkills.includes(skill)
        );

    const atsScore =
        jdSkills.length > 0
            ? Math.round(
                (matched.length / jdSkills.length) * 100
            )
            : 0;

    return {

        atsScore,

        resumeSkills,

        jdSkills,

        matched,

        missing,

        totalJD: jdSkills.length,

        totalMatched: matched.length,

        totalMissing: missing.length
    };
}

module.exports = skillMatcher;