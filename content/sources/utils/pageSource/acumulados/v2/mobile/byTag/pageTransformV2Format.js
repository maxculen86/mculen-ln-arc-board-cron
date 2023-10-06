const pageTransformV2Format = resultPageData => {
    const metadata = {
        paginate: true
    };

    return {
        metadata,
        items: [...resultPageData]
    };
};

export default pageTransformV2Format;
