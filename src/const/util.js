export const currency = ["RUB","USD","EUR","JPY"]
export  const currencySign = ['₽','$','€','¥']
export const MAX_DIGIT = 8
export const regPass = /[a-z A-Z 0-9_]{6,12}/
export const regMail =/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
export const BASE = "RUB"
export const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
};
export const VALUES = {
    USD: 1000,
    EUR:2000,
    JPY:3000,
    RUB:4000,
}

export const  data = {
    EUR: 0.011542,
    JPY: 1.484951,
    RUB: 1,
    USD: 0.012851,
}
export const getNumber = (vals) => {
    const result = {...vals}
    for (let key in result) {
        const temp= vals[key].toString()
        const val = temp.split('')

        result[key] = currencySign.includes(val[val.length-1]) ?
            Number(temp.split('').slice(0,temp.length-1).join(''))
            : Number(temp)
    }
    return result
}

export const inputValidateNumbers = (event) => {
    const value = event.target.value
    const reg = /(^\d+$)|(^\d+\.[0-9]{0,2}$)/
    return  reg.test(value) || value === ''
}
export const getPattern = (str) => {
    const temp = str.toString();
    return temp.split('').splice(1,temp.length).splice(0,temp.length-2).join('')
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
