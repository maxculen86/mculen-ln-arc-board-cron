import React from 'react';

import { FacebookFilled, InstagramFilled } from './index';

export const mapperIcon = {
    facebook: ({ ...r }) => <FacebookFilled {...r} />,
    'facebook-filled': ({ ...r }) => <FacebookFilled {...r} />,
    'twitter-filled': ({ ...r }) => <InstagramFilled {...r} />,
    'instagram-filled': ({ ...r }) => <InstagramFilled {...r} />,
    instagram: ({ ...r }) => <FacebookFilled {...r} />,
    'whatsapp-filled': ({ ...r }) => <FacebookFilled {...r} />,
    email: ({ ...r }) => <FacebookFilled {...r} />,
    rss: ({ ...r }) => <FacebookFilled {...r} />,
    club: ({ ...r }) => <FacebookFilled {...r} />,
    section: ({ ...r }) => <FacebookFilled {...r} />,
    user: ({ ...r }) => <FacebookFilled {...r} />,
    home: ({ ...r }) => <FacebookFilled {...r} />
};
