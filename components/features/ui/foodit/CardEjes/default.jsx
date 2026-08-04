import React from 'react';
import Image from '../image/default';

export function CardEjes({
    title,
    image,
    classNames,
    href = '/',
    fetchPriority = 'low',
    loading = 'lazy',
    trackingProps = {}
}) {
    return (
        <article className={classNames}>
            <a
                href={href}
                className="md:items-center p-8 xl:p-12 flex flex-col gap-8 md:gap-4 border border-muted md:border-neutral-200 xl:flex-row xl:gap-12 h-full md:min-h-100 xl:min-h-80"
                {...trackingProps}
            >
                <div className="ratio-3-2 border border-neutral-200 md:border-none overflow-hidden md:w-78">
                    <div className="scale-75 xl:scale-100">
                        <Image
                            src={image}
                            alt={`Imagen de ${title}`}
                            objectFit="cover"
                            fetchPriority={fetchPriority}
                            loading={loading}
                        />
                    </div>
                </div>

                <div className="text-center xl:flex xl:items-center xl:text-left">
                    <p
                        className="font-primary md:font-secondary md:[--font-weight-normal:var(--font-weight-bold)] text-14"
                        style={{ '--tw-leading': '1.3' }}
                    >
                        {title}
                    </p>
                </div>
            </a>
        </article>
    );
}
