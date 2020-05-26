import React from 'react';
import PropTypes from 'fusion:prop-types';

const ComSource = props => {
    const { media, srcset, src, type } = props;
    //if (!src || !srcset) return null;
    return <source media={media} srcset={srcset} src={src} type={type} />;
};

ComSource.propTypes = {
    srcset: PropTypes.string,
    media: PropTypes.string,
    src: PropTypes.string,
    type: PropTypes.string
};

export default ComSource;

// <source src="//dl.dropbox.com/s/931244iox7i0fpk/working-with-espresso.mp4" type="video/mp4"/>
// <source src="//dl.dropbox.com/s/g3mo3w34pb8pp2l/working-with-espresso.webm" type="video/webm"/>
// <source src="//dl.dropbox.com/s/p37f0avio0x6bs8/working-with-espresso.ogv" type="video/ogg"/>
