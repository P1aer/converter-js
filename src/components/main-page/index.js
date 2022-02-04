import './main-page.scss'
import React, { useState} from "react";
import {Header} from "../header";
import {Input} from "../input";
import {TabMenu} from "../tab-element";
import {currency, currencySign, getNumber} from "../../const/util";
import {useDispatch, useSelector} from "react-redux";
import {doc,updateDoc} from "firebase/firestore";
import {db} from "../../index";
import {setDataWallet} from "../../redux/data.slice";

export const MainPage = ({name, id}) => {
    const values = useSelector(state => state.wallet.data)
    const tempVal= {...values}
    const dispatch = useDispatch()
    for (let key in values) {
        tempVal[key] = `${String(values[key])}${currencySign[currency.findIndex((elem) => elem === key)]}`
    }
    const [inputs, setInputs] = useState(tempVal)
    const [isUpdate, setUpdate] = useState(false)

    const editVal = async (valObj, save = false) => {
        try {
            if (save){
                const docRef = doc(db,'users',id)
                const vals = getNumber({...inputs,...valObj})
                setUpdate(true)
                await updateDoc(docRef, {
                    currency: {
                        ...vals,
                    }
                })
                dispatch(setDataWallet(vals))
            }
        }
        catch (e) {
            alert(e.message)
        }
        finally {
            setUpdate(false)
        }
        setInputs(prev => ({...prev,...valObj }))
    }

    return (
        <div className='wrapper'>
            <Header name={name ? `${name}#${id}`: 'Пользователь'} />
            <hr color=' #BFA3A3' size='1'/>
            <div className='body'>
                <h3>Ваш кошелек</h3>
                <div className='inputs'>
                    {
                        currency.map((elem,indx) => indx + 1 % 2 !==0 ?
                            <Input
                                disabled={isUpdate}
                                key={indx}
                                label={elem}
                                sign={currencySign[indx]}
                                setInput={editVal} >{inputs[elem] }</Input> :
                            <div className={'break'}/>
                        )
                    }
                </div>
                <TabMenu values={inputs} set={editVal}/>
            </div>
        </div>

    )
}
