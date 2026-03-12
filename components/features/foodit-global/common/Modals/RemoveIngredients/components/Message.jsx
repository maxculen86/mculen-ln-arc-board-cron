/* eslint-disable react/no-danger */
import React from 'react';
import { useAppContext } from 'fusion:context';
import { Image } from '@ln/common-ui-image';
import { Text } from '@ln/common-ui-text';
import getAssetsPath from '../../../../../../private/common/utils/getAssetsPath';
import { findBookmarkById } from '../helpers/findByBookmarkId';
import { getModalMessages } from '../helpers/messagesConfig';

export function Message({ type, bookmarkId = null, userBookmarks = [] }) {
    const { contextPath, deployment } = useAppContext();

    let messages;
    if (type === 'bookmark' && bookmarkId && userBookmarks.length > 0) {
        const bookmarkInfo = findBookmarkById(userBookmarks, bookmarkId);
        messages = getModalMessages(type, bookmarkInfo);
    } else {
        messages = getModalMessages(type);
    }

    const { title = '', description = '' } = messages;

    return (
        <div className="flex flex-column gap-8 text-center">
            <Image
                className="h-50 mx-auto"
                src={getAssetsPath(contextPath)(deployment)('warning.webp')}
            />
            <Text className="prumo prumo-semibold text-24 text-28_md text-32_lg">
                {title}
            </Text>
            <Text className="text-16 roboto roboto-regular text-light-600">
                <span dangerouslySetInnerHTML={{ __html: description }} />
            </Text>
        </div>
    );
}
