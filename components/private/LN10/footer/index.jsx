import React from 'react';
import { Footerhome } from '@ln/contenidos-ui-footerhome';
import { masInformacion, productos, revistas, secciones } from './_helper';
import '../../../../../resources/packages/css/@ln/contenidos-ui-footerhome/index.css';
import '../../../../../resources/packages/css/@ln/common-ui-icon/index.css';
import '../../../../../resources/packages/css/@ln/common-ui-grid/index.css';

const Footer = () => {
    return (
        <Footerhome
            listFooterMasInformacion={masInformacion}
            listFooterProductos={productos}
            listFooterRevistas={revistas}
            listFooterSecciones={secciones}
        />
    );
};

export default Footer;
