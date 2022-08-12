/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import get from '../../../private/common/utils/get';
import ModPicture from '../../../private/common/mod-picture';
import Text from '../../../private/common/text';
import Icon from '../../../private/common/icon';
import TaxonomyImportantList from '../../../private/LN/common/taxonomyImportantList';
import SchemaInfoWiki from '../../../private/LN/acumulado/wiki/SchemaInfoWiki';
import StaticValidation from '../../../private/common/staticValidation';
import { wikiImagesWithWWW } from '../../../private/LN/common/utils/mediaHelper';

const WikiFeature = () => {
    const props = get(useAppContext(), 'globalContent', {});
    const { isWiki } = props;
    const { wikiSourceData = {} } = props;

    if (!isWiki || !wikiSourceData) return <></>;

    const {
        social_networks: socialNetworks = [],
        related_tags: relatedTags = [],
        description,
        schemas_info: schemasInfo = {},
        _id: featureId,
        type
    } = wikiSourceData || {};

    const resizedUrls = wikiImagesWithWWW(wikiSourceData) || [];

    const { resizedUrl } = resizedUrls.find(e => e.option.width === 320) || '';

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
            value: `${birthDate}`
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
        <StaticValidation id={featureId} htmlOnly persistent>
            <article
                className={`wiki-tags ${isOrganization && '--organization'}`}
            >
                <ModPicture
                    src={resizedUrl}
                    alt={getAltImg(
                        isOrganization,
                        givenName,
                        additionalName,
                        familyName,
                        legalName
                    )}
                    sources={resizedUrls}
                    isApertura
                />
                <div className="extra-info">
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
                <div className="social-networks">
                    {socialNetworks.length > 0 && (
                        <Text font="sueca" size="2xs" weight="regular">
                            Conectar:
                        </Text>
                    )}
                    {socialNetworks.map(iconInfo => {
                        const {
                            type: iconType = '',
                            url: iconUrl = ''
                        } = iconInfo;
                        return (
                            <div className="social-icons" key={iconType}>
                                <Icon
                                    name={iconType.toLowerCase()}
                                    href={getIconHref(iconType, iconUrl)}
                                    title={getIconTitle(
                                        isOrganization,
                                        iconType,
                                        legalName,
                                        givenName,
                                        familyName
                                    )}
                                    target="_blank"
                                    rel="nofollow"
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="wiki-description">
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
        </StaticValidation>
    );
};

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

WikiFeature.propTypes = {
    isWiki: PropTypes.string
};

export default WikiFeature;
