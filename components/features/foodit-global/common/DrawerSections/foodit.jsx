import React, { useEffect, useState } from 'react';
import { Drawer, drawerManager } from '@ln/ds-common-drawer';
import { Formcontrol } from '@ln/ds-common-formcontrol';
import { Button } from '@ln/ds-common-button';
import { addToast, TOAST } from '../bookmark/api/_helper';
import { DRAWERS_ID } from './helpers';
import { getAuthTokens } from '../../../../private/common/auth/helper/loginHelper';
import { postNewsletter } from '../Newsletter/helpers/helpers';
import { pushFooditEvent } from '../utils/pushFooditEvent';

function DrawerSections() {
    const [selectedNewsletters, setSelectedNewsletters] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const handleNewsletterSelection = e => {
            const { id, title, selected, category } = e.detail || {};

            if (!id) return;

            setSelectedNewsletters(prev => {
                if (selected) {
                    const alreadyExists = prev.some(item => item.id === id);

                    if (alreadyExists) return prev;

                    return [...prev, { id, title, category }];
                }

                return prev.filter(item => item.id !== id);
            });
        };

        window.addEventListener(
            'newsletterSelected',
            handleNewsletterSelection
        );

        return () => {
            window.removeEventListener(
                'newsletterSelected',
                handleNewsletterSelection
            );
        };
    }, []);

    useEffect(() => {
        if (selectedNewsletters.length > 0) {
            drawerManager.show(DRAWERS_ID.SECTIONS);
        } else {
            drawerManager.hide(DRAWERS_ID.SECTIONS);
            setEmail('');
        }
    }, [selectedNewsletters]);

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    const drawerTitle =
        selectedNewsletters.length === 1
            ? `Seleccionaste ${selectedNewsletters[0].title}:`
            : `Seleccionaste ${selectedNewsletters.length} newsletters:`;

    const buttonText =
        selectedNewsletters.length === 1
            ? 'Recibir newsletter'
            : 'Recibir newsletters';

    const handleDrawer = async () => {
        try {
            const { accessToken, token } = await getAuthTokens();
            const resp = await postNewsletter({
                accessToken,
                token,
                add: selectedNewsletters.map(item => item.id),
                email
            });

            if (resp.ok) {
                selectedNewsletters.forEach(({ title, category }) => {
                    pushFooditEvent({
                        event: 'e_linkclick',
                        action: 'newsletter',
                        category,
                        label: title
                    });
                });

                addToast({
                    variant: TOAST.SUCCESS.VARIANT,
                    title: TOAST.SUCCESS.TITLE,
                    message: TOAST.SUCCESS.MESSAGE.SEND_NEWSLETTER
                });
            }
        } catch (error) {
            console.error(
                'Error occurred while subscribing to newsletter by mail:',
                error.message
            );
            addToast({
                variant: TOAST.ERROR.VARIANT,
                title: TOAST.ERROR.TITLE,
                message: TOAST.ERROR.MESSAGE.GENERIC
            });
        } finally {
            drawerManager.hide(DRAWERS_ID.SECTIONS);
            setEmail('');
            setSelectedNewsletters([]);
        }
    };

    const handleChange = e => {
        setEmail(e.target.value);
    };

    return (
        <Drawer
            disableClose
            enableBodyScroll
            id={DRAWERS_ID.SECTIONS}
            position="bottom"
        >
            <Drawer.Portal>
                <div data-tw>
                    <Drawer.Content className="bg-neutral-999 max-h-[260px] xl:max-h-[295px] mx-auto">
                        <Drawer.Body className="flex items-center overflow-hidden">
                            <div className="flex flex-col gap-24 gap-24 md:py-16 w-full max-w-[488px] md:min-w-[472px] xl:max-w-[456px] mx-auto">
                                <p className="text-base-foreground text-heading-sm font-primary font-semibold">
                                    {drawerTitle}
                                </p>
                                <Formcontrol className="rounded-sm bg-white text-base-default">
                                    <Formcontrol.Input
                                        type="email"
                                        className="text-base-default"
                                        placeholder="Ingresá el mail"
                                        value={email}
                                        onChange={handleChange}
                                    />
                                </Formcontrol>
                                <div>
                                    <Button
                                        rounded="custom"
                                        variant="solid"
                                        className="bg-subscription-default rounded-[4px]"
                                        disabled={
                                            !isEmailValid ||
                                            selectedNewsletters.length === 0
                                        }
                                        onClick={handleDrawer}
                                    >
                                        <p className="text-subscription-foreground">
                                            {buttonText}
                                        </p>
                                    </Button>
                                </div>
                            </div>
                        </Drawer.Body>
                    </Drawer.Content>
                </div>
            </Drawer.Portal>
        </Drawer>
    );
}

export default DrawerSections;
