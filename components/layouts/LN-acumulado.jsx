import React, { useState, useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';

import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/pages/acu.css';
import '../../resources/dist/css/ln/components/ordered.css';
import '../../resources/dist/css/ln/components/unordered.css';
import '../../resources/dist/css/ln/components/hour.css';
import '../../resources/dist/css/ln/components/banners.css';
import { GlobalProviderAcu } from '../private/LN/acumulado/context/globalContextAcu';
import get from '../private/common/utils/get';

const layoutItems = [
    'Pre-Apertura',
    'Breadcrumb/Titulo',
    'Apertura',
    'Links',
    'Notas',
    'Aside'
];

const CLASS_ACU_REVISTA = 'acu-revista';
const revistas = ['ohlala'];

const LNAcumuladoLayout = props => {
    const { children, globalContent } = props;
    const [classRevista, setClassRevista] = useState('');
    const [headerDark, setHeaderDark] = useState('');

    useEffect(() => {
        const { style } = globalContent;
        const sectionStyleName =
            style && style.section_style_name ? style.section_style_name : '';

        revistas.indexOf(sectionStyleName || '') !== -1 &&
            setClassRevista(`${CLASS_ACU_REVISTA} ${sectionStyleName}`);

        setHeaderDark(
            style && style.headerdark && style.headerdark === 'true'
                ? ' --dark'
                : ''
        );
    }, [globalContent]);

    const acumuladoGeneral = get(globalContent, 'acumuladoGeneral', {});
    const acumuladoColor = get(globalContent, 'acumuladoColor', {});

    return (
        <GlobalProviderAcu
            acumuladoGeneral={acumuladoGeneral}
            acumuladoColor={acumuladoColor}
        >
            <div id="wrapper" className={`acumulado ${classRevista}`}>
                <Header headerDark={headerDark} />
                <main>
                    {/* CABEZAL REVISTA Y BANNERS: CABEZAL Y STICKY */}
                    {children[0]}
                    {children[1] && (
                        <div className="row">
                            <div className="col-12">
                                <div className="lay">
                                    {/* BREADCRUMB, TITULO Y APERTURA */}
                                    {children[1]}
                                </div>
                            </div>
                        </div>
                    )}
                    <div id="content-main" className="lay-sidebar">
                        <div className="sidebar__main">
                            {children[2] && (
                                <div className="row">
                                    <div className="col-12">
                                        {/* LUGAR PARA UN ANEXO */}
                                        {children[2]}
                                    </div>
                                </div>
                            )}
                            {children[3] && (
                                <div className="row">
                                    <div className="col-12">
                                        {/* LINKS DE NAVEGACION */}
                                        {children[3]}
                                    </div>
                                </div>
                            )}
                            {/* NOTAS */}
                            {children[4]}
                        </div>
                        <div className="sidebar__aside hlp-tablet-none">
                            <div className="row">
                                <div className="col-12">
                                    {/* RANKING DE NOTAS */}
                                    {children[5]}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </GlobalProviderAcu>
    );
};

LNAcumuladoLayout.propTypes = {
    children: PropTypes.node.isRequired,
    globalContent: PropTypes.shape({
        style: PropTypes.shape({
            section_style_name: PropTypes.string,
            headerdark: PropTypes.string
        }),
        acumuladoGeneral: PropTypes.shape({
            tipo_acumulado: PropTypes.string,
            hierarchy_navigation: PropTypes.string,
            hide_banner: PropTypes.string,
            cantidad_notas: PropTypes.string,
            id_collection_promo_items: PropTypes.string
        }),
        acumuladoColor: PropTypes.shape({
            header_class_name: PropTypes.string,
            background_color: PropTypes.string,
            navigation_color: PropTypes.string,
            navigation_color_tags: PropTypes.string,
            id_logo_image: PropTypes.string
        })
    }).isRequired
};

LNAcumuladoLayout.sections = layoutItems;

export default Consumer(LNAcumuladoLayout);
