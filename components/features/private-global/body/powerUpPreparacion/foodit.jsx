import React from 'react';
import { useAppContext } from 'fusion:context';
import { List } from '@ln/foodit-ui-list';
import { Text } from '@ln/common-ui-text';
import PropTypes from 'prop-types';
import get from '../../../../private/common/utils/get';

export function PowerUpPreparacion({ data = {}, includePhotos = false }) {
    const { globalContent } = useAppContext();
    const { items = [], titleList = '' } = get(data, 'embed.config', {});
    const { _id: idPreparacionElement = '' } = data;

    const contentElements = get(globalContent, 'content_elements', []);

    const isFirstPreparacionBody =
        contentElements.findIndex(
            content => content?._id === idPreparacionElement
        ) === 0;

    const processPreparacionContent = () => {
        const orderedContent = [];
        const processedSteps = new Set();

        if (items.length > 0) {
            items.forEach(item => {
                orderedContent.push({
                    type: 'step',
                    content: item
                });
                processedSteps.add(item);
            });
        }

        const currentIndex = contentElements.findIndex(
            content => content?._id === idPreparacionElement
        );

        const nextPreparacionIndex = contentElements.findIndex(
            (element, index) =>
                index > currentIndex &&
                element?.subtype === 'custom-preparacion'
        );

        const endIndex =
            nextPreparacionIndex !== -1
                ? nextPreparacionIndex
                : contentElements.length;

        for (let i = currentIndex + 1; i < endIndex; i += 1) {
            const element = contentElements[i];

            if (
                i > currentIndex + 1 &&
                element?.type === 'list' &&
                !includePhotos
            ) {
                break;
            }

            if (element?.type === 'list' && element.items) {
                element.items.forEach(listItem => {
                    const stepContent = listItem.content;
                    if (stepContent && !processedSteps.has(stepContent)) {
                        orderedContent.push({
                            type: 'step',
                            content: stepContent
                        });
                        processedSteps.add(stepContent);
                    }
                });
            }

            if (element?.type === 'image' && element.url) {
                orderedContent.push({
                    type: 'image',
                    id: element._id || `img-${i}`,
                    url: element.url || '',
                    caption: element.caption || ''
                });
            }
        }

        return { orderedContent };
    };

    const { orderedContent = [] } = processPreparacionContent();

    if (items.length === 0) {
        return null;
    }

    const renderStepsAndImages = () => {
        if (!includePhotos) {
            return (
                <List variant="unordered">
                    {orderedContent
                        .filter(item => item.type === 'step')
                        .map(item => (
                            <List.Item
                                key={`step-${item.content}`}
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
                    {orderedContent.map((content, index) => {
                        if (content.type === 'step') {
                            return (
                                <List.Item
                                    key={`step-${content.id}`}
                                    dangerouslySetInnerHTML={{
                                        __html: content.content
                                    }}
                                />
                            );
                        }
                        if (content.type === 'image') {
                            return (
                                <li
                                    key={`image-${content.id || index}`}
                                    className="mt-8 mb-16"
                                >
                                    <img
                                        src={content.url}
                                        alt={content.caption || 'Recipe image'}
                                        className="w-100"
                                    />
                                </li>
                            );
                        }
                        return null;
                    })}
                </List>
            </div>
        );
    };

    return (
        <>
            {isFirstPreparacionBody && (
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

                {renderStepsAndImages()}
            </div>
        </>
    );
}

PowerUpPreparacion.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        embed: PropTypes.shape({
            config: PropTypes.oneOfType([
                PropTypes.shape({
                    items: PropTypes.arrayOf(PropTypes.string),
                    titleList: PropTypes.string
                })
            ])
        })
    }),
    includePhotos: PropTypes.bool
};

PowerUpPreparacion.defaultProps = {
    data: {
        _id: '',
        embed: {
            config: {
                items: [],
                titleList: ''
            }
        }
    },
    includePhotos: false
};

export default PowerUpPreparacion;
