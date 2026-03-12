import React from 'react';
import classNames from 'classnames';
import { Text } from '@ln/contenidos-ui-text';
import DisclaimerIA from '../../../LN-10-global/common/disclaimerIa/default';
import capitalizeFirstLetter from '../../../../private/common/utils/capitalizeFirstLetter';

function IaContent({ id, contentData = [], className = '' }) {
    const _classNames = classNames('flex flex-column gap-24', className);

    if (!contentData.length || !id) return null;

    return (
        <div className={_classNames}>
            {id === 'summary' && contentData.length > 0 && (
                <ul className="flex flex-column --list-inherit gap-16 pl-32 marker-24">
                    {contentData?.map(paragraph => (
                        <li
                            key={paragraph}
                            className="text-18"
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                    ))}
                </ul>
            )}

            {id === 'glossary' && contentData.length > 0 && (
                <ul className="flex flex-column --list-inherit gap-12">
                    {contentData?.map(({ key: wordKey, value }) => (
                        <li key={wordKey} className="flex flex-column">
                            <Text className="text-18 font-bold">
                                {capitalizeFirstLetter(wordKey)}
                            </Text>
                            <Text className="text-18">{value}</Text>
                        </li>
                    ))}
                </ul>
            )}

            <DisclaimerIA text="Realizado con IA" />
        </div>
    );
}
export default IaContent;
