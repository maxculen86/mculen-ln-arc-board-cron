import React from 'react';
import '../../../../../resources/dist/css/ln/modules/mod-keepreading.css';
import CajaTema from '../../common/cajaTema';

function Index({ relatedContent = [], outputType = 'default' }) {
    return (
        <CajaTema
            title="Seguí leyendo"
            sectionName="SeguiLeyendo"
            articles={relatedContent}
            outputType={outputType}
            withVolanta
        />
    );
}

export default Index;
