import React from 'react';
import { useAppContext } from 'fusion:context';
import { Subtypes } from '../../../common/utils/subtypes/subtypeHelper';

const dataLayer = props => {
    const { globalContent } = props;
    const { contextPath, deployment } = useAppContext();

    const {
        content_restrictions: contentRestrictions,
        subtype: _subtype,
        _id
    } = globalContent;
    const valor =
        (contentRestrictions && contentRestrictions.content_code) || 'comun';
    const pageType = 'nota';
    const pageTypeText = 'nota';
    const subtype = Subtypes.find(sub => sub.id === _subtype);

    const scriptPath =
        subtype && subtype.nombre === 'Receta'
            ? 'scriptDataLayerReceta'
            : 'scriptDataLayerNota';

    return (
        <script
            async
            id="scriptDataLayerNota"
            type="text/javascript"
            data-id={_id}
            data-valor={valor}
            data-page-type={pageType}
            data-page-type-text={pageTypeText}
            data-subtype={JSON.stringify(subtype)}
            src={deployment(
                `${contextPath}/resources/js/LN/${scriptPath}.min.js`
            )}
        />
    );
};

export default dataLayer;
