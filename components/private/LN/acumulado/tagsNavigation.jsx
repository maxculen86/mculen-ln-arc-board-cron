import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import WithAcuArticlesData from '../common/hocs/WithAcuArticlesData';
import filter from '../../../../content/filters/LN/acumulado/articleAcu';
import ComLinkList from '../../common/com-link-list';

const TagsNavigation = ({ orderAndCountTags, colorTags, hideTagsList }) => {
    const [tagList] = useState(() =>
        orderAndCountTags
            ? orderAndCountTags.map(({ slug, text }) => ({
                  key: slug,
                  link: `/tema/${slug}/`,
                  textname: text,
                  title: text,
                  style: colorTags && { style: { color: colorTags } }
              }))
            : []
    );

    return !hideTagsList && <ComLinkList list={tagList} extraClass="--tags" />;
};

TagsNavigation.propTypes = {
    orderAndCountTags: PropTypes.arrayOf(
        PropTypes.shape({
            tag: PropTypes.shape({
                slug: PropTypes.string,
                text: PropTypes.string
            })
        })
    ),
    colorTags: PropTypes.string,
    hideTagsList: PropTypes.bool
};

TagsNavigation.defaultProps = {
    orderAndCountTags: undefined,
    colorTags: undefined,
    hideTagsList: false
};

export default WithAcuArticlesData(TagsNavigation, filter);
