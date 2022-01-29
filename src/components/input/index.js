import React, {useRef} from "react";
import './input.scss'
import {addNums, currencySign, inputValidateNumbers} from "../../const/util";

export const Input = (
    {
        input,
        setInput,
        onChang = (...arg) =>{},
        read = false,
        label,
        opacity='.6',
        children='',
        sign='$',
        select = false,
        option = [],
        watch = []
}) => {

    const [value, setValue] = React.useState(children+sign)
    const refElem= useRef(null)

    const onFocus= (ev) => {
        const val = ev.target.value
        const arr = val.split('')
        if (currencySign.includes(arr[arr.length-1]) ){
            const temp = arr.slice(0,arr.length-1)
            setValue(temp.join(''))
        }
    }
    const outFocus = (ev) => {
        const val = ev.target.value
        const arr = val.split('')
        if (!currencySign.includes(arr[arr.length-1]) ){
            addNums(arr)
            arr.push(sign)
            setValue(arr.join(""))
        }

    }
    const onChange = (ev) => {
        if (inputValidateNumbers(ev)) {
            onChang(ev)
            setValue(ev.target.value)
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
                               maxLength={8}
                               id={label}
                               type={'text'}
                               value={value}
                               onFocus={onFocus}
                               onBlur={outFocus}
                               onChange={onChange }/>
                }

            </label>
    )
}
