/**
 * Global mock for a fusion:content when running
 * unit tests of anything using a Content HOC.
 *
 * In order to use this mock you must do
 * `import Content from 'fusion:content';`
 * at the top of your unit test file, this will
 * trigger jest to mock the Content import below
 * */

// Se hace un pasa mano del componente con static para poder revisar las props de los componentes
jest.mock('fusion:static', () => Comp => props =>
    Comp ? <Comp {...props} /> : null
);
