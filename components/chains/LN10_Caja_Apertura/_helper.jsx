import React from 'react';
import PropTypes from 'fusion:prop-types';
import pageBuilderValidator from '../../private/common/utils/pageBuilderValidator';
import get from '../../private/common/utils/get';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import StaticContent from '../../private/common/staticContent';

const LAYOUTS = {
    FOCAL_LEFT: 'left-focal',
    FOCAL_CENTER: 'center-focal',
    FOCAL_70: 'focal-70'
};

const { FOCAL_LEFT, FOCAL_CENTER, FOCAL_70 } = LAYOUTS;

export const setCustomFields = () => {
    const CUSTOM_FIELDS_CONFIG = {
        layout: {
            label: 'Diagramación',
            defaultValue: 'left-focal',
            description: 'Cambiar el diseño de la caja',
            group: 'Ajuste Apertura',
            labels: {
                [FOCAL_LEFT]: 'Focal Izquierdo',
                [FOCAL_CENTER]: 'Focal Central',
                [FOCAL_70]: 'Focal al 70'
            }
        },
        hideBox: {
            name: 'Ocultar Caja',
            defaultValue: false,
            description: 'Marque para ocultar la caja',
            group: 'Ajuste Apertura',
            hidden: false
        }
    };

    const labelsKeys = Object.keys(CUSTOM_FIELDS_CONFIG.layout.labels);

    return PropTypes.shape({
        layout: PropTypes.oneOf(labelsKeys).tag(CUSTOM_FIELDS_CONFIG.layout),
        hideBox: PropTypes.boolean.tag(CUSTOM_FIELDS_CONFIG.hideBox)
    });
};

export const setSlicedChildren = ({
    setQuantityByLayout,
    config,
    featuredChildren
}) => {
    const maxChildrenQuantity = setQuantityByLayout(config);
    return featuredChildren.slice(0, maxChildrenQuantity);
};

export const setQuantityByLayout = ({ layout = '', countTimeline }) => {
    const options = {
        [FOCAL_LEFT]: countTimeline ? 6 : 5,
        [FOCAL_CENTER]: 4,
        [FOCAL_70]: 4,
        default: Number(layout && layout.slice(-1)) || 3
    };

    return options[layout] || options.default;
};

export const validateChain = (childrenProps, layout, isInOpening) => {
    const LN10_ARTICLE = 'LN10/LN10_articulo';
    const LN_TIMELINE = 'LN-acumulado/timeline';
    const COLLECTION_FEATURES = 'features';

    const isLeftFocal = layout === FOCAL_LEFT;
    const minimumChildren = setQuantityByLayout({ layout });

    const childrenArticles =
        childrenProps.filter(
            child =>
                child.collection === COLLECTION_FEATURES &&
                child.type === LN10_ARTICLE
        ) || [];

    const childrenArticlesLength = get(childrenArticles, 'length');

    const rules = [
        {
            validation: !layout,
            message: 'Se requiere que seleccione una diagramación'
        },
        {
            validation: !isInOpening,
            message: 'La chain debe estar dentro de la sección Apertura'
        },
        {
            validation: childrenArticlesLength < minimumChildren,
            message: `Se requiere la carga de ${minimumChildren -
                childrenArticlesLength} artículo${
                minimumChildren - childrenArticlesLength > 1 ? 's' : ''
            }`
        },
        {
            validation:
                isLeftFocal &&
                !childrenProps.find(
                    ({ collection, type }) =>
                        collection === COLLECTION_FEATURES &&
                        type === LN_TIMELINE
                ),
            message: 'Esta diagramación requiere el feature LN Timeline'
        },
        {
            validation: childrenProps.some(
                ({ collection, type }) =>
                    !(
                        collection === COLLECTION_FEATURES &&
                        [LN10_ARTICLE, LN_TIMELINE].includes(type)
                    )
            ),
            message:
                'El Chain Caja Apertura sólo admite features del tipo LN10 Artículo o LN Timeline'
        }
    ];

    return pageBuilderValidator(rules);
};

export const setWrappedChildren = (renderables = [], features = []) => {
    const customWrappers = {
        'LN-acumulado/timeline': content => (
            <div className="timeline-home">
                <div className="timeline-content">{content}</div>
            </div>
        )
    };

    return renderables
        .map(({ type, props } = {}) => {
            const feature = features.find(c => c.key === props.id);
            return customWrappers[type]
                ? customWrappers[type](feature)
                : feature;
        })
        .filter(Boolean);
};

export const setFilteredRenderables = (renderables = [], features = []) => {
    const featuresKeys = features.map(c => c.key);
    return renderables.filter(f => featuresKeys.includes(f.props.id));
};

export const setRender = ({ isAdmin, error = {}, hideBox, Component }) => {
    const options = {
        isWarning: isAdmin && error && (
            <WarningMessage type={error.type} message={error.message} />
        ),
        isEmpty: (hideBox || error) && <></>,
        default: <StaticContent>{Component}</StaticContent>
    };

    return Object.values(options).find(Boolean);
};
