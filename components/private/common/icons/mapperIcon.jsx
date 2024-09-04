/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

/* TODO: Terminar de eliminar Iconos y reemplazar por IconSprite */

import {
    Alert,
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    Comment,
    Bookmark,
    BookmarkFilled,
    Close,
    Lamp,
    Zoom
} from './index';

const listIcons = {
    // System icons
    'arrow-down': ArrowDown, // impacto
    'arrow-left': ArrowLeft, // impacto
    'arrow-right': ArrowRight, // impacto
    'bookmark-filled': BookmarkFilled, //impacto
    alert: Alert, // impacto
    bookmark: Bookmark, // impacto
    close: Close, // impacto
    comment: Comment, // impacto
    lamp: Lamp, // impacto
    zoom: Zoom // impacto media
};

const MapperIcon = ({ name = '', extraProps = {} }) => {
    if (!name) return <></>;
    const Component = listIcons[name];

    return <Component {...extraProps} />;
};

MapperIcon.propTypes = {
    name: PropTypes.string.isRequired,
    extraProps: PropTypes.objectOf(PropTypes.string)
};

export default MapperIcon;
