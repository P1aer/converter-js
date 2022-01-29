import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './tabs.scss'
import React, {useEffect, useState} from "react";
import {Input} from "../input";
import './index.scss'
import { currency, currencySign, digitCheck, MAX_DIGIT} from "../../const/util";

export const TabMenu = ({ set, values }) => {
    const [inputs,setInputs] = useState({
        Amount: '0'
    })
    const [data, dataSet] = useState({})

    const [num] = getNumber(inputs['Amount']) || 0
    console.log(num)
    const ready = (inputs['From'] === ' ') || (inputs['To']=== ' ') || !num ||
        !inputs['From'] || !inputs['To']

    const k = countRates(data[inputs['From']],data[inputs['To']])

    const onClickBtn = () => {
        const [value, valueSign] = getNumber(values[inputs['From']])
        const [incr,incrSign] = getNumber(values[inputs['To']])
        const result = (num * k)+ incr
        if (value >= num && digitCheck(result,MAX_DIGIT) ) {
            set(prev => ({...prev,
                [inputs['From']]: (value - num).toFixed(2) + valueSign,
                [inputs['To']]: result.toFixed(2) + incrSign
            }))
        }

    }

    function getNumber(str) {
        const temp = str.split('')
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
   return (
        <Tabs>
            <TabList>
                <Tab>Converter</Tab>
                <Tab>Send</Tab>
                <Tab>History</Tab>
            </TabList>
            <TabPanel>
                <div>
                    <div className='converter'>
                        <Input
                               setInput={setInputs}
                               onChang={onChange}
                               label='Amount'
                               opacity={1}
                               sign={findSign("From")} >{inputs['Amount']}</Input>
                        <Input
                            setInput={setInputs}
                            watch={[inputs['From']]}
                            onChang={onChange} label='From'
                            opacity={1}
                            sign={''}
                            select={true}
                            option={[' ',...currency]} > </Input>
                        <img onClick={onSwitch} className='swap' src={'./swap icon.svg'} alt='swap icon'/>
                        <Input
                            setInput={setInputs}
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
                        <button disabled={ready}
                                className='convert-btn'
                                onClick={onClickBtn}> Convert</button>
                    </div>

                </div>

            </TabPanel>
            <TabPanel>
                <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
                <h2>Any content 3</h2>
            </TabPanel>
        </Tabs>
    )
};
