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
        metaImg:"https://cdn.sanity.io/images/ru024jea/production/f65dcb8088629faa066c0b849d20dc33d323d79b-2876x1576.png"
}
export default Meta