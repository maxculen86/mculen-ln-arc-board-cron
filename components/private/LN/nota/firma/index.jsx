/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';

import ModAutor from '../../../common/mod-autor';

const Firma = props => {
    const { authors, photo, medio, amp } = props;

    if (!authors || authors.length < 1) return null;

    return (
        <div className="row FirmaAutor">
            <div className="col-12">
                <ModAutor
                    autor={authors}
                    foto={photo}
                    classCondition="--autor"
                    medio={medio}
                    amp={amp}
                />
            </div>
        </div>
    );
};

Firma.propTypes = {
    authors: PropTypes.arrayOf(
        PropTypes.shape({
            author: PropTypes.string,
            link: PropTypes.string
        })
    ).isRequired,
    photo: PropTypes.string,
    medio: PropTypes.string,
    amp: PropTypes.bool
};

export default Firma;
