import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/components/title.css';
import ComTitle from '../../../common/com-title';

const TitleAcu = ({ headlines: { basic, shortTitle }, volanta, href }) => {
    // TODO: ver de sacar volanta a otro componente para manejar el tema del punto repetido y etc
    // TODO: test y proptypes pendientes
    const volantaComponent = volanta && `${volanta} `;
    const titleText = `${shortTitle || basic}`;
    const renderTitle = `${volantaComponent}${titleText}`;

    return (
        <ComTitle
            tag="h2"
            size="s"
            classCondition="--acu"
            link={href}
            content={renderTitle}
        />
    );
};

TitleAcu.propTypes = {
    headlines: PropTypes.shape({
        basic: PropTypes.string.isRequerid,
        shortTitle: PropTypes.string
    }),
    volanta: PropTypes.string,
    href: PropTypes.string
};

TitleAcu.defaultProps = {
    volanta: '',
    href: '',
    headlines: {
        shortTitle: ''
    }
};

export default TitleAcu;
