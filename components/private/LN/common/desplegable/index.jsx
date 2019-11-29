import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import pipe from '../../../common/utils/pipeUtil';
import ListMenu from './listMenu';
import withNavigationMenu from '../hocs/withNavigationMenu';
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

const Desplegable = ({ toglleDesplegable, menuData }) => {
    const [onResizeDeskTop, setOnResizeDesktop] = useState(
        window && window.outerWidth >= 768
    );
    const despegableRef = useRef();
    const comDromdownRef = useRef();

    useEffect(() => {
        window &&
            window.addEventListener('resize', e => {
                const _onResizeDesktop = window.outerWidth >= 768;
                setOnResizeDesktop(_onResizeDesktop);
                if (_onResizeDesktop) {
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
                <section className="header__dropdown row">
                    <div className="logo__dropdown col-10">
                        <i className="logo-la-nacion" />
                    </div>
                    <div
                        className="close__dropdown col-2"
                        role="button"
                        tabIndex="0"
                        onMouseDown={toglleDesplegable}
                    >
                        <i className="icon-close" />
                    </div>
                    <div className="search__dropdown row">
                        <div className="col-12 content-input">
                            <input
                                type="search"
                                name="busqueda"
                                id="txtBusqueda"
                                data-id="buscador"
                                className="input-buscador"
                                placeholder="Buscar"
                            />
                            <i className="icon-search" />
                        </div>
                    </div>
                </section>
                <section className="menu__dropdown">
                    <nav className="nav__dropdown">
                        {menuData &&
                            menuData.map(({ el, extraClass, name, childs }) => (
                                <ListMenu
                                    el={el}
                                    extraClass={extraClass}
                                    name={name}
                                    childs={childs}
                                    onResizeDeskTop={onResizeDeskTop}
                                />
                            ))}
                    </nav>
                </section>
            </div>
        </div>
    );
};

Desplegable.propTypes = {
    toglleDesplegable: PropTypes.func.isRequired,
    menuData: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            _website: PropTypes.string,
            name: PropTypes.string,
            display_name: PropTypes.string,
            node_type: PropTypes.string,
            url: PropTypes.string,
            inactive: PropTypes.string,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string,
                    _website: PropTypes.string,
                    name: PropTypes.string,
                    display_name: PropTypes.string,
                    node_type: PropTypes.string,
                    url: PropTypes.string,
                    inactive: PropTypes.string,
                    children: PropTypes.arrayOf(
                        PropTypes.shape({
                            _id: PropTypes.string,
                            _website: PropTypes.string,
                            name: PropTypes.string,
                            display_name: PropTypes.string,
                            node_type: PropTypes.string,
                            url: PropTypes.string,
                            inactive: PropTypes.string
                        })
                    )
                })
            )
        })
    ).isRequired
};

/**
 * TODO: Buscar la forma de pasar lo siguiente
 * por customFields o properties del Site
 * TODO: pasar esto como parametro si a futuro se quiere
 * un menu para mobile o para desktop
 */
const sourceMenu = [
    {
        hierarchy: 'Header-FirstNav',
        initialClass: 'list__nav  first--nav'
    },
    {
        hierarchy: 'Header-SecondaryNav',
        initialClass: 'list__nav  secondary--nav'
    }
];

export default withNavigationMenu(Desplegable)(sourceMenu);
