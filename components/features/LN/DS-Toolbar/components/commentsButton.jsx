import React from 'react';
import { cx } from '@ln/ds-cva';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';

function CommentsButton({ total, handleGoToComments, showButton }) {
    if (!showButton) return null;

    return (
        <Button
            id="btncomments"
            onClick={handleGoToComments}
            title="Ir a los comentarios de la nota"
            iconLeft={<Icon name="chat" />}
            size="custom"
            variant="outline"
            className={cx(
                'overflow-visible h-40 w-40 md:w-fit rounded-4 px-8 py-12 ',
                Boolean(total) && 'md:px-12'
            )}
            color="black"
        >
            {total && (
                <span className="absolute top-[-5px] right-[-5px] bg-base-foreground pl-2 md:relative md:top-0 md:right-0 text-10 md:text-14">
                    {total}
                </span>
            )}
        </Button>
    );
}

export default CommentsButton;
