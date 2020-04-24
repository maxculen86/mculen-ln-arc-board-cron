/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';

import ModFirma from './mod-firma';
import ModMedio from './mod-medio';
import ComImage from './com-image';

import '../../../resources/dist/css/ln/modules/mod-autor.css';

const ModAutor = props => {
    const { autor, medio, foto, classCondition, amp } = props;
    const sizes = amp ? { width: 80, height: 80 } : {};
    return (
        <section className="mod-autor">
            {foto && (
                <div className="container-img">
                    <ComImage src={foto} alt="" amp={amp} {...sizes} />
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
    ).isRequired,
    classCondition: PropTypes.string.isRequired,
    foto: PropTypes.string,
    medio: PropTypes.string,
    amp: PropTypes.bool
};

export default ModAutor;
