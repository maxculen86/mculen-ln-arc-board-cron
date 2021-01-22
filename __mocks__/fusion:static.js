/**
 * Global mock for a fusion:content when running
 * unit tests of anything using a Content HOC.
 *
 * In order to use this mock you must do
 * `import Content from 'fusion:content';`
 * at the top of your unit test file, this will
 * trigger jest to mock the Content import below
 * */
import ReactDOMServer from 'react-dom/server';

export default Comp => props =>
    Comp ? ReactDOMServer.renderToString(<Comp {...props} />) : null;
