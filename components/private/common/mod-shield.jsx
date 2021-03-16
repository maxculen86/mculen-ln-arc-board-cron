import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';
import ComImage from './com-image';
import ComShield from './com-shield';
import ModheaderSection from './mod-headerSection';
import '../../../resources/dist/css/ln/modules/mod-shields.css';

const ModShield = props => {
    const { title, src, link, size, line, children } = props;
    if (!title && !src) return null;
    return (
        <div className="row">
            <div className="col-12">
                <section className="mod-image --shields">
                    <div className="sports">
                        <ModheaderSection line size={size} title={title} />
                        {children}
                        <ComShield
                            nameShield="Aldosivi"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/7GZSJPBEPVETDMBDMW53QUFIQ4.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/aldosivi"
                        />
                        <ComShield
                            nameShield="ArgentinosJuniors"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/EK66XYYAJNEW5JQFNHCMJV43TY.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/argentinos-juniors"
                        />
                        <ComShield
                            nameShield="Arsenal" //MAL
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/SAAAODPTFNECTG2HJLQIA2VG2I.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/arsenal"
                        />
                        <ComShield
                            nameShield="AtleticoTucuman"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/NTYJC27AK5DKHMVIYLJ5KGYDXY.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/atletico-tucuman"
                        />
                        <ComShield
                            nameShield="Banfield"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/GFNEBMW7CREA3KODNQQNX3GLDE.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/banfield"
                        />
                        <ComShield
                            nameShield="Belgrano"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KNKQXEAB4FC2HBHB3QQM4QSSTE.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/belgrano"
                        />
                        <ComShield
                            nameShield="BocaJuniors"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/P3LRVO2JV5EANKHKPJ2YDNMOYU.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/boca-juniors"
                        />
                        <ComShield
                            nameShield="CentralCordoba"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/5O6JPL3NDVB4HKEHH3OAHAOKAQ.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/central-cordoba/"
                        />
                        <ComShield
                            nameShield="Colon"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/6VQYK27IPZCNLCZFWVSDCGOM5Q.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/colon"
                        />
                        <ComShield
                            nameShield="DefensayJusticia"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/QIKEINXQBNAEVIDD7DTO2L2VMA.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/defensa-y-justicia"
                        />
                        <ComShield
                            nameShield="EstudiantesLaPlata"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/GVBUSGSWXZBIRHZJEELOBXQN3E.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/estudiantes-la-plata"
                        />
                        <ComShield
                            nameShield="GimnasiayEsgrima"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CBYXWVHCJVAVBDPM3TLRMUMRQQ.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/gimnasia-y-esgrima"
                        />
                        <ComShield
                            nameShield="GodoyCruz"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/E7JUKX736JCCJM5XMGFU3IBZJM.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/godoy-cruz"
                        />
                        <ComShield
                            nameShield="Huracan"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/YQ4DMMHFDVBPVM4E23RHHOJV3Y.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/huracan"
                        />
                        <ComShield
                            nameShield="Independiente"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/L77PB7OEKFA2JHOCT7NKO2KKHQ.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/independiente"
                        />
                        <ComShield
                            nameShield="Lanus"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/BABZC67NQBGATEV4LYCN2DSIJY.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/lanus"
                        />
                        <ComShield
                            nameShield="Newells"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/ABOPGLJQDZCL5PDBRUBYUG27XA.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/newells"
                        />
                        <ComShield
                            nameShield="Patronato"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/M5DCMEGBYFA6TDHH7JGAXYQI4M.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/patronato"
                        />
                        <ComShield
                            nameShield="Racing"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/ZQNMANB7J5AWRBCB4FVCJZXH74.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/racing"
                        />
                        <ComShield
                            nameShield="RiverPlate"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CMMAKYQESFFFVHUIS6DYZA4WUI.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/river-plate"
                        />
                        <ComShield
                            nameShield="RosarioCentral"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/FLUFKFZVMRCSTNWUF7Y4IKEQSA.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/rosario-central"
                        />
                        <ComShield
                            nameShield="SanLorenzo"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/XRRFAN5QYRCTLNI3QA3AWWWMMQ.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/san-lorenzo"
                        />
                        <ComShield
                            nameShield="SanMartinTucuman"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WW73G7LX6VDKTBSYOEVTFGM3AQ.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/san-martin-tucuman"
                        />
                        <ComShield
                            nameShield="TalleresCordoba"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/HVUKDBT3CVB5VEDXOFQ4UXEJTI.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/talleres-cordoba"
                        />
                        <ComShield
                            nameShield="Tigre"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/XGN4WQD2XJEVLPRMIGAJ4WT4WU.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/tigre"
                        />
                        <ComShield
                            nameShield="Unión"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/DTMIWBMBO5FQXCH7JZZ66VRHFM.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/union"
                        />
                        <ComShield
                            nameShield="Vélez"
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/H3VF64J3HBDLVMQMD6TOILYXMM.png"
                            link="https://www.lanacion.com.ar/deportes/futbol/velez"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ModShield;
