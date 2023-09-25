const pageTransformV2Format = resultPageData => {
    const metadata = {
        paginate: false
    };

    return {
        metadata,
        items: [...(resultPageData && resultPageData)]
    };
};

export default pageTransformV2Format;
