import React from 'react'

import images from '../../constants/images'
import "./ErrorPage.scss"


export default function ErrorPage() {
    return (
        <div className="errorPage">
            <img src={images.Img404} alt="error" className="Img404"/>
        </div>
    )
}
