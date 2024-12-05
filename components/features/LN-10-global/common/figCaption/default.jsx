import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@ln/contenidos-ui-text';

function FigCaption({ epigraphTitle, credit }) {
    if (!epigraphTitle) return null;

    return (
        <figcaption className="border border-1 border-bottom border-light-300 bg-white relative mb-8 px-16 py-8 min-h-36 w-100_md px-0_l">
            <Text className="text-16 block">{epigraphTitle}</Text>
            {credit && (
                <Text className="text-16 text-dark-neutral-400 block">
                    {credit}
                </Text>
            )}
        </figcaption>
    );
}

FigCaption.propTypes = {
    epigraphTitle: PropTypes.string,
    credit: PropTypes.string
};

FigCaption.defaultProps = {
    epigraphTitle: '',
    credit: ''
};

export default FigCaption;
