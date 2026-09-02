const skills = require("./skillDatabase");

function normalizeText(text = "") {
    return String(text)
        .toLowerCase()
        .replace(/[–—]/g, "-")
        .replace(/\s+/g, " ")
        .trim();
}

function escapeRegex(value = "") {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsSkill(text, alias) {
    const escaped = escapeRegex(
        normalizeText(alias)
    );

    const regex = new RegExp(
        `(^|[^a-zA-Z0-9+#])${escaped}(?=$|[^a-zA-Z0-9+#])`,
        "i"
    );

    return regex.test(text);
}

function extractJDSkills(jobDescription = "") {

    const text = normalizeText(jobDescription);

    const foundSkills = [];

    for (const skill of skills) {

        const matched = skill.aliases.some(
            alias =>
                containsSkill(
                    text,
                    alias
                )
        );

        if (matched) {
            foundSkills.push(skill.name);
        }
    }

    return [...new Set(foundSkills)];
}

module.exports = extractJDSkills;