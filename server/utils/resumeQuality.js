function calculateResumeQuality(text) {

    const resume = String(text || "").toLowerCase();

    let score = 0;

    const sections = [
        "education",
        "experience",
        "projects",
        "skills",
        "certifications",
        "achievements"
    ];

    let sectionCount = 0;

    sections.forEach(section => {

        if (resume.includes(section)) {
            sectionCount++;
        }

    });

    score += Math.min(
        30,
        sectionCount * 5
    );

    if (
        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(resume)
    ) {
        score += 10;
    }

    if (
        /\b\d{10}\b/.test(resume)
    ) {
        score += 10;
    }
    const technicalKeywords = [

        "javascript",
        "react",
        "node.js",
        "express",
        "mongodb",
        "mysql",
        "sql",
        "git",
        "github",
        "api",
        "data structures",
        "algorithms"
    ];

    const technicalMatches =
        technicalKeywords.filter(
            skill =>
                resume.includes(skill)
        ).length;

    score += Math.min(
        20,
        technicalMatches * 2
    );

    if (
        /\b(project|projects)\b/i.test(resume)
    ) {
        score += 10;
    }

    if (
        /\b(experience|internship|training)\b/i.test(resume)
    ) {
        score += 10;
    }

    if (resume.length >= 1000) {
        score += 5;
    }

    if (resume.length >= 2000) {
        score += 5;
    }


    return Math.min(
        100,
        score
    );
}


module.exports = calculateResumeQuality;