import React from 'react';
import '../../../resources/dist/css/ln/components/com-paragraph.css';

const ComParagraph = props => {
    const { size, children, capital } = props;
    if (!children) return null;
    return (
        <p
            className={`com-paragraph ${size ? size : ``} ${
                capital ? `--capital` : ``
            }`}
        >
            {children}
        </p>
    );
};

export default ComParagraph;
