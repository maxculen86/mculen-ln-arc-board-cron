const jsonV3 = ({ children }) => children;

jsonV3.contentType = 'application/json';
jsonV3.fallback = ['jsonv2', 'json', 'default'];

export default jsonV3;
