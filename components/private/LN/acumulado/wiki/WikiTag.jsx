import React from 'react';
// import PropTypes from 'prop-types';
import Image from '../../../common/com-image';
import Text from '../../../common/text';
import Icon from '../../../common/icon';
import TaxonomyImportantList from '../../common/taxonomyImportantList';

const WikiTag = () => {
    const ExtraInformation = ({ classes, label, text, type }) => {
        // const labeled = {
        //     name: 'Nombre'
        // };

        return (
            <div className={classes}>
                <Text>{label}</Text>
                <Text>{text}</Text>
            </div>
        );
    };

    const tagsList = [
        {
            text: 'ESTO ES UN TAG',
            path: 'text'
        },
        {
            text: 'tag',
            path: 'text'
        },
        {
            text: 'ESTO ES UN TAG',
            path: 'text'
        },
        {
            text: 'tag tag',
            path: 'text'
        },
        {
            text: 'ESTO ES OTRO TAG MUY LARGO',
            path: 'text'
        },
        {
            text: 'ESTO ES UN TAG MUY LARGO',
            path: 'text'
        }
    ];

    return (
        <article className="wiki-tags">
            <div className="wiki-img">
                <Image
                    src="https://sites.google.com/site/ticvalcarcel/_/rsrc/1297944597850/optimizacion-de-imagenes-para-internet/tamano-y-peso-de-las-imagenes/Ejemplo2.jpg"
                    alt="hola"
                    title="foto"
                    width="80"
                    height="240"
                />
                <div />
                <div />
            </div>
            <div className="wiki-info">
                <ExtraInformation
                    classes="description"
                    label="nombre de tipo"
                    text="leonel messirve"
                />
                <ExtraInformation
                    classes="description"
                    label="nombre de tipo"
                    text="leonel messirve"
                />
                <ExtraInformation
                    classes="description"
                    label="nombre de tipo"
                    text="leonel messirve"
                />
                <ExtraInformation
                    classes="description"
                    label="nombre de tipo"
                    text="leonel messirve"
                />
                <div className="social-networks">
                    <Text>Conectar:</Text>
                    <div className="social-icons">
                        <Icon name="facebook" />
                    </div>
                    <div className="social-icons">
                        <Icon name="whatsapp" />
                    </div>
                    <div className="social-icons">
                        <Icon name="instagram" />
                    </div>
                </div>
            </div>
            <div className="wiki-description">
                <Text>
                    Lionel Andrés Messi Cuccittini , conocido como Leo Messi, es
                    un futbolista argentino que juega como delantero o
                    centrocampista. Jugador histórico del Fútbol Club Barcelona,
                    al que estuvo ligado veinte años, desde 2021 integra el
                    plantel del Paris Saint-Germain de la Ligue 1 de Francia. Es
                    también internacional con la selección de Argentina, equipo
                    del que es capitán y máximo goleador histórico. Considerado
                    con frecuencia el mejor jugador del mundo y uno de los
                    mejores de todos los tiempos, es el único futbolista en la
                    historia que ha ganado, entre otras distinciones, siete
                    veces el Balón de Oro, seis premios de la FIFA al mejor
                    jugador del mundo y seis Botas de Oro. En 2020, se convirtió
                    en el primer futbolista y el primer argentino en recibir un
                    premio Laureus, además de ser incluido en el Dream Team del
                    Balón de Oro. Con el Barcelona ha ganado 35 títulos, entre
                    ellos.
                </Text>
                <TaxonomyImportantList
                    extraClass="tags-wiki"
                    list={tagsList}
                    showItems={5}
                />
            </div>
        </article>
    );
};

// WikiTag.propTypes = {
//     social_networks: PropTypes.arrayOf(
//         PropTypes.oneOfType([
//             PropTypes.shape({
//                 name: PropTypes.string,
//                 type: PropTypes.string,
//                 url: PropTypes.string
//             }),
//             PropTypes.string
//         ])
//     ),
//     related_tags: PropTypes.arrayOf(
//         PropTypes.oneOfType([
//             PropTypes.shape({
//                 text: PropTypes.string,
//                 slug: PropTypes.string,
//             }),
//             PropTypes.string
//         ])
//     ),
//     creation_date: PropTypes.string,
//     type: PropTypes.string,
//     description: PropTypes.string,
//     additional_name: PropTypes.string,
//     birth_date: PropTypes.string,
//     family_name: PropTypes.string,
//     given_name: PropTypes.string,
//     image: PropTypes.string,
//     job_title: PropTypes.string,
//     address: PropTypes.string,
//     founding_date: PropTypes.string,
//     founding_laction: PropTypes.string,
//     legal_name: PropTypes.string,
//     location: PropTypes.string,
//     logo_url: PropTypes.string,
// };

// WikiTag.defaultProps = {
//     social_networks: [],
//     related_tags: [],
//     creation_date: '',
//     type: '',
//     description: '',
//     additional_name: '',
//     birth_date: '',
//     family_name: '',
//     given_name: '',
//     image: '',
//     job_title: '',
//     address: '',
//     founding_date: '',
//     founding_laction: '',
//     legal_name: '',
//     location: '',
//     logo_url: ''
// };

export default WikiTag;
