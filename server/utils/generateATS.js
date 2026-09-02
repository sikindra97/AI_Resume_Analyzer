function generateATS(matched, total) {

    if (!total) {
        return 0;
    }

    return Math.round(
        (matched / total) * 100
    );
}

module.exports = generateATS;