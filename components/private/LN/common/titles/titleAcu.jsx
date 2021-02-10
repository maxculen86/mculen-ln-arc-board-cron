import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/components/title.css';
import ComTitle from '../../../common/com-title';

const TitleAcu = ({ headlines: { basic, mobile }, volanta, href }) => {
    // TODO: ver de sacar volanta a otro componente para manejar el tema del punto repetido y etc
    // TODO: test y proptypes pendientes
    const volantaComponent = volanta && `${volanta} `;
    const titleText = `${mobile || basic}`;
    const renderTitle = `${volantaComponent}${titleText}`;

    return (
        <ComTitle
            tag="h2"
            size="--xs"
            classCondition="--acu"
            link={href}
            content={renderTitle}
        />
    );
};

TitleAcu.propTypes = {
    headlines: PropTypes.shape({
        basic: PropTypes.string.isRequerid,
        mobile: PropTypes.string
    }),
    volanta: PropTypes.string,
    href: PropTypes.string
};

TitleAcu.defaultProps = {
    volanta: '',
    href: '',
    headlines: {
        mobile: ''
    }
};

export default TitleAcu;
