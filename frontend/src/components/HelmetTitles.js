import React from 'react'
import { Helmet } from 'react-helmet'


const HelmetTitles = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

HelmetTitles.defaultProps = {
    title: 'Welcome to Hazir',
    description: 'Hazir is here to Serve',
    keywords: 'Hazir is Everywhere'
}


export default HelmetTitles