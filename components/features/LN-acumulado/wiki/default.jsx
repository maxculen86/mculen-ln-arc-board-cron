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
    const { isWiki } = props;
    const wikiSourceData = useContent({
        source: isWiki ? 'wikiTagSource' : null,
        query: { type: 'person', imageConfig: 'wikiTag' }
    });

    if (!isWiki) return <></>;

    const {
        social_networks: socialNetworks = [],
        related_tags: relatedTags = [],
        description,
        schemas_info: schemasInfo = {},
        image = {},
        logo_url: logoUrl,
        _id: featureId
    } = wikiSourceData;

    const { url: imageUrl, resizedUrls } = image;

    const {
        additional_name: additionalName,
        family_name: familyName,
        given_name: givenName,
        location,
        address,
        legal_name: legalName
    } = schemasInfo;

    const schemaDictionary = {
        birth_date: 'Fecha de nacimiento',
        birth_place: 'Lugar de nacimiento',
        family_name: 'Nombre de pila',
        given_name: 'Nombre',
        job_title: 'Profesión',
        founding_date: 'Fecha de fundación',
        founding_location: 'Lugar de fundación',
        legal_name: 'Nombre legal',
        additional_name: 'Nombre adicional'
    };

    const isOrganization = location && address;

    const srcImg = isOrganization ? logoUrl : imageUrl;

    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            <article className="wiki-tags">
                <ModPicture
                    src={srcImg}
                    alt={
                        !isOrganization
                            ? `${givenName} ${additionalName} ${familyName}`
                            : legalName
                    }
                    sources={resizedUrls}
                />
                <div className="extra-info">
                    {Object.keys(schemasInfo)
                        .filter(key => key !== 'location' && key !== 'address')
                        .map(
                            key =>
                                schemasInfo[key].length > 3 && (
                                    <SchemaInfoWiki
                                        key={schemasInfo[key]}
                                        classes="description"
                                        label={schemaDictionary[key]}
                                        text={schemasInfo[key]}
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
                        <div className="social-icons" key={iconInfo.name}>
                            <Icon
                                name={iconInfo.name}
                                href={iconInfo.url}
                                title={`Ir al ${iconInfo.name}`}
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
                    list={relatedTags.map(({ text, slug }) => ({
                        text,
                        path: slug
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
