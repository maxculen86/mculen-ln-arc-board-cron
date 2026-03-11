/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import { Badge } from '@ln/contenidos-ui-badge';
import ContainerValidation from '../../private/common/containerValidation';
import { VIDEO } from '../../private/common/utils/subtypes/subtypeHelper';
import BajadaNota from '../../private/LN/nota/bajada';

const bajadaNota = props => {
    const {
        globalContent: {
            content_restrictions: { content_code: contentCode } = {},
            subtype
        },
        layout
    } = props;
    const badgeTypeByVideo =
        subtype === VIDEO ? 'subscriberNegative' : 'subscriber';
    return (
        <>
            <BajadaNota {...props} />
            {contentCode === 'cerrada' && (
                <ContainerValidation layout={layout}>
                    <Badge className="mb-24" type={badgeTypeByVideo}>
                        Suscriptores
                    </Badge>
                </ContainerValidation>
            )}
        </>
    );
};

bajadaNota.label = 'LN-Nota-Bajada';

export default Consumer(bajadaNota);
