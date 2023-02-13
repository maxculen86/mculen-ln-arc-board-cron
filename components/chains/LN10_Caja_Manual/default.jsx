/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import {
    getCommonProps,
    getMarkupForDatalayer
} from '../../private/LN/common/utils/cajaTemasHelperLN10';
import { validateCajaManual } from './_helper';
import getGridType from '../utils/getGridType';
import setRender from '../utils/setRender';
import setCommonCustomFields from '../utils/setCommonCustomFields';
import StaticContent from '../../private/common/staticContent';
import getDynamicBanners from '../../private/common/banners/dynamicBanners/getDynamicBanners';

import BuildRoof from '../utils/_BuildRoof/default';
import '../../../resources/packages/css/@ln/contenidos-ui-bngrid/index.css';
import '../../../resources/packages/css/@ln/contenidos-ui-contentlab/index.css';
import { setSlicedChildren } from '../utils/_helpers';
import getComponent from '../utils/getComponent';

const CajaManual = props => {
    const {
        id: chainId,
        isAdmin,
        customFields: {
            title,
            layout = '',
            hideTitle,
            hideCaja,
            link,
            linkButton,
            chainStyle,
            logoId,
            buttonStyle,
            buttonText,
            navigator
        },
        childProps,
        children,
        renderables = []
    } = props;

    const { position, positionInsideSection } = getCommonProps(props);

    const error = validateCajaManual(layout, childProps);

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        '',
        layout,
        position,
        '',
        positionInsideSection
    );

    const articles = setSlicedChildren({
        config: { layout },
        children
    });

    const roofData = {
        title,
        titleLink: link,
        logoId,
        buttonText,
        linkButton,
        buttonStyle,
        hideRoof: hideTitle,
        navigationId: navigator,
        isAdmin,
        chainStyle,
        isManual: true
    };

    const { bannerMob = undefined, bannerDsk = undefined } =
        getDynamicBanners({
            renderables,
            featureId: chainId
        }) || {};

    const ContainerCards = getComponent(chainStyle, layout);

    return (
        <StaticContent {...extraOptsDiv}>
            {setRender({
                chainId,
                viewabilityData,
                isAdmin,
                error,
                hideBox: hideCaja,
                extraOptions: {
                    default: (
                        <>
                            <BuildRoof {...roofData} />
                            <ContainerCards
                                gridType={getGridType(layout)}
                                gridStyle={chainStyle}
                            >
                                {articles}
                            </ContainerCards>
                            {bannerMob}
                            {bannerDsk}
                        </>
                    )
                }
            })}
        </StaticContent>
    );
};

CajaManual.label = 'LN10 Caja Manual';

CajaManual.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    outputType: PropTypes.string,
    customFields: PropTypes.shape({
        ...setCommonCustomFields('cajaManual')
    }).isRequired
};

CajaManual.defaultProps = {
    outputType: 'default'
};

export default Consumer(CajaManual);
