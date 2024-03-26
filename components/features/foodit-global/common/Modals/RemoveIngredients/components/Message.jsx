import React from 'react';
import { useAppContext } from 'fusion:context';
import getAssetsPath from '../../../../../../private/common/utils/getAssetsPath';
import { getModalMessages } from '../helpers/messagesConfig';
import { Image } from '@ln/common-ui-image';
import { Text } from '@ln/common-ui-text';

export const Message = ({ type }) => {
    const { contextPath, deployment } = useAppContext();
    const { title = '', description = '' } = getModalMessages(type);

    return (
        <div className="flex flex-column gap-8 text-center pt-48">
            <Image
                className="h-50 mx-auto"
                src={getAssetsPath(contextPath)(deployment)('warning.webp')}
            />
            <Text className="prumo prumo-semibold text-24 text-28_md text-32_lg">
                {title}
            </Text>
            <Text className="text-16">
                <span dangerouslySetInnerHTML={{ __html: description }} />
            </Text>
        </div>
    );
};
