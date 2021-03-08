import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLi from './com-li';
import ComLink from './com-link';
import ComIco from './com-icon';
import '../../../resources/dist/css/ln/components/com-unordered.css';
import ComBullet from './com-bullet';

const list = [
    'twitter',
    'facebook',
    'youtube',
    'instagram',
    'linkedin',
    'rss',
    'medium',
    'pinterest',
    'soundcloud',
    'snapchat',
    'whatsapp',
    'tumblr'
];

const ListSocialIcons = props => {
    const { vertical, size, data, sizeIcon, sizeBullet } = props;
    const listItem = list.map(item => {
        if (!data[item]) return null;
        return (
            <ComLi>
                <ComLink
                    link={data[item]}
                    blank={item.blank}
                    classCondition="--sociallist"
                >
                    <ComBullet sizeBullet={sizeBullet} />
                    <ComIco
                        sizeText={size}
                        sizeIcon={sizeIcon}
                        iconName={`${item}-filled`}
                        textname={item}
                    />
                </ComLink>
            </ComLi>
        );
    });

    return <ul className={`com-unordered ${vertical}`}>{listItem}</ul>;
};

ListSocialIcons.propTypes = {
    data: PropTypes.shape({
        twitter: PropTypes.string,
        facebook: PropTypes.string,
        youtube: PropTypes.string,
        instagram: PropTypes.string,
        linkedin: PropTypes.string,
        rss: PropTypes.string,
        medium: PropTypes.string,
        reddit: PropTypes.string,
        pinterest: PropTypes.string,
        soundcloud: PropTypes.string,
        snapchat: PropTypes.string,
        whatsapp: PropTypes.string,
        tumblr: PropTypes.string
    }).isRequired,
    size: PropTypes.string.isRequired,
    sizeIcon: PropTypes.string.isRequired,
    vertical: PropTypes.string,
    sizeBullet: PropTypes.string
};

ListSocialIcons.defaultProps = {
    vertical: '',
    sizeBullet: ''
};

export default ListSocialIcons;
