import React from 'react';
import Consumer from 'fusion:consumer';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import Copyright from '../private/LN/common/footer/copyright';
import ComLogo from '../private/common/com-logo';

import '../../resources/dist/css/ln/pages/error.css';

function ErrorPage(props) {
    const {
        deployment,
        contextPath,
        siteProperties: { host },
        children: [MasNotas]
    } = props;
    const urlImageMob = deployment(
        `${contextPath}/resources/images/liniers-404-mobile.jpg`
    );
    const urlImageTabDesk = deployment(
        `${contextPath}/resources/images/liniers-404-tab-desk.jpg`
    );
    return (
        <div id="wrapper" className="error404">
            <header className="pt-40 px-0">
                <div className="lay">
                    <div className="row">
                        <div className="col-12 col-desksm-5">
                            <a
                                href={host || '/'}
                                className="header__middle__logo flex w-100 jc-end_l"
                                title="Ir a la página principal"
                            >
                                <ComLogo
                                    logoName="la-nacion"
                                    classCondition="mb-16 pr-24"
                                />
                            </a>
                        </div>
                        <div className="col-12 col-desksm-7 --border-l-left-gray pl-24_l">
                            <h1 className="--font-primary --xl --font-bold">
                                La página que buscás no está disponible.
                            </h1>
                            <p className="--xs mb-16">
                                Seguí navegando y encontrá lo que necesitás:
                            </p>
                            <nav>
                                <a
                                    className="--btn --secondary block mb-24 text-blue-500"
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
                            <div className="ratio-3-4_max767 mb-40 py-32_m">
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
                                    className="w-100 m-auto"
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
                    <div className="row footer-copyright py-24">
                        <div className="col-12 footer-copyright__reserved text-center_m text-light-600">
                            <Copyright />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

ErrorPage.sections = ['Mas-Notas'];

export default Consumer(ErrorPage);
