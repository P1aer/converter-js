import React from "react";
import './header.scss'

export const Header = ({name}) => {
    return (
        <div className='header'>
            <h4>Здравствуйте, <b>{name}</b> !</h4>
        </div>
    )
}
