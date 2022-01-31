import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import StaticValidation from '../../private/common/staticValidation';
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
        <StaticValidation id={featureId}>
            <BajadaNota {...props} />
            {contentCode === 'cerrada' && (
                <BadgeUsertype dark={VIDEO === subtype} />
            )}
        </StaticValidation>
    );
};

bajadaNota.label = 'LN-Nota-Bajada';

bajadaNota.propTypes = {
    id: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        content_restrictions: PropTypes.shape({
            content_code: PropTypes.string.isRequired
        }),
        subtype: PropTypes.string.isRequired
    }).isRequired
};

export default Consumer(bajadaNota);
