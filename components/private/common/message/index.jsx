import React from 'react';
import PropTypes from 'prop-types';

import Text from '../text';
import Link from '../com-link';
import Icon from '../icon';

import '../../../../resources/dist/css/ln/modules/message.css';

const Message = props => {
    const {
        title,
        subtitle,
        special,
        specialUrl,
        secondary,
        secondaryUrl,
        dark,
        isExclusive,
        icon,
        text
    } = props;
    const withLinks = secondaryUrl && specialUrl;
    return (
        <section className={`message row w-100-mobile ${dark ? '--dark' : ''}`}>
            <div className="col-12 --top">
                {isExclusive ? (
                    <Text tag="strong" extraClass="subscribers" size="--twoxs">
                        <Icon name="ln" size="--xs" />
                        Exclusivo suscriptores
                    </Text>
                ) : (
                    <Text tag="strong" extraClass="text" size="--twoxs">
                        <Icon name={icon} size="--xs" />
                        {text}
                    </Text>
                )}
            </div>
            <div className={`${withLinks ? 'col-tablet-7' : 'col-12'} --left`}>
                <Text extraClass="com-title" tag="h3" size="--s">
                    {title}
                </Text>
                <Text tag="p" size="--twoxs">
                    {subtitle}
                </Text>
            </div>
            {withLinks && (
                <div className="col-tablet-5 --right">
                    <Link
                        classCondition="com-button --secondary"
                        title={secondary}
                        rel="nofollow"
                        link={secondaryUrl}
                    >
                        {secondary}
                    </Link>
                    <Link
                        classCondition="com-button --special"
                        title={special}
                        rel="nofollow"
                        link={specialUrl}
                    >
                        {special}
                    </Link>
                </div>
            )}
        </section>
    );
};
Message.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    special: PropTypes.string,
    specialUrl: PropTypes.string,
    secondary: PropTypes.string,
    secondaryUrl: PropTypes.string,
    dark: PropTypes.bool,
    isExclusive: PropTypes.bool,
    icon: PropTypes.string,
    text: PropTypes.string
};

Message.defaultProps = {
    title: '',
    subtitle: '',
    special: 'Suscribite',
    secondary: 'Ingresá',
    specialUrl: '',
    secondaryUrl: '',
    dark: undefined,
    isExclusive: undefined,
    icon: 'comment',
    text: 'Comentarios'
};

export default Message;
