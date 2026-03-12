import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import { cx } from '@ln/cva';

function FigureCaption({ epigraphTitle = '', credit = '', className = '' }) {
    if (!epigraphTitle) return null;
    const classnames = cx(
        'border border-1 border-bottom border-light-300 relative px-16 py-8 min-h-36 w-100_md',
        className
    );
    return (
        <figcaption className={classnames}>
            <Text className="text-16 block">{epigraphTitle}</Text>
            {credit && (
                <Text className="text-16 text-dark-neutral-400 block">
                    {credit}
                </Text>
            )}
        </figcaption>
    );
}

export default FigureCaption;
