import React from 'react';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../../private/common/staticValidation';
import ServiceMiniCard from '../../../private/common/serviceMiniCard';
import { meanings } from '../../../../content/sources/utils/servicesSource/_config';

const MEANINGS_MOCK = [
    {
        title: 'Animales',
        linkTitle: 'significado de los numeros de animales',
        link: 'significados de animales punto com',
        icon: 'animals',
        labeled: 'Significado de numeros'
    },
    {
        title: 'Nombres',
        linkTitle: 'Significado de los numeros de animales',
        link: 'significados de animales punto com',
        icon: 'names',
        labeled: 'Significado de numeros'
    },
    {
        title: 'Tradicional',
        linkTitle: 'Significado de los numeros de animales',
        link: 'significados de animales punto com',
        icon: 'traditional',
        labeled: 'Significado de numeros'
    },
    {
        title: 'Loteria Nacional',
        linkTitle: 'Significado de los numeros de animales',
        link: 'significados de animales punto com',
        icon: 'national',
        labeled: 'Significado de numeros'
    }
];

const LotteryMeanings = ({ id: featureId }) => {
    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            <div className="number-meanings-box row-gap-4">
                {Object.entries(meanings).map(([, meaningInfo], i) => (
                    <ServiceMiniCard
                        key={meaningInfo.title}
                        title={meaningInfo.title}
                        link={meaningInfo.link}
                        linkTitle={meaningInfo.linkTitle}
                        icon={meaningInfo.icon}
                        labeled="Significado de numeros"
                    />
                ))}
            </div>
        </StaticValidation>
    );
};

LotteryMeanings.label = 'LN Loteria Home Significado de Números';

LotteryMeanings.propTypes = { id: PropTypes.string.isRequired };

export default LotteryMeanings;
