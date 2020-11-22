/**
 * 删除数组中的元素
 * @param arr 目标数组
 * @param item 要删除的元素
 * @return {any[]}
 */
export const removeItemInArray = <T>(arr: T[], item: T): T[] | [] => {
    const idx = arr.findIndex(e => e === item)
    if (idx < 0) {
        throw new Error('这个数组里没有这个元素')
    }
    const arrCopy = [...arr]
    arrCopy.splice(idx, 1)
    return arrCopy
}

/**
 * 创建 UUID
 * @returns {string}
 */
export const createUUID = (): string => {
    let dt = new Date().getTime()
    return 'xxxxxxxx-xxxx-x4xx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (dt + Math.random() * 16) % 16 | 0
        dt = Math.floor(dt / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
}
