import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../../common/com-link';
import Text from '../../../common/text';

const CardLayout = ({ className, title, subtitle, link, children }) => {
    const classes = `card-lotteries ${className}`;
    const linkTitle = `Resultados del sorteo ${title}`;

    return (
        <article className={classes}>
            <div className="header-lotteries">
                {link ? (
                    <Text tag="h2" size="2xs" weight="bold">
                        <Link link={link} title={linkTitle} textname={title} />
                    </Text>
                ) : (
                    <Text tag="h2" size="2xs" weight="bold" text={title} />
                )}
                <Text size="5xs" extraClass="subtitle" text={subtitle} />
            </div>
            {children}
            {link && (
                <Link
                    link={link}
                    title={linkTitle}
                    textname={linkTitle}
                    classCondition="--fivexs"
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
    children: PropTypes.string
};

CardLayout.defaultProps = {
    className: '',
    title: '',
    subtitle: '',
    link: '',
    children: ''
};

export default CardLayout;
