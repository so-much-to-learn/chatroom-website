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

const guid = () => {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

module.exports = {
    randomNum,
    guid
}
