/**
 * Setup the sliceEvery
 */
module.exports = function () {
    /**
     * Slices a string every x
     * @param {Number} num - The number of time to slice the string
     * @returns {Array} an array
     */
    String.prototype.sliceEvery = function sliceEvery(num) {
        if (!num || isNaN(num)) {
            throw new TypeError("No number provided");
        }
       return this.match(new RegExp(`.{${parseInt(num)}}`, "g"));
      }

      console.log("==SETUP== sliceEvery succesfully loaded!")
}
