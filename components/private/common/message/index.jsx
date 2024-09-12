import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import Text from '../text';
import Link from '../com-link';
import ComTitle from '../com-title';
import { Badge } from '@ln/contenidos-ui-badge';

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
                    <Badge type="subscriberNegative" text="Suscriptores" />
                ) : (
                    <Text tag="strong" extraClass="text" size="--twoxs">
                        <Icon>
                            <IconSprite name={icon} />
                        </Icon>
                        {text}
                    </Text>
                )}
            </div>
            <div className={`${withLinks ? 'col-tablet-7' : 'col-12'} --left`}>
                <ComTitle
                    content={title}
                    tag="h3"
                    size="--l"
                    weight="--font-bold"
                />
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
    secondary: 'Iniciar sesión',
    specialUrl: '',
    secondaryUrl: '',
    dark: undefined,
    isExclusive: undefined,
    icon: 'comment',
    text: 'Comentarios'
};

export default Message;
