const epigrafeAndCreditsData = data => {
    const { credits, additional_properties: additionalProperties } = data || {};
    const { iptc_source: iptcSource } = additionalProperties || {};

    const creditos =
        credits && credits.by !== undefined
            ? credits.by.map(credito => {
                  const creditName = credito.name !== '' ? credito.name : '';
                  const totalCredits =
                      credito.type === 'author'
                          ? creditName
                          : credito.referent.id;
                  return totalCredits;
              })
            : null;
    const cred = (creditos && creditos.filter(el => el !== '')) || [];

    const semicolon =
        iptcSource !== undefined && iptcSource !== '' && cred.length > 0
            ? ' - '
            : '';
    const fuente =
        iptcSource !== undefined && iptcSource !== '' ? iptcSource : '';
    const fuenteCredito = `${cred || ''}${semicolon}${fuente}`;
    return fuenteCredito;
};

export default epigrafeAndCreditsData;
