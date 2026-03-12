import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import ComText from '../../../private/common/text';
import { games } from '../../../../content/sources/utils/servicesSource/lottery/_config';
import get from '../../../private/common/utils/get';

function LotteryDetailRules({ id: featureId }) {
    const lottery = get(
        useAppContext(),
        'globalContent.dataService.lotteryDetail',
        []
    );

    const serviceId = lottery[0].id;
    const rules = get(games, `${serviceId}.rules`, []);
    return (
        <Static id={`rules-${serviceId}`} htmlOnly>
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
        </Static>
    );
}

LotteryDetailRules.label = 'LN Loteria Detalle Reglas';

export default LotteryDetailRules;
