import React, {useEffect, useState} from "react";
import {currency, currencySign, digitCheck, MAX_DIGIT} from "../../../const/util";
import {Input} from "../../input";

export const Convert = ({set, values})=> {
    const [inputs,setInputs] = useState({
        Amount: '0'
    })
    const [message, setMessage] = useState('')
    const [isUpdate, setUpdate] = useState(false)
    const [data, dataSet] = useState({})

    const [num] = getNumber(inputs['Amount']) || 0
    const ready = (inputs['From'] === ' ') || (inputs['To']=== ' ') || !num ||
        !inputs['From'] || !inputs['To']

    const k = countRates(data[inputs['From']],data[inputs['To']])

    const onClickBtn = async () => {
        const [value, valueSign] = getNumber(values[inputs['From']])
        const [incr,incrSign] = getNumber(values[inputs['To']])
        const result = (num * k)+ incr
        setMessage('')
        if (!(value >= num) ) {
            setMessage('Not enough money!')
            return
        }
        if (!digitCheck(result,MAX_DIGIT)) {
            setMessage(`one money field can only  handle ${MAX_DIGIT} digit number`)
            return
        }
            try {
                setUpdate(true)
                await set({
                    [inputs['From']]: (value - num).toFixed(2) + valueSign,
                    [inputs['To']]: result.toFixed(2) + incrSign
                },true)
            }
            catch (e) {
                alert(e.message)
            }
            finally {
                setUpdate(false)
            }

    }

    function getNumber(str) {
        const temp = str.toString().split('')
        if (isNaN(+temp[temp.length-1])) {
            const sign = temp[temp.length-1]
            const num = Number(temp.slice(0,temp.length-1).join(''))
            return [num,sign]
        }
        else {
            const num = Number(temp.join(''))
            const sign = ''
            return [num,sign]
        }
    }

    function countRates(from,to) {
        try {
            return (to / from).toFixed(4)
        }
        catch (e) {
            return 0
        }
    }
    const onChange = (event) => {
        setInputs(prevState =>({...prevState,[event.target.id]: event.target.value}) )
    }
    const onSwitch = () => {
        setInputs(prevState =>({...prevState,From: inputs['To'],To:inputs['From']}))
    }

    const findSign = (value) => {
        const indx = currency.findIndex((elem)=> elem===inputs[value] )
        if (indx !== -1) {
            return currencySign[indx]
        }
        else  return ''
    }

    useEffect(() =>
    {
        const fetchData = async () =>{
            const data = await fetch('https://www.cbr-xml-daily.ru/latest.js')
            const response = await data.json()
            response.rates['RUB'] = 1
            dataSet(response.rates)
        }
        fetchData()
    },[])
    useEffect(() => {
        const sign = findSign("From")
        setInputs(prev => ({...prev,Amount: num + sign}))
    },[inputs["From"]])

    const setValue = (objVal, bool = false) =>{
        setInputs(prev => ({...prev,...objVal }))
    }
    return (
        <div>
            <div className='converter'>
                <Input
                    setInput={setValue}
                    onChang={onChange}
                    label='Amount'
                    opacity={1}
                    sign={findSign("From")} >{inputs['Amount']}</Input>
                <Input
                    setInput={setValue}
                    watch={[inputs['From']]}
                    onChang={onChange} label='From'
                    opacity={1}
                    sign={''}
                    select={true}
                    option={[' ',...currency]} > </Input>
                <img onClick={onSwitch} className='swap' src={'./swap icon.svg'} alt='swap icon'/>
                <Input
                    setInput={setValue}
                    watch={[inputs['To']]}
                    onChang={onChange}
                    label='To'
                    opacity={1}
                    sign={''}
                    select={true}
                    option={[' ',...currency]}> </Input>

            </div>
            <div className='result'>
                <label className='input'>
                    <span>Total</span>
                    <output>{!ready ? (num*k).toFixed(2) + findSign('To'): ' '}</output>
                    <span style={{textAlign:'center',position:'absolute',bottom:"-50%",width:'100%'}}> {message}</span>
                </label>
                <p>
                    <a href="https://www.cbr-xml-daily.ru/">Курсы валют, API</a>
                    <br/> {
                    !ready ?
                        <>
                            1 {inputs["From"]}  = {k}  {inputs["To"]}
                            <br/>
                            1 {inputs["To"]} = {countRates(data[inputs['To']],data[inputs['From']])}  {inputs["From"]}
                        </> : ''
                }

                </p>
                <button disabled={ready|| isUpdate}
                        className='convert-btn'
                        onClick={onClickBtn}> Convert</button>
            </div>

        </div>
    )
}
