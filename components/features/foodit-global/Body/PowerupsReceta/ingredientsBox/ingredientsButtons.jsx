import React, { useRef } from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Text } from '@ln/common-ui-text';
import { useDisclosure } from '@ln/hooks';
import useGetUserConfig from '../../../hooks/useGetUserConfig';
import { DialogFoodit } from '../../../common/DialogFoodit/foodit';
import { pushFooditEvent } from '../../../common/utils/pushFooditEvent';

export function IngredientsButtons({
    currentPortion = 0,
    portions = 0,
    setCurrentPortion = () => {},
    showButtonsConversor = true,
    bookmarkId
}) {
    const { isSubscribed, userType } = useGetUserConfig();
    const { isOpen, onOpen, onClose } = useDisclosure(false);
    const hasTrackedPortion = useRef(false);

    const initialPortion = portions;

    const trackPortionChange = () => {
        if (!hasTrackedPortion.current) {
            pushFooditEvent({
                event: 'e_linkclick',
                category: 'interaction',
                label: 'Receta',
                action: 'Cambio_porciones'
            });

            hasTrackedPortion.current = true;
        }
    };

    const pressButton = option => {
        if (!isSubscribed) {
            onOpen();
            return;
        }

        const shouldChange =
            option === 'add' ||
            (option === 'subtract' && currentPortion > Number(portions));

        if (shouldChange) {
            trackPortionChange();
            setCurrentPortion(prev => (option === 'add' ? prev + 1 : prev - 1));
        }
    };

    return (
        <div className="flex ai-center gap-8">
            <DialogFoodit
                isOpen={isOpen}
                onClose={onClose}
                isSubscribed={isSubscribed}
                userType={userType}
            />
            {showButtonsConversor && (
                <Button
                    className="max-w-32 max-h-32 text-16"
                    variant="secondary"
                    rounded="rounded-circle"
                    title="sacar"
                    onClick={() => pressButton('subtract')}
                    disabled={bookmarkId || currentPortion === initialPortion}
                >
                    -
                </Button>
            )}
            <Text className="roboto-bold text-12 text-14_md">
                {currentPortion}
            </Text>
            {showButtonsConversor && (
                <Button
                    className="max-w-32 max-h-32 text-16"
                    variant="secondary"
                    rounded="rounded-circle"
                    title="agregar"
                    onClick={() => pressButton('add')}
                    disabled={bookmarkId}
                >
                    +
                </Button>
            )}
        </div>
    );
}
