import React from 'react';
import PropTypes from 'fusion:prop-types';

const path = '/tema/';

const tagsNavigation = ({ orderAndCountTags, hideTagsList }) => {
    return !hideTagsList && orderAndCountTags ? (
        <ol className="cont_tags com-secondary-tag">
            {orderAndCountTags.map(tag => (
                <li key={tag.slug}>
                    <a href={`${path}${tag.slug}/`} title={tag.text}>
                        {tag.text}
                    </a>
                </li>
            ))}
        </ol>
    ) : (
        <></>
    );
};

tagsNavigation.propTypes = {
    orderAndCountTags: PropTypes.arrayOf(
        PropTypes.shape({
            tag: PropTypes.shape({
                slug: PropTypes.string,
                text: PropTypes.string
            })
        })
    ),
    hideTagsList: PropTypes.bool
};

tagsNavigation.defaultProps = {
    orderAndCountTags: [],
    hideTagsList: false
};

export default tagsNavigation;
