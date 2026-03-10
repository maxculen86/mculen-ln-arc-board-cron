import React from 'react';
import PropTypes from 'fusion:prop-types';
import Image from '../../../ui/ln/image/default';
import SubNavigation from './SubNavigation';
import useNavigationCategories from '../hooks/useNavigationCategories';
import useGetLogoImage from '../../../../private/common/hooks/useGetLogoImage';
import { buildSubNavContentData } from '../_helpers';

function SubNavContent({
    globalContent,
    customFields,
    colorCategory,
    idLogoImage,
    hideCategories,
    hierarchyManual
}) {
    const { navigation, isPrimarySection } = useNavigationCategories({
        globalContent,
        hierarchyManual,
        hideCategories
    });
    const logoImage = useGetLogoImage(idLogoImage);

    const {
        sectionId,
        titleText,
        url,
        categories,
        hasLogo,
        isJuegosSection,
        imageProps
    } = buildSubNavContentData({
        customFields,
        globalContent,
        navigation,
        isPrimary: isPrimarySection,
        colorCategory,
        logoImage,
        idLogoImage
    });

    return (
        <div
            className={`mod-categories${isJuegosSection ? ' --no-app' : ''}`}
            data-section-id={sectionId}
        >
            {hasLogo ? (
                <div className="mod-logo">
                    <h1>
                        <span>{titleText}</span>
                        <Image
                            width={imageProps.width}
                            height={imageProps.height}
                            src={imageProps.src}
                            alt={titleText}
                        />
                    </h1>
                </div>
            ) : (
                // ANTES IBA TEXT, FALTA FRONT
                <h1>
                    <a
                        href={url}
                        title={`Ir a ${titleText}`}
                        style={{ color: colorCategory }}
                    >
                        <span>{titleText}</span>
                    </a>
                </h1>
            )}
            <SubNavigation
                navigation={categories}
                style={{ color: colorCategory }}
            />
        </div>
    );
}

SubNavContent.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string,
        Payload: PropTypes.shape({
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string
                })
            )
        }),
        byline: PropTypes.string,
        name: PropTypes.string,
        node_type: PropTypes.string
    }),
    customFields: PropTypes.shape({
        prefixTitle: PropTypes.string,
        replaceTitle: PropTypes.string
    }),
    colorCategory: PropTypes.string,
    idLogoImage: PropTypes.string,
    hideCategories: PropTypes.string,
    hierarchyManual: PropTypes.string
};

SubNavContent.defaultProps = {
    globalContent: {},
    customFields: {},
    colorCategory: undefined,
    idLogoImage: '',
    hideCategories: 'false',
    hierarchyManual: undefined
};

export default SubNavContent;
