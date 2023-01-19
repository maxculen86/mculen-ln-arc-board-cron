/* eslint-disable react/prop-types */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { Opening } from '@ln/contenidos-ui-opening';
import { getCommonProps } from '../../private/LN/common/utils/cajaTemasHelperLN10';
import StaticContent from '../../private/common/staticContent';
import getDataChainManual from '../utils/getDataChainManual';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import '../../../resources/packages/css/@ln/contenidos-ui-opening/index.css';
import '../../../resources/dist/css/ln/components/timeline.css';
import { setFilteredRenderables, setFeaturedChildren } from './_helper';

const featureRules = {
    hideInitialPosition: true,
    hideIdCollection: true,
    hideHideCaja: false,
    groupName: 'Ajuste Apertura',
    layouts: {
        'left-focal': 'Focal Izquierdo',
        'center-focal': 'Focal Derecho',
        'focal-70': 'Focal 70'
    },
    defaultLayout: 'focalLeft3'
};

const CajaApertura = props => {
    const {
        id: featureId,
        isAdmin,
        customFields: { layout = '', hideCaja },
        childProps,
        children,
        renderables = []
    } = props;

    if (hideCaja)
        return (
            <StaticContent id={featureId}>
                <></>
            </StaticContent>
        );

    const { notesQuantity, classCondition } = getCommonProps(props);

    const { error } = getDataChainManual({
        featureId,
        renderables,
        childProps,
        children,
        layout
    });

    const features = setFilteredRenderables(renderables, children);
    const newChildren = setFeaturedChildren(features, children);

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

    return <Opening focalType="left-focal">{newChildren}</Opening>;
};

CajaApertura.label = 'LN10 Caja Apertura';

CajaApertura.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        layout: PropTypes.oneOf(Object.keys(featureRules.layouts)).tag({
            label: 'Diagramación',
            defaultValue: featureRules.defaultLayout,
            description: 'Cambiar el diseño de la caja',
            group: featureRules.groupName,
            labels: featureRules.layouts
        }).isRequired
    }).isRequired
};

export default Consumer(CajaApertura);
