/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import StaticValidation from '../../private/common/staticValidation';
import ContainerValidation from '../../private/common/containerValidation';
import { VIDEO } from '../../private/common/utils/subtypes/subtypeHelper';

import BadgeUsertype from '../../private/common/badge/UserType';

import BajadaNota from '../../private/LN/nota/bajada';

const bajadaNota = props => {
    const {
        id: featureId,
        globalContent: {
            content_restrictions: { content_code: contentCode } = {},
            subtype
        },
        layout
    } = props;

    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            <BajadaNota {...props} />
            {contentCode === 'cerrada' && (
                <ContainerValidation layout={layout}>
                    <BadgeUsertype dark={VIDEO === subtype} />
                </ContainerValidation>
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
    }),
    layout: PropTypes.string
};

export default Consumer(bajadaNota);
