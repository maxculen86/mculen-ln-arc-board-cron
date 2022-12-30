/* eslint-disable react/prop-types */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import {
    cajaTemasCustomsFields,
    getCommonProps
} from '../../private/LN/common/utils/cajaTemasHelperLN10';
import CajaTema from '../../private/LN/common/cajaTema';
import { productClickFromClient } from '../../private/common/utils/viewability';
import StaticContent from '../../private/common/staticContent';
import getDataChainManual from '../utils/getDataChainManual';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import getDynamicBanners from '../../private/common/banners/dynamicBanners/getDynamicBanners';

const CajaManual = props => {
    const {
        id: featureId,
        isAdmin,
        customFields: { url, title, layout = '', imageId, hideTitle, hideCaja },
        outputType,
        childProps,
        children,
        renderables = [],
        layout: pageLayout
    } = props;

    if (hideCaja)
        return (
            <StaticContent id={featureId}>
                <></>
            </StaticContent>
        );

    const {
        notesQuantity,
        classCondition,
        position,
        sectionName,
        positionInsideSection
    } = getCommonProps(props);

    const {
        filteredChildren,
        isInApertura,
        isMultimedia,
        features,
        error
    } = getDataChainManual({
        featureId,
        renderables,
        childProps,
        children,
        layout
    });

    if (isAdmin && error) {
        return (
            <WarningMessage
                id={featureId}
                type={error.type}
                message={error.message}
            />
        );
    }

    if (error) return <></>;

    const { bannerMob = undefined, bannerDsk = undefined } = getDynamicBanners({
        renderables,
        featureId
    });

    const Component = (
        <>
            <CajaTema
                title={title}
                hideTitle={hideTitle}
                url={url}
                imageId={imageId}
                outputType={outputType}
                layout={layout}
                classCondition={`${classCondition}${(isInApertura &&
                    layout.includes('focal') &&
                    ' --apertura') ||
                    ''}`}
                notesQuantity={notesQuantity}
                position={position}
                positionInsideSection={positionInsideSection}
                sectionName={sectionName}
                _children={filteredChildren}
                handleClick={productClickFromClient}
                features={features}
                pageLayout={pageLayout}
                isMultimedia={isMultimedia}
            />
            {bannerMob}
            {bannerDsk}
        </>
    );
    return isMultimedia ? (
        Component
    ) : (
        <StaticContent id={featureId}>{Component}</StaticContent>
    );
};

CajaManual.label = 'LN10 Caja Manual';

CajaManual.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    outputType: PropTypes.string,
    customFields: PropTypes.shape({
        ...cajaTemasCustomsFields('cajaManual')
    }).isRequired
};

CajaManual.defaultProps = {
    outputType: 'default'
};

export default Consumer(CajaManual);
