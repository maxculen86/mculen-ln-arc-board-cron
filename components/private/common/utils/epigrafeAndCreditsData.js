const epigrafeAndCreditsData = data => {
    const { credits, distributor } = data;
    const creditoss =
        credits && credits.by
            ? credits.by.length > 1
                ? 'Créditos'
                : 'Crédito'
            : '';
    const distributors =
        distributor && distributor.name !== ''
            ? `Fuente: ${distributor.name ? distributor.name : 'LA NACION'}`
            : '';
    const semicolon =
        distributor && distributor.name !== '' && credits.by !== undefined
            ? ' - '
            : '';
    const creditos =
        credits &&
        credits.by !== undefined &&
        (credits
            ? credits.by.map((credito, i) => {
                  const totalCredits = `${i === 0 ? `${creditoss}: ` : ''}${
                      credito.type === 'author'
                          ? credito.name
                          : credito.referent.id
                  }`;
                  return totalCredits;
              })
            : '');
    // TODO: vanity_credits - es un campo opcional que vi que agrego datos de creditos una vez
    /* const vanityCreditos =
        data.vanity_credits &&
        data.vanity_credits.affiliation.length &&
        (data.credits
            ? data.vanity_credits.by.map((credito, i) => {
                  const totalVanityCredits = `${i === 0 ? `credits: ` : ', '}${
                      credito.type === 'author'
                          ? credito.name
                          : credito.referent.id
                  }`;
                  return totalVanityCredits;
              })
            : ''); */
    const fuenteCredito = `${distributors}${semicolon}${
        credits && credits.by ? creditos : ''
    }`;
    return fuenteCredito;
};

export default epigrafeAndCreditsData;
