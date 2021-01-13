import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import WithAcuArticlesData from '../common/hocs/WithAcuArticlesData';
import filter from '../../../../content/filters/LN/acumulado/articleAcu';
import ComLink from '../../common/com-link';

const TagsNavigation = ({ orderAndCountTags, colorTags }) => {
    const [tagList] = useState(() =>
        orderAndCountTags
            ? orderAndCountTags.map(({ slug, text }) => ({
                  key: slug,
                  item: (
                      <ComLink
                          key={slug}
                          link={`/tema/${slug}/`}
                          textname={text}
                          title={text}
                          style={colorTags && { style: { color: colorTags } }}
                      />
                  )
              }))
            : []
    );

    return (
        tagList &&
        tagList.length > 0 && (
            <ul className="com-unordered --tags">
                {tagList.map(({ item, key }) => (
                    <li key={key}>{item}</li>
                ))}
            </ul>
        )
    );
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
    hideTagsList: PropTypes.bool
};

TagsNavigation.defaultProps = {
    orderAndCountTags: undefined,
    hideTagsList: false
};

export default WithAcuArticlesData(TagsNavigation, filter);
