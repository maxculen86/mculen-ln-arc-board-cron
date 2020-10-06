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
    const { outputType, idLogoImage, colorCategory } = props;
    const isPrimarySection = get(props, 'isPrimarySection', {});
    const navigationList = get(props, 'navigation', null);
    const globalContent = get(props, 'globalContent', {});
    const replaceTitle = get(props, 'customFields.replaceTitle', null);
    const prefixTitle = get(props, 'customFields.prefixTitle', null);

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
                    ...(colorCategory && { style: { color: colorCategory } })
                })
            };
        });

    return (
        <ModCategory
            revista={idLogoImage}
            imageId={idLogoImage}
            category={titleText}
            navigation={categories}
            style={{ color: colorCategory }}
            outputType={outputType}
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
