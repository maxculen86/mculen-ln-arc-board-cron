import React from 'react';
import PropTypes from 'prop-types';

import Text from '../text';
import Link from '../com-link';
import Logo from '../com-logo';

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
        logoName,
        logoText
    } = props;
    const withLinks = secondaryUrl && specialUrl;
    return (
        <section className={`message row w-100-mobile ${dark ? '--dark' : ''}`}>
            <div className="col-12 --top">
                <Text tag="strong" extraClass="subscribers" size="--twoxs">
                    <Logo logoName={logoName} size="--xs" />
                    {logoText}
                </Text>
            </div>
            <div
                className={`${
                    withLinks ? 'col-tablet-7' : 'col-tablet-12'
                } --left`}
            >
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
    logoName: PropTypes.string,
    logoText: PropTypes.string
};

Message.defaultProps = {
    title: 'Ahora para comentar debés tener Acceso Digital',
    subtitle: 'Ingresá o suscribite',
    special: 'Suscribite',
    secondary: 'Ingresá',
    specialUrl: '',
    secondaryUrl: '',
    dark: undefined,
    logoName: 'ln',
    logoText: 'Exclusivo suscriptores'
};

export default Message;
