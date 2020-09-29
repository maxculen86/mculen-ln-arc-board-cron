import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-paragraph.css';

const ComParagraph = props => {
    const { size, capital, content, classCondition } = props;
    return (
        <>
            <p
                className={`com-paragraph ${classCondition || ''} ${capital ||
                    ''} ${size || ''}`}
                dangerouslySetInnerHTML={{
                    __html: content
                }}
            />
        </>
    );
};

ComParagraph.propTypes = {
    size: PropTypes.string.isRequired,
    capital: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
};

export default ComParagraph;
