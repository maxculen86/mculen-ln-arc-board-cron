/* eslint-disable react/prop-types */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import {
    cajaTemasCustomsFields,
    getCommonProps,
    getChildrenFromAperturaHome,
    getChildrenFromSectionHome
} from '../../private/LN/common/utils/cajaTemasHelper';
import { validateChainManual } from '../../private/LN/common/utils/cajaTemasValidators';
import CajaTema from '../../private/LN/common/cajaTema';
import PageBuilderMessage from '../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import {
    customFieldValidation,
    childrenValidation
} from '../utils/contentValidations';
import { productClickFromClient } from '../../private/common/utils/viewability';
import StaticContent from '../../private/common/staticContent';
import setFilteredChildren from '../../private/LN/common/utils/setFilteredChildren';

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
        sectionName
    } = getCommonProps(props);

    const aperturasChildren = getChildrenFromAperturaHome(
        renderables,
        childProps
    );

    const multimediaChildren = getChildrenFromSectionHome(
        renderables,
        'Multimedia',
        5
    );

    const isInApertura = customFieldValidation({
        featureId,
        sectionChildren: aperturasChildren
    });

    const isMultimedia = customFieldValidation({
        featureId,
        sectionChildren: multimediaChildren
    });

    const features = renderables.filter(r => r.collection === 'features');
    const multimediaCustomFields = ['video', 'html'];
    const filteredChildren = setFilteredChildren({
        features,
        children,
        conditions: {
            feature: f => f.type !== 'LN-acumulado/timeline',
            children: layout !== 'grillaUltimasNoticias'
        }
    });

    const [isVideoBackground, containsHTML] = multimediaCustomFields.map(
        customField =>
            childrenValidation({
                featureId,
                customField,
                sectionChildren: multimediaChildren
            })
    );

    const error = validateChainManual(
        childProps,
        layout,
        isInApertura,
        isVideoBackground,
        containsHTML
    );

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

    if (error) return <></>;

    const Component = (
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
            sectionName={sectionName}
            _children={filteredChildren}
            handleClick={productClickFromClient}
            features={features}
            pageLayout={pageLayout}
            isMultimedia={isMultimedia}
        />
    );
    return isMultimedia ? (
        Component
    ) : (
        <StaticContent id={featureId}>{Component}</StaticContent>
    );
};

CajaManual.label = 'LN Caja Manual';

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
