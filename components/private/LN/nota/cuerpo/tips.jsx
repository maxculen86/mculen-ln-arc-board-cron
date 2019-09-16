import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/components/tip.css';

const Tips = props => {
    const { size, title, paragraphs } = props;
    return (
        <dl className="com-tip">
            <h4 className={`com-title-section-${size}`}>{title}</h4>
            <br />
            {paragraphs &&
                paragraphs.map(paragraph => (
                    <div key={paragraph.title}>
                        <dt>{paragraph.title}</dt>
                        <dd>{paragraph.description}</dd>
                    </div>
                ))}
        </dl>
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
