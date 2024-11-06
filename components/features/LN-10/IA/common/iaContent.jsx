import React from 'react';
import classNames from 'classnames';
import { Text } from '@ln/contenidos-ui-text';
import PropTypes from 'prop-types';
import { Disclaimer } from '../../../LN-10-global/glossary/components/disclaimer';

export function IaContent({ id, contentData = [], className = '' }) {
    const _classNames = classNames('flex flex-column gap-24', className);
    return (
        <div className={_classNames}>
            {id === 'summary' && contentData.length > 0 && (
                <ul className="flex flex-column --list-inherit gap-16 pl-32">
                    {contentData?.map(paragraph => (
                        <li
                            key={paragraph}
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
IaContent.propTypes = {
    id: PropTypes.string.isRequired,
    contentData: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string,
                value: PropTypes.string
            })
        ),
        PropTypes.arrayOf(PropTypes.string)
    ]),
    className: PropTypes.string
};

IaContent.defaultProps = {
    className: '',
    contentData: []
};
export default IaContent;
