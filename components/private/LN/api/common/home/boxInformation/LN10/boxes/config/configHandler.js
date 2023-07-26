export const attachBanners = (box, sectionAlias, allBanners) => {
    if (!box || !allBanners || !sectionAlias) return box;

    const bannerToAttach = allBanners.find(
        banner => banner.sectionAliasMobile === sectionAlias
    );

    if (!bannerToAttach) return box;

    return { ...box, banner: bannerToAttach.banner };
};

export default attachBanners;
