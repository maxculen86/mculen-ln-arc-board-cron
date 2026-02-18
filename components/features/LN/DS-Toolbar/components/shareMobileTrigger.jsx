import React from 'react';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';
import { ShareCustomGhostButton } from './shareDesktopTrigger';
import { handleShareNativeTrigger } from '../_helpers';

function ShareMobileTrigger({ shareNativeTrigger, title, noteId }) {
    const handleClick = () => {
        handleShareNativeTrigger({ shareNativeTrigger, noteId, title });
    };

    return (
        <>
            <Button
                isIconOnly
                title="Compartir"
                variant="outline"
                color="secondary"
                className="md:hidden"
                onClick={handleClick}
            >
                <Icon name="reply" />
            </Button>
            <button
                type="button"
                onClick={handleClick}
                className="hidden md:block xl:hidden"
            >
                <ShareCustomGhostButton />
            </button>
        </>
    );
}

export default ShareMobileTrigger;
