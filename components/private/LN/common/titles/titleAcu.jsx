import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/components/title.css';

const TitleAcu = ({ headlines: { basic }, volanta, href }) => {
    // TODO: ver de sacar volanta a otro componente para manejar el tema del punto repetido y etc
    // TODO: test y proptypes pendientes
    const volantaComponent = volanta && <b>{`${volanta} `}</b>;
    return (
        <h2 className="com-title-acu">
            <a href={href}>
                <b>{volantaComponent}</b>
                {basic}
            </a>
        </h2>
    );
};

TitleAcu.propTypes = {
    headlines: PropTypes.shape({
        basic: PropTypes.string
    }).isRequired,
    volanta: PropTypes.string,
    href: PropTypes.string
};

// TitleAcu.defaultProps = {
//     volanta: '',
//     href: ''
// };

export default TitleAcu;
