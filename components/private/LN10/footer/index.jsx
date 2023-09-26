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
import OldFooter from '../../LN/common/footer';
import StaticContent from '../../common/staticContent';
import FooterEventsScript from '../../common/scriptManager/FooterEventsScript';
import { datesDiffInDays } from '../../common/utils/dateAndTimeUtil';
import { getArgentinaDateMonthYear } from '../../common/utils/dateAndTimeUtil';

import '../../../../resources/packages/css/@ln/contenidos-ui-footerhome/index.css';
import '../../../../resources/packages/css/@ln/common-ui-grid/index.css';

const Footer = () => {
    const { contextPath, deployment, outputType, layout } = useAppContext();
    const { layoutsName = {} } = siteConfig || {};

    const refDate = new Date('1995-12-13T03:00:00');
    const currentDate = new Date();
    const currentEdNumber = datesDiffInDays(refDate, currentDate);

    return (
        <>
            <StaticContent>
                {outputType === 'amp' ? (
                    <OldFooter />
                ) : (
                    <>
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
                    </>
                )}
            </StaticContent>
        </>
    );
};

export default Footer;
