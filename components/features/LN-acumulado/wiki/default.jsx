/* eslint-disable react/no-danger */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import get from '../../../private/common/utils/get';
import ModPicture from '../../../private/common/mod-picture';
import Text from '../../../private/common/text';
import Icon from '../../../private/common/icon';
import TaxonomyImportantList from '../../../private/LN/common/taxonomyImportantList';
import SchemaInfoWiki from '../../../private/LN/acumulado/wiki/SchemaInfoWiki';
import StaticValidation from '../../../private/common/staticValidation';

const WikiFeature = () => {
    const props = get(useAppContext(), 'globalContent', {});
    const slug = get(useAppContext(), 'globalContentConfig.query.slug', '');
    const { isWiki } = props;
    const wikiSourceData = useContent({
        source: isWiki ? 'wikiTagSource' : null,
        query: {
            slug,
            imageConfig: 'wikiTag'
        }
    });

    if (!isWiki || !wikiSourceData) return <></>;

    const {
        social_networks: socialNetworks = [],
        related_tags: relatedTags = [],
        description,
        schemas_info: schemasInfo = {},
        image = {},
        _id: featureId
    } = wikiSourceData || {};

    const { url: imageUrl, resizedUrls } = image;

    const {
        additional_name: additionalName,
        family_name: familyName,
        given_name: givenName,
        location,
        address,
        legal_name: legalName
    } = schemasInfo;

    const schemaPerson = [
        {
            text: 'Nombre',
            value: `${schemasInfo.given_name ||
                ''} ${schemasInfo.additional_name ||
                ''} ${schemasInfo.family_name || ''}`
        },
        { text: 'Profesión', value: `${schemasInfo.job_title || ''}` },
        {
            text: 'Fecha de nacimiento',
            value: `${schemasInfo.birth_date || ''}`
        },
        {
            text: 'Lugar de nacimiento',
            value: `${schemasInfo.birth_place || ''}`
        }
    ];
    const schemaOrganization = [
        { text: 'Nombre', value: `${schemasInfo.legal_name || ''}` },
        {
            text: 'Fecha de fundación',
            value: `${schemasInfo.founding_date || ''}`
        },
        {
            text: 'Lugar de fundación',
            value: `${schemasInfo.founding_location || ''}`
        }
    ];

    const isOrganization = location && address;

    const altImg = !isOrganization
        ? `${givenName} ${additionalName} ${familyName}`
        : legalName;

    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            <article className="wiki-tags">
                <ModPicture src={imageUrl} alt={altImg} sources={resizedUrls} />
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
                    <Text font="sueca" size="2xs" weight="regular">
                        Conectar:
                    </Text>
                    {socialNetworks.map(iconInfo => (
                        <div className="social-icons" key={iconInfo.type}>
                            <Icon
                                name={iconInfo.type.toLowerCase()}
                                href={iconInfo.url}
                                title={`Ir al ${iconInfo.type.toLowerCase()}`}
                                target="_blank"
                                rel="nofollow"
                            />
                        </div>
                    ))}
                </div>
                <div className="wiki-description">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: description
                        }}
                    />
                </div>
                <TaxonomyImportantList
                    extraClass="tags-buttons"
                    list={relatedTags.map(({ text, slug: tagSlug }) => ({
                        text,
                        path: tagSlug
                    }))}
                    showItems={5}
                />
            </article>
        </StaticValidation>
    );
};

WikiFeature.propTypes = {
    schemas_info: PropTypes.shape({
        job_title: PropTypes.string,
        address: PropTypes.string,
        founding_date: PropTypes.string,
        birth_place: PropTypes.string,
        founding_location: PropTypes.string,
        legal_name: PropTypes.string,
        location: PropTypes.string,
        additional_name: PropTypes.string,
        birth_date: PropTypes.string,
        family_name: PropTypes.string,
        given_name: PropTypes.string
    }),
    isWiki: PropTypes.string
};

export default WikiFeature;
