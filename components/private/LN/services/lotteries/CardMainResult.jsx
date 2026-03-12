import React from 'react';
import LabelText from './LabelText';
import Text from '../../../common/text';
import ExtraResults from './common/ExtraResults';
import BallsResults from './common/BallsResults';

function CardMainResult({
    id = '',
    isDetail,
    showFirstLotteryName,
    firstResultName,
    isQuiniela,
    resultFirstChild,
    hasJackpot,
    boxResultClass = '',
    isQuini6,
    name = '',
    result = [],
    results = [],
    firstResultJackpot = [],
    meaning,
    showVacantPot,
    vacantPot,
    showLetters,
    letters = ''
}) {
    return (
        <div className="main-result" data-testid={`${id}-test`}>
            {!isDetail && showFirstLotteryName && (
                <LabelText text={firstResultName} />
            )}
            {isQuiniela && (
                <Text weight="bold" size="2xl">
                    {resultFirstChild}
                </Text>
            )}
            <ExtraResults
                isQuiniela={isQuiniela}
                hasJackpot={hasJackpot}
                boxResultClass={boxResultClass}
                isDetail={isDetail}
                isQuini6={isQuini6}
                name={name}
                result={result}
                results={results}
            />
            <BallsResults
                isDetail={isDetail}
                hasJackpot={hasJackpot}
                boxResultClass={boxResultClass}
                result={result}
                results={results}
                firstResultJackpot={firstResultJackpot}
            />

            {meaning && <LabelText text={meaning} />}
            {!isDetail && showVacantPot && (
                <LabelText text={vacantPot && `Pozo vacante: ${vacantPot}`} />
            )}
            {showLetters && <LabelText text={`Letras: ${letters}`} />}
        </div>
    );
}

export default CardMainResult;
