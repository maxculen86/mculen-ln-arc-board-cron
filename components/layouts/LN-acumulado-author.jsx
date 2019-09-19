import React from 'react';
import Consumer from 'fusion:consumer';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import WikiAuthor from '../private/LN/acumulado/author/wikiAuthor';
import BannerCaja1 from '../private/LN/acumulado/bannerCaja1';
import BannerCaja2 from '../private/LN/acumulado/bannerCaja2';
import BannerCabezal from '../private/LN/acumulado/bannerCabezal';
import BreadCrumbAutor from '../private/LN/acumulado/breadcrumbs/breadcrumbAutor';

import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/pages/acu.css';

const layoutItems = ['Apertura', 'Links', 'Notas', 'Aside'];

/**
 * TODO: El siguiente const contiene data de ejemplo
 * que debe ser borrada una vez se cree su content provider
 */

const bioAuthor = {
    name: 'Joaquín Morales Solá',
    url: 'https://google.com',
    imgSrc: 'https://bucket2.glanacion.com/anexos/fotos/95/3037695h320.png',
    bio: `Ejerce el periodismo desde los 16 años cuando ingresó al
        diario La Gaceta de Tucumán. En 1975, Clarín lo convocó para
        ser prosecretario de la sección Política. Durante 12 años
        fue segundo jefe de Redacción y autor de la columna política
        dominical de ese diario. Fue columnista político del
        noticiero de Telefé y del programa "Tiempo Nuevo", de
        Bernardo Neustadt. Durante 1997, condujo "Dos en la noticia"
        junto con Magdalena Ruiz Guiñazú, por el ex Canal 9.
        Actualmente es columnista político del diario LA NACION. En
        1990, el gobierno de Italia lo condecoró con la Orden al
        Mérito de la República Italiana. Posteriormente, en 1992,
        España lo distinguió con la Orden de Isabel la Católica. En
        1998, recibió la Orden Nacional al Mérito que entrega la
        república de Francia. En su último libro, "Sin excusas"
        (Sudamericana), Morales Solá revela diálogos con el ex
        vicepresidente Chacho Alvarez, sobre la trama secreta de los
        sobornos en el Senado, las causas de su renuncia y los
        errores que condujeron al fracaso de la Alianza.`,
    twitter: '@moralessola'
};

const LNAcumuladoAuthorLayout = props => (
    <div id="wrap">
        <Header />
        <main>
            <BannerCabezal />
            <div className="lay-sidebar">
                <div className="sidebar__main">
                    <div className="row">
                        <BreadCrumbAutor
                            author={props.globalContent}
                            host={props.siteProperties.shareConfig.host}
                        />
                    </div>
                    <div className="row">
                        <WikiAuthor {...bioAuthor} />
                    </div>
                    <div className="row">
                        {/* LINKS DE NAVEGACION */}
                        {props.children[1]}
                    </div>
                    <section className="row-gap-tablet-2 row-gap-deskxl-3 hlp-degrade">
                        {/* NOTAS */}
                        {props.children[2]}
                    </section>
                </div>
                <div className="sidebar__aside">
                    <BannerCaja1 />
                    {/* RANKING DE NOTAS */}
                    {props.children[3]}
                    <BannerCaja2 />
                </div>
            </div>
        </main>
        <Footer />
    </div>
);

LNAcumuladoAuthorLayout.sections = layoutItems;

export default Consumer(LNAcumuladoAuthorLayout);
