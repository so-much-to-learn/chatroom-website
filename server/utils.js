/**
 * 生成随机id
 * @param digit 几位
 * @param noRepeatArr 不与重复的数字数组
 * @returns {number}
 */
const randomNum = (noRepeatArr = [], digit = 7) => {
    const rnum = Math.floor(Math.random() * Math.pow(10, digit))
    if (noRepeatArr.includes(rnum)) {
        return randomNum(digit, noRepeatArr)
    }
    return rnum
}

module.exports = {
    randomNum
}
