export const currency = ["RUB","USD","EUR","JPY"]
export  const currencySign = ['₽','$','€','¥']
export const MAX_DIGIT = 8
export const BASE = "RUB"
export const  data = {
    EUR: 0.011542,
    JPY: 1.484951,
    RUB: 1,
    USD: 0.012851,
}

export const inputValidateNumbers = (event) => {
    const value = event.target.value
    const reg = /(^\d+$)|(^\d+\.[0-9]{0,2}$)/
    return  reg.test(value) || value === ''
}

export const addNums = (tmp) => {
    if(tmp.length === 0) {
        tmp.push('0.00')
        return
    }
    const arr = [...tmp]
    const res = arr.join('').split('.')
    if (res.length > 1) {
        for (let i = res[1].length; i< 2;i++){
            tmp.push('0')
        }
    }
}

export const digitCheck = (num, count) => {
    let temp = num
    for(let i = 1; i<= count;i++) {
        temp /= 10
    }
    return temp < 1
}
