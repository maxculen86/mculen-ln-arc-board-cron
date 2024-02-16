import React, { useContext } from 'react';
import { GlobalContext } from '../../../../../../private/common/context/globalContext';
import { Avatar } from '@ln/contenidos-ui-avatar';
import { Dropdown } from '@ln/common-ui-dropdown';
import { getMenuUser } from '../../_helper';
import { Link } from '@ln/contenidos-ui-link';
import { goToLogout } from '../../../../../../private/LN/common/utils/loginHelper';
import { useHeaderContext } from '../../../context';
import getUserInitials from '../../../../../../private/common/utils/getUserInitials';
import classNames from 'classnames';

import '../../../../../../../resources/packages/css/@ln/common-ui-dropdown/index.css';

export const MenuUser = () => {
    const {
        userType,
        negative,
        userName,
        userEmail,
        userLastName
    } = useHeaderContext();

    const { dispatch } = useContext(GlobalContext);
    const logout = () => goToLogout(dispatch);
    const initials = getUserInitials(userName, userLastName, userEmail);
    const menuUserData = getMenuUser(logout) || [];

    const iconProps = {
        className: classNames(
            'relative top-3',
            { '--light': negative },
            { '--dark': !negative }
        )
    };

    if (userType === 'unlogged') return <></>;
    if (menuUserData.length === 0) return <></>;
    return (
        <Dropdown className="flex cursor-pointer l-only pt-4" toggleOn="hover">
            <Dropdown.Toggle gap={0} iconProps={iconProps}>
                <Avatar
                    email={userEmail}
                    initials={initials}
                    negative={negative}
                    variant={userType}
                />
            </Dropdown.Toggle>
            <Dropdown.Menu
                alignment="center"
                className="bg-light-0 rounded-4 shadow-center min-w-100"
            >
                <ul className="p-12 text-14">
                    {menuUserData.map(
                        ({
                            url,
                            text,
                            title,
                            callback,
                            dataEvent,
                            dataSection,
                            target,
                            className
                        }) => (
                            <li className={className} key={text}>
                                <Link
                                    onMouseDown={callback}
                                    href={url}
                                    unstyled
                                    data-event={dataEvent}
                                    data-section={dataSection}
                                    title={title}
                                    target={target}
                                >
                                    {text}
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            </Dropdown.Menu>
        </Dropdown>
    );
};
