/* eslint-disable react/prop-types */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
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

const CajaManual = props => {
    const {
        id: featureId,
        isAdmin,
        customFields: { url, title, layout = '', imageId, hideTitle, hideCaja },
        outputType,
        childProps,
        children,
        renderables
    } = props;

    if (hideCaja)
        return (
            <Static id={featureId}>
                <></>
            </Static>
        );

    const {
        notesQuantity,
        classCondition,
        position,
        sectionName
    } = getCommonProps(props);

    const aperturasChildren = getChildrenFromAperturaHome(renderables);
    const multimediaChildren = getChildrenFromSectionHome(
        renderables,
        'Multimedia',
        5
    );

    const isInApertura = customFieldValidation({
        featureId,
        sectionChildren: aperturasChildren
    });

    const multimediaCustomFields = ['video', 'html'];

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
            _children={children}
        />
    );

    return isInApertura && !isAdmin ? (
        <Static id={featureId}>{Component}</Static>
    ) : (
        Component
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
