/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Footerhome } from '@ln/contenidos-ui-footerhome';
import { useAppContext } from 'fusion:context';
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
import '../../../../resources/packages/css/@ln/contenidos-ui-footerhome/index.css';
import '../../../../resources/packages/css/@ln/common-ui-grid/index.css';

const Footer = ({ outputType = 'default' }) => {
    const { contextPath, deployment } = useAppContext();
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
                        />
                        <FooterEventsScript />
                    </>
                )}
            </StaticContent>
        </>
    );
};

Footer.propTypes = {
    outputType: PropTypes.string
};

export default Footer;
