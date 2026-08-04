import React from 'react';
import { cx } from '@ln/ds-cva';
import SocialNetwork from '../../../../private/common/social-network';
import SubNavHeader from './SubNavHeader';
import SubNavigation from './SubNavigation';
import useNavigationCategories from '../hooks/useNavigationCategories';
import useGetLogoImage from '../../../../private/common/hooks/useGetLogoImage';
import { buildSubNavContentData, getBrandFromSection } from '../_helpers';

function SubNavContent({
    globalContent,
    customFields,
    idLogoImage,
    hideCategories,
    hierarchyManual,
    socials,
    navigationType
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
        logoImage,
        idLogoImage
    });

    const brand = getBrandFromSection(
        sectionId,
        globalContent?.style?.section_style_name
    );

    return (
        <div
            className={cx(
                'flex flex-column gap-16 pb-16',
                isJuegosSection && '--no-app'
            )}
            data-section-id={sectionId}
        >
            <SubNavHeader
                hasLogo={hasLogo}
                titleText={titleText}
                url={url}
                imageProps={imageProps}
            />
            <SubNavigation
                navigation={categories}
                navigationType={navigationType}
                brand={brand}
            />
            {socials?.length > 0 && (
                <div data-tw className="flex">
                    {socials.map(social => (
                        <SocialNetwork
                            key={`${social.name}-${social.href}`}
                            {...social}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SubNavContent;
