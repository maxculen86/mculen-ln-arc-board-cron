window.dataLayer = window.dataLayer || [];

const scriptDataLayerHome = document.getElementById('scriptDataLayerHome');
const section = scriptDataLayerHome.getAttribute('data-section');

const pageType = section === '/deportes' ? 'Deportes' : 'home';

metarefresh = localStorage.getItem('CDmetaRefresh');

metarefresh = metarefresh != null ? 'yes' : 'no';

if (metarefresh === 'yes') {
    localStorage.removeItem('CDmetaRefresh');
}

window.dataLayer.push({
    metarefresh: metarefresh,
    pagetype: `${pageType}`
});
