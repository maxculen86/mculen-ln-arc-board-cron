import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../../../private/common/com-link';
import Text from '../../../../private/common/text';

const CardLayout = ({ className, title, subtitle, link, children }) => {
    const classes = `card-lotteries ${className}`;
    const linkTitle = `Resultados del sorteo ${title}`;

    return (
        <article className={classes}>
            <div className="header-lotteries">
                {link ? (
                    <Link link={link} title={linkTitle} textname={title} />
                ) : (
                    <Text size="2xs" weight="bold" text={title} />
                )}
                <Text size="5xs" extraClass="subtitle" text={subtitle} />
            </div>
            {children}
            {link && (
                <Link
                    link={link}
                    title={linkTitle}
                    textname={linkTitle}
                    classCondition="footer-link-lotteries"
                />
            )}
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
