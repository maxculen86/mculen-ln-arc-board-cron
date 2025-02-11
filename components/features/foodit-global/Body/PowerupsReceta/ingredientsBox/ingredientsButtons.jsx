import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Text } from '@ln/common-ui-text';
import PropTypes from 'prop-types';
import { useDisclosure } from '@ln/hooks';
import useGetUserConfig from '../../../hooks/useGetUserConfig';
import { DialogFoodit } from '../../../common/DialogFoodit/foodit';

export function IngredientsButtons({
    currentPortion = 0,
    portions = 0,
    setCurrentPortion = () => {},
    showButtonsConversor = true,
    bookmarkId
}) {
    const { isSubscribed, userType } = useGetUserConfig();
    const { isOpen, onOpen, onClose } = useDisclosure(false);

    const pressButton = option => {
        if (!isSubscribed) {
            onOpen();
            return;
        }

        if (option === 'add') {
            setCurrentPortion(prev => prev + 1);
        } else if (option === 'subtract' && currentPortion > Number(portions)) {
            setCurrentPortion(prev => prev - 1);
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
                    disabled={bookmarkId}
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
IngredientsButtons.propTypes = {
    currentPortion: PropTypes.number.isRequired,
    portions: PropTypes.number.isRequired,
    setCurrentPortion: PropTypes.func.isRequired,
    showButtonsConversor: PropTypes.bool.isRequired,
    bookmarkId: PropTypes.oneOf(PropTypes.string, null).isRequired
};
