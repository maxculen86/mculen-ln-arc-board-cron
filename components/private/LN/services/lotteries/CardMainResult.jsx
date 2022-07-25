import React from 'react';
import PropTypes from 'prop-types';
import LabelText from './LabelText';
import Text from '../../../common/text';
import ExtraResults from './common/ExtraResults';
import BallsResults from './common/BallsResults';

const CardMainResult = ({
    id,
    isDetail,
    showFirstLotteryName,
    firstResultName,
    isQuiniela,
    resultFirstChild,
    hasJackpot,
    boxResultClass,
    isQuini6,
    name,
    result,
    results,
    firstResultJackpot,
    meaning,
    showVacantPot,
    vacantPot,
    showLetters,
    letters
}) => {
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
};

CardMainResult.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    letters: PropTypes.string,
    meaning: PropTypes.string,
    vacantPot: PropTypes.string,
    isDetail: PropTypes.bool,
    results: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            date: PropTypes.string,
            result: PropTypes.arrayOf(PropTypes.string)
        })
    ),
    firstResultJackpot: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            date: PropTypes.string,
            result: PropTypes.arrayOf(PropTypes.string)
        })
    ),
    showFirstLotteryName: PropTypes.bool,
    firstResultName: PropTypes.string,
    isQuiniela: PropTypes.bool,
    resultFirstChild: PropTypes.string,
    hasJackpot: PropTypes.bool,
    boxResultClass: PropTypes.string,
    isQuini6: PropTypes.bool,
    result: PropTypes.arrayOf(PropTypes.string),
    showVacantPot: PropTypes.bool,
    showLetters: PropTypes.bool
};
CardMainResult.defaultProps = {
    id: '',
    name: '',
    letters: '',
    meaning: '',
    vacantPot: '',
    isDetail: false,
    results: [],
    firstResultJackpot: [],
    showFirstLotteryName: false,
    firstResultName: '',
    isQuiniela: false,
    resultFirstChild: '',
    hasJackpot: false,
    boxResultClass: '',
    isQuini6: false,
    result: [],
    showVacantPot: false,
    showLetters: false
};

export default CardMainResult;
