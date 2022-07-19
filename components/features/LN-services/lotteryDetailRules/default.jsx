import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import StaticValidation from '../../../private/common/staticValidation';
import ComText from '../../../private/common/text';
import { games } from '../../../../content/sources/utils/servicesSource/lottery/_config';
import get from '../../../private/common/utils/get';

const LotteryDetailRules = ({ id: featureId }) => {
    const lottery = get(
        useAppContext(),
        'globalContent.dataService.lotteryDetail',
        []
    );

    const serviceId = lottery[0].id;
    const rules = get(games, `${serviceId}.rules`, []);
    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            <div
                key={`${featureId}-lottery-rules`}
                className="lottery-rules-box"
            >
                {rules.map(({ text, description }, i) => (
                    <div key={`${text} ${i + 1}`}>
                        <ComText
                            id={`${featureId}-title-${i}`}
                            tag="h2"
                            text={text}
                            extraClass="com-title --l"
                        />
                        <ComText
                            id={`${featureId}-description-${i}`}
                            tag="p"
                            text={description}
                            extraClass="com-paragraph --s"
                        />
                    </div>
                ))}
            </div>
        </StaticValidation>
    );
};

LotteryDetailRules.label = 'LN Loteria Detalle Reglas';
LotteryDetailRules.lazy = true;

LotteryDetailRules.propTypes = { id: PropTypes.string.isRequired };

export default LotteryDetailRules;
