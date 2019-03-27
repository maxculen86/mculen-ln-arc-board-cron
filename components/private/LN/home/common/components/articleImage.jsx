import React from 'react'

export default function ArticleImage(props) {
    return (
      <>
        <source media="(min-width: 86.250em)" srcSet={props.imgUrls.desktop} className="img-desktop" alt="imagen-destacada" />
        <source media="(min-width: 64.000em)" srcSet={props.imgUrls.desktopSM} className="img-desktop-sm" alt="imagen-destacada" />
        <source media="(min-width: 54.000em)" srcSet={props.imgUrls.tablet} className="img-tablet" alt="imagen-destacada" />
        <source media="(min-width: 42.000em)" srcSet={props.imgUrls.tabletSM} className="img-tablet-sm" alt="imagen-destacada" />
        <source media="(min-width: 22.500em)" srcSet={props.imgUrls.mobile} className="img-mobile" alt="imagen-destacada" />
        <source media="(min-width: 20.000em)" srcSet={props.imgUrls.mobileSM} className="img-mobile-sm" alt="imagen-destacada" />
        <img alt="imagen-destacada" />
      </>
    )
}
