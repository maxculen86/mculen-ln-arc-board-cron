const SECTION_ALIAS_CAJAPROMO = 'ln_ds_cajapromo';
const CONTENT_TYPE_PODCAST = 'podcast';
const filterCajaPromoPodcast = elementsPage => {
    if (!Array.isArray(elementsPage)) return elementsPage;
    return elementsPage.filter(
        element =>
            !(
                element?.type === 8 &&
                element.sectionAliasMobile === SECTION_ALIAS_CAJAPROMO &&
                element?.information?.contentType === CONTENT_TYPE_PODCAST
            )
    );
};

export const filterCajaPromo = {
    'LN10-Home_Main': filterCajaPromoPodcast
};
