import React from 'react';
import { Text } from '@ln/common-ui-text';
import { cleanHtmlTags } from './_helper';

export function StepsAudioFoodit({ stepList = [], segmentIndex = 0 }) {
    return stepList.map(({ showTitle, titleList, step, indexList }, i) => (
        <ul key={`step-${indexList}`} data-step-index={i}>
            {showTitle && titleList && (
                <Text
                    as="p"
                    className="roboto roboto-bold text-light-800 pb-16"
                >
                    {titleList}
                </Text>
            )}
            <li
                className={`${
                    segmentIndex === i + 1
                        ? 'roboto roboto-bold text-primary-positive'
                        : 'roboto roboto-regular text-light-600'
                }`}
            >
                <Text className="text-14">{indexList + 1}.</Text>
                <Text className="text-14"> {cleanHtmlTags(step)}</Text>
            </li>
        </ul>
    ));
}
