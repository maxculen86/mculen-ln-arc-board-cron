import dataLayerScriptNotaAmp from '../LN/nota/dataLayer/dataLayerScriptNotaAmp';

const config = {
    OTT: {},
    'la-nacion-ar': {
        'LN-nota-receta': dataLayerScriptNotaAmp,
        'LN-nota-noticia': dataLayerScriptNotaAmp,
        'LN-nota-storytelling': dataLayerScriptNotaAmp,
        'LN-nota-infografia': dataLayerScriptNotaAmp,
        'LN-nota-html-libre': dataLayerScriptNotaAmp,
        'LN-nota-foto-al-100': dataLayerScriptNotaAmp,
        'LN-nota-opta': dataLayerScriptNotaAmp,
        'LN-nota-video': dataLayerScriptNotaAmp
    }
};

const dataLayerIndexAmp = (arcSite, layout, globalContent) => {
    const sitio = config[arcSite];
    if (!sitio) return null;

    const dataLayerScript = sitio[layout];

    if (!dataLayerScript) return null;

    return dataLayerScript(globalContent);
};

export default dataLayerIndexAmp;
