const bannerConfigType = ({
    bannerConfig,
    slotGroup,
    bannerInPB,
    device,
    bannersInBody,
    suffix,
    bannersToLoadFromDOM,
    bannersInGrillaNotas
}) => {
    if (
        (bannerConfig.type === 'LN-nota/cuerpo' ||
            bannerConfig.type === 'LN-nota/body') &&
        slotGroup === 'nota'
    ) {
        Object.keys(bannerInPB)
            .filter(value => value.includes(device))
            .forEach(value => {
                const bannerSetInBody = bannerInPB[value] || '';

                return (
                    !bannersInBody.includes(bannerSetInBody) &&
                    bannerSetInBody.search(suffix) > -1 &&
                    Object.keys(bannersToLoadFromDOM).find(
                        i => bannersToLoadFromDOM[i].opt_div === bannerSetInBody
                    ) &&
                    bannersInBody.push(bannerSetInBody)
                );
            });
    }

    if (
        bannerConfig.type === 'LN-acumulado/grillaNotas' &&
        slotGroup === 'acumulado'
    ) {
        Object.keys(bannerInPB)
            .filter(value => value.includes(device))
            .forEach(value => {
                const bannerSetInGrilla = bannerInPB[value] || '';

                return (
                    !bannersInGrillaNotas.includes(bannerSetInGrilla) &&
                    bannerSetInGrilla.search(suffix) > -1 &&
                    Object.keys(bannersToLoadFromDOM).find(
                        i =>
                            bannersToLoadFromDOM[i].opt_div ===
                            bannerSetInGrilla
                    ) &&
                    bannersInGrillaNotas.push(bannerSetInGrilla)
                );
            });
    }
};

export default bannerConfigType;
