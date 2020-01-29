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

    return (
        <div id="wrapper" className={`${classRevista}`}>
            <Header headerDark={headerDark} />
            <main>
                {/* CABEZAL REVISTA Y BANNERS: CABEZAL Y STICKY */}
                {children[0]}
                {children[1] && (
                    <div className="row">
                        <div className="lay">
                            {/* BREADCRUMB, TITULO Y APERTURA */}
                            {children[1]}
                        </div>
                    </div>
                )}
                <div id="content-main" className="lay-sidebar">
                    <div className="sidebar__main">
                        {children[2] && (
                            <div className="row">
                                {/* LUGAR PARA UN ANEXO */}
                                {children[2]}
                            </div>
                        )}
                        {children[3] && (
                            <div className="row">
                                {/* LINKS DE NAVEGACION */}
                                {children[3]}
                            </div>
                        )}
                        {/* NOTAS */}
                        {children[4]}
                    </div>
                    <div className="sidebar__aside hlp-tablet-none">
                        {/* RANKING DE NOTAS */}
                        {children[5]}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

LNAcumuladoLayout.propTypes = {
    children: PropTypes.node.isRequired,
    globalContent: PropTypes.shape({
        style: PropTypes.shape({
            section_style_name: PropTypes.string,
            headerdark: PropTypes.string
        })
    }).isRequired
};

LNAcumuladoLayout.sections = layoutItems;

export default Consumer(LNAcumuladoLayout);
