import source, { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import { resizerSecret, resizerUrl } from 'fusion:environment'


const transform = (data, presets) => {
    return addResizedUrls(data, { resizerUrl, resizerSecret, presets })
}

export default {
    ...source,
    transform
}