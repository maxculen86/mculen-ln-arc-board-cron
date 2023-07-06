/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import Copyright from '../private/LN/common/footer/copyright';
import ComLogo from '../private/common/com-logo';

import '../../resources/dist/css/ln/pages/error.css';

const ErrorPage = props => {
    const {
        deployment,
        contextPath,
        siteProperties: { host },
        children: [MasNotas]
    } = props;
    const urlImageMob = deployment(
        `${contextPath}/resources/images/liniers-404-tab-desk.jpg`
    );
    const urlImageTabDesk = deployment(
        `${contextPath}/resources/images/liniers-404-tab-desk.jpg`
    );
    return (
        <div id="wrapper" className="error404">
            <header className="--pt-xl --prl-0">
                <div className="lay">
                    <div className="row">
                        <div className="col-12 col-desksm-5">
                            <a
                                href={host || '/'}
                                className="header__middle__logo --d-flex --w-100 --jc-l-end"
                                title="Ir a la página principal"
                            >
                                <ComLogo
                                    logoName="la-nacion"
                                    classCondition="--mb-sm --pr-md"
                                />
                            </a>
                        </div>
                        <div className="col-12 col-desksm-7 --border-l-left-gray --pl-l-md">
                            <h1 className="--font-primary --xl --font-bold">
                                La página que buscás no está disponible.
                            </h1>
                            <p className="--xs --mb-sm">
                                Seguí navegando y encontrá lo que necesitás:
                            </p>
                            <nav>
                                <a
                                    className="--btn --secondary --d-block --mb-md --text-link"
                                    href={host || '/'}
                                    title="Ir a la página principal"
                                >
                                    LA NACION
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="lay">
                    <div className="row">
                        <div className="col-12">
                            <div className="--ar-mob-3-4 --mb-xl --mb-m-0 --ptb-m-lg">
                                <Adaptableimage
                                    src={urlImageMob}
                                    sources={[
                                        {
                                            minWidth: 768,
                                            srcSet: `${urlImageTabDesk} 768w`
                                        },
                                        {
                                            maxWidth: 767,
                                            srcSet: `${urlImageMob} 375w`
                                        }
                                    ]}
                                    alt="Imagen de Liniers"
                                    className="--w-100 --m-auto"
                                />
                            </div>
                        </div>
                    </div>
                    <section className="box-articles">
                        <section className="mod-headersection ">
                            <h4 className="com-title --font-primary --xl --font-black">
                                Últimas Noticias
                            </h4>
                            <div className="com-line" />
                        </section>
                        {MasNotas}
                    </section>
                </div>
            </main>
            <footer>
                <div className="lay">
                    <div className="row footer-copyright --ptb-md">
                        <div className="col-12 footer-copyright__reserved --tab-text-center --text-neutral-light-600">
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
