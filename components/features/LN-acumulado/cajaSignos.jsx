import React from 'react';
import PropTypes from 'fusion:prop-types';
// import { useContent } from 'fusion:content';
import HoroscopeBox from '../../private/common/horoscopeBox';

const CajaSignos = props => {
    // const response =
    //     useContent({
    //         source: 'signosSource'
    //     }) || {};

    // const { data, imageUrl } = response;
    const data = true;

    const signos = [
        {
            nombre: 'Aries',
            periodo: '21/3 al 20/4'
        },
        {
            nombre: 'Tauro',
            periodo: '21/4 al 21/5'
        },
        {
            nombre: 'Géminis',
            periodo: '22/5 al 21/6'
        },
        {
            nombre: 'Cáncer',
            periodo: '22/6 al 23/7'
        },
        {
            nombre: 'Leo',
            periodo: '24/7 al 23/8'
        },
        {
            nombre: 'Virgo',
            periodo: '24/8 al 23/9'
        },
        {
            nombre: 'Libra',
            periodo: '24/9 al 23/10'
        },
        {
            nombre: 'Escorpio',
            periodo: '24/10 al 22/11'
        },
        {
            nombre: 'Sagitario',
            periodo: '23/11 al 22/12'
        },
        {
            nombre: 'Capricornio',
            periodo: '23/12 al 20/1'
        },
        {
            nombre: 'Acuario',
            periodo: '21/1 al 19/2'
        },
        {
            nombre: 'Piscis',
            periodo: '20/2 al 20/3'
        }
    ];
    const { titleBoolean } = props.customFields;

    return (
        (data && <HoroscopeBox signos={signos} showTitle={titleBoolean} />) ||
        null
    );
};

CajaSignos.label = 'LN Acumulado Caja Signos';

CajaSignos.propTypes = {
    customFields: PropTypes.shape({
        titleBoolean: PropTypes.boolean
    })
};

export default CajaSignos;
