import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../../common/com-image';
import Text from '../../../common/text';
import Icon from '../../../common/icon';
import TaxonomyImportantList from '../../common/taxonomyImportantList';
import SchemaInfoTags from './SchemaInfoTags';

const WikiTag = ({
    creation_date,
    social_networks,
    related_tags,
    type,
    description,
    schemas_info,
    image,
    logo_url
}) => {
    const formatTags = related_tags.map(({ text, slug }) => ({
        text,
        path: slug
    }));

    const schemasInfo = {
        given_name: 'Club Atlético Boca',
        birth_date: '1905-04-03',
        address: 'esta es la direccion, codigo postal',
        location: '1905-04-03',
        birth_place: '1905-04-03',
        job_title: 'La Boca, Ciudad de Buenos Aires, Argentina'
    };

    const schemaDictionary = {
        additional_name: '',
        birth_date: 'Fecha de nacimiento',
        birth_place: 'Lugar de nacimiento',
        family_name: '',
        given_name: 'Nombre',
        job_title: 'Profesión',
        founding_date: 'Fecha de fundación',
        founding_laction: 'Fecha de fundación',
        legal_name: 'Nombre legal'
    };

    const addressInformation = {
        link: schemasInfo.location,
        text: schemasInfo.address
    };

    if (type === 'organizacion') {
        delete schemasInfo.location;
        delete schemasInfo.address;
    }

    // const isPersonWiki = type !== 'organizacion';
    // const formatAlt = isPersonWiki
    //     ? `${given_name} ${additional_name} ${family_name}`
    //     : legal_name;

    return (
        <article className="wiki-tags">
            <Image src={image.url} alt="holis" title="foto" />
            <div className="extra-info">
                {Object.keys(schemasInfo).map(key => (
                    <SchemaInfoTags
                        classes="description"
                        label={schemaDictionary[key]}
                        text={schemasInfo[key]}
                    />
                ))}
                {type === 'organizacion' && (
                    <SchemaInfoTags
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
                {social_networks.map(iconInfo => (
                    <div className="social-icons">
                        <Icon
                            name={iconInfo.name}
                            href={iconInfo.link}
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
    );
};

WikiTag.propTypes = {
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
        founding_laction: PropTypes.string,
        legal_name: PropTypes.string,
        location: PropTypes.string,
        additional_name: PropTypes.string,
        birth_date: PropTypes.string,
        family_name: PropTypes.string,
        given_name: PropTypes.string
    }),
    creation_date: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    logo_url: PropTypes.string
};

WikiTag.defaultProps = {
    social_networks: [
        {
            type: 'text',
            name: 'instagram',
            url: 'redsocialx'
        },
        {
            type: 'text',
            name: 'facebook',
            url: 'redsocialx'
        },
        {
            type: 'text',
            name: 'whatsapp',
            url: 'redsocialx'
        }
    ],
    related_tags: [
        {
            text: 'ESTO ES UN TAG',
            slug: 'text'
        },
        {
            text: 'tag',
            slug: 'text'
        },
        {
            text: 'ESTO ES UN TAG',
            slug: 'text'
        },
        {
            text: 'tag tag',
            slug: 'text'
        },
        {
            text: 'ESTO ES OTRO TAG MUY LARGO',
            slug: 'text'
        },
        {
            text: 'ESTO ES UN TAG MUY LARGO',
            slug: 'text'
        }
    ],
    creation_date: '',
    type: 'organizacion',
    description:
        'Lionel Andrés Messi Cuccittini , conocido como Leo Messi, es un futbolista argentino que juega como delantero o centrocampista. Jugador histórico del Fútbol Club Barcelona, al que estuvo ligado veinte años, desde 2021 integra el plantel del Paris Saint-Germain de la Ligue 1 de Francia. Es también internacional con la selección de Argentina, equipo del que es capitán y máximo goleador histórico.Considerado con frecuencia el mejor jugador del mundo y uno de los mejores de todos los tiempos, es el único futbolista en la historia que ha ganado, entre otras distinciones, siete veces el Balón de Oro, seis premios de la FIFA al mejor jugador del mundo y seis Botas de Oro. En 2020, se convirtió en el primer futbolista y el primer argentino en recibir un premio Laureus, además de ser incluido en el Dream Team del Balón de Oro. Con el Barcelona ha ganado 35 títulos, entre ellos.',
    schemas_info: {
        additional_name: 'Lionel Andrés Messi Cuccittini ',
        birth_date: '1987-06-24',
        birth_place: null,
        family_name: null,
        given_name: null,
        job_title: 'Futbolista ',
        address: 'Rosario, Santa Fe, Argentina',
        founding_date: null,
        founding_laction: null,
        legal_name: null,
        location: null
    },
    image: {
        url:
            'https://sites.google.com/site/ticvalcarcel/_/rsrc/1297944597850/optimizacion-de-imagenes-para-internet/tamano-y-peso-de-las-imagenes/Ejemplo2.jpg',
        width: '295',
        height: '440',
        alt: 'texto alternativo'
    },
    logo_url: ''
};

export default WikiTag;
