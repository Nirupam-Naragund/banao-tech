import React from 'react';
import ReactLoading from 'react-loading';
 
const Example = ({ type='spin', color='red' }) => (
    <ReactLoading type={type} color={color} height={400} width={200} />
);
 
export default Example;
