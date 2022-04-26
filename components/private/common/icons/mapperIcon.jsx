/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

/* TODO: Hacer code-split  de los SVG */

import {
    FacebookFilled,
    Facebook,
    TwitterFilled,
    Twitter,
    Rss,
    RssFilled,
    Email,
    EmailFilled,
    ExclusiveLn,
    Whatsapp,
    WhatsappFilled,
    YoutubeFilled,
    InstagramFilled,
    Instagram,
    MediumFilled,
    PinterestFilled,
    SoundcloudFilled,
    SnapchatFilled,
    TumblrFilled,
    LinkedinFilled,
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
    Sun,
    Rain,
    Snow,
    Cloudy,
    Storm,
    SunCloudy,
    Windy,
    SnowCloudy,
    RainyCloudy,
    StormCloudy,
    ClearNight,
    Ln,
    AnimalsLotteries,
    NamesLotteries,
    NationalLotteries,
    TraditionalLotteries
} from './index';

const listIcons = {
    // Social icons
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    whatsapp: Whatsapp,
    email: Email,
    rss: Rss,
    'rss-filled': RssFilled,
    'facebook-filled': FacebookFilled,
    'twitter-filled': TwitterFilled,
    'instagram-filled': InstagramFilled,
    'whatsapp-filled': WhatsappFilled,
    'email-filled': EmailFilled,
    'youtube-filled': YoutubeFilled,
    'medium-filled': MediumFilled,
    'pinterest-filled': PinterestFilled,
    'soundcloud-filled': SoundcloudFilled,
    'snapchat-filled': SnapchatFilled,
    'tumblr-filled': TumblrFilled,
    'linkedin-filled': LinkedinFilled,

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

    // Weather Icons
    sun: Sun,
    rain: Rain,
    snow: Snow,
    cloudy: Cloudy,
    storm: Storm,
    'sun-cloudy': SunCloudy,
    windy: Windy,
    'snow-cloudy': SnowCloudy,
    'rainy-cloudy': RainyCloudy,
    'storm-cloudy': StormCloudy,
    'clear-night': ClearNight,

    // Lotteries Icons
    animals: AnimalsLotteries,
    names: NamesLotteries,
    national: NationalLotteries,
    traditional: TraditionalLotteries
};

const MapperIcon = ({ name, r }) => {
    const Component = listIcons[name];

    return <Component {...r} />;
};

MapperIcon.propTypes = {
    name: PropTypes.string.isRequired,
    r: PropTypes.objectOf(PropTypes.string)
};

MapperIcon.defaultProps = {
    r: {}
};
export default MapperIcon;
