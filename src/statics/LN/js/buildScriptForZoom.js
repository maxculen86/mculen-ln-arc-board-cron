import {
    FOTOAL100,
    STORYTELLING
} from '../../../../components/private/common/utils/subtypes/subtypeHelper';

const getWidthForZoomEvaluation = (subtype, width) => {
    if (subtype === FOTOAL100 || subtype === STORYTELLING) {
        return 768;
    }
    return width;
};

const subtype = document
    .getElementById('script-build-zoom')
    .getAttribute('data-subtype');

const width = Number(
    document.getElementById('script-build-zoom').getAttribute('data-width')
);

const idMedia = document
    .getElementById('script-build-zoom')
    .getAttribute('data-id-media');

window.addEventListener('DOMContentLoaded', event => {
    const zoom =
        document.documentElement.clientWidth <
        getWidthForZoomEvaluation(subtype, width);
    const modMedia = document.getElementById(idMedia);
    if (zoom && modMedia) {
        const figure = modMedia.querySelector('.mod-figure');
        modMedia.classList.add('--zoom');
        figure.addEventListener('click', event => {
            if (!document.body.classList.contains('--no-scroll')) {
                document.body.classList.add('--no-scroll');
                modMedia.classList.add('--active');
            } else {
                document.body.classList.remove('--no-scroll');
                modMedia.classList.remove('--active');
            }
        });
    }
});
