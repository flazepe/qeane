/**
 * Transforms miliseconds into a timestamp
 * @param {Number} duration - the duration (in miliseconds)
 * @returns {String} The duration (ex: "05:45")
 */
module.exports = function duration(duration) {
    let totalSeconds = duration/1000
    totalSeconds %= 3600;
    let hours = Math.floor(totalSeconds / 3600) % 24;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    minutes=minutes>=10?minutes:"0"+minutes
    seconds=seconds>=10?seconds:"0"+seconds
    return `${hours}:${minutes}:${secondste}`
    
}