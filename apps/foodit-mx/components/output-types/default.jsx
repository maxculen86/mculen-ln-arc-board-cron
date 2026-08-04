// El bundle foodit-mx es mono-site: su output-type por defecto ES foodit.
// PageBuilder Engine usa `output-types/default.jsx` cuando el request no especifica
// `?outputType=`. Sin este archivo, el engine cae en `outputTypeMap[defaultOutputType]`
// (= 'default'), no lo encuentra, y falla con:
//   "Cannot destructure property 'ext' of (... || outputTypeMap[defaultOutputType])"
// Re-exportamos foodit para que /recetas renderice sin necesidad de query params.
// Doc: https://dev.arcxp.com/pagebuilder-engine/how-to-guides/components-and-content/how-to-create-and-use-output-types/
import Foodit from './foodit';

export default Foodit;
