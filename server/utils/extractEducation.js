function extractEducation(text) {

    text = text.toLowerCase();

    const education = [];

    if (
        text.includes("bachelor")
    ) {
        education.push("bachelor");
    }

    if (
        text.includes("computer science")
    ) {
        education.push("computer science");
    }

    if (
        text.includes("b.tech")
    ) {
        education.push("b.tech");
    }

    if (
        text.includes("engineering")
    ) {
        education.push("engineering");
    }

    return education;
}

module.exports =
extractEducation;