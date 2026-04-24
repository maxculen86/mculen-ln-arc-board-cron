import React from 'react';
import { Dropdown } from '@ln/ds-common-dropdown';
import Link from '../../../../../../../ui/ln/link/default';
import Divider from '../../../../../../../ui/ln/divider/default';
import { useHeaderContext } from '../../../../context';
import { linkOptions, buttonLogout } from '../helpers';
import Avatar from './Avatar';
import Icon from '../../../../../../../ui/ln/icon/default';
import { USER_TYPES } from '../../../../../utils/constants';

function DataTwWrapper({ children }) {
    return <div data-tw>{children}</div>;
}

function MenuUser() {
    const { userType } = useHeaderContext();

    if (userType === USER_TYPES.UNLOGGED) return null;

    return (
        <div className="max-lg:hidden flex h-40">
            <Dropdown
                placement="bottom"
                triggerOn="hover"
                hoverDelay={100}
                border
                arrow
            >
                <Dropdown.Trigger className="group flex items-center gap-8 cursor-pointer">
                    <Avatar />
                    <Icon
                        name="arrow-down"
                        size={16}
                        className="transition-transform duration-200 text-secondary-default group-aria-expanded:rotate-180"
                    />
                </Dropdown.Trigger>
                {/* TODO: quitar data-theme explicito en light, cuando se rediseñe el componente */}
                <Dropdown.Content
                    customWidth
                    className="bg-neutral-1 w-full rounded-4 p-12 text-14 outline-none z-1"
                    customWrapper={DataTwWrapper}
                    data-theme="light"
                >
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
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}

export default MenuUser;
