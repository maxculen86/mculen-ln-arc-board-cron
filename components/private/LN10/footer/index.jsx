/* eslint-disable react/require-default-props */
import React from 'react';
import { Footerhome } from '@ln/contenidos-ui-footerhome';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import {
    masInformacion,
    productos,
    revistas,
    secciones,
    optionsIcons,
    getEditionDetails,
} from './_helper';
import FooterEventsScript from '../../common/scriptManager/FooterEventsScript';

const Footer = () => {
    const { contextPath, deployment, layout } = useAppContext();
    const { layoutsName = {} } = siteConfig || {};
    const editionDetails = getEditionDetails();

    return (
        <>
            <Static id="LN-footer">
                <Footerhome
                    listFooterMasInformacion={masInformacion}
                    listFooterProductos={productos}
                    listFooterRevistas={revistas}
                    listFooterSecciones={secciones}
                    optionsIcons={optionsIcons(contextPath, deployment)}
                    isHome={layout === layoutsName.HomeLN10}
                    edDate={editionDetails.edDate}
                    edNumber={editionDetails.edNumber}
                />
                <FooterEventsScript />
            </Static>
        </>
    );
};

export default Footer;
