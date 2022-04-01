import React from 'react';
import PropTypes from 'fusion:prop-types';
import { API_ENV, SITE_LANACION } from 'fusion:environment';
import StaticValidation from '../../../private/common/staticValidation';
import ServiceMiniCard from '../../../private/common/serviceMiniCard';

import { meanings } from '../../../../content/sources/utils/servicesSource/lottery/_config';
import ModHeaderSection from '../../../private/common/mod-headerSection';

const LotteryMeanings = ({ id: featureId }) => {
    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            <ModHeaderSection
                tag="h2"
                title="Significado de números según los sueños"
            />
            <div className="lotteries number-meanings-box row-gap-tablet-4">
                {Object.entries(meanings).map(([, meaningInfo], i) => (
                    <ServiceMiniCard
                        key={meaningInfo.title}
                        title={meaningInfo.title}
                        link={`${SITE_LANACION}${
                            meaningInfo.link[API_ENV || 'sandbox']
                        }`}
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
