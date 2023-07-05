import React from 'react';
import { Footerhome } from '@ln/contenidos-ui-footerhome';
import { masInformacion, productos, revistas, secciones } from './_helper';

import StaticContent from '../../common/staticContent';
import FooterEventsScript from '../../common/scriptManager/FooterEventsScript';
import '../../../../resources/packages/css/@ln/contenidos-ui-footerhome/index.css';
import '../../../../resources/packages/css/@ln/common-ui-grid/index.css';

const Footer = () => {
    return (
        <>
            <StaticContent>
                <Footerhome
                    listFooterMasInformacion={masInformacion}
                    listFooterProductos={productos}
                    listFooterRevistas={revistas}
                    listFooterSecciones={secciones}
                />
                <FooterEventsScript />
            </StaticContent>
        </>
    );
};

export default Footer;
