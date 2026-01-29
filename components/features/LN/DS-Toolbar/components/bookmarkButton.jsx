import React from 'react';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

function BookmarkButton({
    onToggleBookmark,
    bookmark,
    bookmarkName,
    termicaBookmark
}) {
    if (!termicaBookmark) return null;

    return (
        <Button
            id="btnbookmark"
            isIconOnly
            variant="outline"
            color="secondary"
            title="Guardar nota"
            onClick={() => {
                onToggleBookmark();
                addEventToDataLayerV2({
                    event: 'e_linkclick',
                    action: 'toolbard',
                    category: 'nota',
                    label: bookmark ? 'eliminar_nota_guardada' : 'guardar_nota'
                });
            }}
        >
            <Icon name={bookmarkName} />
        </Button>
    );
}

export default BookmarkButton;
