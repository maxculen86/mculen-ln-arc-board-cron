/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

/* TODO: Hacer code-split  de los SVG */

import {
    ExclusiveLn,
    Home,
    Sections,
    ClubCard,
    User,
    Search,
    Menu,
    Close,
    ArrowDown,
    ArrowUp,
    ArrowLeft,
    ArrowRight,
    Comment,
    Timer,
    Group,
    Zoom,
    Copy,
    Chat,
    Bookmark,
    BookmarkFilled,
    Download,
    Filter,
    Fire,
    Knife,
    ShareAndroid,
    Share,
    Ln,
    Lamp,
    Alert,
    Info,
    Checkmark,
    ErrorWarning,
    TenBackSecs,
    TenForwardSecs,
    Pause,
    Play,
    Headset
} from './index';

const listIcons = {
    // System icons
    home: Home,
    sections: Sections,
    'club-card': ClubCard,
    user: User,
    search: Search,
    menu: Menu,
    close: Close,
    'arrow-down': ArrowDown,
    'arrow-up': ArrowUp,
    'arrow-right': ArrowRight,
    'arrow-left': ArrowLeft,
    'exclusive-ln': ExclusiveLn,
    comment: Comment,
    chat: Chat,
    bookmark: Bookmark,
    'bookmark-filled': BookmarkFilled,
    timer: Timer,
    group: Group,
    zoom: Zoom,
    copy: Copy,
    download: Download,
    fire: Fire,
    filter: Filter,
    knife: Knife,
    'share-android': ShareAndroid,
    share: Share,
    ln: Ln,
    lamp: Lamp,
    alert: Alert,
    info: Info,
    checkmark: Checkmark,
    'error-warning': ErrorWarning,
    'ten-back-secs': TenBackSecs,
    'ten-forward-secs': TenForwardSecs,
    pause: Pause,
    play: Play,
    headset: Headset
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
