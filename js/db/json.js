import { products } from '../data.js';
const jsonData=JSON.parse(JSON.stringify(products));
console.log(jsonData);