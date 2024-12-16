import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import toggleBookmark from '../../../../private/common/utils/bookmarkHelper';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

function BarrierDeleteNote({
    closeBarrier = () => null,
    bookmarkId,
    deleteArticle,
    substractOne,
    onOperationComplete,
    openToast
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
                        toggleBookmark({
                            isDelete: bookmarkId
                        }).then(({ status, bookmarkContent }) => {
                            if (status === 200) {
                                deleteArticle(bookmarkId);
                                substractOne();
                            }
                            onOperationComplete(status, bookmarkContent);
                            closeBarrier();
                            openToast();
                        });
                    }}
                >
                    confimar
                </Button>
            </div>
        </div>
    );
}

BarrierDeleteNote.propTypes = {
    closeBarrier: PropTypes.func.isRequired,
    bookmarkId: PropTypes.string.isRequired,
    deleteArticle: PropTypes.func.isRequired,
    substractOne: PropTypes.func,
    onOperationComplete: PropTypes.func.isRequired,
    openToast: PropTypes.func.isRequired
};

BarrierDeleteNote.defaultProps = {
    substractOne: null
};

export default BarrierDeleteNote;
