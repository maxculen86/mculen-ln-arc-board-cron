import React, { useEffect, useState } from 'react';
import { Dropdown } from '@ln/common-ui-dropdown';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import { socials } from './socials';

export function ShareFoodit({
    type,
    title,
    onClickShare,
    article,
    IconButton
}) {
    const [hasNavigator, setHasNavigator] = useState(false);
    const socialList = socials;

    useEffect(() => {
        const canShare = Boolean(navigator?.canShare && navigator.share);
        setHasNavigator(canShare);
    }, []);
    if (hasNavigator) {
        return (
            <Button
                key={type}
                title={title}
                variant="link"
                onClick={() => onClickShare(article)}
            >
                <Icon size={24}>{IconButton}</Icon>
            </Button>
        );
    }

    return (
        <Dropdown hideArrow className="flex" title={title}>
            <Dropdown.Toggle className="text-light-800 text-accent-lechuga__hover">
                <Icon size={24}>{IconButton}</Icon>
            </Dropdown.Toggle>
            <Dropdown.Menu
                alignment="right"
                className="bg-light-1 p-24 rounded-4 shadow-center"
            >
                <ul className="w-202">
                    {socialList.map(
                        ({
                            type: typeSocial,
                            onClick,
                            title: titleSocial,
                            text,
                            icon
                        }) => (
                            <Itemcard
                                type={typeSocial}
                                onClick={() => {
                                    onClick({ article });
                                }}
                                title={titleSocial}
                                text={text}
                                icon={icon}
                                key={text}
                            />
                        )
                    )}
                </ul>
            </Dropdown.Menu>
        </Dropdown>
    );
}
export default ShareFoodit;
