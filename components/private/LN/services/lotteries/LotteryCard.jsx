import React from 'react';
import PropTypes from 'prop-types';
import get from '../../../common/utils/get';
import '../../../../../resources/dist/css/ln/components/lottery-card.css';
import {
    games,
    reorderSubLotteries
} from '../../../../../content/sources/utils/servicesSource/lottery/_config';
import CardLayout from './CardLayout';
import CardMainResult from './CardMainResult';
import CardDetail from './CardDetails';

const LotteryCard = ({
    id,
    name,
    date,
    link,
    isDetail,
    results,
    letters,
    meaning,
    vacantPot,
    jackpot
}) => {
    console.log('🚀 ~ file: LotteryCard.jsx ~ line 25 ~ name', name);
    const getDate = get(games, `${id}.getLotteryDate`, () => date);
    const getOrder = get(games, `${id}.sublotteriesOrder`, []);
    const isQuiniela = get(games, `${id}.isQuiniela`, false);
    const boxResultClass = get(games, `${id}.boxResultClass`, '');
    const showVacantPot = get(games, `${id}.showVacantPot`, false);
    const showLetters = get(games, `${id}.showLetters`, false);
    const showFirstLotteryName = get(
        games,
        `${id}.showFirstLotteryName`,
        false
    );
    const hasJackpot = get(games, `${id}.hasJackpot`, false);
    const hasExtraResults = get(games, `${id}.hasExtraResults`, false);
    const extraResultsModificator = get(
        games,
        `${id}.extraResultsModificator`,
        ''
    );
    const isQuini6 = boxResultClass.includes('--quini-6');

    const reorderedResults = reorderSubLotteries(results, getOrder, isDetail);
    const [firstResult = {}] = reorderedResults;
    const {
        result = [],
        name: firstResultName = '',
        jackpot: firstResultJackpot = []
    } = firstResult;
    const [resultFirstChild = ''] = result;

    return (
        <CardLayout
            title={name}
            subtitle={getDate(date, firstResultName)}
            link={!isDetail && link}
        >
            <CardMainResult
                id={id}
                isDetail={isDetail}
                showFirstLotteryName={showFirstLotteryName}
                firstResultName={firstResultName}
                isQuiniela={isQuiniela}
                resultFirstChild={resultFirstChild}
                hasJackpot={hasJackpot}
                boxResultClass={boxResultClass}
                isQuini6={isQuini6}
                name={name}
                result={result}
                results={results}
                firstResultJackpot={firstResultJackpot}
                meaning={meaning}
                showVacantPot={showVacantPot}
                vacantPot={vacantPot}
                showLetters={showLetters}
                letters={letters}
            />
            <CardDetail
                isDetail={isDetail}
                hasExtraResults={hasExtraResults}
                reorderedResults={reorderedResults}
                isQuiniela={isQuiniela}
                extraResultsModificator={extraResultsModificator}
                hasJackpot={hasJackpot}
                jackpot={jackpot}
            />
        </CardLayout>
    );
};

LotteryCard.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    link: PropTypes.string,
    letters: PropTypes.string,
    meaning: PropTypes.string,
    jackpot: PropTypes.string,
    vacantPot: PropTypes.string,
    isDetail: PropTypes.bool,
    results: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            date: PropTypes.string,
            result: PropTypes.arrayOf(PropTypes.string)
        })
    )
};

LotteryCard.defaultProps = {
    id: '',
    name: '',
    date: '',
    link: '',
    letters: '',
    meaning: '',
    jackpot: '',
    vacantPot: '',
    results: [],
    isDetail: false
};

export default LotteryCard;
