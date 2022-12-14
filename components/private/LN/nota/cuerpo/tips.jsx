/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Subtitle from './parrafo';
import '../../../../../resources/dist/css/ln/components/tip.css';
import ComTitle from '../../../common/com-title';

const Tips = props => {
    const { title, paragraphs } = props;
    let len = 0;
    if (paragraphs) {
        len = paragraphs.filter(p => p.element.content.trim() !== '<br/>')
            .length;
    }
    return (
        <>
            {len > 0 ? (
                <div className="com-tip">
                    <ComTitle tag="h4" size="--l" content={title} />
                    {paragraphs &&
                        paragraphs.map(paragraph =>
                            paragraph.element &&
                            paragraph.element.type === 'header' ? (
                                <Subtitle
                                    key={paragraph.element._id}
                                    data={paragraph.element}
                                />
                            ) : (
                                <p
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
    title: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string
        })
    ).isRequired
};

export default Tips;
