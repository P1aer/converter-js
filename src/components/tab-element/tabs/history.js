import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {options} from "../../../const/util";
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { collection, query, where} from "firebase/firestore";
import {db} from "../../../index";
import {setDataTransaction} from "../../../redux/transaction.slice";


export const History = () => {
    const dispatch = useDispatch()
    const id = useSelector(state => state.user.data.id)
    const q1 = query(collection(db, "transactions"), where("from", '==', id));
    const q2 = query(collection(db, "transactions"), where("to", '==', id));
    const [data1,loading1] = useCollectionDataOnce(q1)
    const [data2,loading2] = useCollectionDataOnce(q2)
    const transactions = useSelector(state => state.transaction.data)
    const [value, setValue] = useState(transactions)

    useEffect(()=> {
        if(!loading1 && !loading2) {
            const arr = [...data1,...data2].map((elem) => {
               elem.time=  Number(elem.time.toDate())
                return elem
            })
            arr.sort((a,b) => {
               return b.time - a.time
            })
            dispatch(setDataTransaction([...arr]))
            setValue([...arr])
        }
    },[loading1,loading2])
    return (
        <ul className='history' >
            {
                value.length ?
                value.map((elem,indx) => {
                    const dateFix = new Date(elem.time)
                    const child = id !== elem.from ?
                        <span>{dateFix.toLocaleString("ru",options)}{' '}
                         {elem.from }{' '} send you <b>{elem.value} {elem.currency}</b>. Don't forget to thank him!</span>
                        : <span>{dateFix.toLocaleString("ru",options)} {' '}
                         You send to {elem.to }{' '}<b>{elem.value} {elem.currency}</b>. Don't judge the rich one!</span>
                    return (
                        <li key={indx} className='transaction'>
                            {
                                child
                            }
                        </li>
                    )
                } ) : 'No transactions yet ;('

            }
        </ul>
    )
}
