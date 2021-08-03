import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import ModShield from '../../private/common/mod-shield';

const CajaEscudo = () => {
    const IMAGE_END_POINT =
        'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar';
    const baseUrl = `${SITE_LANACION ||
        'https://www.lanacion.com.ar'}/deportes/futbol`;

    const data = [
        {
            name: 'Aldosivi',
            image: `${IMAGE_END_POINT}/7GZSJPBEPVETDMBDMW53QUFIQ4.png`,
            link: `${baseUrl}/aldosivi/`
        },
        {
            name: 'ArgentinosJuniors',
            image: `${IMAGE_END_POINT}/EK66XYYAJNEW5JQFNHCMJV43TY.png`,
            link: `${baseUrl}/argentinos-juniors/`
        },
        {
            name: 'Arsenal',
            image: `${IMAGE_END_POINT}/SAAAODPTFNECTG2HJLQIA2VG2I.png`,
            link: `${baseUrl}/arsenal/`
        },
        {
            name: 'AtleticoTucuman',
            image: `${IMAGE_END_POINT}/NTYJC27AK5DKHMVIYLJ5KGYDXY.png`,
            link: `${baseUrl}/atletico-tucuman/`
        },
        {
            name: 'Banfield',
            image: `${IMAGE_END_POINT}/GFNEBMW7CREA3KODNQQNX3GLDE.png`,
            link: `${baseUrl}/banfield/`
        },
        /*{
            name: 'Belgrano',
            image: `${IMAGE_END_POINT}/KNKQXEAB4FC2HBHB3QQM4QSSTE.png`,
            link: `${baseUrl}/belgrano/`
        }, */
        {
            name: 'BocaJuniors',
            image: `${IMAGE_END_POINT}/P3LRVO2JV5EANKHKPJ2YDNMOYU.png`,
            link: `${baseUrl}/boca-juniors/`
        },
        {
            name: 'CentralCordoba',
            image: `${IMAGE_END_POINT}/5O6JPL3NDVB4HKEHH3OAHAOKAQ.png`,
            link: `${baseUrl}/central-cordoba/`
        },
        {
            name: 'Colon',
            image: `${IMAGE_END_POINT}/6VQYK27IPZCNLCZFWVSDCGOM5Q.png`,
            link: `${baseUrl}/colon/`
        },
        {
            name: 'DefensayJusticia',
            image: `${IMAGE_END_POINT}/QIKEINXQBNAEVIDD7DTO2L2VMA.png`,
            link: `${baseUrl}/defensa-y-justicia/`
        },
        {
            name: 'EstudiantesLaPlata',
            image: `${IMAGE_END_POINT}/GVBUSGSWXZBIRHZJEELOBXQN3E.png`,
            link: `${baseUrl}/estudiantes-la-plata/`
        },
        {
            name: 'GimnasiayEsgrima',
            image: `${IMAGE_END_POINT}/CBYXWVHCJVAVBDPM3TLRMUMRQQ.png`,
            link: `${baseUrl}/gimnasia-y-esgrima/`
        },
        {
            name: 'GodoyCruz',
            image: `${IMAGE_END_POINT}/E7JUKX736JCCJM5XMGFU3IBZJM.png`,
            link: `${baseUrl}/godoy-cruz/`
        },
        {
            name: 'Huracan',
            image: `${IMAGE_END_POINT}/YQ4DMMHFDVBPVM4E23RHHOJV3Y.png`,
            link: `${baseUrl}/huracan/`
        },
        {
            name: 'Independiente',
            image: `${IMAGE_END_POINT}/L77PB7OEKFA2JHOCT7NKO2KKHQ.png`,
            link: `${baseUrl}/independiente/`
        },
        {
            name: 'Lanus',
            image: `${IMAGE_END_POINT}/BABZC67NQBGATEV4LYCN2DSIJY.png`,
            link: `${baseUrl}/lanus/`
        },
        {
            name: 'Newells',
            image: `${IMAGE_END_POINT}/ABOPGLJQDZCL5PDBRUBYUG27XA.png`,
            link: `${baseUrl}/newells/`
        },
        {
            name: 'Patronato',
            image: `${IMAGE_END_POINT}/M5DCMEGBYFA6TDHH7JGAXYQI4M.png`,
            link: `${baseUrl}/patronato/`
        },
        {
            name: 'Racing',
            image: `${IMAGE_END_POINT}/ZQNMANB7J5AWRBCB4FVCJZXH74.png`,
            link: `${baseUrl}/racing/`
        },
        {
            name: 'RiverPlate',
            image: `${IMAGE_END_POINT}/CMMAKYQESFFFVHUIS6DYZA4WUI.png`,
            link: `${baseUrl}/river-plate/`
        },
        {
            name: 'RosarioCentral',
            image: `${IMAGE_END_POINT}/FLUFKFZVMRCSTNWUF7Y4IKEQSA.png`,
            link: `${baseUrl}/rosario-central/`
        },
        {
            name: 'SanLorenzo',
            image: `${IMAGE_END_POINT}/XRRFAN5QYRCTLNI3QA3AWWWMMQ.png`,
            link: `${baseUrl}/san-lorenzo/`
        },
        /*{
            name: 'SanMartinTucuman',
            image: `${IMAGE_END_POINT}/WW73G7LX6VDKTBSYOEVTFGM3AQ.png`,
            link: `${baseUrl}/san-martin-tucuman/`
        },*/
        {
            name: 'TalleresCordoba',
            image: `${IMAGE_END_POINT}/HVUKDBT3CVB5VEDXOFQ4UXEJTI.png`,
            link: `${baseUrl}/talleres-cordoba/`
        },
        {
            name: 'Platense',
            image: `${IMAGE_END_POINT}/WYSKTF2KEBG3VE7B7277VATEDA.png`,
            link: `${baseUrl}/platense/`
        },
        {
            name: 'Unión',
            image: `${IMAGE_END_POINT}/DTMIWBMBO5FQXCH7JZZ66VRHFM.png`,
            link: `${baseUrl}/union/`
        },
        {
            name: 'Vélez',
            image: `${IMAGE_END_POINT}/H3VF64J3HBDLVMQMD6TOILYXMM.png`,
            link: `${baseUrl}/velez/`
        },
        {
            name: 'SarmientoJunin',
            image: `${IMAGE_END_POINT}/AVTWTPXI3FHTDEHTVMSX5NNQFU.png`,
            link: `${baseUrl}/club-atletico-sarmiento/`
        }
    ];

    return (
        (data && data.length && (
            <ModShield
                key={data}
                title="Superliga: Todos los clubes"
                data={data}
                size="--l"
            />
        )) ||
        null
    );
};

CajaEscudo.label = 'LN Caja Escudos';

export default CajaEscudo;
