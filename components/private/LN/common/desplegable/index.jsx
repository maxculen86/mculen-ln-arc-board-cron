import React, { useRef } from 'react';
import PropTypes from 'fusion:prop-types';
import pipe from '../../../common/utils/pipeUtil';
import ListMenu from './listMenu';
import withNavigationMenu from '../hocs/withNavigationMenu';
import '../../../../../resources/dist/css/ln/components/dropdown.css';

const handleScroll = (despegableRef, comDromdownRef) => {
    despegableRef && despegableRef.current.scrollTop === 0
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
    const despegableRef = useRef();
    const comDromdownRef = useRef();

    return (
        <div
            className="wrap-dropdown"
            style={{ zIndex: 19000, background: 'none' }}
            ref={despegableRef}
            onScroll={() => {
                return handleScroll(despegableRef, comDromdownRef);
            }}
            role="button"
            tabIndex="0"
        >
            <div
                className="overlay"
                role="button"
                tabIndex="0"
                onMouseDown={toglleDesplegable}
            />
            <div
                className="com-dropdown"
                ref={comDromdownRef}
                style={{ zIndex: 100001 }}
            >
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
