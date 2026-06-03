/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import useGetLogoImage from '../../private/common/hooks/useGetLogoImage';
import get from '../../private/common/utils/get';
import { replaceUrlResizerToWWW } from '../../private/common/utils/image/resizer/v2/resizerHelper';
import { setSlicedChildren } from './common/_helpers-WebApi';
import StaticContentV2 from '../LN10-global/staticContentV2';

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

export const checkChangeChildrenForPB = ({
    features,
    children,
    setUpdateChildrens,
    layout
}) => {
    if (
        features.length === 0 ||
        !children ||
        children.some(child => !child || !child.key)
    ) {
        return;
    }

    const orderFeaturesInitial = features.map(
        feature => feature.props && feature.props.id
    );

    const orderChildrenInitial = children.map(child => child.key);

    const isEqualOrder =
        JSON.stringify(orderChildrenInitial) ===
        JSON.stringify(orderFeaturesInitial);
    if (!isEqualOrder && children.length > 0) {
        const featuresUpdated = children.map(
            child =>
                features[
                    features.findIndex(
                        feature =>
                            feature &&
                            feature.props &&
                            feature.props.id === child.key
                    )
                ]
        );

        const featuredChildrenUpdated =
            setWrappedChildren(featuresUpdated, children) || [];

        const slicedChildrenUpdated = setSlicedChildren({
            children: featuredChildrenUpdated,
            config: { layout, countTimeline: true }
        });

        setUpdateChildrens(slicedChildrenUpdated);
    }
};

export const useGetLinks = ({
    navigationSection = '',
    staticMode = true,
    shouldLoad = true
}) => {
    const { children = [] } =
        useContent({
            source:
                shouldLoad && navigationSection && navigationSection.trim()
                    ? 'navigationSource'
                    : null,
            query: {
                hierarchy: navigationSection,
                website: 'la-nacion-ar'
            },
            staticMode,
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

export const useGetLogo = (
    logoId,
    title,
    isStatic,
    shouldLoad = true,
    shouldNormalizeResizer = true
) => {
    const id = shouldLoad && logoId && logoId.trim() && logoId;
    const logoImage = useGetLogoImage(id, isStatic);
    const logo =
        logoImage && shouldNormalizeResizer
            ? replaceUrlResizerToWWW(logoImage)
            : logoImage;

    const [firstResizedUrl] = get(logo, 'resized_urls', []);
    const resizedUrl = get(firstResizedUrl, 'resizedUrl', '');
    const { width: resizedWidth, height: resizedHeight } = get(
        firstResizedUrl,
        'option',
        {}
    );

    return (
        logo && {
            src: resizedUrl || get(logo, 'url', ''),
            alt: title,
            height: resizedHeight || get(logo, 'height', ''),
            width: resizedWidth || get(logo, 'width', ''),
            className: 'w-100'
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
        buttonLogo,
        buttonText,
        linkButton,
        buttonStyle,
        isAdmin,
        isManual,
        isStatic,
        shouldLoadRoof = true
    } = props;
    const shouldLoadAssets = shouldLoadRoof && !hideTitle;
    const { arcSite } = useAppContext();
    const shouldNormalizeResizer = arcSite !== 'foodit';

    const logo = useGetLogo(
        logoId,
        title,
        isStatic,
        shouldLoadAssets,
        shouldNormalizeResizer
    );
    const buttonLogoData = useGetLogo(
        buttonLogo,
        title,
        isStatic,
        shouldLoadAssets,
        shouldNormalizeResizer
    );
    const links = useGetLinks({
        navigationSection: navigator,
        staticMode: isStatic,
        shouldLoad: shouldLoadAssets
    });
    return {
        title,
        titleLink: link,
        logo,
        logoId,
        buttonLogo: {
            ...buttonLogoData,
            className: links?.length ? 'w-100 sm-only' : undefined
        },
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

export const getParentChildren = (featureId, renderables = []) => {
    const { children: parentChildren = [] } =
        renderables.find(
            renderable =>
                renderable.children &&
                renderable.children.some(child => child.props.id === featureId)
        ) || {};

    return parentChildren;
};

export const checkVariants = ({
    children = [],
    renderables = [],
    featureId
} = {}) => {
    const dynamicChildren = featureId
        ? getParentChildren(featureId, renderables)
        : children;

    const featuresIds = dynamicChildren.map(
        child => child.key || child.props.id
    );

    return !!renderables.find(renderable => {
        const { variants, id } = renderable.props;
        const variantsLength = variants && Object.keys(variants).length;

        return featuresIds.length
            ? featuresIds.includes(id) && variantsLength
            : variantsLength;
    });
};

export const setStaticDynamically = (Component, exception, props, id = '') =>
    exception ? (
        <div>{Component}</div>
    ) : (
        <StaticContentV2 {...{ ...props, id }}>{Component}</StaticContentV2>
    );
