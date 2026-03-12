/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext } from 'fusion:context';
import { Icon } from '@ln/common-ui-icon';
import { Link } from '@ln/common-ui-link';
import Static from 'fusion:static';
import get from '../../../private/common/utils/get';
import ModPicture from '../../../private/common/mod-picture';
import Text from '../../../private/common/text';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import TaxonomyImportantList from '../../../private/LN/common/taxonomyImportantList';
import SchemaInfoWiki from '../../../private/LN/acumulado/wiki/SchemaInfoWiki';
import { wikiImagesWithWWW } from '../../../private/LN/common/utils/mediaHelper';

export const getAltImg = (
    isOrganization,
    givenName,
    additionalName,
    familyName,
    legalName
) =>
    !isOrganization
        ? `${givenName} ${additionalName} ${familyName}`
        : legalName;

export const getIconTitle = (
    isOrganization,
    iconType,
    legalName,
    givenName,
    familyName
) =>
    isOrganization
        ? `Ir al ${iconType} de ${legalName}`
        : `Ir al ${iconType} de ${givenName} ${familyName}`;

export const getIconHref = (iconType, url) =>
    iconType === 'Instagram' ? url.concat('/') : url;

function WikiFeature({ id: featureId }) {
    const props = get(useAppContext(), 'globalContent', {});
    const { isWiki } = props;
    const { wikiSourceData = {} } = props;

    if (!isWiki || !wikiSourceData) return null;

    const {
        social_networks: socialNetworks = [],
        related_tags: relatedTags = [],
        description,
        schemas_info: schemasInfo = {},
        type
    } = wikiSourceData || {};

    const resizedUrls = wikiImagesWithWWW(wikiSourceData) || [];

    const { resizedUrl } = resizedUrls.find(e => e.option.width === 420) || '';

    const {
        additional_name: additionalName = '',
        family_name: familyName = '',
        given_name: givenName = '',
        job_title: jobTitle = '',
        birth_date: birthDate = '',
        birth_place: birthPlace = '',
        location,
        address,
        legal_name: legalName = '',
        founding_date: foundingDate = '',
        founding_location: foundingLocation = ''
    } = schemasInfo;

    const schemaPerson = [
        {
            text: 'Nombre',
            value: `${givenName} ${additionalName} ${familyName}`
        },
        { text: 'Profesión', value: `${jobTitle}` },
        {
            text: 'Fecha de nacimiento',
            value: `${birthDate.split('-').reverse().join('/')}`
        },
        {
            text: 'Lugar de nacimiento',
            value: `${birthPlace}`
        }
    ];

    const schemaOrganization = [
        { text: 'Nombre', value: `${legalName}` },
        {
            text: 'Fecha de fundación',
            value: `${foundingDate}`
        },
        {
            text: 'Lugar de fundación',
            value: `${foundingLocation}`
        }
    ];

    const isOrganization = type === 2;

    return (
        <Static id={featureId}>
            <article
                className={`wiki-tags ${isOrganization && '--organization'}`}
            >
                <ModPicture
                    imgDefault={resizedUrl}
                    alt={getAltImg(
                        isOrganization,
                        givenName,
                        additionalName,
                        familyName,
                        legalName
                    )}
                />
                <div className="extra-info --font-primary --font-medium">
                    {(isOrganization ? schemaOrganization : schemaPerson).map(
                        ({ text, value }) =>
                            value.length > 2 && (
                                <SchemaInfoWiki
                                    key={text}
                                    classes="description"
                                    label={text}
                                    text={value}
                                />
                            )
                    )}
                    {isOrganization && (
                        <SchemaInfoWiki
                            classes="description"
                            label="Dirección"
                            text={address}
                            link={location}
                        />
                    )}
                </div>
                {socialNetworks.length > 0 && (
                    <div className="social-networks flex ai-center --font-primary --font-medium mb-24 gap-16 pl-16_m pl-0_lg">
                        <Text>Conectar:</Text>
                        {socialNetworks.map(iconInfo => {
                            const { type: iconType = '', url: iconUrl = '' } =
                                iconInfo;
                            return (
                                <Link
                                    href={getIconHref(iconType, iconUrl)}
                                    title={getIconTitle(
                                        isOrganization,
                                        iconType,
                                        legalName,
                                        givenName,
                                        familyName
                                    )}
                                    target="_blank"
                                    className="flex ai-center jc-center neutral-light-50 bg-neutral-light-50 rounded-4 p-8"
                                    key={iconType}
                                >
                                    <Icon size={24}>
                                        <IconSprite
                                            name={iconType.toLowerCase()}
                                            fill="#333"
                                        />
                                    </Icon>
                                </Link>
                            );
                        })}
                    </div>
                )}
                <div className="wiki-description --georgia">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: description
                        }}
                    />
                </div>
                {relatedTags && (
                    <TaxonomyImportantList
                        extraClass="tags-buttons"
                        list={relatedTags.map(({ text, slug: tagSlug }) => ({
                            text,
                            path: tagSlug
                        }))}
                        showItems={5}
                    />
                )}
            </article>
        </Static>
    );
}

export default WikiFeature;
