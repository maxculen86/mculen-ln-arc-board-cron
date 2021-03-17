/* eslint-disable react/prop-types */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import {
    cajaTemasCustomsFields,
    validateChainManual,
    getCommonProps
} from '../../private/LN/common/utils/cajaTemasHelper';
import CajaTema from '../../private/LN/common/cajaTema';
import PageBuilderMessage from '../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import { formatText } from '../../private/common/utils/sectionUtils';

const CajaManual = props => {
    const {
        id: featureId,
        isAdmin,
        customFields: {
            url,
            title,
            layout = '',
            backgroundColor,
            imageId,
            hideTitle,
            hideCaja
        },
        outputType,
        childProps,
        children
    } = props;

    if (hideCaja) return <></>;

    const {
        notesQuantity,
        bgColor,
        classCondition,
        position,
        sectionName
    } = getCommonProps(props);
    const error = validateChainManual(childProps, layout);

    return (
        (isAdmin && !!error && (
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
        )) ||
        (!error && (
            <CajaTema
                title={title}
                hideTitle={hideTitle}
                url={url}
                imageId={imageId}
                outputType={outputType}
                layout={layout}
                classCondition={classCondition}
                notesQuantity={notesQuantity}
                position={position}
                sectionName={sectionName}
                backgroundColor={
                    backgroundColor !== 'default'
                        ? `${bgColor}${backgroundColor}`
                        : ''
                }
                _children={children}
            />
        )) || <></>
    );
};

CajaManual.label = 'LN Caja Manual';

CajaManual.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    outputType: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        ...cajaTemasCustomsFields('cajaManual')
    }).isRequired
};

export default Consumer(CajaManual);
