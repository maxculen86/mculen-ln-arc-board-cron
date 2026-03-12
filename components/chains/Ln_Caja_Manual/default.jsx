import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import {
    cajaTemasCustomsFields,
    getCommonProps
} from '../../private/LN/common/utils/cajaTemasHelper';
import { validateChainManual } from '../../private/LN/common/utils/cajaTemasValidators';
import CajaTema from '../../private/LN/common/cajaTema';
import PageBuilderMessage from '../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import { productClickFromClient } from '../../private/common/utils/viewability';
import setFilteredChildren from '../../private/LN/common/utils/setFilteredChildren';

function CajaManual(props) {
    const {
        id: featureId,
        isAdmin,
        customFields: { url, title, layout = '', imageId, hideTitle, hideCaja },
        outputType = 'default',
        childProps,
        children,
        renderables = [],
        layout: pageLayout
    } = props;

    if (hideCaja) return null;

    const {
        notesQuantity,
        classCondition,
        position,
        sectionName,
        positionInsideSection
    } = getCommonProps(props);

    const features = renderables.filter(r => r.collection === 'features');
    const filteredChildren = setFilteredChildren({
        features,
        children,
        conditions: {
            feature: f => f.type !== 'LN-acumulado/timeline',
            children: layout !== 'grillaUltimasNoticias'
        }
    });

    const error = validateChainManual(childProps, layout);

    if (isAdmin && error) {
        return (
            <div
                style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    width: '100%'
                }}
            >
                <PageBuilderMessage
                    key={featureId}
                    type={error.type}
                    message={error.message}
                />
            </div>
        );
    }

    if (error) return null;

    const Component = (
        <CajaTema
            title={title}
            hideTitle={hideTitle}
            url={url}
            imageId={imageId}
            outputType={outputType}
            layout={layout}
            classCondition={`${classCondition}`}
            notesQuantity={notesQuantity}
            position={position}
            positionInsideSection={positionInsideSection}
            sectionName={sectionName}
            _children={filteredChildren}
            handleClick={productClickFromClient}
            features={features}
            pageLayout={pageLayout}
        />
    );
    return (
        <Static id={`LN-Caja-Manual-${featureId}`} htmlOnly>
            {Component}
        </Static>
    );
}

CajaManual.label = 'LN Caja Manual';

CajaManual.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    outputType: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        ...cajaTemasCustomsFields('cajaManual')
    }).isRequired
};

export default Consumer(CajaManual);
