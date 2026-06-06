function extractResponsibilities(text) {

    text = text.toLowerCase();

    const responsibilities = [];

    const responsibilityDB = [

        "develop",
        "maintain",
        "optimize",
        "debug",
        "frontend",
        "backend",
        "api",
        "responsive",
        "collaborate",
        "code review"
    ];

    responsibilityDB.forEach(item => {

        if (
            text.includes(item)
        ) {

            responsibilities.push(item);
        }
    });

    return responsibilities;
}

module.exports =
extractResponsibilities;