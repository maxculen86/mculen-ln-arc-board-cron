import React from 'react';
import PropTypes from 'fusion:prop-types';
import Subtitle from './subtitle';
import '../../../../../resources/dist/css/ln/components/tip.css';

const Tips = props => {
    const { size, title, paragraphs } = props;
    return (
        <div className="com-tip">
            <h4 className={`com-title-section-${size}`}>{title}</h4>
            {paragraphs &&
                paragraphs.map(paragraph =>
                    paragraph.element.type === 'header' ? (
                        <Subtitle
                            key={paragraph.element._id}
                            element={paragraph.element}
                        />
                    ) : (
                        <span
                            dangerouslySetInnerHTML={{
                                __html: paragraph.element.content
                            }}
                            key={paragraph.element._id}
                        ></span>
                    )
                )}
        </div>
    );
};

Tips.propTypes = {
    size: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string
        })
    ).isRequired
};

export default Tips;
