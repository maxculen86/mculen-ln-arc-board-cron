/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import ContainerValidation from '../../private/common/containerValidation';
import { VIDEO } from '../../private/common/utils/subtypes/subtypeHelper';
import BadgeUsertype from '../../private/common/badge/UserType';
import BajadaNota from '../../private/LN/nota/bajada';

const bajadaNota = props => {
    const {
        globalContent: {
            content_restrictions: { content_code: contentCode } = {},
            subtype
        },
        layout
    } = props;

    return (
        <>
            <BajadaNota {...props} />
            {contentCode === 'cerrada' && (
                <ContainerValidation layout={layout}>
                    <BadgeUsertype dark={VIDEO === subtype} />
                </ContainerValidation>
            )}
        </>
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
