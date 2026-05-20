import React from 'react';
import Badge from '../../../ui/foodit/badge/default';
import Image from '../../../ui/foodit/image/default';
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
            className="bg-[rgba(255,193,8,0.15)] flex flex-column flex-row_md col-span-8 md:col-span-12 xl:col-span-8"
            data-test-id={`card-newsletter-${id}`}
        >
            <Image
                className="object-cover bg-[rgba(255,193,8,0.15)]"
                classnames={{
                    wrapper:
                        'card-image ratio-3-2 w-full md:max-w-[218px] md:aspect-square [&>picture]:w-full [&>picture]:h-full',
                    image: 'md:h-[218px] xl:mt-6',
                    placeholder: 'md:h-[218px] xl:mt-6'
                }}
                src={image}
                alt={title}
            />
            <div className="w-full flex flex-column justify-center px-16 py-12 md:px-24 xl:px-32 gap-24">
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
                        <Badge
                            size="custom"
                            color="custom"
                            className="text-small-lg mt-4 px-16 py-2 bg-[var(--proxy-brand-vino)] text-accent-foreground"
                        >
                            {badge}
                        </Badge>
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
