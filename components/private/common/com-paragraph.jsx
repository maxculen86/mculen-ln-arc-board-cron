import React from 'react';
import PropTypes from 'prop-types';
import '../../../resources/dist/css/ln/components/com-paragraph.css';

const ComParagraph = props => {
    const { size, capital, content, classCondition } = props;
    return (
        <>
            <p
                className={`com-paragraph ${classCondition} ${capital} ${size}`}
                dangerouslySetInnerHTML={{
                    __html: content
                }}
            />
        </>
    );
};

ComParagraph.propTypes = {
    size: PropTypes.string,
    capital: PropTypes.string,
    content: PropTypes.string.isRequired,
    classCondition: PropTypes.string
};
ComParagraph.defaultProps = {
    capital: '',
    size: '',
    classCondition: ''
};

export default ComParagraph;
