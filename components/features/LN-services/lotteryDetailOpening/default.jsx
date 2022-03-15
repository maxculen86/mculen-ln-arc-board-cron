import React from 'react';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../../private/common/staticValidation';

const LotteryDetailOpening = ({ id: featureId }) => (
    <StaticValidation id={featureId} htmlOnly persistent>
        <div className="lottery-detail-box lay">Apertura Detalle Lotería</div>
    </StaticValidation>
);

LotteryDetailOpening.label = 'LN Loteria Detalle Apertura';

LotteryDetailOpening.propTypes = { id: PropTypes.string.isRequired };

export default LotteryDetailOpening;
