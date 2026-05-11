import dispatchAdsRequest from './dispatchAdsRequest';

const createAdsObserver = (bannersList = [], options = {}) => {
    let batchQueue = [];
    let batchTimeout = null;

    const processBatch = () => {
        if (batchQueue.length === 0) return;
        dispatchAdsRequest(batchQueue, options);
        batchQueue = [];
    };

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const data = bannersList.find(
                        b => b.opt_div === entry.target.id
                    );

                    if (data) {
                        batchQueue.push(data);
                        observer.unobserve(entry.target);

                        clearTimeout(batchTimeout);
                        batchTimeout = setTimeout(processBatch, 50);
                    }
                }
            });
        },
        { rootMargin: '200px 0px', threshold: 0.01 }
    );

    bannersList?.forEach(banner => {
        if (banner.ref) {
            observer.observe(banner.ref);
        }
    });
};

export default createAdsObserver;
