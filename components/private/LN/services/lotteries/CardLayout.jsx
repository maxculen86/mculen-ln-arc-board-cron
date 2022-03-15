import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../../../private/common/com-link';
import Text from '../../../../private/common/text';

import '../../../../../resources/dist/css/ln/components/lotteries.css';

const CardLayout = ({
    className,
    title,
    subtitle,
    link,
    linkTitle,
    children
}) => {
    const classes = `card-lotteries ${className}`;

    return (
        <article className={classes}>
            <div className="header">
                {link ? (
                    <Link href={link} title={linkTitle} text={title} />
                ) : (
                    <Text size="2xs" weight="bold">
                        {title}
                    </Text>
                )}
                <Text size="5xs" className="subtitle">
                    {subtitle}
                </Text>
            </div>
            {children}
            <Link
                href={link}
                text={`Resultados del sorteo ${linkTitle}`}
                className="footer-link"
            />
        </article>
    );
};

CardLayout.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    link: PropTypes.string,
    linkTitle: PropTypes.string,
    children: PropTypes.string
};

CardLayout.defaultProps = {
    className: '',
    title: '',
    subtitle: '',
    link: '',
    linkTitle: '',
    children: ''
};

export default CardLayout;
