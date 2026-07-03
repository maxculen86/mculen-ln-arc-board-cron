import React from 'react';
import { useAppContext } from 'fusion:context';
import { List } from '@ln/foodit-ui-list';
import { Text } from '@ln/common-ui-text';
import get from '../../../../private/common/utils/get';
import {
    processPreparacionContent,
    hasCustomPreparacion,
    isFirstPreparacionBody
} from './helper';

export function PowerUpPreparacion({ data = {}, includePhotos = false }) {
    const { globalContent } = useAppContext();
    const { _id: idPreparacionElement = '' } = data;
    const { items = [], titleList = '' } = get(data, 'embed.config', {});

    const contentElements = get(globalContent, 'content_elements', []);
    const hasCustomPrep = hasCustomPreparacion(contentElements);
    const isFirstPrep = isFirstPreparacionBody(
        contentElements,
        idPreparacionElement
    );

    if (items.length === 0 && (!includePhotos || hasCustomPrep)) {
        return null;
    }

    const { orderedContent = [] } = processPreparacionContent(
        data,
        contentElements,
        idPreparacionElement,
        items,
        includePhotos
    );

    const renderContentItem = (content, index) => {
        if (content.type === 'header') {
            return (
                <li key={`header-${index}`} className="mt-8 mb-4">
                    <Text
                        as={`h${content.level || 3}`}
                        className="roboto-bold text-16 text-18_md"
                    >
                        <span
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                                __html: content.content
                            }}
                        />
                    </Text>
                </li>
            );
        }

        if (content.type === 'step') {
            return (
                <List.Item
                    key={`step-${index}-${content.content?.substring(0, 10)}`}
                    dangerouslySetInnerHTML={{
                        __html: content.content
                    }}
                />
            );
        }

        if (content.type === 'image') {
            return (
                <li key={`image-${content.id}-${index}`} className="mt-8 mb-16">
                    <img
                        src={content.url}
                        alt={content.caption || 'Recipe image'}
                        className="w-100"
                    />
                </li>
            );
        }

        return null;
    };

    const renderContent = (contentList, includePhotosFlag) => {
        if (!includePhotosFlag) {
            return (
                <List variant="unordered">
                    {contentList
                        .filter(item => item.type === 'step')
                        .map(item => (
                            <List.Item
                                key={`step-${item.id || item.content?.substring(0, 10)}`}
                                dangerouslySetInnerHTML={{
                                    __html: item.content
                                }}
                            />
                        ))}
                </List>
            );
        }

        return (
            <div className="list-with-images">
                <List variant="unordered">
                    {contentList.map((content, index) =>
                        renderContentItem(content, index)
                    )}
                </List>
            </div>
        );
    };

    return (
        <>
            {isFirstPrep && (
                <h3 className="prumo prumo-light text-24 text-32_md text-36_lg">
                    Preparación
                </h3>
            )}
            <div className="flex flex-column gap-16">
                {titleList && (
                    <Text as="h4" className="roboto-bold text-16 text-18_md">
                        {titleList}
                    </Text>
                )}
                {renderContent(orderedContent, includePhotos)}
            </div>
        </>
    );
}

export default PowerUpPreparacion;
