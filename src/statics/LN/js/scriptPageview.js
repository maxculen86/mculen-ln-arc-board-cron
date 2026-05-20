import { detectIncognitoMode } from '../../../../components/private/LN/common/utils/incognitoDetector';

const schemaPageView = document.getElementById('pageview');

if (schemaPageView) {
    const pageTypesWithMetarefresh = ['home', 'nota', 'Deportes'];
    const pageTypesWithIncognito = [...pageTypesWithMetarefresh, 'acumulado'];
    const data = JSON.parse(schemaPageView.textContent) || {};
    const updateSchemaPageView = () => {
        schemaPageView.textContent = JSON.stringify(data, null, 2);
    };

    if (pageTypesWithMetarefresh.includes(data.pagetype)) {
        const metarefresh = localStorage.getItem('SchemaPageViewMetaRefresh');
        const metarefreshValue = metarefresh != null ? 'yes' : 'no';
        data.metarefresh = metarefreshValue;
        updateSchemaPageView();
        localStorage.removeItem('SchemaPageViewMetaRefresh');
    }

    if (pageTypesWithIncognito.includes(data.pagetype)) {
        detectIncognitoMode().then(incognito => {
            data.incognito = incognito;
            updateSchemaPageView();
        });
    }
}
