export function generatePathStructure(path) {
    // Dividimos el path en segmentos basándonos en las barras '/'
    const segments = path.split('/').filter(segment => segment !== '');

    const sections = segments.reduce((acc, current, index) => {
        // Construimos el path hasta el segmento actual
        const currentPath = '/' + segments.slice(0, index + 1).join('/');

        // Creamos el objeto que representa el segmento actual
        const obj = {
            id: currentPath,
            name: current.charAt(0).toUpperCase() + current.slice(1), // Capitalizamos el nombre
            path: currentPath
        };

        // Añadimos el objeto al acumulador
        acc.push(obj);
        return acc;
    }, []);

    // Usamos reduce para construir el array de objetos de forma iterativa
    return [{ id: '/', name: 'LA NACION', path: '/' }, ...sections];
}
