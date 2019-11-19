import React from 'react';

const Form = (props) => (
    <form onSubmit = {props.weatherMethod}>
    <input type="text" placeholder="City" name="city"/>
    <button>Get weather</button>
    </form>
)

export default Form;