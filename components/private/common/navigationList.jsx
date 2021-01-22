/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import LinkList from './com-link-list';
import ComTitle from './com-title';
import withNavigation from './hocs/withNavigation';
import withStatic from './hocs/withStatic';

const NavigationList = ({ title, extraClass, navigations }) => {
    const list =
        (navigations &&
            navigations.length &&
            navigations.map(
                ({
                    node_type: nodeType,
                    url,
                    display_name: displayName,
                    _id,
                    name
                }) => {
                    return {
                        link: (nodeType === 'link' && url) || _id,
                        textname: (nodeType === 'link' && displayName) || name,
                        title: (nodeType === 'link' && displayName) || name,
                        target: (nodeType === 'link' && '_blank') || ''
                    };
                }
            )) ||
        [];

    return (
        (list && list.length && (
            <section className="mod-linklist">
                <ComTitle size="--twoxs" content={title} />
                <LinkList title={title} list={list} extraClass={extraClass} />
            </section>
        )) ||
        null
    );
};

NavigationList.propTypes = {
    title: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.obj),
    extraClass: PropTypes.string
};

NavigationList.defaultProps = {
    title: '',
    list: [],
    extraClass: ''
};

export default withStatic(withNavigation(NavigationList, null, 'la-nacion-ar'));
