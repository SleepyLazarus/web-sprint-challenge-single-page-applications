import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import styled from 'styled-components';
import axios from 'axios';

const schema = yup.object().shape({
    name: yup.string().required('Please enter your name.').min(3, 'That\'s not a real name'),
    phone: yup.string().required('Please enter a phone number').matches(/^[0-9]{10}$/, 'Please enter a valid phone number.')
})

const defaultFormState ={
    name: '',
    phone: '',
    toppings: {
        pepperoni: false,
        blackOlives: false,
        sausage: false,
        pineapple: false,
        bellpepper: false,
        spinach: false,
        onions: false,
        mushrooms: false,
        bbqChicken: false,
        bacon: false
    },
    specialInstructions: ''
}

const defaultErrorState = {
    name: '',
    phone: '',
}

const PizzaForm = props => {
    const [formState, setFormState] = useState(defaultFormState);
    const [errors, setErrors] = useState(defaultErrorState);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        schema.isValid(formState).then(valid => setIsDisabled(!valid));
    }, [formState])

    const validate = e => {
        e.persist();
        yup.reach(schema, e.target.name).validate(e.target.value)
        .then(valid => setErrors({...errors, [e.target.name]: ''}))
        .catch(err => setErrors({errors, [e.target.name]: err.errors[0]}));
    }

    const handleChange = e => {
        if (e.target.type === 'checkbox') {
            setFormState({
                ...formState,
                toppings: {
                    ...formState.toppings,
                    [e.target.value]: e.target.checked
                }
            })
        } else {
            setFormState({
                ...formState,
                [e.target.name]: e.target.value
            })
        }
        if (e.target.name === 'name' || e.target.name === 'phone'){
            validate(e);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formState);
        axios.post('https://reqres.in/api/users', formState)
        .then(res => props.addOrder(res.data))
        .catch(err => console.log(err));
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input 
                        type='text'
                        name='name'
                        onChange={handleChange}
                        value={formState.name}/>
                        {errors.name.length > 0 && <p style={{color: 'red'}}>{errors.name}</p>}
                </label>
                <label>
                    Phone
                    <input 
                        type='tel'
                        name='phone'
                        onChange={handleChange}
                        value={formState.phone}/>
                        {errors.phone.length > 0 && <p style={{color: 'red'}}>{errors.phone}</p>}
                </label>
                <fieldset>
                    <label>
                        <input 
                            type='checkbox' 
                            name='toppings' 
                            onChange={handleChange} 
                            value='pepperoni'/>
                            Pepperoni
                    </label>
                    <label>
                        <input 
                            type='checkbox' 
                            name='toppings' 
                            onChange={handleChange} 
                            value='blackOlives'/>
                            Black Olives
                    </label>
                    <label>
                        <input 
                            type='checkbox' 
                            name='toppings' 
                            onChange={handleChange} 
                            value='sausage'/>
                            Sausage
                    </label>
                    <label>
                        <input 
                            type='checkbox' 
                            name='toppings' 
                            onChange={handleChange} 
                            value='pineapple'/>
                            Pineapple
                    </label>
                    <label>
                        <input 
                            type='checkbox' 
                            name='toppings' 
                            onChange={handleChange} 
                            value='bellpepper'/>
                            Bellpepper
                    </label>
                    <label>
                        <input 
                            type='checkbox' 
                            name='toppings' 
                            onChange={handleChange} 
                            value='spinach'/>
                            Spinach
                    </label>
                    <label>
                        <input 
                            type='checkbox' 
                            name='toppings' 
                            onChange={handleChange} 
                            value='onions'/>
                            Onions
                    </label>
                    <label>
                        <input 
                            type='checkbox' 
                            name='toppings' 
                            onChange={handleChange} 
                            value='mushrooms'/>
                            Mushrooms
                    </label>
                    <label>
                        <input 
                            type='checkbox' 
                            name='toppings' 
                            onChange={handleChange} 
                            value='bbqChicken'/>
                            BBQ Chicken
                    </label>
                    <label>
                        <input 
                            type='checkbox' 
                            name='toppings' 
                            onChange={handleChange} 
                            value='bacon'/>
                            Bacon
                    </label>
                </fieldset>
                <label>
                    <textarea
                        name = 'instructions'
                        onChange={handleChange}
                        value={formState.specialInstructions}/>
                </label>
                <button disabled={isDisabled} type='submit'>Order Your Perfect Pizza</button>
            </form>
        </FormContainer>
    );
}

const FormContainer = styled.div `
    margin: 5rem auto;
    width: 900px;
    display: flex;
    flex-direction: column;
    color: gray;
`

export default PizzaForm;