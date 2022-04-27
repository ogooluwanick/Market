import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({rating,text,color}) => {
  return (
    <div className="rating">
            <span>
                <i className={rating >=1 ?  "fa-solid fa-star" : rating>=.5 ? "fa-solid fa-star-half-stroke" :  "far  fa-star"}  style={{color}}  />
                <i className={rating >=2 ?  "fa-solid fa-star" : rating>=1.5 ? "fa-solid fa-star-half-stroke" :  "far  fa-star"}  style={{color}}/>
                <i className={rating >=3 ?  "fa-solid fa-star" : rating>=2.5 ? "fa-solid fa-star-half-stroke" :  "far  fa-star"}  style={{color}}/>
                <i className={rating >=4 ?  "fa-solid fa-star" : rating>=3.5 ? "fa-solid fa-star-half-stroke" :  "far  fa-star"}  style={{color}}/>
                <i className={rating >=5 ?  "fa-solid fa-star" : rating>=4.5 ? "fa-solid fa-star-half-stroke" :  "far  fa-star"}  style={{color}}/>
                
               
            </span>
            <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps={
        color:"#FDCC0D"
}

Rating.propTypes={
        rating:PropTypes.number.isRequired,
        text:PropTypes.string.isRequired,
        color:PropTypes.string
}

export default Rating