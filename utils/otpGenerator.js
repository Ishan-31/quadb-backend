const generateOtp = () => {
    // generate 4 digit random number
    const otp = Math.floor(1000 + Math.random() * 9000)
    return otp
}

module.exports = generateOtp
