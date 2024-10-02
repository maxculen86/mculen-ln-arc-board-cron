import React from 'react';
import classNames from 'classnames';
import { Text } from '@ln/contenidos-ui-text';
import { Disclaimer } from '../../../LN-10-global/glossary/components/disclaimer';

// eslint-disable-next-line react/prop-types
export function IaContent({ id, contentData = [], className }) {
    const _classNames = classNames(
        'flex flex-column gap-24 cursor-pointer',
        className
    );
    return (
        <div className={_classNames}>
            {id === 'summary' && contentData.length > 0 && (
                <ul className="flex flex-column --list-inherit gap-16 pl-32">
                    {contentData?.map((paragraph, i) => (
                        <li
                            // eslint-disable-next-line react/no-array-index-key
                            key={i}
                            className="--font-m --font-regular marker-26"
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
                            <Text className="--prumo --font-extra --font-m">
                                {wordKey}
                            </Text>
                            <Text>{value}</Text>
                        </li>
                    ))}
                </ul>
            )}

            <Disclaimer />
        </div>
    );
}

export default IaContent;
