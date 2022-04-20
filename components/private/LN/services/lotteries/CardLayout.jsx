import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../../common/com-link';
import Text from '../../../common/text';

const CardLayout = ({ title, subtitle, link, children }) => {
    return (
        <article className="lottery-card">
            <div className="lottery-header">
                {link ? (
                    <Text tag="h2" size="2xs" weight="bold">
                        <Link
                            link={link}
                            title={`Ir a ${title}`}
                            textname={title}
                        />
                    </Text>
                ) : (
                    <Text tag="h2" size="2xs" weight="bold" text={title} />
                )}
                <Text size="5xs" extraClass="subtitle" text={subtitle} />
            </div>
            {children}
            {link && (
                <Text tag="h3" size="5xs">
                    <Link
                        link={link}
                        title={`Ir a resultados del sorteo ${title}`}
                        textname={`Resultados del sorteo ${title}`}
                    />
                </Text>
            )}
        </article>
    );
};

CardLayout.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    link: PropTypes.string,
    children: PropTypes.string
};

CardLayout.defaultProps = {
    title: '',
    subtitle: '',
    link: '',
    children: ''
};

export default CardLayout;
