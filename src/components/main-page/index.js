import './main-page.scss'
import React, {useState} from "react";
import {Header} from "../header";
import {Input} from "../input";
import {TabMenu} from "../tab-element";
import {currency, currencySign} from "../../const/util";

export const MainPage = () => {
    const state = {}
    for (let i =0;i< currency.length;i++) {
        state[currency[i]] = 2000 + currencySign[i]
    }
    const [inputs, setInputs] = useState(state)
    return (
        <div className='wrapper'>
            <Header name={'Пользователь'} />
            <hr color=' #BFA3A3' size='1'/>
            <div className='body'>
                <h3>Ваш кошелек</h3>
                <div className='inputs'>
                    {
                        currency.map((elem,indx) => indx + 1 % 2 !==0 ?
                            <Input
                                key={indx}
                                label={elem}
                                sign={currencySign[indx]}
                                setInput={setInputs} >{inputs[elem]}</Input> :
                            <div className={'break'}/>
                        )
                    }
                </div>
                <TabMenu values={inputs} set={setInputs}/>
            </div>
        </div>

    )
}
