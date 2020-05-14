const hasAdsTestParam = () => {
    const urlParams = new URLSearchParams(window.location.search) || {};
    return urlParams.get('adstest') === 'true' ? 'true' : 'false';
};

export default hasAdsTestParam;
