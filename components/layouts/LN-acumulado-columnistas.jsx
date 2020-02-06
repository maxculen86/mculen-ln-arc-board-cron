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

const layoutItems = ['Contenido'];

const CLASS_ACU_REVISTA = 'acu-revista';
const revistas = ['ohlala'];

const LNAcumuladoColumnistasLayout = props => {
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

    return (
        <div id="wrapper" className={`${classRevista}`}>
            <Header headerDark={headerDark} />
            <main>
                {/* CABEZAL REVISTA Y BANNERS: CABEZAL Y STICKY */}
                <div className="lay-sidebar">
                    <div className="sidebar__main">
                        {/* Espacio para breadcrum
                            <div class="row">
                                <div class="col-12">
                                    <nav class="com-breadcrumb hlp-marginBottom-30">
                                        <a href="">LA NACION</a>
                                        <a href="">Columnistas</a>
                                    </nav>
                                </div>
                                <div class="col-12">
                                    <div class="com-titleWithfollow hlp-marginBottom-30">
                                        <h1 class="com-title-section-xl">Columnistas</h1>
                                    </div>
                                </div>
                            </div>
                        */}
                        {/* Espacio para el contenido */}
                        {children[0]}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

LNAcumuladoColumnistasLayout.propTypes = {
    children: PropTypes.node.isRequired,
    globalContent: PropTypes.shape({
        style: PropTypes.shape({
            section_style_name: PropTypes.string,
            headerdark: PropTypes.string
        })
    }).isRequired
};

LNAcumuladoColumnistasLayout.sections = layoutItems;

export default Consumer(LNAcumuladoColumnistasLayout);
