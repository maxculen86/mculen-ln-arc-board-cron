import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import { pipe } from '../../../common/utils/functional';
import ListMenu from './listMenu';
import ComLogo from '../../../common/com-logo';
import ComIcon from '../../../common/com-icon';
import ComButton from '../../../common/com-button';

import '../../../../../resources/dist/css/ln/components/dropdown.css';

const handleScroll = comDromdownRef => {
    comDromdownRef && comDromdownRef.current.scrollTop === 0
        ? pipe(
              comDromdownRef.current.classList.add('scroll--pasive'),
              comDromdownRef.current.classList.remove('scroll--active')
          )
        : pipe(
              comDromdownRef.current.classList.add('scroll--active'),
              comDromdownRef.current.classList.remove('scroll--pasive')
          );
};

// TODO: Usar la siguiente data para hacer testing
const _menuData = [
    {
        el: 'ul',
        extraClass: 'list__nav  first--nav',
        childs: [
            {
                el: 'li',
                extraClass: 'item--noticias',
                name: 'Últimas noticias',
                childs: [
                    {
                        el: 'ul',
                        extraClass: 'sublist__nav',
                        childs: [
                            {
                                el: 'li',
                                name: ' Tránsito'
                            },
                            {
                                el: 'li',
                                name: ' Clima'
                            }
                        ]
                    }
                ]
            },
            {
                el: 'li',
                extraClass: 'item--politica',
                name: 'Política',
                childs: [
                    {
                        el: 'ul',
                        extraClass: 'sublist__nav',
                        childs: [
                            {
                                el: 'li',
                                name: 'Buenos Aires'
                            },
                            {
                                el: 'li',
                                name: ' Seguridad'
                            },
                            {
                                el: 'li',
                                name: ' Educación'
                            }
                        ]
                    }
                ]
            },
            {
                el: 'li',
                extraClass: 'item--politica',
                name: 'Economia',
                childs: [
                    {
                        el: 'ul',
                        extraClass: 'sublist__nav',
                        childs: [
                            {
                                el: 'li',
                                name: 'Buenos Aires'
                            },
                            {
                                el: 'li',
                                name: ' Cultura'
                            },
                            {
                                el: 'li',
                                name: ' Educación'
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

const Desplegable = ({ toglleDesplegable }) => {
    const despegableRef = useRef();
    const comDromdownRef = useRef();

    useEffect(() => {
        window &&
            window.addEventListener('resize', e => {
                if (window.outerWidth >= 768 && comDromdownRef.current) {
                    comDromdownRef.current.classList.remove('scroll--pasive');
                    comDromdownRef.current.classList.remove('scroll--active');
                }
            });
    });

    return (
        <div
            className="wrap-dropdown"
            ref={despegableRef}
            onScroll={() => {
                return handleScroll(comDromdownRef);
            }}
            role="button"
            tabIndex="0"
        >
            <div
                aria-label="overrlay"
                className="overlay"
                role="button"
                tabIndex="0"
                onMouseDown={toglleDesplegable}
            />
            <div className="com-dropdown" ref={comDromdownRef}>
                <section className="header__dropdown">
                    <ComLogo
                        color
                        logoName="la-nacion"
                        href="https://www.lanacion.com.ar/"
                        title="Ir a la página principal"
                    />
                    <ComButton
                        iconName="close"
                        title="Cerrar"
                        tabIndex="0"
                        onMouseDown={toglleDesplegable}
                    />
                </section>
                <section className="menu__dropdown">
                    <nav className="nav__dropdown">
                        <ListMenu />
                    </nav>
                </section>
            </div>
        </div>
    );
};

Desplegable.propTypes = {
    toglleDesplegable: PropTypes.func.isRequired
};

export default Desplegable;
