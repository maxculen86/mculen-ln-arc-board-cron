/* eslint-disable react/no-danger */
import React from 'react';
import Avatar from '../../../ui/ln/avatar/default';
import Link from '../../../ui/ln/link/default';
import Icon from '../../../ui/ln/icon/default';

function AuthorsAndSocialLinks({
    photo,
    author,
    authorsText,
    role,
    socialItems,
    shouldShowAuthors
}) {
    if (!shouldShowAuthors) return null;

    return (
        <div className="flex gap-12">
            {photo && (
                <div className="flex-shrink-0 max-md:order-1">
                    <Avatar
                        color="muted"
                        size={56}
                        className="border border-muted"
                        imageProps={{
                            src: photo,
                            alt: author?.name || 'Autor'
                        }}
                        fallbackProps={{
                            className:
                                'avatar-placeholder bg-[url("/pf/resources/images/ln-placeholder.svg")] w-full h-full bg-cover'
                        }}
                    />
                </div>
            )}
            <address className="flex flex-column gap-4 justify-center flex-grow-1">
                {authorsText && (
                    <span
                        className="text-body-md font-bold block"
                        dangerouslySetInnerHTML={{
                            __html: `Por ${authorsText}`
                        }}
                    />
                )}
                {role && (
                    <span className="text-body-sm text-base-light block">
                        {role}
                    </span>
                )}
                {socialItems.length > 0 && (
                    <div className="flex flex-wrap gap-12 mt-4">
                        {socialItems.map(({ icon, url, label }) => (
                            <Link
                                key={`${icon}-${url}`}
                                href={url}
                                target="_blank"
                                rel="noreferrer noopener"
                                title={`Ir a ${label}`}
                                color="base"
                            >
                                <Icon name={icon} size={20} />
                            </Link>
                        ))}
                    </div>
                )}
            </address>
        </div>
    );
}

export default AuthorsAndSocialLinks;
