const pageTransformV2Format = (resultPageData, sectionData) => {
    const metadata = {
        paginate: false,
        title: sectionData.title,
        category: {
            slug: sectionData.slug,
            value: sectionData.title
        }
    };

    return {
        metadata,
        items: [...resultPageData]
    };
};

export default pageTransformV2Format;
