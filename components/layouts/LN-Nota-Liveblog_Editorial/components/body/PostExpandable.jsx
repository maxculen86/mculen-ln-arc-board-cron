import React from 'react';
import { Accordion } from '@ln/common-ui-accordion';
import { Text } from '@ln/contenidos-ui-text';
import BuildBody from '../../../../features/LN-nota/body/_children/_buildBody';
import { supportedTypesLiveblog } from '../../_helpers/liveblogEditorialBody';

function PostExpandable({
    isOpen,
    onToggle,
    label,
    outputType,
    hiddenTextItems = [],
    globalContent = {}
}) {
    return (
        <Accordion
            visible={isOpen}
            className="flex flex-column-reverse border-secondary-positive__hover"
        >
            <Accordion.Header
                onClick={onToggle}
                iconProps={{
                    color: 'inherit',
                    size: 20
                }}
                className="text-blue-500"
                style={{
                    justifyContent: 'center'
                }}
            >
                <Text className="text-16 " weight="bold">
                    {label}
                </Text>
            </Accordion.Header>
            <Accordion.Body>
                <BuildBody
                    groupedElements={hiddenTextItems}
                    outputType={outputType}
                    globalContent={globalContent}
                    supportedTypesOverride={supportedTypesLiveblog}
                    useCapitalIndex={false}
                    useBanners={false}
                    useCounter={false}
                />
            </Accordion.Body>
        </Accordion>
    );
}

export default PostExpandable;
