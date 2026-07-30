import React from 'react';

function Paragraph(props) {
    const { data, capital } = props;
    const { content } = data || {};

    const className = `text-16 text-18_md ${capital ? 'initial-letter-2' : ''}`;

    return (
        <p
            className={className}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}

export default Paragraph;
