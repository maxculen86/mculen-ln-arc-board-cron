const pageTransformV2Format = (resultPageData, sectionData) => {
    const metadata = {
        pagination: true,
        title: sectionData ? sectionData.aliasTitle : null,
        category: {
            slug: sectionData ? sectionData.slug : null,
            value: sectionData ? sectionData.aliasTitle : null
        }
    };

    return {
        metadata,
        items: [...(resultPageData && resultPageData)]
    };
};

export default pageTransformV2Format;
