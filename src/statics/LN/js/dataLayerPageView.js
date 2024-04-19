window.dataLayer = window.dataLayer || [];

const scriptDataLayer = document.getElementById('scriptDataLayerPageView');

const {
    id,
    url,
    section,
    subSection,
    category,
    category2,
    publishedDay,
    publishedTime,
    title,
    authorName,
    authorUrl,
    contentType,
    valor
} = scriptDataLayer.dataset;

window.dataLayer.push({
    event: 'page_view',
    ...(url && { page_location: url }),
    ...(section && { seccion: section }),
    ...(subSection && { sub_section: subSection }),
    ...(category && { category }),
    ...(category2 && { category2 }),
    ...(contentType && { content_type: contentType }),
    ...(publishedTime && { date_published_time: publishedTime }),
    ...(publishedDay && { date_published_day: publishedDay }),
    ...(title && { title }),
    ...(id && { nota_id_arc: id }),
    ...(authorName && { autor_nombre: authorName }),
    ...(authorUrl && { autor_url: authorUrl }),
    ...(valor && { valor })
});
