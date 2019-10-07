import React from 'react';
import '../../../../../resources/dist/css/ln/components/dropdown.css';

export default function Desplegable() {
    return (
        <div className="wrap-dropdown">
            <div className="com-dropdown">
                <section className="header__dropdown row">
                    <div className="logo__dropdown col-10">
                        <i class="logo-la-nacion"></i>
                    </div>
                    <div className="close__dropdown col-2">
                        <i class="icon-close"></i>
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
                            <i class="icon-search"></i>
                        </div>
                    </div>
                </section>
                <section className="menu__dropdown">
                    <nav className="nav__dropdown">
                        <ul className="list__nav  first--nav">
                            <li className="item__nav item--noticias">
                                <a href="" className="link__item">
                                    Últimas noticias
                                </a>
                                <button className="button__item">
                                    <i class="icon-down"></i>
                                </button>
                                <ul className="sublist__nav item--disabled">
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Tránsito</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Clima</a>{' '}
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--politica">
                                <a href="" className="link__item">
                                    Política
                                </a>
                                <button className="button__item">
                                    <i class="icon-down"></i>
                                </button>
                                <ul className="sublist__nav item--disabled">
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Buenos Aires</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Seguridad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Educación</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Cultura</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Comunidad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Salud</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Ciencia</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">LN Data</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Columnistas</a>{' '}
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--economia">
                                <a href="" className="link__item">
                                    Economía
                                </a>
                                <button className="button__item">
                                    <i class="icon-down"></i>
                                </button>
                                <ul className="sublist__nav item--disabled">
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Buenos Aires</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Seguridad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Educación</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Cultura</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Comunidad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Salud</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Ciencia</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">LN Data</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Columnistas</a>{' '}
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--mundo">
                                <a href="" className="link__item">
                                    El mundo{' '}
                                </a>
                            </li>
                            <li className="item__nav item--sociedad">
                                <a href="" className="link__item">
                                    Sociedad
                                </a>
                                <button className="button__item">
                                    <i class="icon-down"></i>
                                </button>
                                <ul className="sublist__nav item--disabled">
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Buenos Aires</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Seguridad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Educación</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Cultura</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Comunidad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Salud</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Ciencia</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">LN Data</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Columnistas</a>{' '}
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--opinion">
                                <a href="" className="link__item">
                                    Opinion
                                </a>
                                <button className="button__item">
                                    <i class="icon-down"></i>
                                </button>
                                <ul className="sublist__nav item--disabled">
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Buenos Aires</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Seguridad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Educación</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Cultura</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Comunidad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Salud</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Ciencia</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">LN Data</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Columnistas</a>{' '}
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--deportes">
                                <a href="" className="link__item">
                                    Deportes
                                </a>
                                <button className="button__item">
                                    <i class="icon-down"></i>
                                </button>
                                <ul className="sublist__nav item--disabled">
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Buenos Aires</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Seguridad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Educación</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Cultura</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Comunidad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Salud</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Ciencia</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">LN Data</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Columnistas</a>{' '}
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--lifestyle">
                                <a href="" className="link__item">
                                    Lifestyle
                                </a>
                                <button className="button__item">
                                    <i class="icon-down"></i>
                                </button>
                                <ul className="sublist__nav item--disabled">
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Buenos Aires</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Seguridad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Educación</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Cultura</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Comunidad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Salud</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Ciencia</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">LN Data</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Columnistas</a>{' '}
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--espectaculos">
                                <a href="" className="link__item">
                                    Espectáculos
                                </a>
                                <button className="button__item">
                                    <i class="icon-down"></i>
                                </button>
                                <ul className="sublist__nav item--disabled">
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Buenos Aires</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Seguridad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Educación</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Cultura</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Comunidad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Salud</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Ciencia</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">LN Data</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Columnistas</a>{' '}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="list__nav secondary--nav">
                            <li className="item__nav item--impresa">
                                <a href="" className="link__item">
                                    Edición impresa
                                </a>
                                <button className="button__item">
                                    <i class="icon-down"></i>
                                </button>
                                <ul className="sublist__nav item--disabled">
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Buenos Aires</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Seguridad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Educación</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Cultura</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Comunidad</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Salud</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Ciencia</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">LN Data</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Columnistas</a>{' '}
                                    </li>
                                </ul>
                            </li>
                            <li className="item__nav item--revistas">
                                <a href="" className="link__item">
                                    Revistas
                                </a>
                                <button className="button__item">
                                    <i class="icon-down"></i>
                                </button>
                                <ul className="sublist__nav item--disabled">
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Ohlalá!</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">¡Hola!</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">RollingStone</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Lugares</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Living</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Brando</a>{' '}
                                    </li>
                                    <li className="item__nav">
                                        {' '}
                                        <a href="">Jardín</a>{' '}
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
