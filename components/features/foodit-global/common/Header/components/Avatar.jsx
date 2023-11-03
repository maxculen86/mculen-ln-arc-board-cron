import React from 'react';
import { Avatar } from '@ln/common-ui-avatar';
import { Dropdown } from '@ln/common-ui-dropdown';
import { Text } from '@ln/common-ui-text';
import { Icon } from '@ln/common-ui-icon';
import {
    Bookmark,
    ArrowRight,
    List,
    Profile,
    Exit
} from '@ln/foodit-ui-assets';

const dropdownList = [
    {
        text: 'Mi recetario',
        icon: <Bookmark />,
        onClick: () => {
            console.log('click');
        }
    },
    {
        text: 'Mi lista de compras',
        icon: <List />,
        onClick: () => {
            console.log('click');
        }
    },
    {
        text: 'Mi cuenta',
        icon: <Profile />,
        onClick: () => {
            console.log('click');
        }
    },
    {
        text: 'Cerrar sesión',
        icon: <Exit />,
        onClick: () => {
            console.log('click');
        }
    }
];

const AvatarRecetas = ({
    className,
    email,
    initials,
    initialsClassName,
    onClick,
    suscription
}) => {
    return (
        <Avatar className={className}>
            <Avatar.Initials className={initialsClassName}>
                {initials}
            </Avatar.Initials>
            <Avatar.MailAndSuscription>
                <Dropdown toggleOn="hover">
                    <Dropdown.Toggle
                        onClick={() => console.log('AVATAR')}
                        className="email-container ai-center roboto-bold text-14"
                    >
                        <Text
                            className="text-ellipsis-1 text-14 roboto-bold uppercase"
                            onClick={onClick}
                        >
                            {email}
                        </Text>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        alignment="right"
                        className="bg-light-1 p-24 rounded-16 shadow-center"
                    >
                        {dropdownList.map(({ icon, onClick, text }) => {
                            return (
                                <li
                                    className="flex ai-center gap-16 py-16 pointer"
                                    key={text}
                                    onClick={onClick}
                                >
                                    <Icon
                                        hasWrapper
                                        size={24}
                                        bgColor="#f2f2f2"
                                    >
                                        {icon}
                                    </Icon>
                                    <Text className="flex-grow-1">{text}</Text>
                                    <Icon size={24} color="dark">
                                        <ArrowRight />
                                    </Icon>
                                </li>
                            );
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                <Text className="text-12 text-light-600">{suscription}</Text>
            </Avatar.MailAndSuscription>
        </Avatar>
    );
};

export default AvatarRecetas;
