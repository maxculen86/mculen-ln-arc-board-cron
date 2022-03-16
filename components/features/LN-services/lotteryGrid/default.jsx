import React from 'react';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../../private/common/staticValidation';

const LotteryGrid = ({ id: featureId }) => {
    const lotteryGrid = Array.from({ length: 16 }).fill('Lottery');
    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            <div className="lottery-box lay row-gap-4">
                {lotteryGrid.map((lottery, i) => (
                    <div key={`${lottery} ${i + 1}`}>
                        {`${lottery} ${i + 1}`}
                    </div>
                ))}
            </div>
        </StaticValidation>
    );
};

LotteryGrid.label = 'LN Loteria Home Grilla';

LotteryGrid.propTypes = { id: PropTypes.string.isRequired };

export default LotteryGrid;
