import React from 'react';
import PropTypes from 'fusion:prop-types';

const path = '/pf/tema/';

const tagsNavigation = ({
    _children,
    orderAndCountTags,
    isPrimarySection,
    hideTagsList
}) => {
    return !hideTagsList &&
        _children &&
        orderAndCountTags &&
        isPrimarySection ? (
        <ol className="cont_tags com-secondary-tag">
            {orderAndCountTags.map(tag => (
                <li key={tag.slug}>
                    <a
                        href={`${path}${tag.slug}?_website=${_children._website}`}
                        title={tag.text}
                    >
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
    _children: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            _website: PropTypes.string
        })
    ),
    orderAndCountTags: PropTypes.arrayOf(
        PropTypes.shape({
            tag: PropTypes.shape({
                slug: PropTypes.string,
                text: PropTypes.string
            })
        })
    ),
    isPrimarySection: PropTypes.bool,
    hideTagsList: PropTypes.bool
};

tagsNavigation.defaultProps = {
    _children: {
        _id: undefined,
        _website: undefined
    },
    orderAndCountTags: [],
    isPrimarySection: false,
    hideTagsList: false
};

export default tagsNavigation;
