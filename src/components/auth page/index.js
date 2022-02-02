import React, {useState} from "react";
import './auth-page.scss'
import {useDispatch} from "react-redux";
import {setDataUsers} from "../../redux/user.slice";
import {getPattern, regMail, regPass, VALUES} from "../../const/util";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc,getDoc } from "firebase/firestore";
import {db} from "../../index";
import {Loader} from "../loader/loader";
import {setDataWallet} from "../../redux/data.slice";

export const AuthPage = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [isLoad,setLoad] = useState(false)
    const dispatch = useDispatch()
    if (isLoad) {
       return <Loader/>
    }

    const onLogin = async () => {
        try {
            const auth = getAuth();
            setLoad(true)
            const {user} = await signInWithEmailAndPassword(auth, data.email, data.password)

            const docRef = doc(db,'users',user.uid)
            const docSnap= await getDoc(docRef)
            dispatch(setDataWallet(docSnap.data().currency))
            dispatch(setDataUsers({
                id: user.uid,
                email: user.email,
                token: user.accessToken,
            }))
        }

       catch (error) {
            alert(error.message);
            setLoad(false)
            }
    }
    const onRegister = async () => {
        try {
            const auth = getAuth();
            setLoad(true)
            const { user } =  await createUserWithEmailAndPassword(auth,data.email, data.password)

            await setDoc(doc(db,'users',user.uid), {
                email: user.email,
                uid: user.uid,
                currency: VALUES
            })
            dispatch(setDataWallet(VALUES))
            dispatch(setDataUsers({
                id: user.uid,
                email: user.email,
                token: user.accessToken,
            }))
        }

    catch (error)  {
                alert(error.message);
                setLoad(false)
            }
    }

    const onChange = (event) => {
        setData(prev => ({...prev,[event.target.name]: event.target.value}))
    }

    return(
        <form onSubmit={(event)=> event.preventDefault()} className={'auth'}>
        <h3>Welcome to Converter JS</h3>
        <label className='input'>
            <span style={{opacity:'.6'}}>Email</span>
            <input onChange={onChange} name={'email'} value={data.email}
                   pattern={getPattern(regMail)}
                   required type='email' placeholder='example@mail.com'/>
            <img src={'/icons8-done.svg'} alt={'valid field'}/>
        </label>
        <label className='input'>
            <span style={{opacity:'.6'}}>Password</span>
            <input onChange={onChange} name={'password'} pattern={getPattern(regPass)}
                   minLength={6} maxLength={12}  value={data.password}
                   required type='password' placeholder='hardpass'/>
            <img src={'/icons8-done.svg'} alt={'valid field'}/>
        </label>
        <div className={'container-btns'}>
            <button disabled={!(regPass.test(data.password) && regMail.test(data.email))|| isLoad}
                    className={'convert-btn'}
                    type={"submit"} onClick={onRegister}> Register </button>
            <button disabled={!(regPass.test(data.password) && regMail.test(data.email)) || isLoad}
                    className={'convert-btn'}
                    type={"submit"} onClick={onLogin}> Log In </button>
        </div>
    </form>)
}
