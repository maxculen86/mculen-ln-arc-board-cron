import React from 'react';
import PropTypes from 'prop-types';
import '../../../../resources/dist/css/ln/components/sticky-mobile.css';
import Text from '../../common/text';
import Icon from '../../common/icon';
import Image from '../../common/com-image';
import ComLink from '../../common/com-link';

const StickyMobile = ({
    headerText,
    alt,
    titleArticle,
    urlImg,
    urlArticle
}) => {
    return (
        <section className="sticky-mobile">
            <div className="header-sticky">
                <Text font="arial" size="2xs" weight="bold" tag="p">
                    {headerText}
                </Text>
                <Icon name="close" size="--xs" />
            </div>
            <ComLink link={urlArticle} title={titleArticle}>
                <Image
                    width={80}
                    height={80}
                    src={urlImg}
                    alt={alt || titleArticle}
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
    urlArticle: PropTypes.string
};

StickyMobile.defaultProps = {
    headerText: '',
    alt: '',
    titleArticle: '',
    urlImg: '',
    urlArticle: ''
};

export default StickyMobile;
