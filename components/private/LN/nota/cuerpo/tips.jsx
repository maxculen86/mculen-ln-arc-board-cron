import React from 'react';
import PropTypes from 'fusion:prop-types';
import Subtitle from './subtitle';
import '../../../../../resources/dist/css/ln/components/tip.css';

const Tips = props => {
    const { size, title, paragraphs } = props;
    let len = 0;
    if (paragraphs) {
        len = paragraphs.filter(p => p.element.content.trim() !== '<br/>')
            .length;
    }
    return (
        <>
            {len > 0 ? (
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
                                    key={paragraph.element._id}
                                    dangerouslySetInnerHTML={{
                                        __html: paragraph.element.content
                                    }}
                                />
                            )
                        )}
                </div>
            ) : (
                <></>
            )}
        </>
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
