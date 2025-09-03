import React from 'react';

function BodyFooter() {
    return (
        <div className="nota-cards__body-footer">
            {/* Breadcrumb (obligatorio - verde) */}
            <div className="nota-cards__breadcrumb">
                {/* TODO: Integrar componente breadcrumb */}
            </div>

            {/* Pie nota (obligatorio - verde) */}
            <div className="nota-cards__pie-nota">
                {/* TODO: Integrar pie de nota */}
            </div>

            {/* Recomendaciones (obligatorio - verde) */}
            <div className="nota-cards__recomendaciones">
                {/* TODO: Integrar componente de recomendaciones */}
            </div>

            {/* Comentarios (obligatorio - verde) */}
            <div className="nota-cards__comentarios">
                {/* TODO: Integrar sistema de comentarios */}
            </div>
        </div>
    );
}

export default BodyFooter;
