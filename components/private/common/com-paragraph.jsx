import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-paragraph.css';
import ComLink from './com-link';

const ComParagraph = props => {
    const { size, capital, content, data, link } = props;
    return (
        <>
            {/* {link ? (
                <Comlink>
                    <p
                        className={`com-paragraph ${capital || ''} ${size}`}
                        dangerouslySetInnerHTML={{
                            __html: content
                        }}
                    >
                        {data}
                    </p>
                </Comlink>
            ) : ( */}
            <p
                className={`com-paragraph ${capital || ''} ${size}`}
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
