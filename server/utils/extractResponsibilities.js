function extractResponsibilities(text) {

    const normalized = String(text || "")
        .toLowerCase()
        .replace(/\s+/g, " ");

    const responsibilities = [];

    const responsibilityPatterns = {

        develop: [
            /\bdevelop\b/i,
            /\bdeveloped\b/i,
            /\bdeveloping\b/i,
            /\bbuild\b/i,
            /\bbuilt\b/i,
            /\bcreate\b/i,
            /\bcreated\b/i,
            /\bimplement\b/i,
            /\bimplemented\b/i
        ],

        maintain: [
            /\bmaintain\b/i,
            /\bmaintained\b/i,
            /\bmaintenance\b/i
        ],

        design: [
            /\bdesign\b/i,
            /\bdesigned\b/i,
            /\bdesigning\b/i
        ],

        optimize: [
            /\boptimize\b/i,
            /\boptimized\b/i,
            /\boptimization\b/i
        ],

        frontend: [
            /\bfrontend\b/i,
            /\bfront-end\b/i
        ],

        backend: [
            /\bbackend\b/i,
            /\bback-end\b/i
        ],

        api: [
            /\bapi\b/i,
            /\bapis\b/i,
            /\brest api\b/i,
            /\brestful api\b/i
        ],

        responsive: [
            /\bresponsive\b/i,
            /\bmobile responsive\b/i
        ],

        collaborate: [
            /\bcollaborate\b/i,
            /\bcollaboration\b/i,
            /\bteam player\b/i,
            /\bteamwork\b/i,
            /\bteam work\b/i
        ],

        "code review": [
            /\bcode review\b/i,
            /\bcode reviews\b/i
        ],

        debug: [
            /\bdebug\b/i,
            /\bdebugging\b/i,
            /\bdebugged\b/i
        ],

        testing: [
            /\btesting\b/i,
            /\btest\b/i,
            /\btested\b/i
        ]
    };

    for (
        const [name, patterns]
        of Object.entries(responsibilityPatterns)
    ) {

        if (
            patterns.some(pattern =>
                pattern.test(normalized)
            )
        ) {
            responsibilities.push(name);
        }
    }

    return responsibilities;
}

module.exports = extractResponsibilities;