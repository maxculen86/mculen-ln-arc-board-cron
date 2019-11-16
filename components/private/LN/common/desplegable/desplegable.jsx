import React, { useRef } from 'react';
import pipe from '../../../common/utils/pipeUtil';
import ListMenu from './listMenu';
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

const menuData = [
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

export default function Desplegable() {
    const despegableRef = useRef();
    const comDromdownRef = useRef();

    return (
        <div
            className="wrap-dropdown"
            ref={despegableRef}
            onScroll={() => {
                return handleScroll(despegableRef, comDromdownRef);
            }}
        >
            <div className="com-dropdown" ref={comDromdownRef}>
                <section className="header__dropdown row">
                    <div className="logo__dropdown col-10">
                        <i className="logo-la-nacion" />
                    </div>
                    <div className="close__dropdown col-2">
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
                        {menuData.map(({ el, extraClass, name, childs }) => (
                            <ListMenu
                                el={el}
                                extraClass={extraClass}
                                name={name}
                                childs={childs}
                            />
                        ))}
                        <ul className="list__nav  first--nav">
                            <li className="item__nav item--noticias item--active">
                                <a href="" className="link__item">
                                    Últimas noticias
                                </a>
                                <button type="button" className="button__item">
                                    <i className="icon-down" />
                                </button>
                                <ul className="sublist__nav">
                                    <li className="item__nav">
                                        <a href="/" className="link__item">
                                            Tránsito
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Clima
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--politica item--disabled">
                                <a href="" className="link__item">
                                    Política
                                </a>
                                <button type="button" className="button__item">
                                    <i className="icon-down" />
                                </button>
                                <ul className="sublist__nav">
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Buenos Aires
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Seguridad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Educación
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Cultura
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Comunidad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Salud
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Ciencia
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            LN Data
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Columnistas
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--economia item--disabled">
                                <a href="" className="link__item">
                                    Economía
                                </a>
                                <button type="button" className="button__item">
                                    <i className="icon-down" />
                                </button>
                                <ul className="sublist__nav">
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Buenos Aires
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Seguridad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Educación
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Cultura
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Comunidad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Salud
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Ciencia
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            LN Data
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Columnistas
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--mundo">
                                <a href="" className="link__item">
                                    El mundo
                                </a>
                            </li>
                            <li className="item__nav item--sociedad item--disabled">
                                <a href="" className="link__item">
                                    Sociedad
                                </a>
                                <button type="button" className="button__item">
                                    <i className="icon-down" />
                                </button>
                                <ul className="sublist__nav">
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Buenos Aires
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Seguridad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Educación
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Cultura
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Comunidad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Salud
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Ciencia
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            LN Data
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Columnistas
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--opinion item--disabled">
                                <a href="" className="link__item">
                                    Opinion
                                </a>
                                <button type="button" className="button__item">
                                    <i className="icon-down" />
                                </button>
                                <ul className="sublist__nav">
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Buenos Aires
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Seguridad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Educación
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Cultura
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Comunidad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Salud
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Ciencia
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            LN Data
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Columnistas
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--deportes item--disabled">
                                <a href="" className="link__item">
                                    Deportes
                                </a>
                                <button type="button" className="button__item">
                                    <i className="icon-down" />
                                </button>
                                <ul className="sublist__nav">
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Buenos Aires
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Seguridad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Educación
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Cultura
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Comunidad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Salud
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Ciencia
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            LN Data
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Columnistas
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--lifestyle item--disabled">
                                <a href="" className="link__item">
                                    Lifestyle
                                </a>
                                <button type="button" className="button__item">
                                    <i className="icon-down" />
                                </button>
                                <ul className="sublist__nav">
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Buenos Aires
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Seguridad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Educación
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Cultura
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Comunidad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Salud
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Ciencia
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            LN Data
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Columnistas
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--espectaculos item--disabled">
                                <a href="" className="link__item">
                                    Espectáculos
                                </a>
                                <button type="button" className="button__item">
                                    <i className="icon-down" />
                                </button>
                                <ul className="sublist__nav">
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Buenos Aires
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Seguridad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Educación
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Cultura
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Comunidad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Salud
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Ciencia
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            LN Data
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Columnistas
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="list__nav secondary--nav">
                            <li className="item__nav item--impresa item--disabled">
                                <a href="" className="link__item">
                                    Edición impresa
                                </a>
                                <button type="button" className="button__item">
                                    <i className="icon-down" />
                                </button>
                                <ul className="sublist__nav">
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Buenos Aires
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Seguridad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Educación
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Cultura
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Comunidad
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Salud
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Ciencia
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            LN Data
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Columnistas
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--revistas item--disabled">
                                <a href="" className="link__item">
                                    Revistas
                                </a>
                                <button type="button" className="button__item">
                                    <i className="icon-down" />
                                </button>
                                <ul className="sublist__nav">
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Ohlalá!
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            ¡Hola!
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            RollingStone
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Lugares
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Living
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Brando
                                        </a>
                                    </li>
                                    <li className="item__nav">
                                        <a href="" className="link__item">
                                            Jardín
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--ln">
                                <a href="" className="link__item">
                                    LN+
                                </a>
                            </li>
                            <li className="item__nav item--club">
                                <a href="" className="link__item">
                                    Club LA NACION
                                </a>
                            </li>
                        </ul>
                    </nav>
                </section>
            </div>
        </div>
    );
}
