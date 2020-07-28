module.exports = (gain) => {
    const bands = [
        { band: 0, gain: 0.1875 },
        { band: 1, gain: 0.1875 },
        { band: 2, gain: 0.125 },
        { band: 3, gain: 0.125 }
    ]
    const tmp = [];
    bands.map(band => {
        if (gain === 0) band.gain = 0
        band.gain = band.gain + gain
        tmp.push(band)
    })
    return tmp;
}//it will automaticly be placed at client.funcions.getEq