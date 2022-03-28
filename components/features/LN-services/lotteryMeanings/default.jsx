import React from 'react';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../../private/common/staticValidation';
import ServiceMiniCard from '../../../private/common/serviceMiniCard';

import { meanings } from '../../../../content/sources/utils/servicesSource/lottery/_config';
import ModHeaderSection from '../../../private/common/mod-headerSection';

const LotteryMeanings = ({ id: featureId }) => {
    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            <ModHeaderSection title="Significado de números segun los sueños" />
            <div className="lotteries number-meanings-box row-gap-tablet-4">
                {Object.entries(meanings).map(([, meaningInfo], i) => (
                    <ServiceMiniCard
                        key={meaningInfo.title}
                        title={meaningInfo.title}
                        link={meaningInfo.link}
                        linkTitle={meaningInfo.linkTitle}
                        icon={meaningInfo.icon}
                        labeled="Significado de numeros"
                    />
                ))}
            </div>
        </StaticValidation>
    );
};

LotteryMeanings.label = 'LN Loteria Home Significado de Números';

LotteryMeanings.propTypes = { id: PropTypes.string.isRequired };

export default LotteryMeanings;
