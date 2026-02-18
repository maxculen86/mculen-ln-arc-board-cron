import React from 'react';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';

function CommentsButton({ total, handleGoToComments, showButton }) {
    if (!showButton) return null;

    return (
        <Button
            id="btncomments"
            onClick={handleGoToComments}
            title="Ir a los comentarios de la nota"
            isIconOnly
            variant="outline"
            color="secondary"
        >
            <Icon name="chat" />
            <span aria-hidden="true">{total}</span>
        </Button>
    );
}

export default CommentsButton;
