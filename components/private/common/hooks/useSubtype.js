import { useAppContext } from 'fusion:context';
import noticia from '../utils/subtypes/noticia';
import receta from '../utils/subtypes/receta';
import infografia from '../utils/subtypes/infografia';
import storytelling from '../utils/subtypes/storytelling';
import htmlLibre from '../utils/subtypes/htmlLibre';
import fotoAl100 from '../utils/subtypes/fotoAl100';
import generico from '../utils/subtypes/generico';
import agencia from '../utils/subtypes/agencia';
import liveblog from '../utils/subtypes/liveblog';
import video from '../utils/subtypes/video';
import LiveBlogEditorial from '../utils/subtypes/liveblogEditorial';

const useSubtype = () => {
    const { globalContent } = useAppContext();
    const { subtype } = globalContent || {};

    const subtypes = [
        generico,
        noticia,
        infografia,
        storytelling,
        receta,
        fotoAl100,
        htmlLibre,
        agencia,
        liveblog,
        video,
        LiveBlogEditorial
    ];

    return {
        subtype: subtypes.find(sub => sub.id === subtype) || generico
    };
};

export default useSubtype;
