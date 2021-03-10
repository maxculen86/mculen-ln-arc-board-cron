import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../../resources/dist/css/ln/modules/wiki-autor.css';
import '../../../../../resources/dist/css/ln/components/author.css';

// TODO: los siguientes enlaces son para agregar en base

// import '../../../../../resources/dist/css/ln/components/title.css';
import '../../../../../resources/dist/css/ln/components/link.css';
import ComTitle from '../../../common/com-title';
import ComContainer from '../../../common/com-container';
import ComText from '../../../common/com-text';
import ModDescriptionList from '../../../common/mod-descriptionList';
import ListSocialIcons from '../../../common/list-socialicons';
import ImageAuthor from './imageAuthor';
import ComLink from '../../../common/com-link';
import ComSubtitle from '../../../common/com-subtitle';
import ModImage from '../../../common/mod-image';
import ComImage from '../../../common/com-image';
import ModheaderSection from '../../../common/mod-headerSection';
import ComShield from '../../../common/com-shield';
import ModShield from '../../../common/mod-shield';
import getSocialsNetwork from '../../common/utils/getSocialsNetwork';
import ComAdvance from '../../../common/com-advance';
import getSocialsNetwork from '../../common/utils/getSocialsNetwork';
import ModWikiAuthor from '../../../common/mod-wikiAuthor';
import '../../../../../resources/dist/css/ln/base/helpers.css';

const WikiAuthor = ({ data, outputType, classesNames, classCondition }) => {
    const {
        byline,
        email,
        role,
        longBio,
        image: { url },
        books = [],
        podcasts = [],
        education = [],
        awards = [],
        personal_website: personalWebsite,
        languages,
        affiliations,
        location
    } = data || {};

    const socialsNetworks = getSocialsNetwork(data);

    return (
        <section
            className={`mod-wikiauthor ${classesNames || ''} ${classCondition ||
                ''}`}
        >
            <div className="row">
                {url && (
                    <div className="col-12 col-tablet-4 col-deskxl-3">
                        <ImageAuthor outputType={outputType} url={url} />
                    </div>
                )}
                <div className="col-12 col-tablet-8 col-deskxl-9">
                    <ComContainer classCondition="--info">
                        <ComTitle tag="h2" content={byline} size="--l" />
                        <ComText
                            textname={role}
                            classCondition="--profesion"
                            size="--twoxs"
                        />
                        <ComContainer classCondition="--contact">
                            {email && (
                                <ComLink
                                    link={`mailto:${email}`}
                                    textname={email}
                                />
                            )}
                            {email && personalWebsite ? ' - ' : ''}
                            {personalWebsite && (
                                <ComLink
                                    link={personalWebsite}
                                    textname={personalWebsite}
                                />
                            )}
                        </ComContainer>
                        <ComText
                            size="--twoxs"
                            classCondition="--bio"
                            textname={longBio}
                        />
                        {education.length > 0 && (
                            <ComContainer classCondition="--educacion">
                                <ModDescriptionList
                                    bullet
                                    sizeBullet="--twoxs"
                                    descriptionTitle="Educación"
                                    size="--twoxs"
                                    list={education}
                                />
                            </ComContainer>
                        )}
                        {location && (
                            <ComContainer>
                                <ModDescriptionList
                                    classCondition="--idiomas"
                                    descriptionTitle="Ubicación:"
                                    size="--twoxs"
                                    text={location}
                                />
                            </ComContainer>
                        )}
                        {awards.length > 0 && (
                            <ComContainer classCondition="--reconocimientos">
                                <ModDescriptionList
                                    descriptionTitle="Reconocimientos"
                                    size="--twoxs"
                                    list={awards}
                                />
                            </ComContainer>
                        )}
                        {languages && (
                            <ComContainer>
                                <ModDescriptionList
                                    classCondition="--idiomas"
                                    descriptionTitle="Idiomas:"
                                    size="--twoxs"
                                    text={languages}
                                />
                            </ComContainer>
                        )}
                        {affiliations && (
                            <ComContainer>
                                <ModDescriptionList
                                    classCondition="--membresia"
                                    descriptionTitle="Membresías profesionales:"
                                    size="--twoxs"
                                    text={affiliations}
                                />
                            </ComContainer>
                        )}
                        {books.length > 0 && (
                            <ComContainer>
                                <ModDescriptionList
                                    descriptionTitle="Publicaciones"
                                    size="--twoxs"
                                    list={books}
                                />
                            </ComContainer>
                        )}
                        {podcasts.length > 0 && (
                            <ComContainer>
                                <ModDescriptionList
                                    descriptionTitle="Podcast"
                                    size="--twoxs"
                                    list={podcasts}
                                />
                            </ComContainer>
                        )}
                    </ComContainer>
                </div>
                {socialsNetworks.length > 0 && (
                    <div className="col-12">
                        <ComContainer classCondition="--socialicons">
                            <ComSubtitle size="--twoxs">Conectar</ComSubtitle>
                            <ListSocialIcons
                                sizeIcon="--xl"
                                // sizeBullet="--xs"
                                data={data}
                                size="--threexs"
                                vertical=""
                            />
                        </ComContainer>
                    </div>
                )}
            </div>
            {/* BORRARRRRRRRR ESCUDOS */}
            {/*<div className="row">
                <div className="col-12">
                    <ModShield
                        size="--l"
                        title="Liga Profesional de Fútbol"
                    >
                        <ComShield 
                        nameShield="Aldosivi"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/7GZSJPBEPVETDMBDMW53QUFIQ4.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/aldosivi" />
                        <ComShield 
                        nameShield="ArgentinosJuniors"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/EK66XYYAJNEW5JQFNHCMJV43TY.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/argentinos-juniors" />
                        <ComShield 
                        nameShield="Arsenal"//MAL
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/SAAAODPTFNECTG2HJLQIA2VG2I.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/arsenal" />
                        <ComShield 
                        nameShield="AtleticoTucuman"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/NTYJC27AK5DKHMVIYLJ5KGYDXY.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/atletico-tucuman" />
                        <ComShield 
                        nameShield="Banfield"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/GFNEBMW7CREA3KODNQQNX3GLDE.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/banfield" />
                        <ComShield 
                        nameShield="Belgrano"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KNKQXEAB4FC2HBHB3QQM4QSSTE.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/belgrano" />
                        <ComShield 
                        nameShield="BocaJuniors"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/P3LRVO2JV5EANKHKPJ2YDNMOYU.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/boca-juniors" />
                        <ComShield 
                        nameShield="CentralCordoba"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/5O6JPL3NDVB4HKEHH3OAHAOKAQ.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/central-cordoba/" />
                        <ComShield 
                        nameShield="Colon"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/6VQYK27IPZCNLCZFWVSDCGOM5Q.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/colon" />
                        <ComShield 
                        nameShield="DefensayJusticia"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/QIKEINXQBNAEVIDD7DTO2L2VMA.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/defensa-y-justicia" />
                        <ComShield 
                        nameShield="EstudiantesLaPlata"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/GVBUSGSWXZBIRHZJEELOBXQN3E.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/estudiantes-la-plata" />
                        <ComShield 
                        nameShield="GimnasiayEsgrima"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CBYXWVHCJVAVBDPM3TLRMUMRQQ.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/gimnasia-y-esgrima" />                                                
                        <ComShield 
                        nameShield="GodoyCruz"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/E7JUKX736JCCJM5XMGFU3IBZJM.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/godoy-cruz" />
                        <ComShield 
                        nameShield="Huracan"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/YQ4DMMHFDVBPVM4E23RHHOJV3Y.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/huracan" />
                        <ComShield 
                        nameShield="Independiente"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/L77PB7OEKFA2JHOCT7NKO2KKHQ.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/independiente" />
                        <ComShield 
                        nameShield="Lanus"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/BABZC67NQBGATEV4LYCN2DSIJY.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/lanus" />
                        <ComShield 
                        nameShield="Newells"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/ABOPGLJQDZCL5PDBRUBYUG27XA.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/newells" />
                        <ComShield 
                        nameShield="Patronato"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/M5DCMEGBYFA6TDHH7JGAXYQI4M.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/patronato" />
                        <ComShield 
                        nameShield="Racing"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/ZQNMANB7J5AWRBCB4FVCJZXH74.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/racing" />
                        <ComShield 
                        nameShield="RiverPlate"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CMMAKYQESFFFVHUIS6DYZA4WUI.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/river-plate" />
                        <ComShield 
                        nameShield="RosarioCentral"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/FLUFKFZVMRCSTNWUF7Y4IKEQSA.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/rosario-central" />
                        <ComShield 
                        nameShield="SanLorenzo"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/XRRFAN5QYRCTLNI3QA3AWWWMMQ.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/san-lorenzo" />
                        <ComShield 
                        nameShield="SanMartinTucuman"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WW73G7LX6VDKTBSYOEVTFGM3AQ.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/san-martin-tucuman" />
                        <ComShield 
                        nameShield="TalleresCordoba"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/HVUKDBT3CVB5VEDXOFQ4UXEJTI.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/talleres-cordoba" />
                        <ComShield 
                        nameShield="Tigre"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/XGN4WQD2XJEVLPRMIGAJ4WT4WU.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/tigre" />
                        <ComShield 
                        nameShield="Unión"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/DTMIWBMBO5FQXCH7JZZ66VRHFM.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/union" />
                        <ComShield 
                        nameShield="Vélez"
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/H3VF64J3HBDLVMQMD6TOILYXMM.png" 
                        link="https://www.lanacion.com.ar/deportes/futbol/velez" />
                    </ModShield>
                </div>
            </div> */}
        </section>
    );
};

WikiAuthor.propTypes = {
    data: PropTypes.shape({
        byline: PropTypes.string,
        email: PropTypes.string,
        role: PropTypes.string,
        longBio: PropTypes.string,
        image: PropTypes.shape({
            url: PropTypes.string
        }),
        books: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                publisher: PropTypes.string,
                url: PropTypes.string
            })
        ),
        podcasts: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                url: PropTypes.string
            })
        ),
        education: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string
            })
        ),
        awards: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string
            })
        ),
        personal_website: PropTypes.string,
        languages: PropTypes.string,
        affiliations: PropTypes.string
    }).isRequired,
    classesNames: PropTypes.string,
    classCondition: PropTypes.string,
    outputType: PropTypes.string.isRequired
};

WikiAuthor.defaultProps = {
    classesNames: '',
    classCondition: ''
};

export default WikiAuthor;
