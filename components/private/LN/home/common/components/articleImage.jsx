import React from 'react'

export default function ArticleImage(props) {
    const desktop = props.imgUrls.find(m => m.name === "desktop").url
    const mobile = props.imgUrls.find(m => m.name === "mobile").url
    return (
      <a className="figure" href={props.url}>
            <picture className="content-picture">
                <source media="(min-width: 54.000em)" srcSet={desktop} className="img-desktop" alt="imagen-destacada" />
                <source media="(min-width: 20.000em)" srcSet={mobile} className="img-mobile" alt="imagen-destacada" />
                <img alt="imagen-destacada" />
            </picture>
        </a>
      
    )
}
