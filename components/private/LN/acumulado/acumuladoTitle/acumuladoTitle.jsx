import React from 'react';
import PropTypes from 'fusion:prop-types';
import withAcuCategories from '../hocs/withAcuCategories';
import capitalizeFirstLetter from '../../../common/utils/capitalizeFirstLetter';
import get from '../../../common/utils/get';

import '../../../../../resources/dist/css/ln/components/title.css';
import '../../../../../resources/dist/css/ln/components/tag.css';
import ModCategory from '../../../common/mod-category';

const setTitle = (
    replaceTitle,
    { Payload, node_type: nodeType, name, byline }
) => {
    if (replaceTitle) return capitalizeFirstLetter(replaceTitle);
    if (Payload) return capitalizeFirstLetter(Payload.items[0].name);
    if (nodeType === 'section') return capitalizeFirstLetter(name);
    if (byline) return capitalizeFirstLetter(byline);
    return '';
};

const AcumuladoTitle = props => {
    const { outputType, idLogoImage, colorCategory } = props;
    const isPrimarySection = get(props, 'isPrimarySection', {});
    const navigationList = get(props, 'navigation', null);
    const globalContent = get(props, 'globalContent', {});
    const replaceTitle = get(props, 'customFields.replaceTitle', null);
    const prefixTitle = get(props, 'customFields.prefixTitle', null);

    const title = setTitle(replaceTitle, globalContent);
    const url =
        globalContent.node_type === 'tags'
            ? globalContent.canonical_url
            : `${globalContent._id}/`;
    // const { _id: url = '' } = globalContent;

    const prefixText =
        !isPrimarySection && title && url.includes('/recetas') && prefixTitle
            ? `${prefixTitle} `
            : '';
    const titleText = `${prefixText}${title}`;

    const categories =
        navigationList &&
        navigationList.map(
            ({
                _id,
                navigation,
                name,
                node_type: nodeType,
                url: categoryUrl,
                display_name: displayName
            }) => {
                const { nav_title: navTitle } = navigation || {};
                const isLink = nodeType === 'link';
                return {
                    key: _id,
                    link: (isLink && categoryUrl) || `${_id}/`,
                    textname: navTitle || (isLink && displayName) || name,
                    title: navTitle || (isLink && displayName) || name,
                    ...(colorCategory && { style: { color: colorCategory } })
                };
            }
        );

    return (
        <ModCategory
            revista={idLogoImage}
            imageId={idLogoImage}
            category={titleText}
            navigation={categories}
            style={{ color: colorCategory }}
            outputType={outputType}
            url={url}
        />
    );
};

AcumuladoTitle.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Payload: PropTypes.shape({
            items: PropTypes.shape({
                name: PropTypes.string
            })
        }),
        byline: PropTypes.string,
        name: PropTypes.string,
        node_type: PropTypes.string,
        children: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                navigation: PropTypes.shape({
                    nav_title: PropTypes.string
                }),
                _website: PropTypes.string
            })
        )
    }).isRequired,
    outputType: PropTypes.string.isRequired,
    idLogoImage: PropTypes.string.isRequired,
    colorCategory: PropTypes.string.isRequired
};

export default withAcuCategories(AcumuladoTitle);
