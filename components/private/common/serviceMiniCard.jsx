import React from 'react';
import PropTypes from 'fusion:prop-types';
import Icon from './icon';
import Text from './text';
import ComLink from './com-link';

import '../../../resources/dist/css/ln/components/services-mini-card.css';

const ServiceMiniCard = ({ title, icon, labeled, link, linkTitle }) => {
    return (
        <div className="box-number-meaning">
            <div className="meaning-number-text">
                <Text tag="h2" size="5xs">
                    {labeled}
                    <ComLink
                        classCondition="--m --font-bold"
                        link={link}
                        title={linkTitle}
                        textname={title}
                    />
                </Text>
            </div>
            <Icon name={icon} size="--xl" />
        </div>
    );
};

ServiceMiniCard.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    linkTitle: PropTypes.string,
    icon: PropTypes.string,
    labeled: PropTypes.string
};

ServiceMiniCard.defaultProps = {
    title: 'Animales',
    linkTitle: 'Significado de los numeros',
    link: '',
    icon: 'Animals',
    labeled: 'Significado de los numeros'
};

export default ServiceMiniCard;
