import React from 'react';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../../private/common/staticValidation';

const LotteryDetailRules = ({ id: featureId }) => {
    const rules = Array.from({ length: 3 }).fill({
        title: 'Regla',
        description: 'Descripción'
    });
    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            <div className="lottery-rules-box lay">
                {rules.map(({ title, description }, i) => (
                    <div key={`${title} ${i + 1}`}>
                        <h2>{`${title} ${i + 1}`}</h2>
                        <p>{`${description} ${i + 1}`}</p>
                    </div>
                ))}
            </div>
        </StaticValidation>
    );
};

LotteryDetailRules.label = 'LN Loteria Detalle Reglas';

LotteryDetailRules.propTypes = { id: PropTypes.string.isRequired };

export default LotteryDetailRules;
