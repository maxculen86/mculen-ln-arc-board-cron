import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';

import Image from '../private/common/com-image';
import Copyright from '../private/LN/common/footer/copyright';

import '../../resources/dist/css/ln/pages/error.css';

const ErrorPage = props => {
    const {
        siteProperties: { host },
        children: [MasNotas]
    } = props;
    return (
        <div id="wrapper" className="error404">
            <header>
                <div className="lay">
                    <div className="row">
                        <div className="col-12 col-desksm-5">
                            <a
                                href={host || '/'}
                                className="header__middle__logo"
                            >
                                <i className="logo-la-nacion" />
                            </a>
                        </div>
                        <div className="col-12 col-desksm-7">
                            <h1>La página que buscás no está disponible.</h1>
                            <p>Seguí navegando y encontrá lo que necesitás:</p>
                            <nav>
                                <a
                                    className="--btn --secondary"
                                    href={host || '/'}
                                >
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
                            <Image
                                src="https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/RSUQWM65SRA4VG2QHCZ3KER6JM.jpg"
                                alt="Imagen de Liniers"
                                classCondition="img-404"
                            />
                        </div>
                    </div>
                    <section className="box-articles">
                        <section className="mod-headersection ">
                            <h4 className="com-title --l">Últimas Noticias</h4>
                            <div class="com-line  "></div>
                        </section>
                        {MasNotas}
                    </section>
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
                            <Copyright />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

ErrorPage.sections = ['Mas-Notas'];

ErrorPage.propTypes = {
    siteProperties: PropTypes.shape({
        host: PropTypes.string
    }).isRequired,
    children: PropTypes.node.isRequired
};

export default Consumer(ErrorPage);
