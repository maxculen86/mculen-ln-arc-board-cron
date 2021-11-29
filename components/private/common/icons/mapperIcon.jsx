import React from 'react';

import {
    FacebookFilled,
    TwitterFilled,
    Instagram,
    Rss,
    Home,
    Sections,
    ClubCard,
    User
} from './index';

export const mapperIcon = {
    'facebook-filled': ({ ...r }) => <FacebookFilled {...r} />,
    'twitter-filled': ({ ...r }) => <TwitterFilled {...r} />,
    instagram: ({ ...r }) => <Instagram {...r} />,
    rss: ({ ...r }) => <Rss {...r} />,

    home: ({ ...r }) => <Home {...r} />,
    sections: ({ ...r }) => <Sections {...r} />,
    'club-card': ({ ...r }) => <ClubCard {...r} />,
    user: ({ ...r }) => <User {...r} />
};
