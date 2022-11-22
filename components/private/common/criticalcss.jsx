/* eslint-disable react/no-danger */
import React from 'react';
import { useAppContext } from 'fusion:context';
import { getStyleFontsInLine } from './fontface';
// NOSONAR
export const CriticalCSSString =
    `
.com-title{font-family:"SuecaSlab"}.row{display:flex;flex-wrap:wrap;width:100%}[class*=col-]{width:100%;position:relative}.col{flex-basis:0%;flex-grow:1;max-width:100%}` +
    `.col-1{flex:0 0 8.3333333333%;max-width:8.3333333333%}.col-2{flex:0 0 16.6666666667%;max-width:16.6666666667%}.col-3{flex:0 0 25%;max-width:25%}.col-4{flex:0 0 33.` +
    `3333333333%;max-width:33.3333333333%}.col-5{flex:0 0 41.6666666667%;max-width:41.6666666667%}.col-6{flex:0 0 50%;max-width:50%}.col-7{flex:0 0 58.3333333333%;max-` +
    `width:58.3333333333%}.col-8{flex:0 0 66.6666666667%;max-width:66.6666666667%}.col-9{flex:0 0 75%;max-width:75%}.col-10{flex:0 0 83.3333333333%;max-width:83.3333333333%}` +
    `.col-11{flex:0 0 91.6666666667%;max-width:91.6666666667%}.col-12{flex:0 0 100%;max-width:100%}@media (min-width:768px){.col-tablet{flex-basis:0%;flex-grow:1;max-width:` +
    `100%}.col-tablet-1{flex:0 0 8.3333333333%;max-width:8.3333333333%}.col-tablet-2{flex:0 0 16.6666666667%;max-width:16.6666666667%}.col-tablet-3{flex:0 0 25%;max-width:25%}` +
    `.col-tablet-4{flex:0 0 33.3333333333%;max-width:33.3333333333%}.col-tablet-5{flex:0 0 41.6666666667%;max-width:41.6666666667%}.col-tablet-6{flex:0 0 50%;max-width:50%}.` +
    `col-tablet-7{flex:0 0 58.3333333333%;max-width:58.3333333333%}.col-tablet-8{flex:0 0 66.6666666667%;max-width:66.6666666667%}.col-tablet-9{flex:0 0 75%;max-width:75%}` +
    `.col-tablet-10{flex:0 0 83.3333333333%;max-width:83.3333333333%}.col-tablet-11{flex:0 0 91.6666666667%;max-width:91.6666666667%}.col-tablet-12{flex:0 0 100%;max-width:` +
    `100%}}@media (min-width:64em){.col-desksm{flex-basis:0%;flex-grow:1;max-width:100%}.col-desksm-1{flex:0 0 8.3333333333%;max-width:8.3333333333%}.col-desksm-2{flex:0 0 ` +
    `16.6666666667%;max-width:16.6666666667%}.col-desksm-3{flex:0 0 25%;max-width:25%}.col-desksm-4{flex:0 0 33.3333333333%;max-width:33.3333333333%}.col-desksm-5{flex:0 0 ` +
    `41.6666666667%;max-width:41.6666666667%}.col-desksm-6{flex:0 0 50%;max-width:50%}.col-desksm-7{flex:0 0 58.3333333333%;max-width:58.3333333333%}.col-desksm-8{flex:0 0 ` +
    `66.6666666667%;max-width:66.6666666667%}.col-desksm-9{flex:0 0 75%;max-width:75%}.col-desksm-10{flex:0 0 83.3333333333%;max-width:83.3333333333%}.col-desksm-11{flex:0 0 ` +
    `91.6666666667%;max-width:91.6666666667%}.col-desksm-12{flex:0 0 100%;max-width:100%}}@media (min-width:80em){.col-deskxl{flex-basis:0%;flex-grow:1;max-width:100%}.col-` +
    `deskxl-1{flex:0 0 8.3333333333%;max-width:8.3333333333%}.col-deskxl-2{flex:0 0 16.6666666667%;max-width:16.6666666667%}.col-deskxl-3{flex:0 0 25%;max-width:25%}.col-` +
    `deskxl-4{flex:0 0 33.3333333333%;max-width:33.3333333333%}.col-deskxl-5{flex:0 0 41.6666666667%;max-width:41.6666666667%}.col-deskxl-6{flex:0 0 50%;max-width:50%}.col` +
    `-deskxl-7{flex:0 0 58.3333333333%;max-width:58.3333333333%}.col-deskxl-8{flex:0 0 66.6666666667%;max-width:66.6666666667%}.col-deskxl-9{flex:0 0 75%;max-width:75%}` +
    `.col-deskxl-10{flex:0 0 83.3333333333%;max-width:83.3333333333%}.col-deskxl-11{flex:0 0 91.6666666667%;max-width:91.6666666667%}.col-deskxl-12{flex:0 0 100%;max-width:` +
    `100%}.offset-deskxl-1{margin-left:8.3333333333%}}[class*=row-gap]{display:grid;grid-column-gap:1rem;grid-row-gap:2rem}@media (min-width:83.75em){[class*=row-gap]{grid` +
    `-column-gap:2.5rem}}.row-gap-4{grid-template-columns:1fr 1fr 1fr 1fr}.row-gap-3{grid-template-columns:1fr 1fr 1fr}.row-gap-2{grid-template-columns:1fr 1fr}@media ` +
    `(min-width:48em){.row-gap-tablet-4{grid-template-columns:1fr 1fr 1fr 1fr}.row-gap-tablet-3{grid-template-columns:1fr 1fr 1fr}.row-gap-tablet-2{grid-template-columns:` +
    `1fr 1fr}}@media (min-width:64em){.row-gap-desksm-5{grid-template-columns:1fr 1fr 1fr 1fr 1fr}.row-gap-desksm-4{grid-template-columns:1fr 1fr 1fr 1fr}.row-gap-desksm-` +
    `3{grid-template-columns:1fr 1fr 1fr}.row-gap-desksm-2{grid-template-columns:1fr 1fr}}@media (min-width:80em){.row-gap-deskxl-4{grid-template-columns:1fr 1fr 1fr 1fr}` +
    `.row-gap-deskxl-3{grid-template-columns:1fr 1fr 1fr}.row-gap-deskxl-2{grid-template-columns:1fr 1fr}}.lay-sidebar{display:flex;flex-wrap:nowrap;flex-direction:column}` +
    `@media (min-width:68.75em){.lay-sidebar{flex-direction:row;margin-bottom:2.5rem}.sidebar__main{flex-basis:calc(100% - 316px);margin-right:1rem}.sidebar__aside` +
    `{background:-webkit-repeating-linear-gradient(45deg,rgba(255,255,255,.1),rgba(255,255,255,.1),rgba(255,255,255,.1),rgba(255,255,255,.1) 4px,rgba(0,0,0,.15) 6px);` +
    `background:repeating-linear-gradient(45deg,rgba(255,255,255,.1),rgba(255,255,255,.1),rgba(255,255,255,.1),rgba(255,255,255,.1) 4px,rgba(0,0,0,.15) 6px);flex-basis` +
    `:18.75rem;flex-shrink:0}}@media (min-width:83.75em){.sidebar__main{flex-basis:calc(100% - 340px);margin-right:2.5rem}#wrapper.nota .sidebar__main{flex-basis:calc` +
    `(100% - 380px);margin-right:5rem}}[class^=lay],[class*=" lay"]{width:100%;padding-right:1rem;padding-left:1rem;margin-right:auto;margin-left:auto}@media (min-width:83` +
    `.75em){[class^=lay],[class*=" lay"]{max-width:83.75rem;padding-right:2.5rem;padding-left:2.5rem}}.lay-full-width{padding-left:0;padding-right:0;max-width:100%}#fusion` +
    `-app>#wrapper:not(.sitemap):not(.html-libre.--transparent){position:relative;overflow-x:clip}#fusion-app>#wrapper:not(.sitemap):not(.html-libre.--transparent)` +
    `:before{background:-webkit-repeating-linear-gradient(45deg,rgba(255,255,255,.1),rgba(255,255,255,.1),rgba(255,255,255,.1),rgba(255,255,255,.1) 4px,rgba(0,0,0,.15)` +
    ` 6px);background:repeating-linear-gradient(45deg,rgba(255,255,255,.1),rgba(255,255,255,.1),rgba(255,255,255,.1),rgba(255,255,255,.1) 4px,rgba(0,0,0,.15) 6px);content` +
    `:"";height:3.125rem;width:100%;display:block}@media (min-width:768px){#fusion-app>#wrapper:not(.sitemap):not(.html-libre.--transparent):before{display:none}}#fusion` +
    `-app>#wrapper:not(.sitemap):not(.html-libre.--transparent).--transparent:before{background:#000}@media (min-width:1024px){#fusion-app>#wrapper:not(.sitemap):not(.html` +
    `-libre.--transparent){margin-top:4.5625rem}}#content{position:relative;padding-top:1.5rem}.nota.html-libre #content{padding-top:0}.header{position:relative;border-` +
    `bottom:1px solid #f2f2f2;padding:.75rem 0;background:#fff;width:100%;z-index:102;transition:top .2s ease-in-out}.header .row{align-items:center}.header .com-button.` +
    `--icon .com-icon{font-size:.875rem;margin-right:.5rem}.header__left{display:none}@media (min-width:48em){.header__middle .logo-la-nacion{font-size:1.25rem}}@media ` +
    `(min-width:64em){.header__middle .logo-la-nacion{font-size:1.875rem}}.header__right #menuUser{display:none}.header__right .--secondary{display:none}@media (max-width` +
    `:1023px){.header__right .com-usuario .--special{background:0 0;border-color:transparent;padding:.1875rem 1rem;color:#0250c9}}.header__search{display:flex;justify-` +
    `content:center}@media (min-width:64em){.header{padding:1rem 0;border-bottom:1px solid #e4e4e4;top:0;position:fixed}.header__left{display:block}.header__left .icon` +
    `-menu,.header__left .icon-search{width:.9375rem;height:.9375rem}.header__left .com-hamburger{display:inline-flex;margin-right:1.5rem}.header__middle{text-align:center}` +
    `.header__middle.col-4{text-align:center;justify-content:center;align-items:center}.header__right{margin-left:auto;text-align:right}.header__right #menuUser{display:block` +
    `;margin-right:1rem}.header__right .com-usuario .--special{margin-right:1.5rem}.header__right .com-usuario .--secondary{display:flex}.header__search{display:none}.` +
    `storytelling:not(.--scrollUp) .header{position:absolute}}.--transparent:not(.--scrollUp):not(.--scrollDown) .header,.header.--dark{background:rgba(0,0,0,.5)` +
    `;border:none}.--transparent:not(.--scrollUp):not(.--scrollDown) .header .header__left .com-button.--tertiary,.header.--dark .header__left .com-button.--tertiary` +
    `{background:#272727;border-color:#272727;color:#f2f2f2}.--transparent:not(.--scrollUp):not(.--scrollDown) .header .header__left .com-button.--tertiary:hover,.header` +
    `.--dark .header__left .com-button.--tertiary:hover{background:#000}.--transparent:not(.--scrollUp):not(.--scrollDown) .header .header__left .com-button.--tertiary` +
    ` .com-icon path,.header.--dark .header__left .com-button.--tertiary .com-icon path{fill:#f2f2f2}.--transparent:not(.--scrollUp):not(.--scrollDown) .header .header__` +
    `middle .logo-la-nacion,.header.--dark .header__middle .logo-la-nacion{color:#fff}.--transparent:not(.--scrollUp):not(.--scrollDown) .header .header__middle .logoLN` +
    ` svg g,.header.--dark .header__middle .logoLN svg g{fill:#fff}.--transparent:not(.--scrollUp):not(.--scrollDown) .header .header__right .com-usuario .com-button.` +
    `--special.--special,.header.--dark .header__right .com-usuario .com-button.--special.--special{color:#fff}@media (min-width:64em){.--transparent:not(.--scrollUp):` +
    `not(.--scrollDown) .header .header__right .com-usuario .com-button.--special.--special,.header.--dark .header__right .com-usuario .com-button.--special.--special` +
    `{border-color:#ffff24;color:#333}.--transparent:not(.--scrollUp):not(.--scrollDown) .header .header__right .com-usuario .com-button.--special.--special:hover,.header` +
    `.--dark .header__right .com-usuario .com-button.--special.--special:hover{border-color:#000;color:#fff}.--transparent:not(.--scrollUp):not(.--scrollDown) .header .header` +
    `__right .com-usuario .com-button.--secondary.--secondary,.header.--dark .header__right .com-usuario .com-button.--secondary.--secondary{background:0 0;border-color:#fff;` +
    `color:#fff}.--transparent:not(.--scrollUp):not(.--scrollDown) .header .header__right .com-usuario .com-button.--secondary.--secondary:hover,.header.--dark .header__right` +
    ` .com-usuario .com-button.--secondary.--secondary:hover{background:#fff;border-color:#fff;color:#333}}.--transparent:not(.--scrollUp):not(.--scrollDown) .header .header` +
    `__right .com-usuario .com-usuario__name,.--transparent:not(.--scrollUp):not(.--scrollDown) .header .header__right .com-usuario .com-usuario__valueSuscrib,.header.--dark ` +
    `.header__right .com-usuario .com-usuario__name,.header.--dark .header__right .com-usuario .com-usuario__valueSuscrib{color:#fff}.--transparent:not(.--scrollUp):not` +
    `(.--scrollDown) .header .header__search .com-icon path,.header.--dark .header__search .com-icon path{fill:#fff}.--transparent .header.--active{background:rgba(0,0,0,.5)` +
    `;border:none}.--transparent .header.--active .header__left .com-button.--tertiary{background:#272727;border-color:#272727;color:#f2f2f2}.--transparent .header.--active ` +
    `.header__left .com-button.--tertiary:hover{background:#000}.--transparent .header.--active .header__left .com-button.--tertiary .com-icon path{fill:#f2f2f2}.--transparent ` +
    `.header.--active .header__middle .logo-la-nacion{color:#fff}.--transparent .header.--active .header__middle .logoLN svg g{fill:#fff}.--transparent .header.--active .header` +
    `__right .com-usuario .com-button.--special.--special{color:#fff}@media (min-width:64em){.--transparent .header.--active .header__right .com-usuario .com-button.--special.` +
    `--special{border-color:#ffff24;color:#333}.--transparent .header.--active .header__right .com-usuario .com-button.--special.--special:hover{border-color:#000;color:#fff}.` +
    `--transparent .header.--active .header__right .com-usuario .com-button.--secondary.--secondary{background:0 0;border-color:#fff;color:#fff}.--transparent .header.--active` +
    ` .header__right .com-usuario .com-button.--secondary.--secondary:hover{background:#fff;border-color:#fff;color:#333}}.--transparent .header.--active .header__right .com-` +
    `usuario .com-usuario__name,.--transparent .header.--active .header__right .com-usuario .com-usuario__valueSuscrib{color:#fff}.--transparent .header.--active .header__search` +
    ` .com-icon path{fill:#fff}.reader-only{position:absolute;margin:-1px;padding:0;width:1px;height:1px;border:0;clip:rect(0,0,0,0);overflow:hidden}.reader-only:active,.reader` +
    `-only:focus{margin:auto;width:auto;height:auto;clip:auto;overflow:visible}.com-nav-mobile{position:fixed;bottom:0;padding:.3125rem .625rem .625rem;background:#fff;z-index` +
    `:15000;border-top:1px solid #e4e4e4;width:100%;height:3.5rem}.com-nav-mobile .row{max-width:25rem;margin:0 auto;justify-content:space-between}.com-nav-mobile .row .item-` +
    `foo{display:flex;flex-direction:column;justify-content:center;align-items:center;background:0 0;color:#333}.com-nav-mobile .row .item-foo p{font-size:.5625rem}@media ` +
    `(min-width :22em){.com-nav-mobile .row .item-foo p{font-size:.6875rem}}.com-nav-mobile .row .item-foo i{margin-bottom:.25rem}.com-nav-mobile .row .item-foo.--active p` +
    `{color:#0250c9}.com-nav-mobile .row .item-foo.--active i{color:#0250c9}.com-nav-mobile .row .item-foo:first-child{margin:-.3125rem}@media (min-width:64em){.com-nav-` +
    `mobile{display:none}}
`;

const CriticalCSS = () => {
    const { contextPath, deployment } = useAppContext();

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: `${getStyleFontsInLine({
                    contextPath,
                    deployment
                })}${CriticalCSSString}`
            }}
        />
    );
};

export default CriticalCSS;
