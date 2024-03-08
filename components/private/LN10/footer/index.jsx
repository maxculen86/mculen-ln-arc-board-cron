/* eslint-disable react/require-default-props */
import React from 'react';
import { Footerhome } from '@ln/contenidos-ui-footerhome';
import { useAppContext } from 'fusion:context';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import {
    masInformacion,
    productos,
    revistas,
    secciones,
    optionsIcons
} from './_helper';
import StaticContent from '../../common/staticContent';
import FooterEventsScript from '../../common/scriptManager/FooterEventsScript';
import { datesDiffInDays } from '../../common/utils/dateAndTimeUtil';
import { getArgentinaDateMonthYear } from '../../common/utils/dateAndTimeUtil';

const Footer = () => {
    const { contextPath, deployment, layout } = useAppContext();
    const { layoutsName = {} } = siteConfig || {};

    const refDate = new Date('1995-12-13T03:00:00');
    const currentDate = new Date();
    const currentEdNumber = datesDiffInDays(refDate, currentDate);

    return (
        <>
            <StaticContent>
                <Footerhome
                    listFooterMasInformacion={masInformacion}
                    listFooterProductos={productos}
                    listFooterRevistas={revistas}
                    listFooterSecciones={secciones}
                    optionsIcons={optionsIcons(contextPath, deployment)}
                    isHome={layout === layoutsName.HomeLN10}
                    edDate={getArgentinaDateMonthYear()}
                    edNumber={currentEdNumber}
                />
                <FooterEventsScript />
            </StaticContent>
        </>
    );
};

export default Footer;
