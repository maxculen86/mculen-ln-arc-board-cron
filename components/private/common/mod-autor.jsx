/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import ModFirma from './mod-firma';
import ModMedio from './mod-medio';
import ModImage from './mod-image';

import { isFotoAl100orStorytelling } from './utils/subtypes/subtypeHelper';

import '../../../resources/dist/css/ln/modules/mod-autor.css';

const ModAutor = props => {
    const { autor = [], medio, foto, classCondition, amp, subtype } = props;
    console.log('🚀 ~ file: mod-autor.jsx:16 ~ ModAutor ~ subtype:', subtype);
    console.log(
        '🚀 ~ file: mod-autor.jsx:16 ~ ModAutor ~ subtype:',
        !isFotoAl100orStorytelling(subtype)
    );
    const author =
        autor.length === 1
            ? autor.reduce((acc, val) => ({ name: val.name, link: val.link }))
            : null;
    return (
        <section className="mod-autor">
            {foto && (
                <div className="container-img">
                    <ModImage
                        link={author.link}
                        src={foto}
                        alt={`Ir a notas de ${author.name}`}
                        amp={amp}
                        isApertura={!isFotoAl100orStorytelling(subtype)}
                    />
                </div>
            )}
            <div className="container-text">
                <ModFirma autor={autor} classCondition={classCondition} />
                {medio && <ModMedio medio={medio} classCondition="--medio" />}
            </div>
        </section>
    );
};

ModAutor.propTypes = {
    autor: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            link: PropTypes.string
        })
    ),
    classCondition: PropTypes.string.isRequired,
    foto: PropTypes.string,
    medio: PropTypes.string,
    amp: PropTypes.bool,
    subtype: PropTypes.string.isRequired
};

ModAutor.defaultProps = {
    autor: []
};

export default ModAutor;
