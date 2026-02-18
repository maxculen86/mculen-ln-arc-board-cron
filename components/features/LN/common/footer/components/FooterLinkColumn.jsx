import React from 'react';
import Link from '../../../../ui/ln/link/default';
import { resolveFooterHref } from '../helpers/utils';

export function FooterLinkColumn({ title, items, firstItemMargin }) {
    if (!items?.length) return null;

    return (
        <div className="flex flex-col flex-1 min-w-0 max-md:hidden gap-16">
            {title && (
                <p className="text-small-lg leading-[130%] font-bold">
                    {title}
                </p>
            )}
            <ul className="contents">
                {items.map(({ text, href, target, id, type }, i) => (
                    <li className="flex" key={id || text}>
                        <Link
                            href={resolveFooterHref({ href, type })}
                            title={`Ir a ${text}`}
                            target={target}
                            className={
                                i === 0 && firstItemMargin
                                    ? firstItemMargin
                                    : ''
                            }
                            color="secondary"
                        >
                            <span className="text-label-md leading-[100%] font-normal">
                                {text}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
