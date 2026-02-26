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
    const textCondition = bookmark ? 'Guardado' : 'Guardar';

    if (!termicaBookmark) return null;

    return (
        <Button
            id="btnbookmark"
            variant="outline"
            size="custom"
            color="black"
            className="h-40 w-40 md:w-fit rounded-4 px-8 py-12 md:px-12"
            title="Guardar nota"
            textTransform="none"
            onClick={() => {
                onToggleBookmark();
                addEventToDataLayerV2({
                    event: 'e_linkclick',
                    action: 'toolbard',
                    category: 'nota',
                    label: bookmark ? 'eliminar_nota_guardada' : 'guardar_nota'
                });
            }}
            iconLeft={<Icon name={bookmarkName} size={20} />}
        >
            <span className="max-md:hidden text-label-sm">{textCondition}</span>
        </Button>
    );
}

export default BookmarkButton;
