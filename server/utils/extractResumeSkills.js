const skills =
require("./skillDatabase");

function extractResumeSkills(
    resumeText
) {

    const text =
        resumeText.toLowerCase();

    const foundSkills = [];

    for (const skill of skills) {

        const matched =
            skill.aliases.some(
                alias => {

                    const regex =
                        new RegExp(
                            `\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
                            "i"
                        );

                    return regex.test(text);
                }
            );

        if (matched) {

            foundSkills.push(
                skill.name
            );
        }
    }

    return foundSkills;
}

module.exports =
extractResumeSkills;