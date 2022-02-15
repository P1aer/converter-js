import {addNums, digitCheck, getNumber, getPattern, inputValidateNumbers} from "./util";

describe("Функция getNumber тесты",() => {
    test("Коректная работа с смешенным объектом", () => {
        expect(getNumber({USD:"100",EUR:100})).toEqual({USD:100,EUR:100})

    })
    test('Работа с числами',() => {
        expect(getNumber({USD:2,EUR:0})).toEqual({USD:2,EUR:0})
    })
    test('Работа с строками',() => {
        expect(getNumber({USD:"213",EUR:'31231'})).toEqual({USD:213,EUR:31231})
        expect(getNumber({USD:"213$",EUR:'31231$'})).toEqual({USD:213,EUR:31231})
        expect(getNumber({USD:"213ds",EUR:'31231'})).toEqual({USD: NaN, EUR: 31231})
    })

})

describe("Функция inputValidate тесты",() => {
    let event = {
        target: {
            value: ''
        }
    }
    beforeAll( () => {
         event = {
            target: {
                value: ''
            }
        }
    })
    test("Коректная работа c простыми паттернами", () => {
        event.target.value = '23131'
        expect(inputValidateNumbers(event)).toBe(true)
        event.target.value = '231d31'
        expect(inputValidateNumbers(event)).toBe(false)
        event.target.value = '2321#$'
        expect(inputValidateNumbers(event)).toBe(false)
        event.target.value = ''
        expect(inputValidateNumbers(event)).toBe(true)
    })
    test("Коректная работа c плавающей точкой 2 точности", () => {
        event.target.value = '23131.'
        expect(inputValidateNumbers(event)).toBe(true)
        event.target.value = '0.0'
        expect(inputValidateNumbers(event)).toBe(true)
        event.target.value = '.'
        expect(inputValidateNumbers(event)).toBe(false)
        event.target.value = '1.111'
        expect(inputValidateNumbers(event)).toBe(false)
    })
})

describe("Функция getPattern тесты",() => {
    test("Коректная работа с строками", () => {
        expect(getPattern('/[dsds]/')).toBe('[dsds]')
        expect(getPattern('/[dsds + 0 00]/')).toBe('[dsds + 0 00]')
        expect(getPattern("(a)")).toBe('a')
    })
})

describe("Функция getPattern тесты",() => {
    test("Коректная работа с строками", () => {
        expect(getPattern('/[dsds]/')).toBe('[dsds]')
        expect(getPattern('/[dsds + 0 00]/')).toBe('[dsds + 0 00]')
        expect(getPattern("(a)")).toBe('a')
    })
})

describe("Функция digitCheck тесты",() => {
    test("Коректная работа с значениями", () => {
        expect(digitCheck(111,3)).toBe(true)
        expect(digitCheck(1112,3)).toBe(false)
        expect(digitCheck(11,3)).toBe(true)
    })
})

