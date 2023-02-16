import React from 'react';
import { useContent } from 'fusion:content';
import useGetLogoImage from '../../private/common/hooks/useGetLogoImage';
import get from '../../private/common/utils/get';

// TODO agregar tests a estos helpers

export const LAYOUTS = {
    FOCAL_LEFT: 'left-focal',
    FOCAL_CENTER: 'center-focal',
    FOCAL_70: 'focal-70',
    BN_OPENING_4: 'bn-opening-4',
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
    BOMBITA: 'bombita',
    BOMBITAMAS4: 'bombitaMas4',
    GRILLA4VERTICALES: 'bn-4-8',
    BN_FOCAL_1: 'bn_1_grid',
    BN_2_GRID: 'bn_2_grid',
    BN_FOCAL_1_MAS_1: 'bn_1_1_grid',
    BN_FOCAL_1_MAS_2: 'bn_1_2_grid',
    BN_FOCAL_1_MAS_3: 'bn_1_3_grid',
    BN_FOCAL_1_MAS_4: 'bn_1_4_grid',
    BN_2_FOCAL_1_MAS_2: 'bn_2_1_2_grid'
};

export const VERTICALS = ['bienestar', 'campo', 'movilidad', 'propiedades'];

export const CHAIN_STYLE = {
    HASHTAG: 'HashTag',
    PROPIEDADES: 'propiedades',
    CAMPO: 'campo',
    BIENESTAR: 'bienestar',
    MOVILIDAD: 'movilidad',
    SUB_EXCLUSIVE: 'sub-exclusive'
};

const {
    FOCAL_LEFT,
    FOCAL_CENTER,
    FOCAL_70,
    BN_OPENING_4,
    HORIZONTAL,
    VERTICAL,
    BOMBITA,
    BOMBITAMAS4,
    BN_FOCAL_1,
    BN_2_GRID,
    BN_FOCAL_1_MAS_1,
    BN_FOCAL_1_MAS_2,
    BN_FOCAL_1_MAS_3,
    BN_FOCAL_1_MAS_4,
    BN_2_FOCAL_1_MAS_2,
    GRILLA4VERTICALES
} = LAYOUTS;

export const checkChangeChildrenForPB = ({
    features,
    children,
    setUpdateChildrens,
    layout
}) => {
    const orderFeaturesInitial = features.map(feature => {
        return feature.props && feature.props.id;
    });

    const orderChildrenInitial = children.map(child => {
        return child.key;
    });

    const isEqualOrder =
        JSON.stringify(orderChildrenInitial) ===
        JSON.stringify(orderFeaturesInitial);
    if (!isEqualOrder) {
        const featuresUpdated = children.map(child => {
            return features[
                features.findIndex(
                    feature =>
                        feature &&
                        feature.props &&
                        feature.props.id === child.key
                )
            ];
        });

        const featuredChildrenUpdated =
            setWrappedChildren(featuresUpdated, children) || [];

        const slicedChildrenUpdated = setSlicedChildren({
            children: featuredChildrenUpdated,
            config: { layout, countTimeline: true }
        });

        setUpdateChildrens(slicedChildrenUpdated);
    }
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
        .map(({ type, props = {} } = {}) => {
            const feature = features.find(c => c.key === props.id);
            return customWrappers[type]
                ? customWrappers[type](feature)
                : feature;
        })
        .filter(Boolean);
};

export const setQuantityByLayout = ({ layout = '', countTimeline }) => {
    const options = {
        [FOCAL_LEFT]: countTimeline ? 6 : 5,
        [FOCAL_CENTER]: 4,
        [FOCAL_70]: 3,
        [BN_OPENING_4]: 4,
        [HORIZONTAL]: 1,
        [VERTICAL]: 1,
        [BOMBITA]: 1,
        [BOMBITAMAS4]: 5,
        [BN_FOCAL_1]: 1,
        [BN_2_GRID]: 2,
        [BN_FOCAL_1_MAS_1]: 2,
        [BN_FOCAL_1_MAS_2]: 3,
        [BN_FOCAL_1_MAS_3]: 4,
        [BN_FOCAL_1_MAS_4]: 5,
        [BN_2_FOCAL_1_MAS_2]: 5,
        [GRILLA4VERTICALES]: 4,
        default: Number(layout && layout.slice(-1)) || 3
    };

    return options[layout] || options.default;
};

export const setSlicedChildren = ({ config, children = [] }) => {
    const maxChildrenQuantity = setQuantityByLayout(config);
    return children.slice(0, maxChildrenQuantity);
};

export const useGetLinks = ({ navigationSection = '' }) => {
    const { children = [] } =
        useContent({
            source:
                navigationSection && navigationSection.trim()
                    ? 'navigationSource'
                    : null,
            query: {
                hierarchy: navigationSection,
                website: 'la-nacion-ar'
            },
            filter: `
            children {
                _id
                name
                display_name
                node_type
                url
            }
        `
        }) || {};

    return children.map(
        ({
            url,
            node_type: nodeType,
            name,
            display_name: displayName,
            _id
        } = {}) => {
            const target = '_blank';

            if (nodeType === 'link') {
                return {
                    text: displayName,
                    href: url,
                    target
                };
            }

            return {
                text: name,
                href: `${_id}/`,
                target
            };
        }
    );
};

export const useGetLogo = (logoId, title) => {
    const id = logoId && logoId.trim() && logoId;
    const logo = useGetLogoImage(id, true);

    return (
        logo && {
            src: get(logo, 'url', ''),
            alt: title,
            height: get(logo, 'height', ''),
            width: get(logo, 'width', '')
        }
    );
};

export const useRoofData = props => {
    const {
        title,
        hideTitle,
        chainStyle,
        link,
        logoId,
        navigator,
        buttonText,
        linkButton,
        buttonStyle,
        isAdmin,
        isManual
    } = props;

    const logo = useGetLogo(logoId, title);
    const links = useGetLinks({ navigationSection: navigator });

    return {
        title,
        titleLink: link,
        logo,
        logoId,
        buttonText,
        linkButton,
        buttonStyle,
        hideRoof: hideTitle,
        links,
        navigationId: navigator,
        isAdmin,
        chainStyle,
        isManual
    };
};
