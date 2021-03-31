import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';

import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/components/button.css';
import '../../resources/dist/css/ln/pages/error.css';

const ErrorPage = ({ siteProperties: { host } }) => (
    <div id="wrapper" className="error404">
        <header>
            <div className="lay">
                <div className="row">
                    <div className="col-12 col-desksm-5">
                        <a href={host || '/'} className="header__middle__logo">
                            <i className="logo-la-nacion" />
                        </a>
                    </div>
                    <div className="col-12 col-desksm-7">
                        <h1>La página que buscás no está disponible.</h1>
                        <p>Seguí navegando y encontrá lo que necesitás:</p>
                        <nav>
                            <a className="--btn --secondary" href={host || '/'}>
                                LA NACION
                            </a>
                            {/* <a className="--btn --secondary" href={host || '/'}>
                                Buscador
                            </a>
                            <a
                                className="--btn"
                                href="http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html"
                            >
                                MAPA DEL SITIO
                            </a> */}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <div className="lay">
                <div className="row">
                    <div className="col-12">
                        <img
                            src="https://www.lanacion.com.ar/error/liniers-horizontal.jpg"
                            alt="Imagen de Liniers"
                        />
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <div className="lay">
                <div className="row footer-copyright">
                    {/* <div className="col-12 col-desksm-6 col-desk-6 footer-humor">
                        <p>
                            Visitá&nbsp;
                            <a href="https://www.lanacion.com.ar/humor">
                                Humor
                            </a>
                            &nbsp; en LA NACION
                        </p>
                    </div> */}
                    <div className="col-12 footer-copyright__reserved">
                        <p>
                            Copyright 2021 SA LA NACION | Todos los derechos
                            reservados
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
);

ErrorPage.sections = [];

ErrorPage.propTypes = {
    siteProperties: PropTypes.shape({
        host: PropTypes.string
    }).isRequired
};

export default Consumer(ErrorPage);
