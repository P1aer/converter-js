import React, {useState} from "react";
import {digitCheck, getNumber, inputValidateNumbers, MAX_DIGIT} from "../../../const/util";
import {updateDoc, doc, getDoc, addDoc, collection} from 'firebase/firestore';
import {db} from "../../../index";
import {useDispatch, useSelector,} from "react-redux";
import {addTransaction} from "../../../redux/transaction.slice";

export const Send = ({values, set}) => {
    const [value, setValue] = useState({
        Amount: 0,
        Currency: "",
        To: '',
        message: ''
    })
    const dispatch = useDispatch()
    const id = useSelector(state => state.user.data.id)
    const [isLoad,setLoad] = useState(false)
    const inputOnChange = (ev) => {
        if (inputValidateNumbers(ev)) {
            setValue(prev => ({...prev,[ev.target.name]:ev.target.value}))
        }
    }
    const onChange = (ev) => {
        setValue(prev => ({...prev,[ev.target.name]:ev.target.value}))
    }
    const onClick = async () => {
        try {
            const wallet = getNumber({...values})
            setValue(prev => ({...prev,message:''}))
            if (wallet[value.Currency] < value.Amount) {
                setValue(prev => ({...prev,message:'Not enough money'}))
                return
            }
            if (value.To === id) {
                setValue(prev => ({...prev,message:'You cant send money to yourself'}))
                return
            }
            const docRef = doc(db,'users',value.To)
            setLoad(true)
            const docSnap = await getDoc(docRef)
           if (!docSnap.data()) {
               setValue(prev => ({...prev,message:'No such id exist'}))
               return
           }
            if (!digitCheck(docSnap.data().currency[value.Currency] + Number(value.Amount),
                MAX_DIGIT)){
                setValue(prev => ({...prev,message:'Receiver will have to much money!'}))
                return
            }
            const myDoc = doc(db,'users',id)
            await updateDoc(myDoc, {
                currency: {
                    ...wallet,
                    [value.Currency]: wallet[value.Currency] - value.Amount
                }
            })
            await updateDoc(docRef, {
                currency: {
                    ...docSnap.data().currency,
                    [value.Currency]: docSnap.data().currency[value.Currency] + Number(value.Amount)
                }
            })
            set({[value.Currency]:wallet[value.Currency] - value.Amount})
            const obj = {
                from: id,
                to: value.To,
                value: Number(value.Amount),
                time: new Date(),
                currency: value.Currency
            }
            await addDoc(collection(db,'transactions'), obj)
            dispatch( addTransaction( {
                from: id,
                to: value.To,
                value: Number(value.Amount),
                time: Number(Date.now()),
                currency: value.Currency
            }))
            setValue(prev => ({...prev,message:'Transaction completed'}))
        }
        catch (e) {
            setValue(prev => ({...prev,message:'Transaction failed'}))
            alert(e.message)
        }
        finally {
            setLoad(false)
        }
    }
    return (
        <div className='send'>
            <div className='converter'>
                <div className='send-cont'>
                    <label className='input'>
                        <span>Amount</span>
                        <input onChange={inputOnChange} name={'Amount'} value={value.Amount}/>
                    </label>
                    <label className='input'>
                        <span>Currency</span>
                        <select onChange={onChange}
                                name={'Currency'} value={value.Currency}>
                            <option value=''/>
                            <option>RUB</option>
                            <option>USD</option>
                            <option>EUR</option>
                            <option>JPY</option>
                        </select>
                    </label>
                </div>
                <label style={{maxWidth:'250px'}} className='input'>
                    <span>To</span>
                    <input style={{fontSize:'14px',maxWidth:'250px',paddingLeft:'10px'}}
                           placeholder={'eeeeesadsda123r11'} onChange={onChange} name={'To'} />
                </label>
            </div>
            <div className={'result'}>
                <p>{value.message}</p>
                <button onClick={onClick} disabled={isLoad || !value.Currency || !value.Amount || !value.To}
                        className={'convert-btn'}>Send</button>
            </div>
        </div>
    )
}
