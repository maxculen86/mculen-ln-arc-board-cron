import React from 'react';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../../private/common/staticValidation';
import ServiceMiniCard from '../../../private/common/serviceMiniCard';

const LotteryMeanings = ({ id: featureId }) => {
    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            {/* <div className="number-meanings-box lay row-gap-4">
                {Object.entries(meanings).map(([topic], i) => (
                    <div key={topic}>{topic}</div>
                ))}
            </div> */}
            <ServiceMiniCard
                title="animales"
                linkTitle="holaquease"
                icon="facebook"
                labeled="significado de numeros"
            />
        </StaticValidation>
    );
};

LotteryMeanings.label = 'LN Loteria Home Significado de Números';

LotteryMeanings.propTypes = { id: PropTypes.string.isRequired };

export default LotteryMeanings;
