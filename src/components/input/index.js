import React, {useRef, useState} from "react";
import './input.scss'
import {addNums, currencySign, inputValidateNumbers, MAX_DIGIT} from "../../const/util";

export const Input = (
    {
        children = '',
        setInput,
        onChang = (...arg) =>{},
        read = false,
        label,
        opacity='.6',
        sign='$',
        select = false,
        disabled = false,
        option = [],
        watch = []
}) => {
    const refElem= useRef(null)
    const onFocus= (ev) => {
        const val = ev.target.value
        const arr = val.split('')
        if (currencySign.includes(arr[arr.length-1]) ){
            const temp = arr.slice(0,arr.length-1)
            setInput({[label]:temp.join('')})
        }
    }
    const outFocus = (ev) => {
        const val = ev.target.value
        const arr = val.split('')
        if (!currencySign.includes(arr[arr.length-1]) ){
            addNums(arr)
            arr.push(sign)
            setInput({[label]:arr.join('')})
        }

    }
    const onChange = async (ev) => {
        if (disabled) {
            return
        }
        if (inputValidateNumbers(ev)) {
            onChang(ev)
           await setInput({[label]:ev.target.value},true)
        }
    }

    React.useEffect(()=> {
        if (watch.length > 0) {
            refElem.current.value = watch[0]
        }

    },watch)
    return (
            <label className='input'>
               <span style={{opacity: opacity}}>{label}</span>
                {
                    select ?
                        <select ref={refElem} id={label} onChange={onChang}>
                            {
                                option.map((elem,indx) => <option value={elem} key={indx}>{elem}</option>)
                            }
                        </select>
                        :
                        <input disabled={ read}
                               maxLength={MAX_DIGIT}
                               id={label}
                               type={'text'}
                               value={children}
                               onFocus={onFocus}
                               onBlur={outFocus}
                               onChange={onChange }/>
                }

            </label>
    )
}
