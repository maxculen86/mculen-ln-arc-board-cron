import React from 'react';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../../private/common/staticValidation';
import ServiceMiniCard from '../../../private/common/serviceMiniCard';
import TableHorizontalResults from '../../../private/LN/services/lotteries/TableHorizontalResults';
import { meanings } from '../../../../content/sources/utils/servicesSource/lottery/_config';

// import '../../../../resources/dist/css/ln/components/lotteries.css';
// import '../../../../resources/dist/css/ln/components/result-item.css';
// import '../../../../resources/dist/css/ln/components/label-text.css';
// import '../../../../resources/dist/css/ln/components/ball-lotteries.css';
import '../../../../resources/dist/css/ln/components/table-horizontal-results.css';

// const MEANINGS_MOCK = [
//     {
//         title: 'Animales',
//         linkTitle: 'significado de los numeros de animales',
//         link: 'significados de animales punto com',
//         icon: 'animals',
//         labeled: 'Significado de numeros'
//     },
//     {
//         title: 'Nombres',
//         linkTitle: 'Significado de los numeros de animales',
//         link: 'significados de animales punto com',
//         icon: 'names',
//         labeled: 'Significado de numeros'
//     },
//     {
//         title: 'Tradicional',
//         linkTitle: 'Significado de los numeros de animales',
//         link: 'significados de animales punto com',
//         icon: 'traditional',
//         labeled: 'Significado de numeros'
//     },
//     {
//         title: 'Loteria Nacional',
//         linkTitle: 'Significado de los numeros de animales',
//         link: 'significados de animales punto com',
//         icon: 'national',
//         labeled: 'Significado de numeros'
//     }
// ];

const MOCK_DETAILS_QUINIELAS = {
    name: 'Quiniela Provincia',
    lottery_draw_id: 'Vespertina',
    date: '2022-03-16T17:30:00',
    meaning: 'Ramera',
    results: [
        '4678',
        '9806',
        '2011',
        '9304',
        '7766',
        '4749',
        '4067',
        '0900',
        '3428',
        '9785',
        '1685',
        '2817',
        '9476',
        '8604',
        '5558',
        '0019',
        '1369',
        '0899',
        '3976',
        '8172'
    ]
};

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
            <TableHorizontalResults
                lotteryDrawId={MOCK_DETAILS_QUINIELAS.lottery_draw_id}
                letters={MOCK_DETAILS_QUINIELAS.letters}
                meanings={MOCK_DETAILS_QUINIELAS.meanings}
                date={MOCK_DETAILS_QUINIELAS.date}
                results={MOCK_DETAILS_QUINIELAS.results}
            />
        </StaticValidation>
    );
};

LotteryMeanings.label = 'LN Loteria Home Significado de Números';

LotteryMeanings.propTypes = { id: PropTypes.string.isRequired };

export default LotteryMeanings;
