const epigrafeAndCreditsData = data => {
    const { credits, additional_properties: additionalProperties } = data;
    const { iptc_source: iptcSource } = additionalProperties || {};
    const creditos =
        credits &&
        credits.by !== undefined &&
        (credits
            ? credits.by.map((credito, i) => {
                  const totalCredits = `${
                      credito.type === 'author'
                          ? credito.name
                          : credito.referent.id
                  }`;
                  return totalCredits;
              })
            : '');
    const semicolon =
        iptcSource !== undefined &&
        iptcSource !== '' &&
        credits.by !== undefined
            ? ' - '
            : '';
    const fuente =
        iptcSource !== undefined && iptcSource !== '' ? iptcSource : '';
    const fuenteCredito = `${
        credits && credits.by ? creditos : ''
    }${semicolon}${fuente}`;
    return fuenteCredito;
};

export default epigrafeAndCreditsData;
