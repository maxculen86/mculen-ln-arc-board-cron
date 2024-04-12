/* eslint-disable no-underscore-dangle */
// import * as resizerHelper from './resizerHelper';
// import get from '../../../get';

// const MEDIAMINWIDTH = '(min-width: 768px)';

// TODO: Resizer Exportar methodo resizeUrl
// export const resizeImgUrl = ({
//     originalUrl,
//     originalWidth,
//     originalHeight,
//     defaultResizeWithSmart = {},
//     focalPoint = [],
//     smartCropExcluded,
//     filterQuality = 70,
//     isInApertura = false,
//     isAdmin = false,
//     arcImage
// }) => {
//     const {
//         useFullSize,
//         proportion,
//         width: newWidth = 0
//     } = defaultResizeWithSmart;
//     let { height: newHeight = 0 } = defaultResizeWithSmart;

//     newHeight = !useFullSize ? 0 : newHeight;

//     if (!newHeight && !newWidth) throw new Error('Height and Width required');

//     // TODO: Revisar el buen funcionamiento del Crop
//     const crop = resizerHelper.setCropMethod({
//         defaultResizeWithSmart,
//         originalWidth,
//         originalHeight,
//         focalPoint
//     });

//     proportion &&
//         (newHeight = resizerHelper.setHeight(newWidth, newHeight, proportion));

//     if (newHeight === 0 && (focalPoint.length > 1 || smartCropExcluded)) {
//         newHeight = resizerHelper.autoHeight(
//             originalHeight,
//             originalWidth,
//             newWidth
//         );
//     }

//     // const [fileName = ''] = originalUrl.match(/[^\/]+\.(jpg|png|jpeg)/gm) || [];

//     // TODO: quitar este early return, solo cumple funcion temporal para que no fallen imagenes con url v1 de liftigniter te puede interesar
//     const imageUrl = get(arcImage, 'url', '');
//     if (
//         !get(arcImage, '_id', '') &&
//         (resizerHelper.isResizerV1(imageUrl) ||
//             resizerHelper.isResizerV2(imageUrl))
//     ) {
//         return imageUrl;
//     }

//     return `${resizerHelper.baseUrl({
//         isInApertura,
//         isAdmin
//     })}/resizer/v2/${resizerHelper.buildQueryParams({
//         originalUrl,
//         newWidth,
//         newHeight,
//         filterQuality,
//         smartCropExcluded,
//         focalPoint,
//         arcImage,
//         crop
//     })}`;
// };

// export const resizeUrlCollection = ({
//     originalUrl,
//     originalWidth,
//     originalHeight,
//     defaultResizeWithSmart,
//     focalPoint = [],
//     smartCropExcluded,
//     arcImage,
//     isInApertura
// }) => {
//     const resp = [];
//     const finalPreset = defaultResizeWithSmart;
//     finalPreset &&
//         finalPreset.forEach(opt => {
//             const resizedUrl = resizeImgUrl({
//                 originalUrl,
//                 originalWidth,
//                 originalHeight,
//                 defaultResizeWithSmart: opt,
//                 focalPoint,
//                 smartCropExcluded,
//                 arcImage,
//                 isInApertura
//             });
//             resp.push({
//                 resizedUrl,
//                 option: {
//                     ...opt,
//                     height: resizerHelper.updateHeight(
//                         originalHeight,
//                         originalWidth,
//                         opt
//                     )
//                 }
//             });
//         });

//     return resp;
// };
