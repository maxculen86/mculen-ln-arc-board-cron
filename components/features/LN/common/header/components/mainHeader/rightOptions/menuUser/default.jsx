import React, { useState } from 'react';
import { Popper } from '@ln/ds-common-popper';
import Link from '../../../../../../../ui/ln/link/default';
import Divider from '../../../../../../../ui/ln/divider/default';
import { useHeaderContext } from '../../../../context';
import { linkOptions, buttonLogout } from '../helpers';
import Avatar from './Avatar';
import Icon from '../../../../../../../ui/ln/icon/default';
import { USER_TYPES } from '../../../../../utils/constants';

function MenuUser() {
    // TODO: componente sin definicion, por eso se uso directamente el popper, al definirse pasar al facade
    const { userType } = useHeaderContext();
    const [isOpen, setIsOpen] = useState(false);

    if (userType === USER_TYPES.UNLOGGED) return null;

    return (
        <div className="max-lg:hidden flex h-40">
            <Popper
                placement="bottom"
                triggerOn="hover"
                hoverDelay={100}
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <Popper.Trigger className="flex items-center cursor-pointer">
                    <Avatar />
                    <Icon
                        name="arrow-down"
                        size={16}
                        className="transition-transform duration-200 text-secondary-default"
                        style={{
                            transform: isOpen
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)'
                        }}
                    />
                </Popper.Trigger>
                {/* TODO: quitar data-theme explicito en light, cuando se rediseñe el componente */}
                <Popper.Content
                    className="bg-neutral-1 shadow-center w-full rounded-4 p-12 text-14"
                    data-theme="light"
                >
                    <div
                        className="absolute bg-neutral-1 w-8 h-8 rotate-45 -top-4 left-1/2 -translate-x-1/2"
                        aria-hidden="true"
                    />
                    <nav>
                        <ul className="flex flex-col">
                            {linkOptions.map(
                                ({ href, target, text, onClick }) => (
                                    <li
                                        key={text}
                                        className="hover:bg-[#e7f0ff] rounded-4"
                                    >
                                        <Link
                                            href={href}
                                            target={target}
                                            onMouseDown={onClick}
                                            weight="regular"
                                            className="p-12 w-full"
                                        >
                                            {text}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </nav>
                    <Divider color="muted" />
                    {/* El link renderiza un button por el uso de asChild */}
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link
                        className="text-error-default hover:bg-[#e7f0ff] rounded-4 p-12 w-full"
                        color="custom"
                        weight="regular"
                        onClick={buttonLogout.onClick}
                        title={buttonLogout.title}
                        asChild
                    >
                        <button type="button">{buttonLogout.text}</button>
                    </Link>
                </Popper.Content>
            </Popper>
        </div>
    );
}

export default MenuUser;
