import React from 'react';
import MediaBase from '../../media';
import ComFigcaption from '../../../../common/com-figcaption';
import ComText from '../../../../common/com-text';

export default function galleryItem({
    mediaData,
    galleryOrder,
    totalGallery,
    withZoom
}) {
    const credits = mediaData.credits
        ? mediaData.credits.by.length > 1
            ? 'Créditos'
            : 'Crédito'
        : '';
    const distributors =
        mediaData.distributor && mediaData.distributor.name !== ''
            ? `Fuente: ${
                  mediaData.distributor.name
                      ? mediaData.distributor.name
                      : 'LA NACION'
              }`
            : '';
    const semicolon =
        mediaData.distributor &&
        mediaData.distributor.name !== '' &&
        mediaData.credits.by !== undefined
            ? ' - '
            : '';
    const creditos =
        mediaData.credits &&
        mediaData.credits.by &&
        (mediaData.credits
            ? mediaData.credits.by.map((credito, i) => {
                  const totalCredits = `${i === 0 ? `${credits}: ` : ''}${
                      credito.type === 'author'
                          ? credito.name
                          : credito.type === 'reference'
                          ? credito.referent.id
                          : ''
                  }`;
                  return totalCredits;
              })
            : '');
    const vanityCreditos =
        mediaData.vanity_credits &&
        mediaData.vanity_credits.affiliation.length &&
        (mediaData.credits
            ? mediaData.vanity_credits.by.map((credito, i) => {
                  const totalVanityCredits = `${i === 0 ? `credits: ` : ', '}${
                      credito.type === 'author'
                          ? credito.name
                          : credito.referent.id
                  }`;
                  return totalVanityCredits;
              })
            : '');
    const fuenteCredito = `${distributors}${semicolon}${
        mediaData.credits && mediaData.credits.by ? creditos : ''
    }`;
    return (
        <>
            <MediaBase mediaData={mediaData} withZoom={withZoom}>
                {/* TODO: componentizar creditos y epigrafe y llamarlos aca */}
                {mediaData && (
                    <ComFigcaption>
                        {mediaData.caption && (
                            <ComText
                                classCondition="--caption"
                                textname={mediaData.caption}
                            />
                        )}
                        <ComText
                            classCondition="--credit"
                            textname={fuenteCredito}
                        />
                    </ComFigcaption>
                )}
                <p className="paginator">
                    {galleryOrder + 1}
                    &nbsp;de&nbsp;
                    {totalGallery}
                </p>
            </MediaBase>
        </>
    );
}
