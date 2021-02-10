import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComTitle from './com-title';
import ComLink from './com-link';
import ComImage from './com-image';

import '../../../resources/dist/css/ln/modules/mod-dolar.css';

const ModDolar = ({ imageUrl, data }) =>
    (data && (
        <ul className="mod-dolar row-gap-2 row-gap-tablet-4">
            {data.map((item, index) => {
                const { sourceName, title, compra, venta } = item;
                return (
                    <li className="item">
                        <ComTitle tag="h2" size="--xs" content={title} />
                        <p className="com-text --twoxs">
                            <span>Compra </span>
                            <strong>${compra}</strong>
                            {sourceName !== 'dccl' && <span>Venta </span>}
                            {sourceName !== 'dccl' && <strong>${venta}</strong>}
                        </p>
                    </li>
                );
            })}
            {imageUrl && (
                <li className="item">
                    <ComLink
                        link="https://www.invertironline.com/"
                        target="_blank"
                    >
                        <ComImage src={imageUrl} alt="invertirOnline.com" />
                    </ComLink>
                </li>
            )}
        </ul>
    )) ||
    null;

ModDolar.propTypes = {
    data: PropTypes.shape({
        sourceName: PropTypes.string,
        title: PropTypes.string,
        compra: PropTypes.string,
        venta: PropTypes.string
    }).isRequired,
    imageUrl: PropTypes.string.isRequired
};

export default ModDolar;
