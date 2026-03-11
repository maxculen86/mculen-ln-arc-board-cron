import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Dropdown } from '@ln/common-ui-dropdown';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import { useDisclosure } from '@ln/hooks';
import IconSprite from '../../../../../private-global/common/iconSprite/IconSprite';
import OptionEdit from './OptionEdit';
import OptionDelete from './OptionDelete';
import deleteWeeklyMenu from '../../../bookmark/api/menuDelete';

function DropdownToggle(props) {
    return (
        <Button
            variant="secondary"
            size={{ sm: 32, md: 40 }}
            title="ver opciones"
            iconOnly
            {...props}
        >
            <Icon size={16}>
                <IconSprite className="sm-none" name="more-horizontal" />
                <IconSprite className="sm-only" name="more-vertical" />
            </Icon>
        </Button>
    );
}

export function MenuOptions({
    articleId,
    bookmarkId,
    weeklyMenu,
    setWeeklyMenu,
    subscription
}) {
    const modals = { edit: useDisclosure(false), del: useDisclosure(false) };

    const { isOpen: edit, onOpen: openEdit, onClose: closeEdit } = modals.edit;
    const { isOpen: del, onOpen: openDel, onClose: closeDel } = modals.del;

    const actionModal = [
        {
            icon: <IconSprite name="edit" />,
            text: 'Editar',
            variant: 'default',
            type: 'button',
            onClick: () => {
                openEdit();
            }
        },
        {
            icon: <IconSprite name="delete" />,
            text: 'Eliminar',
            variant: 'danger',
            type: 'button',
            onClick: () => {
                openDel();
            }
        }
    ];

    return (
        <>
            <Dropdown hideArrow className="ml-auto ml-0_md">
                <Dropdown.Toggle
                    className="text-light-800 text-accent-lechuga__hover"
                    as={DropdownToggle}
                />
                <Dropdown.Menu
                    alignment="right"
                    className="bg-light-1 p-24 rounded-4 shadow-center"
                >
                    <ul className="w-202">
                        {actionModal.map(
                            ({ text, icon, variant, type, onClick }) => (
                                <Itemcard
                                    key={text}
                                    icon={icon}
                                    text={text}
                                    variant={variant}
                                    type={type}
                                    onClick={onClick}
                                />
                            )
                        )}
                    </ul>
                </Dropdown.Menu>
            </Dropdown>
            <OptionEdit
                articleId={articleId}
                bookmarkId={bookmarkId}
                weeklyMenu={weeklyMenu}
                setWeeklyMenu={setWeeklyMenu}
                isOpen={edit}
                onOpen={openEdit}
                onClose={closeEdit}
                subscription={subscription}
            />
            <OptionDelete
                items={weeklyMenu}
                setItems={setWeeklyMenu}
                deleteFunction={() => deleteWeeklyMenu({ bookmarkId })}
                filterKey="bookmarkId"
                isOpen={del}
                onClose={closeDel}
                bookmarkId={bookmarkId}
                messageType="menu"
            />
        </>
    );
}
