import React from 'react';
import { Text } from '@ln/common-ui-text';

export function StepsAudioFoodit({ stepList = [], segmentIndex = 0 }) {
    return stepList.map(({ showTitle, titleList, step, indexList }, i) => (
        <>
            {showTitle && titleList && (
                <Text className="roboto roboto-bold text-light-800">
                    {titleList}
                </Text>
            )}
            <div
                className={`${
                    segmentIndex === i + 1
                        ? 'roboto roboto-bold text-primary-positive'
                        : 'roboto roboto-regular text-light-600'
                }`}
            >
                <Text className="text-14">{indexList + 1}.</Text>
                <Text className="text-14"> {step}</Text>
            </div>
        </>
    ));
}
