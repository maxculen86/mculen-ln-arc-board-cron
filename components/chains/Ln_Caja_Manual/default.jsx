/* eslint-disable react/prop-types */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import {
    cajaTemasCustomsFields,
    getCommonProps,
    getChildrenFromAperturaHome,
    getChildrenFromMultimediaHome
} from '../../private/LN/common/utils/cajaTemasHelper';
import { validateChainManual } from '../../private/LN/common/utils/cajaTemasValidators';
import CajaTema from '../../private/LN/common/cajaTema';
import PageBuilderMessage from '../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import get from '../../private/common/utils/get';
import config from '../../../properties/sites/la-nacion-ar';

const CajaManual = props => {
    const {
        id: featureId,
        isAdmin,
        customFields: { url, title, layout = '', imageId, hideTitle, hideCaja },
        outputType,
        childProps,
        children,
        layout: layoutPageBuilder,
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
    const { layoutsName = {} } = config || {};

    const getChildrenHome = method =>
        layoutsName.Home === layoutPageBuilder ? method(renderables) : [];

    const aperturasChildren = getChildrenHome(getChildrenFromAperturaHome);
    const multimediaChildren = getChildrenHome(getChildrenFromMultimediaHome);

    const isInApertura = aperturasChildren.some(el => {
        return (
            !get(el, 'props.customFields.hideCaja', false) &&
            get(el, 'props.id', undefined) === featureId
        );
    });

    const isVideoBackground = multimediaChildren.some(
        el =>
            el.children &&
            el.children.some(art =>
                get(art, 'props.customFields.video', false)
            ) &&
            multimediaChildren.some(
                cm => get(cm, 'props.id', undefined) === featureId
            )
    );

    const error = validateChainManual(
        childProps,
        layout,
        isInApertura,
        isVideoBackground
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
