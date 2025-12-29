import React from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { Spinner } from '@ln/common-ui-spinner';

export function LoadMoreButton({
    clickMoreArticle,
    loading = false,
    name = ''
}) {
    const notesName = name ? `${name.toUpperCase()}` : '';

    return (
        <div className="text-center">
            <Button
                onClick={clickMoreArticle}
                variant="secondary"
                size={40}
                type="button"
                title={`Ver más notas de ${notesName}`}
            >
                {`VER MÁS NOTAS DE ${notesName}`}
                {loading && <Spinner />}
            </Button>
        </div>
    );
}
