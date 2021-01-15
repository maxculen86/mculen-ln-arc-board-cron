/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import LinkList from './com-link-list';
import withNavigation from './hocs/withNavigation';
import withStatic from './hocs/withStatic';

const NavigationList = ({ title, hierarchy, separator, navigations }) => {
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
                        link: nodeType === 'link' ? url : _id,
                        textname: nodeType === 'link' ? displayName : name,
                        title: nodeType === 'link' ? displayName : name,
                        target: nodeType === 'link' ? '_blank' : ''
                    };
                }
            )) ||
        [];

    return (
        (hierarchy && list && list.length && (
            <>
                <LinkList list={list} title={title} separator={separator} />
            </>
        )) ||
        null
    );
};

NavigationList.propTypes = {
    title: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.obj),
    separator: PropTypes.string
};

NavigationList.defaultProps = {
    title: '',
    list: [],
    separator: ''
};

export default withStatic(withNavigation(NavigationList, null, 'la-nacion-ar'));
