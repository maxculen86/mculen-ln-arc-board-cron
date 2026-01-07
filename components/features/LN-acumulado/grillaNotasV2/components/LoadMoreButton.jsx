import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ln/common-ui-button';

export function LoadMoreButton({ clickMoreArticle, loading = false, name }) {
    const notesName = name ? `${name.toUpperCase()}` : '';

    return (
        <div className="text-center">
            <Button
                onClick={clickMoreArticle}
                variant="secondary"
                size={40}
                loading={loading}
                type="button"
                title={`Ver más notas de ${notesName}`}
            >
                {`VER MÁS NOTAS DE ${notesName}`}
            </Button>
        </div>
    );
}

LoadMoreButton.propTypes = {
    clickMoreArticle: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    name: PropTypes.string
};

LoadMoreButton.defaultProps = {
    loading: false,
    name: ''
};
