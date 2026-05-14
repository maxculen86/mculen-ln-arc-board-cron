import React, { useEffect, useState } from 'react';
import { RoofFoodit } from '../RoofFoodit/foodit';
import { CardNewsletter } from './CardNewsletter';
import { getNewsletters, newsletters } from './helpers/helpers';
import useAuthManager from '../../../../private/common/auth/hooks/useAuthManager';

export function NewsletterFoodit({ category }) {
    const { token, accessToken } = useAuthManager();
    const [dataNewsletters, setNewsletters] = useState({});

    useEffect(() => {
        const loadNewsletters = async () => {
            try {
                const response = await getNewsletters({ accessToken, token });
                setNewsletters(response);
            } catch (err) {
                console.error(
                    'Error al obtener newsletters - foodit newsletter:',
                    err
                );
            }
        };

        if (accessToken && token) {
            loadNewsletters();
        }
    }, [token, accessToken]);

    return (
        <div data-test-id="container-newsletter-foodit">
            <RoofFoodit
                title={{
                    text: 'No te pierdas ninguna receta',
                    as: 'h3'
                }}
            />
            <div
                data-tw
                className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32"
            >
                {newsletters.map(({ title, description, badge, image, id }) => (
                    <CardNewsletter
                        key={title}
                        title={title}
                        description={description}
                        badge={badge}
                        image={image}
                        id={id}
                        suscribed={dataNewsletters[id]}
                        category={category}
                    />
                ))}
            </div>
        </div>
    );
}
