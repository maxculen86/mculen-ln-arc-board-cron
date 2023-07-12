import React from 'react';
import { useContent } from 'fusion:content';
import useGetLogoImage from '../../private/common/hooks/useGetLogoImage';
import get from '../../private/common/utils/get';
import { setSlicedChildren } from './common/_helpers-WebApi';
// TODO agregar tests a estos helpers

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
            staticMode: true,
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
            const TARGET = '_self';

            if (nodeType === 'link') {
                return {
                    text: displayName,
                    href: url,
                    target: TARGET
                };
            }

            return {
                text: name,
                href: `${_id}/`,
                target: TARGET
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
