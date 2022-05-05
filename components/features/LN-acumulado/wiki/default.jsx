/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import get from '../../../private/common/utils/get';
import Image from '../../../private/common/com-image';
import Text from '../../../private/common/text';
import Icon from '../../../private/common/icon';
import TaxonomyImportantList from '../../../private/LN/common/taxonomyImportantList';
import SchemaInfoWiki from '../../../private/LN/acumulado/wiki/SchemaInfoWiki';
import StaticValidation from '../../../private/common/staticValidation';

// import '../../../../resources/dist/css/pages/wiki-tags.css';

const WikiFeature = () => {
    const props = get(useAppContext(), 'globalContent', {});
    const { isWiki } = props;
    const wikiSourceData = useContent({
        source: isWiki ? 'wikiTagSource' : null,
        query: { type: 'person', imageConfig: 'aperturaAcu' }
    });

    const {
        creation_date: creationDate,
        social_networks: socialNetworks,
        related_tags: relatedTags,
        type,
        description,
        schemas_info: schemasInfo,
        image,
        logo_url: logoUrl,
        _id: featureId
    } = wikiSourceData;

    const {
        additional_name: additionalName,
        birth_date: birthDate,
        family_name: familyName,
        job_title: jobTitle,
        given_name: givenName,
        birth_place: birthPlace,
        founding_date: foundingDate,
        founding_location: foundingLocation,
        location,
        address,
        legal_name: legalName
    } = schemasInfo;

    const formatTags = relatedTags.map(({ text, slug }) => ({
        text,
        path: slug
    }));

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

    const addressInformation = {
        link: location,
        text: address
    };

    const isOrganization = location && address;
    const formatAlt = !isOrganization
        ? `${givenName} ${additionalName} ${familyName}`
        : legalName;

    const srcImg = isOrganization ? logoUrl : image.url;

    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            <article className="wiki-tags">
                <Image src={srcImg} alt={formatAlt} />
                <div className="extra-info">
                    {Object.keys(schemasInfo)
                        .filter(key => key !== 'location' && key !== 'address')
                        .map(key => (
                            <SchemaInfoWiki
                                classes="description"
                                label={schemaDictionary[key]}
                                text={schemasInfo[key]}
                            />
                        ))}
                    {isOrganization && (
                        <SchemaInfoWiki
                            classes="description"
                            label="Dirección"
                            text={addressInformation.text}
                            link={addressInformation.link}
                        />
                    )}
                </div>
                <div className="social-networks">
                    <Text
                        font="sueca"
                        size="2xs"
                        weight="regular"
                        extraClass="com-paragraph text-social-n"
                    >
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
                    <Text
                        font="sueca"
                        size="2xs"
                        weight="regular"
                        extraClass="com-paragraph"
                    >
                        {description}
                    </Text>
                </div>
                <TaxonomyImportantList
                    extraClass="tags-buttons"
                    list={formatTags}
                    showItems={5}
                />
            </article>
        </StaticValidation>
    );
};

WikiFeature.propTypes = {
    creation_date: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    social_networks: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                name: PropTypes.string,
                type: PropTypes.string,
                url: PropTypes.string
            }),
            PropTypes.string
        ])
    ),
    related_tags: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                text: PropTypes.string,
                slug: PropTypes.string
            }),
            PropTypes.string
        ])
    ),
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
    _id: PropTypes.string,
    logo_url: PropTypes.string,
    isWiki: PropTypes.string
};

export default WikiFeature;
