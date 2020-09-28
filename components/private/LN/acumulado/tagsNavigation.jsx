import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import WithAcuArticlesData from '../common/hocs/WithAcuArticlesData';
import filter from '../../../../content/filters/LN/acumulado/articleAcu';
import get from '../../common/utils/get';
import ComLink from '../../common/com-link';

const convertToComLink = ({ key, link, text, title, style }) => (
    <ComLink
        key={key}
        link={link}
        textname={text}
        title={title}
        style={style}
    />
);

convertToComLink.propTypes = {
    key: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    style: PropTypes.obj
};

convertToComLink.defaultProps = {
    style: {}
};

const TagsNavigation = ({ orderAndCountTags, hideTagsList, globalContent }) => {
    const [COLOR_TAGS] = useState(() =>
        get(globalContent, 'acumuladoColor.navigation_color_tags', null)
    );
    const [tagList] = useState(() =>
        orderAndCountTags
            ? orderAndCountTags.map(({ slug, text }) => ({
                  key: slug,
                  item: convertToComLink({
                      key: slug,
                      link: `/tema/${slug}/`,
                      text,
                      title: text,
                      ...(COLOR_TAGS && { style: { color: COLOR_TAGS } })
                  })
              }))
            : []
    );

    return (
        !hideTagsList &&
        tagList && (
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
