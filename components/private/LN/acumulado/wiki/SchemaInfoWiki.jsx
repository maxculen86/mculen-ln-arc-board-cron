/* eslint-disable no-console */
import React from 'react';
import Text from '../../../common/text';
import ComLink from '../../../common/com-link';

function SchemaInfoWiki({ classes, label, text, link }) {
    return (
        <div className={classes}>
            <Text font="arial" size="4xs" weight="regular" extraClass="label">
                {label}
            </Text>
            {link ? (
                <ComLink link={link} target="_blank" textname={text} />
            ) : (
                <Text size="2xs" weight="regular" extraClass="text">
                    {text}
                </Text>
            )}
        </div>
    );
}

export default SchemaInfoWiki;
