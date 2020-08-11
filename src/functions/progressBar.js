module.exports = (inTotal, Total) => {
    options = {
        elapsedChar: "-",
        progressChar: "+",
        emptyChar: "-"
    };

    let progressBar = "", fillLine;

    for (fillLine = 0; fillLine < (parseInt(inTotal) / parseInt(Total)) * 50; fillLine++) {
        progressBar += options.elapsedChar.toString();
    }

    progressBar += options.progressChar.toString();

    for (let emptyLine = 0; emptyLine < 50 - fillLine - 1; emptyLine++) {
        progressBar += options.emptyChar.toString();
    }
    return progressBar;
}