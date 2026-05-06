import React from 'react';
import { Badge } from '@ln/foodit-ui-badge';
import { Image } from '@ln/foodit-ui-image';
import { NewsletterSelectionButton } from './components/NewsletterSelectionButton';
import useGetUserConfig from '../../hooks/useGetUserConfig';
import { NewsletterSubscriptionButton } from './components/NewsletterSubscriptionButton';
import Icon from '../../../ui/foodit/icon/default';

export function CardNewsletter({
    title,
    description,
    badge,
    image,
    id,
    suscribed,
    category
}) {
    const { isSubscribed } = useGetUserConfig();

    return (
        <section
            className="flex flex-column flex-row_md col-span-8 md:col-span-12 xl:col-span-8"
            data-test-id={`card-newsletter-${id}`}
        >
            <Image
                className="bg-[rgba(255,193,8,0.15)] flex items-center object-cover card-image ratio-3-2 md:aspect-square w-full md:max-w-[218px]"
                src={image}
                alt={title}
            />
            <div className="bg-[rgba(255,193,8,0.15)] w-full flex flex-column justify-center px-16 py-12 md:px-24 xl:px-32 gap-24">
                <div className="flex flex-column gap-12">
                    <div className="flex gap-12 items-start">
                        <div>
                            <Icon
                                type="critical"
                                size={24}
                                className="pt-4"
                                name="newsletter"
                            />
                        </div>
                        <p className="prumo prumo-semibold text-24">{title}</p>
                        <Badge className="mt-4">{badge}</Badge>
                    </div>
                    <p className="font-secondary text-body-md">{description}</p>
                </div>
                <div className="pb-4 md:pb-0">
                    {isSubscribed ? (
                        <NewsletterSubscriptionButton
                            id={id}
                            suscribed={suscribed}
                            title={title}
                            category={category}
                        />
                    ) : (
                        <NewsletterSelectionButton
                            id={id}
                            title={title}
                            category={category}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
