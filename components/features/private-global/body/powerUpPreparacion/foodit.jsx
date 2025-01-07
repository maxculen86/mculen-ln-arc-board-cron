import React from 'react';
import { useAppContext } from 'fusion:context';
import { List } from '@ln/foodit-ui-list';
import { Text } from '@ln/common-ui-text';
import PropTypes from 'prop-types';
import get from '../../../../private/common/utils/get';

export function PowerUpPreparacion({ data = {} }) {
    const { globalContent } = useAppContext();
    const { items = [], titleList = '' } = get(data, 'embed.config', {});
    const { _id: idPreparacionElement = '' } = data;

    const contentElements = get(globalContent, 'content_elements', []);

    const firstPreparacion = contentElements.find(
        content => content?.subtype === 'custom-preparacion'
    );

    const firstPreparacionId = get(firstPreparacion, '_id', '');

    const isFirstPreparacionBody = firstPreparacionId === idPreparacionElement;
    return items.length > 0 ? (
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
                <List variant="unordered">
                    {items.map(item => (
                        <List.Item
                            key={item}
                            dangerouslySetInnerHTML={{
                                __html: item
                            }}
                        />
                    ))}
                </List>
            </div>
        </>
    ) : null;
}

PowerUpPreparacion.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        embed: PropTypes.shape({
            config: PropTypes.oneOfType([
                PropTypes.shape({
                    items: PropTypes.arrayOf(PropTypes.string).isRequired,
                    titleList: PropTypes.string
                })
            ]).isRequired
        }).isRequired
    }).isRequired
};

export default PowerUpPreparacion;
