import React from 'react';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../../private/common/staticValidation';
import { meanings } from '../../../../content/sources/utils/servicesSource/_config';

const LotteryMeanings = ({ id: featureId }) => {
    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            <div className="number-meanings-box lay row-gap-4">
                {Object.entries(meanings).map(([topic], i) => (
                    <div key={topic}>{topic}</div>
                ))}
            </div>
        </StaticValidation>
    );
};

LotteryMeanings.label = 'LN Loteria Home Significado de Números';

LotteryMeanings.propTypes = { id: PropTypes.string.isRequired };

export default LotteryMeanings;
