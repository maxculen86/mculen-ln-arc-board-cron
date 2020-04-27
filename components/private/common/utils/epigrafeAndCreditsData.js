const epigrafeAndCreditsData = data => {
    const credits = data.credits.by
        ? data.credits.by.length > 1
            ? 'Créditos'
            : 'Crédito'
        : '';
    const distributors =
        data.distributor && data.distributor.name !== ''
            ? `Fuente: ${
                  data.distributor.name ? data.distributor.name : 'LA NACION'
              }`
            : '';
    const semicolon =
        data.distributor &&
        data.distributor.name !== '' &&
        data.credits.by !== undefined
            ? ' - '
            : '';
    const creditos =
        data.credits &&
        data.credits.by !== undefined &&
        (data.credits
            ? data.credits.by.map((credito, i) => {
                  const totalCredits = `${i === 0 ? `${credits}: ` : ''}${
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
        data.credits && data.credits.by ? creditos : ''
    }`;
    return fuenteCredito;
};

export default epigrafeAndCreditsData;
