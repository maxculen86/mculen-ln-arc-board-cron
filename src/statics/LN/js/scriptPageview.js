const schemaPageView = document.getElementById('pageview');

if (schemaPageView) {
    const pageTypesList = ['home', 'nota', 'Deportes'];
    const data = JSON.parse(schemaPageView.textContent) || {};

    if (pageTypesList.includes(data.pagetype)) {
        const metarefresh = localStorage.getItem('CDmetaRefresh');
        const metarefreshValue = metarefresh != null ? 'yes' : 'no';
        data.metarefresh = metarefreshValue;
        schemaPageView.textContent = JSON.stringify(data, null, 2);
    }
}
