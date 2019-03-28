import React from 'react'

export default function ArticleImage(props) {
    const desktop = props.imgUrls.find(m => m.name === "desktop").url
    const desktopSM = props.imgUrls.find(m => m.name === "desktopSM").url
    const tablet = props.imgUrls.find(m => m.name === "tablet").url
    const tabletSM = props.imgUrls.find(m => m.name === "tabletSM").url
    const mobile = props.imgUrls.find(m => m.name === "mobile").url
    const mobileSM = props.imgUrls.find(m => m.name === "mobileSM").url
    return (
      <a className="figure" href={props.url}>
            <picture className="content-picture">
                <source media="(min-width: 86.250em)" srcSet={desktop} className="img-desktop" alt="imagen-destacada" />
                <source media="(min-width: 64.000em)" srcSet={desktopSM} className="img-desktop-sm" alt="imagen-destacada" />
                <source media="(min-width: 54.000em)" srcSet={tablet} className="img-tablet" alt="imagen-destacada" />
                <source media="(min-width: 42.000em)" srcSet={tabletSM} className="img-tablet-sm" alt="imagen-destacada" />
                <source media="(min-width: 22.500em)" srcSet={mobile} className="img-mobile" alt="imagen-destacada" />
                <source media="(min-width: 20.000em)" srcSet={mobileSM} className="img-mobile-sm" alt="imagen-destacada" />
                <img alt="imagen-destacada" />
            </picture>
        </a>
      
    )
}
