import React, {useRef} from "react";
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
        option = [],
        watch = []
}) => {
    const refElem= useRef(null)
    const onFocus= (ev) => {
        const val = ev.target.value
        const arr = val.split('')
        if (currencySign.includes(arr[arr.length-1]) ){
            const temp = arr.slice(0,arr.length-1)
            setInput(prev => ({...prev,[label]:temp.join('')}))
        }
    }
    const outFocus = (ev) => {
        const val = ev.target.value
        const arr = val.split('')
        if (!currencySign.includes(arr[arr.length-1]) ){
            addNums(arr)
            arr.push(sign)
            setInput(prev => ({...prev,[label]:arr.join('')}))
        }

    }
    const onChange = (ev) => {
        if (inputValidateNumbers(ev)) {
            onChang(ev)
            setInput(prev => ({...prev,[label]:ev.target.value}))
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
                        <input disabled={read}
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
