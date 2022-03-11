import { React } from 'react';
import PropTypes from 'fusion:prop-types';
import Icon from './icon';
import Text from './text';

import '../../../resources/dist/css/ln/modules/services-mini-card.css';
import ComLink from './com-link';

const BoxNumberMeaning = ({ title, icon, labeled, link, linkTitle }) => {
    return (
        <div className="box-number-meaning">
            <div className="meaning-number-text">
                <Text size="5xs" color="gray">
                    {labeled}
                </Text>
                <ComLink
                    link={link}
                    title={linkTitle}
                    textname="Ir a la nota original"
                />
                <Text weight="bold" size="medium">
                    {title}
                </Text>
            </div>
            <Icon name={`${icon}-lotteries`} size="xl" />
        </div>
    );
};

BoxNumberMeaning.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    linkTitle: PropTypes.string,
    icon: PropTypes.string,
    labeled: PropTypes.string
};

BoxNumberMeaning.defaultProps = {
    title: 'Animales',
    linkTitle: 'Significado de los numeros',
    link: '',
    icon: 'Animals',
    labeled: 'Significado de los numeros'
};

export default BoxNumberMeaning;
