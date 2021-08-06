/* eslint-disable react/no-danger */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import PropTypes from 'fusion:prop-types';
import Header from './headerBase';
import Hamburguer from './hamburger';
import ComIcon from '../../../common/com-icon';
import Logo from '../../../common/com-logo';
import DivBanner from '../../../common/banners/DivBanner';

import '../../../../../resources/dist/css/ln/modules/header-desktop.css';
import '../../../../../resources/dist/css/ln/components/usuario.css';
import '../../../../../resources/dist/css/ln/components/button.css';
import dynamicallyLoadScript from '../utils/dynamicallyLoadScript';
import { getViewport } from '../utils/homeHelper';
import { getSlotForDevice } from '../bannerRefactor/utils';
import getBannerConfig from '../../../common/banners/bannersCommon';
import hasAdsTestParam from '../utils/hasAdsTesParam';
import { queueGoogletagCommand } from '../../../common/banners/LoadBanners';

const ItemAnchor = ({ url, text, alt }) => {
    const callURL = address => {
        // eslint-disable-next-line no-restricted-globals
        location.href = address;
    };

    return (
        <li key={text}>
            <a
                onMouseDown={() => callURL(url)}
                href="javascript:void(0)"
                data-event="LinkClick"
                data-section="MenuLN"
                title={alt}
            >
                {text}
            </a>
        </li>
    );
};

ItemAnchor.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.text.isRequired,
    alt: PropTypes.text.isRequired
};

const enlaces = [
    {
        url: 'https://myaccount.lanacion.com.ar/mi-usuario',
        text: 'Mi cuenta',
        alt: 'Ir a mi cuenta'
    },
    {
        url: 'https://myaccount.lanacion.com.ar/datos-personales',
        text: 'Mis datos',
        alt: 'Ir a mis datos'
    },
    {
        url: 'https://micuenta.lanacion.com.ar/mis-suscripciones',
        text: 'Mis suscripciones',
        alt: 'Ir a mis suscripciones'
    }
];

const HeaderDesktop = ({
    logueado,
    loginData,
    goToLogout,
    host,
    section,
    dfpId,
    // headerDark,
    toglleDesplegable
}) => {
    const { loading } = loginData;
    const { goToLoginUrl } = loginData;
    const [active, setActive] = useState('');
    const [loadingUserData, setLoadingUserData] = useState(
        loading ? ' hlp-none' : ''
    );

    const { isMobile, isTablet, isDesktop, device } = getViewport();

    const slotId = getSlotForDevice(device)([
        { name: 'desktop', slot: 'logo_header_dsk' },
        { name: 'mobile', slot: 'logo_header_mob' },
        { name: 'tablet', slot: 'logo_header_tab' }
    ]);

    const loadBanner = (optDiv, slotGroup) => {
        const { adUnitPath, size } = getBannerConfig({
            optDiv,
            device,
            dfpId
        });

        const bannerToLoad = [
            {
                adUnitPath,
                opt_div: optDiv,
                prebidEnabled: false,
                size,
                slotGroup,
                targeting: {
                    sitio: 'lanacion',
                    adstest: hasAdsTestParam()
                }
            }
        ];

        queueGoogletagCommand(bannerToLoad);
    };

    const toggleMenu = () =>
        active === '' ? setActive(' --active') : setActive('');

    useEffect(() => {
        setLoadingUserData(loading ? ' hlp-none' : '');
        if (slotId) loadBanner(slotId, section);
    }, [loading, slotId]);

    const hideBannersByDefault = () => {
        const script = `
            window.addEventListener('DOMContentLoaded', () => {
                const nodes = document.querySelectorAll('[id^="logo_header"]');
                Array.from(nodes).map(x => x.classList.add('hlp-none')));
            });
        `;

        return (
            <script
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: script }}
            />
        );
    };

    const handleClickBuscar = () => {
        dynamicallyLoadScript('//www.queryly.com/js/queryly.v4.js', 'body')
            .then(() => {
                const initScript = document.createElement('script');
                initScript.innerHTML = `queryly.init('8075c0c1c4c44847', document.querySelectorAll('#fusion-app'));`;
                document.body.appendChild(initScript);
                document.getElementById('querylyButton').click();
            })
            .catch(() => {
                // console.error('Script loading failed! Handle this error', error);
            });
    };

    return (
        <Header id="header" className="header">
            <div className="col-4 header__left">
                <Hamburguer _onMouseDown={toglleDesplegable} />
                <label
                    onClick={handleClickBuscar}
                    id="querylyButton"
                    htmlFor="queryly_toggle"
                    title="Ir al buscador"
                >
                    <i className="com-button --tertiary --icon queryly_searchicon">
                        <ComIcon iconName="search" />
                        BUSCAR
                    </i>
                    {/* <i style={{float:'right', color:'#0074c4',position:'absolute', top: '5px', cursor: 'pointer'}} className="icon-search queryly_searchicon"></i> */}
                </label>
            </div>
            <div className="col-7 col-desksm-4 header__middle">
                <DivBanner
                    id="logo_header_dsk"
                    classes="--logo"
                    shouldRender={isDesktop}
                    isStatic
                />
                <DivBanner
                    id="logo_header_mob"
                    classes="--logo"
                    shouldRender={isMobile}
                    isStatic
                />
                <DivBanner
                    id="logo_header_tab"
                    classes="--logo"
                    shouldRender={isTablet}
                    isStatic
                />
                <Logo
                    logoName="la-nacion"
                    color
                    // size="--md"
                    href={host || '/'}
                    title="Ir a la página principal"
                />
            </div>
            <div className="col-4 header__right">
                <div
                    id="user-menu"
                    className={`com-usuario${active}${loadingUserData}`}
                >
                    {!loginData.subscription && (
                        <button
                            className="com-button --special"
                            id="btnsuscribite"
                            type="button"
                            title="Suscribite"
                            onClick={() => {
                                location.href =
                                    `${SITIO_SEGURO_REGISTRACION}/suscribirme?callback=${window.btoa(
                                        location.href
                                    )}` || '/';
                            }}
                        >
                            SUSCRIBITE
                        </button>
                    )}
                    {logueado && (
                        <div
                            onMouseUp={toggleMenu}
                            tabIndex="0"
                            role="button"
                            id="menuUser"
                            onBlur={() => setActive('')}
                            onScroll={() => setActive('')}
                        >
                            <p
                                className="com-usuario__name"
                                title="Ir al menú de suscriptor o suscriptora digital"
                            >
                                {loginData.userName}
                            </p>
                            {loginData.subscription ? (
                                <p className="com-usuario__valueSuscrib">
                                    Suscriptor digital
                                </p>
                            ) : (
                                <p className="com-usuario__valueSuscrib">
                                    Sin suscripción digital
                                </p>
                            )}
                            <ul className="com-desplegable">
                                {enlaces.map(({ url, text }) => (
                                    <ItemAnchor
                                        key={text}
                                        url={url}
                                        text={text}
                                    />
                                ))}
                                <li>
                                    <a
                                        data-event="LinkClick"
                                        data-section="MenuLN"
                                        href="javascript:void(0);"
                                        title="Desloguearse"
                                        onMouseDown={() => {
                                            goToLogout();
                                        }}
                                    >
                                        Salir
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                    {!logueado && (
                        <button
                            className="com-button --secondary"
                            id="btningresar"
                            onClick={() => goToLoginUrl()}
                            type="button"
                            title="Ingresar"
                        >
                            INGRESAR
                        </button>
                    )}
                </div>
            </div>
            <div className="col-1 header__search">
                <label onClick={handleClickBuscar} htmlFor="queryly_toggle">
                    <i className="com-icon icon-search queryly_searchicon" />
                </label>
            </div>
            <hideBannersByDefault />
        </Header>
    );
};

HeaderDesktop.propTypes = {
    logueado: PropTypes.bool.isRequired,
    loginData: PropTypes.shape({
        subscription: PropTypes.bool,
        userName: PropTypes.string,
        goToLoginUrl: PropTypes.func,
        loading: PropTypes.bool
    }).isRequired,
    goToLogout: PropTypes.func.isRequired,
    host: PropTypes.string.isRequired,
    // headerDark: PropTypes.string,
    toglleDesplegable: PropTypes.func.isRequired,
    section: PropTypes.string.isRequired,
    dfpId: PropTypes.number.isRequired
};

// HeaderDesktop.defaultProps = {
//     headerDark: ''
// };

export default HeaderDesktop;
