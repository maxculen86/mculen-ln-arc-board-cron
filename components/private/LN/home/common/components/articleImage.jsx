import React from 'react'

export default function ArticleImage(props) {
    return (
      <>
        <source media="(min-width: 86.250em)" srcset={props.imgUrls.desktop} class="img-desktop" alt="imagen-destacada" />
        <source media="(min-width: 64.000em)" srcset={props.imgUrls.desktopSM} class="img-desktop-sm" alt="imagen-destacada" />
        <source media="(min-width: 54.000em)" srcset={props.imgUrls.tablet} class="img-tablet" alt="imagen-destacada" />
        <source media="(min-width: 42.000em)" srcset={props.imgUrls.tabletSM} class="img-tablet-sm" alt="imagen-destacada" />
        <source media="(min-width: 22.500em)" srcset={props.imgUrls.mobile} class="img-mobile" alt="imagen-destacada" />
        <source media="(min-width: 20.000em)" srcset={props.imgUrls.mobileSM} class="img-mobile-sm" alt="imagen-destacada" />
        <img alt="imagen-destacada" />
      </>
    )
}
