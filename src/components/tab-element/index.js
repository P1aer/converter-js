import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './tabs.scss'
import React, {useEffect, useState} from "react";
import {Input} from "../input";
import './index.scss'
import {currency, currencySign} from "../../const/util";

export const TabMenu = ({ set }) => {
    const [inputs,setInputs] = useState({})

    const onChange = (event) => {
        set(prevState =>({...prevState,["USD"]: event.target.value}))
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
    const ready = (inputs['From'] === ' ') || (inputs['To']=== ' ') || !Number(inputs['Amount']) ||
        !inputs['From'] || !inputs['To']

/*    const [data, dataSet] = useState(null)
    useEffect(() =>
    {
        const fetchData = async () =>{
            const data = await fetch('https://www.cbr-xml-daily.ru/latest.js')
            const response = await data.json()
            dataSet(response)
        }
        fetchData()
    },[])*/

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
                        <Input onChang={onChange} label='Amount'  opacity={1} sign={findSign("From")} />
                        <Input watch={[inputs['From']]} onChang={onChange} label='From'  opacity={1} sign={''}  select={true} option={[' ',...currency]}/>
                        <img onClick={onSwitch} className='swap' src={'./swap icon.svg'} alt='swap icon'/>
                        <Input watch={[inputs['To']]} onChang={onChange} label='To'  opacity={1} sign={''} select={true} option={[' ',...currency]}/>

                    </div>
                    <div className='result'>
                        <label className='input'>
                            <span>Total</span>
                            <output>{!ready? 5 * inputs['Amount'] + findSign("To"): ''}</output>
                        </label>
                        <p>
                            <a href="https://www.cbr-xml-daily.ru/">Курсы валют, API</a>
                            <br/> {
                            !ready ?
                                <>
                                    1 {inputs["From"]}  = 113.912  {inputs["To"]}
                                    <br/>
                                    1 {inputs["To"]} = 0.00877874  {inputs["From"]}
                                </> : ''
                        }

                        </p>
                        <button disabled={ready}
                                className='convert-btn'> Convert</button>
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
