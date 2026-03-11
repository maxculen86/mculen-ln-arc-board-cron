import React from 'react';
import Link from '../../../common/com-link';
import Text from '../../../common/text';

function CardLayout({ title, subtitle, link, children }) {
    return (
        <article className="lottery-card">
            <div className="lottery-header">
                {link ? (
                    <Text tag="h2" size="2xs" weight="bold">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link
                        link={link}
                        title={`Ir a resultados del sorteo ${title}`}
                        textname={`Ver resultados del sorteo ${title}`}
                    />
                </Text>
            )}
        </article>
    );
}

export default CardLayout;
