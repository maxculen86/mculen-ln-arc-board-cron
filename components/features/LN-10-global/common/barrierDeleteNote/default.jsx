import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import toggleBookmark, {
    getStatusMessage
} from '../../../../private/common/utils/bookmarkHelper';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import renderToasts from '../../../ui/ln/toastsContainer/renderToast';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

function BarrierDeleteNote({
    closeBarrier = () => null,
    bookmarkId,
    deleteArticle,
    substractOne = null
}) {
    return (
        <div className="barrier flex flex-column jc-center ai-center rounded-4 w-328 bg-light-50 m-16 py-16 px-20">
            <Button
                onClick={closeBarrier}
                title="Cerrar"
                className="as-flex-end mb-24"
                size="inherit"
                iconOnly
            >
                <IconSprite name="close" />
            </Button>
            <div className="flex jc-center ai-center rounded-circle w-40 h-40 bg-orange-200 mb-24">
                <Icon size={16}>
                    <IconSprite name="warning" fill="#C6480C" />
                </Icon>
            </div>
            <div className="description text-center mb-16">
                <p className="--font-primary --l --font-medium">
                    <strong>Borrar nota guardada</strong>
                </p>
                <p>La nota se eliminará del listado.</p>
            </div>
            <div className="interaction-container w-100 text-center flex jc-between px-8">
                <Button
                    onClick={closeBarrier}
                    variant="secondary"
                    title="Cancelar"
                >
                    cancelar
                </Button>
                <Button
                    id="confirm-button-note"
                    variant="primary"
                    title="Confirmar"
                    onClick={() => {
                        addEventToDataLayerV2({
                            event: 'e_linkclick',
                            action: 'toolbard',
                            category: 'nota_ln9',
                            label: 'eliminar_nota_guardada'
                        });
                        toggleBookmark({
                            isDelete: bookmarkId
                        }).then(({ status, bookmarkContent }) => {
                            if (status === 200) {
                                deleteArticle(bookmarkId);
                                substractOne();
                            }
                            closeBarrier();
                            const toastConfig = getStatusMessage(
                                status,
                                bookmarkContent
                            );
                            renderToasts(toastConfig);
                        });
                    }}
                >
                    confimar
                </Button>
            </div>
        </div>
    );
}

export default BarrierDeleteNote;
