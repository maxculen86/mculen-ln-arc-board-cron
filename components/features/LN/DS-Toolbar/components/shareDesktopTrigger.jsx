import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import { Dropdown } from '@ln/ds-common-dropdown';
import { Link } from '@ln/ds-common-link';
import { cx } from '@ln/ds-cva';
import { SHARE_OPTIONS } from '../_helpers';
import config from '../../../../../properties/sites/la-nacion-ar';
import Icon from '../../../ui/ln/icon/default';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import isSSR from '../../../../private/LN/common/utils/isSSR';
import Button from '../../../ui/ln/button/default';
import useShareOptions from '../hooks/useShareOptions';

const resolveValue = (value, props) =>
    typeof value === 'function' ? value(props) : value;

function DataTwWrapper({ children }) {
    return <div data-tw>{children}</div>;
}

function ShareDesktopTrigger({
    isShareOpen,
    setIsShareOpen,
    requestUri,
    title,
    mobileTitle
}) {
    const { host } = config;

    const { copied, handleShareClick } = useShareOptions({
        isShareOpen,
        setIsShareOpen,
        shareData: {
            requestUri,
            host: SITE_LANACION || host,
            title,
            mobileTitle
        }
    });

    if (isSSR()) return <ShareCustomGhostButton className="max-xl:hidden" />;

    return (
        <Dropdown
            placement="bottom"
            open={isShareOpen}
            onOpenChange={e => setIsShareOpen(e)}
            arrow
            border
        >
            <Dropdown.Trigger
                className="flex max-xl:hidden"
                title="Compartir"
                onClick={() =>
                    addEventToDataLayerV2({
                        event: 'e_linkclick',
                        action: 'toolbar',
                        category: 'nota',
                        label: 'compartir'
                    })
                }
            >
                <ShareCustomGhostButton />
            </Dropdown.Trigger>
            <Dropdown.Content
                customWidth
                customWrapper={DataTwWrapper}
                className="bg-base-foreground shadow-center w-200 rounded-4 p-16 border border-muted z-1"
            >
                <div className="flex flex-grow mb-12">
                    <Button
                        variant="ghost"
                        color="black"
                        size="custom"
                        className="ml-auto"
                        title="Cerrar"
                        aria-label="Cerrar"
                        onClick={() => setIsShareOpen(false)}
                    >
                        <Icon name="close" size={16} />
                    </Button>
                </div>
                <ul className="flex flex-column gap-20 z-10">
                    {SHARE_OPTIONS.map(option => {
                        const ctx = { copied };
                        const className = resolveValue(option.className, ctx);
                        const icon = resolveValue(option.icon, ctx);
                        const label = resolveValue(option.label, ctx);

                        return (
                            <li key={option.id}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <Link
                                    color={option.color}
                                    className={cx(
                                        'flex items-center gap-8',
                                        className
                                    )}
                                    onClick={() => handleShareClick(option)}
                                    iconLeft={<Icon name={icon} size={20} />}
                                    size={12}
                                    asChild
                                >
                                    <button type="button">{label}</button>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </Dropdown.Content>
        </Dropdown>
    );
}

export default ShareDesktopTrigger;

export function ShareCustomGhostButton({ className }) {
    return (
        <div
            className={cx(
                'flex items-center gap-8 h-40 px-16 text-label-md rounded-button text-black-default hover:bg-black-lighten data-[disabled="true"]:text-black-lighten',
                className
            )}
        >
            <Icon name="reply" />
            <span className="text-label-sm font-bold">Compartir</span>
        </div>
    );
}
