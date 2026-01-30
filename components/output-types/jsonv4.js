const jsonV4 = ({ children }) => children;

jsonV4.contentType = 'application/json';
jsonV4.fallback = ['jsonv3', 'jsonv2', 'json', 'default'];

export default jsonV4;
