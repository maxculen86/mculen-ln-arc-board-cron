import Consumer from 'fusion:consumer';
import AuthorAndDate from '../../private/LN/nota/apertura/authorAndDate';

AuthorAndDate.static = true;
AuthorAndDate.label = 'LN-Nota-AutorYFecha';

export default Consumer(AuthorAndDate);
