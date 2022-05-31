import React from 'react'
import {Helmet} from "react-helmet"


const Meta = ({title,desc,keywords,metaImg}) => {
  return (
        <Helmet>‍
                        <title>{title}</title>‍
                        <meta name="description" content={desc} />    
                        <meta name="keywords" content={keywords}/>
                        <meta name="twitter:image" content={metaImg}/>
                        <meta property="og:image" content={metaImg}/>


        </Helmet>
  )
}

Meta.defaultProps={
        title:"Market | Welcome",
        desc:"Find the best products with the best prices!",
        keywords:"ogooluwa,olutimilehin,ogooluwa olutimilehin,Ecommerce,MERN,Webdev,Market,Fullstack,Products",
        metaImg:"https://www.byeindonesia.com/og-bye-indonesia.png"
}
export default Meta