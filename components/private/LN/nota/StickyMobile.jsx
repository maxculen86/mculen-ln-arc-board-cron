import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../../../resources/dist/css/ln/components/sticky-mobile.css';
import Text from '../../common/text';
import Icon from '../../common/icon';
import ComLink from '../../common/com-link';
import ModPicture from '../../common/mod-picture';

const StickyMobile = ({
    headerText,
    alt,
    titleArticle,
    urlImg,
    urlArticle,
    resizedUrls
}) => {
    const [displaySticky, setDisplaySticky] = useState(true);
    return (
        <section className={`sticky-mobile ${!displaySticky && 'no-display'}`}>
            <div className="header-sticky">
                <Text font="arial" size="2xs" weight="bold" tag="h3">
                    {headerText}
                </Text>
                <div onClick={() => setDisplaySticky(false)} aria-hidden="true">
                    <Icon name="close" size="--xs" />
                </div>
            </div>
            <ComLink link={urlArticle} title={titleArticle}>
                <ModPicture
                    src={urlImg}
                    alt={alt || titleArticle}
                    sources={resizedUrls}
                />
                <Text font="sueca" size="2xs" weight="regular" tag="h2">
                    {titleArticle}
                </Text>
            </ComLink>
        </section>
    );
};

StickyMobile.propTypes = {
    headerText: PropTypes.string,
    alt: PropTypes.string,
    titleArticle: PropTypes.string,
    urlImg: PropTypes.string,
    urlArticle: PropTypes.string,
    resizedUrls: PropTypes.string
};

StickyMobile.defaultProps = {
    headerText: '',
    alt: '',
    titleArticle: '',
    urlImg: '',
    urlArticle: '',
    resizedUrls: ''
};

export default StickyMobile;
