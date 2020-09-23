/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import WithAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import ListSectionsTitle from './listSectionsTitle';
import TagsNavigation from '../tagsNavigation';
import NotaApertura from '../notaApertura';
import capitalizeFirstLetter from '../../../common/utils/capitalizeFirstLetter';
import get from '../../../common/utils/get';

import '../../../../../resources/dist/css/ln/components/title.css';
import '../../../../../resources/dist/css/ln/components/tag.css';
import ComTitle from '../../../common/com-title';

const setTitle = (replaceTitle, { Payload, node_type, name, byline }) => {
    if (replaceTitle) return capitalizeFirstLetter(replaceTitle);
    if (Payload) return capitalizeFirstLetter(Payload.items[0].name);
    if (node_type === 'section') return capitalizeFirstLetter(name);
    if (byline) return capitalizeFirstLetter(byline);
    return '';
};

const setWithCategory = (
    hideSectionsList,
    hideTagsList,
    children,
    isPrimarySection
) => {
    if (
        (!!hideSectionsList || !!hideTagsList) &&
        children &&
        children.length > 0
    ) {
        return 'with-category';
    }
    if (hideSectionsList === 'true' && hideTagsList === 'true') {
        return '';
    }

    if (
        typeof hideSectionsList === 'undefined' &&
        typeof hideTagsList === 'undefined' &&
        isPrimarySection
    ) {
        return 'with-category';
    }
    return '';
};

const AcumuladoTitle = props => {
    const { globalContent, orderAndCountTags, customFields } = props;
    const { prefixTitle, replaceTitle } = customFields || {};
    const { children } = globalContent;

    const hideSectionsList = get(
        globalContent,
        'site.hidesectionslist',
        undefined
    );
    const hideTagsList = get(globalContent, 'site.hidetagslist', undefined);

    const isPrimarySection =
        globalContent && globalContent._id
            ? globalContent._id.split('/').splice(1).length === 1
            : false;

    const title = setTitle(replaceTitle, globalContent);

    const withCategory = setWithCategory(
        hideSectionsList,
        hideTagsList,
        children,
        isPrimarySection
    );

    const prefixText =
        !isPrimarySection && title && prefixTitle ? `${prefixTitle} ` : '';
    const titleText = `${prefixText} ${title}`;

    return (
        <>
            <div className="com-titleWithfollow">
                <div className={withCategory}>
                    <ComTitle size="--xl" tag="h1" content={titleText} />
                    <ListSectionsTitle
                        _children={children}
                        isPrimarySection={isPrimarySection}
                        hideSectionsList={hideSectionsList === 'true'}
                    />
                </div>
                <TagsNavigation
                    _children={children}
                    orderAndCountTags={orderAndCountTags}
                    isPrimarySection={isPrimarySection}
                    hideTagsList={hideTagsList === 'true'}
                />
            </div>
            <NotaApertura />
        </>
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
    orderAndCountTags: PropTypes.arrayOf(
        PropTypes.shape({
            tag: PropTypes.shape({
                slug: PropTypes.string,
                text: PropTypes.string
            })
        })
    ).isRequired,
    customFields: PropTypes.objectOf(PropTypes.string).isRequired
};

// AcumuladoTitle.defaultProps = {
//     globalContent: {
//         Payload: undefined,
//         byline: undefined,
//         name: undefined,
//         node_type: undefined,
//         children: []
//     }
// };

export default WithAcuArticlesData(AcumuladoTitle, filter, 'notaM');
