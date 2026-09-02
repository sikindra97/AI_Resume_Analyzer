function extractEducation(text) {
    const normalized = String(text || "")
        .toLowerCase()
        .replace(/\s+/g, " ");

    const education = [];

    const educationAliases = {
        bachelor: [
            "bachelor",
            "bachelor's",
            "bachelors",
            "b.tech",
            "btech",
            "b.e.",
            "be",
            "b.e"
        ],

        engineering: [
            "engineering",
            "engineer",
            "b.tech",
            "btech",
            "b.e.",
            "be"
        ],

        "computer science": [
            "computer science",
            "computer science engineering",
            "cse"
        ],

        "information technology": [
            "information technology",
            "information technology engineering",
            "b.tech in information technology",
            "btech in information technology",
            "it engineering"
        ],

        "software engineering": [
            "software engineering",
            "software development"
        ]
    };

    for (const [educationType, aliases] of Object.entries(
        educationAliases
    )) {
        if (
            aliases.some(alias =>
                normalized.includes(alias)
            )
        ) {
            education.push(educationType);
        }
    }

    return education;
}

module.exports = extractEducation;