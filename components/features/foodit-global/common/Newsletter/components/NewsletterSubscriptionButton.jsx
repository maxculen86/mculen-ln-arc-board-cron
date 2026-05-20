import React, { useEffect, useState } from 'react';
import { NewsletterActionButton } from './NewsletterActionButtons';
import { addToast, TOAST } from '../../bookmark/api/_helper';
import { getAuthTokens } from '../../../../../private/common/auth/helper/loginHelper';
import { postNewsletter } from '../helpers/helpers';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';

export function NewsletterSubscriptionButton({
    id,
    suscribed,
    title,
    category
}) {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        setSelected(suscribed);
    }, [suscribed]);

    const handleClick = async () => {
        const isSubscribing = !selected;

        try {
            const { accessToken, token } = await getAuthTokens();
            const add = isSubscribing ? [id] : [];
            const remove = isSubscribing ? [] : [id];

            const resp = await postNewsletter({
                accessToken,
                token,
                add,
                remove
            });

            if (resp.ok) {
                setSelected(!selected);

                if (isSubscribing) {
                    addEventToDataLayerV2({
                        event: 'e_linkclick',
                        action: 'newsletter',
                        category,
                        label: title
                    });
                }

                addToast({
                    variant: TOAST.SUCCESS.VARIANT,
                    title: TOAST.SUCCESS.TITLE,
                    message: isSubscribing
                        ? TOAST.SUCCESS.MESSAGE.SEND_NEWSLETTER
                        : TOAST.SUCCESS.MESSAGE.UNSUBSCRIBE_NEWSLETTER
                });
            }
        } catch (error) {
            console.error(
                'Error occurred while subscribing to newsletter:',
                error.message
            );

            addToast({
                variant: TOAST.ERROR.VARIANT,
                title: TOAST.ERROR.TITLE,
                message: TOAST.ERROR.MESSAGE.GENERIC
            });
        }
    };

    return (
        <NewsletterActionButton
            selected={selected}
            onClick={handleClick}
            labelOn="Recibiendo"
            labelOff="Recibir newsletter"
        />
    );
}
