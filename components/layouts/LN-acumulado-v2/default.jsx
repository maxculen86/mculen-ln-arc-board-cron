import React from 'react';
import PropTypes from 'fusion:prop-types';
import get from '../../private/common/utils/get';
import AnexoDefault from '../../features/LN-common/anexo/default';
import getConfigForAnexo from '../../private/common/utils/getConfigForAnexo';
import { BaseLayout } from '../../features/LN-10-global/common/baseLayout/default';
import pageBuilderSections from '../config/LN-Acumulado-PageBuilder.config.json';
import GlobalProvider from '../../private/common/context/globalContext';
import { getLayoutClassNames } from './_helpers';

function LNAcumuladoV2Layout(props) {
    const {
        children: [
            bannerMegatop,
            stickyMobile,
            preApertura,
            breadcrumbTitulo,
            apertura,
            links,
            notas,
            aside,
            bottom
        ],
        globalContent,
        requestUri = '',
        layout
    } = props;

    const acumuladoGeneral = get(globalContent, 'acumuladoGeneral', {});
    const anexoSuperiorConfig = getConfigForAnexo(
        acumuladoGeneral.anexosuperior || ''
    );
    const anexoInferiorConfig = getConfigForAnexo(
        acumuladoGeneral.anexoinferior || ''
    );

    const { classNameWrapper, classNameMain, backgroundCategory } =
        getLayoutClassNames({ globalContent, requestUri, layout });

    return (
        <GlobalProvider>
            <BaseLayout className={classNameWrapper}>
                {bannerMegatop}
                <main id="content" className={classNameMain}>
                    {stickyMobile}
                    <div
                        className="row --top"
                        style={{ backgroundColor: backgroundCategory }}
                    >
                        <div className="lay">
                            {preApertura}
                            {breadcrumbTitulo}
                            {anexoSuperiorConfig.anexoUrl && (
                                <AnexoDefault
                                    id="superior"
                                    customFields={{
                                        heightDesktop:
                                            anexoSuperiorConfig.anexoHeight,
                                        heightTablet:
                                            anexoSuperiorConfig.anexoHeight,
                                        heightMobile:
                                            anexoSuperiorConfig.anexoHeight,
                                        url: anexoSuperiorConfig.anexoUrl,
                                        hideTitle: true
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="lay">
                        {apertura}
                        {links}
                    </div>
                    <div id="content-main" className="lay-sidebar">
                        <div className="sidebar__main">
                            {anexoInferiorConfig.anexoUrl && (
                                <AnexoDefault
                                    id="inferior"
                                    customFields={{
                                        heightDesktop:
                                            anexoInferiorConfig.anexoHeight,
                                        heightTablet:
                                            anexoInferiorConfig.anexoHeight,
                                        heightMobile:
                                            anexoInferiorConfig.anexoHeight,
                                        url: anexoInferiorConfig.anexoUrl,
                                        hideTitle: true
                                    }}
                                />
                            )}
                            {notas}
                        </div>
                        <div className="sidebar__aside hlp-tabletlm-none">
                            {aside}
                        </div>
                    </div>
                    <div className="lay-sidebar">
                        <div className="sidebar__main">{bottom}</div>
                    </div>
                </main>
            </BaseLayout>
        </GlobalProvider>
    );
}

LNAcumuladoV2Layout.propTypes = {
    children: PropTypes.node.isRequired,
    requestUri: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        style: PropTypes.shape({
            section_style_name: PropTypes.string
        }),
        node_type: PropTypes.string,
        acumuladoGeneral: PropTypes.object,
        acumuladoColor: PropTypes.object
    }).isRequired
};

LNAcumuladoV2Layout.sections = pageBuilderSections;

export default LNAcumuladoV2Layout;
