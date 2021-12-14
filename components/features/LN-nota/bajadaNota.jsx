import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import { VIDEO } from '../../private/common/utils/subtypes/subtypeHelper';

import BadgeUsertype from '../../private/common/badge/UserType';

import BajadaNota from '../../private/LN/nota/bajada';

const bajadaNota = props => {
    const {
        id: featureId,
        globalContent: {
            content_restrictions: { content_code: contentCode } = {},
            subtype
        }
    } = props;

    return (
        <Static id={featureId}>
            <BajadaNota {...props} />
            {contentCode === 'cerrada' && (
                <BadgeUsertype dark={VIDEO === subtype} />
            )}
        </Static>
    );
};

bajadaNota.label = 'LN-Nota-Bajada';

export default Consumer(bajadaNota);
