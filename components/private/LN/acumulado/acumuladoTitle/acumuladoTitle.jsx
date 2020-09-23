import React from 'react';
import PropTypes from 'fusion:prop-types';
import withAcuCategories from '../hocs/withAcuCategories';
import capitalizeFirstLetter from '../../../common/utils/capitalizeFirstLetter';
import get from '../../../common/utils/get';

import '../../../../../resources/dist/css/ln/components/title.css';
import '../../../../../resources/dist/css/ln/components/tag.css';
import ModCategory from '../../../common/mod-category';
import ComLink from '../../../common/com-link';

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

const AcumuladoTitle = props => {
    const isPrimarySection = get(props, 'isPrimarySection', {});
    const navigationList = get(props, 'navigation', null);
    const globalContent = get(props, 'globalContent', {});
    const replaceTitle = get(props, 'customFields.replaceTitle', null);
    const prefixTitle = get(props, 'customFields.prefixTitle', null);

    const ID_LOGO_IMAGE = get(
        globalContent,
        'acumuladoColor.id_logo_image',
        ''
    );
    const COLOR_TAGS = get(
        globalContent,
        'acumuladoColor.navigation_color',
        null
    );
    const title = setTitle(replaceTitle, globalContent);

    const prefixText =
        !isPrimarySection && title && prefixTitle ? `${prefixTitle} ` : '';
    const titleText = `${prefixText}${title}`;

    const categories =
        navigationList &&
        navigationList.map(({ _id, navigation, name }) => {
            return {
                key: _id,
                item: convertToComLink({
                    key: _id,
                    link: `${_id}/`,
                    text:
                        navigation && navigation.nav_title
                            ? navigation.nav_title
                            : name,
                    title:
                        navigation && navigation.nav_title
                            ? navigation.nav_title
                            : name,
                    ...(COLOR_TAGS && { style: { color: COLOR_TAGS } })
                })
            };
        });

    const colorCategory = get(
        globalContent,
        'acumuladoColor.navigation_color',
        null
    );

    return (
        <ModCategory
            revista={ID_LOGO_IMAGE}
            category={titleText}
            navigation={categories}
            style={{ color: colorCategory }}
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
    }).isRequired
};

export default withAcuCategories(AcumuladoTitle);
