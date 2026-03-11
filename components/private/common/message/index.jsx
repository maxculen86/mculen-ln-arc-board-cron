import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Badge } from '@ln/contenidos-ui-badge';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import Text from '../text';
import Link from '../com-link';
import ComTitle from '../com-title';

import '../../../../resources/dist/css/ln/modules/message.css';

function Message({
    title = '',
    subtitle = '',
    special = 'Suscribite',
    specialUrl = '',
    secondary = 'Iniciar sesión',
    secondaryUrl = '',
    dark,
    isExclusive,
    icon = 'comment',
    text = 'Comentarios'
}) {
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
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link
                        classCondition="com-button --secondary"
                        title={secondary}
                        rel="nofollow"
                        link={secondaryUrl}
                    >
                        {secondary}
                    </Link>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
}
export default Message;
