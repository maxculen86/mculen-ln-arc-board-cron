import React from 'react';

const Paragraph = props => {
    const { data, capital } = props;
    const { content } = data || {};

    const className = `text-18 ${capital ? 'initial-letter-2' : ''}`;

    return (
        <p
            className={className}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default Paragraph;
