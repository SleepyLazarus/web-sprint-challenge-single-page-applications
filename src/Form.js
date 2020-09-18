import React, { useState } from 'react';
import { Card, Form, FormGroup, Input, Dropdown, DropdownToggle, DropdownMenu, Label, Button } from 'reactstrap';
import axios from 'axios';
import * as yup from 'yup';


const OrderForm = () =>{
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState)
    const [formData, setFormData] =useState({
        name:"",
        number:"",
        sauce:"",
        Toppings:'',
        pepperoni: false,
        sausage: false,
        meatball: false,
        ham: false,
        bacon: false,
        chicken: false,
        beef: false,
        special:''
    });
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleToppings = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.checked})
    }
    const schema = yup.object().shape({
        name: yup.string().required().min(2),
        Toppings: yup.string(),
        Pepperoni: yup.boolean(),
        Sausage: yup.boolean(),
        Meatball: yup.boolean(),
        Ham: yup.boolean(),
        Bacon: yup.boolean(),
        Chicken: yup.boolean(),
        Beef: yup.boolean(),
    })
    const submit = () => {
        schema.validate(formData).then( () =>{
            axios.post('https://reqres.in/api/users', formData).then((res) =>{
                console.log(res.data, 'This is posted data')
            })
        })
    }
    return(
        <>
        <Card color='white'>
            <h1 style={{color: 'Black', margin: '0 auto', padding: '10px'}}>
                Pizza time!
                Build your own pizza!
            </h1>*
        </Card>

        <Form data-cy='submit' onSubmit={(e) =>{
            e.preventDefault()
            submit()
        }} style={{margin: '10%'}}>
           <FormGroup>
                <legend>Name of customer:</legend>
                <Input type='name' name='name' data-cy='name' value={formData.name} onChange={handleChange}/>       
           </FormGroup>
           <FormGroup>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>{formData.size === '' ? 'Size' : formData.size}                     
                    </DropdownToggle>
                    <DropdownMenu>
                        <div onClick={() => {
                           toggle();
                           setFormData({...formData, size: 'Triangle'})}}> 
                            Triangle</div>
                            <div onClick={() => {
                           toggle();
                           setFormData({...formData, size: 'Medium'})}}> Medium</div>
                        <div onClick={() => {
                           toggle();
                           setFormData({...formData, size: 'Large'})}}>Large</div>
                        <div onClick={() => {
                           toggle();
                           setFormData({...formData, size: 'Extra large'})}}>Extra Large</div>
                        <div onClick={() => {
                           toggle();
                           setFormData({...formData, size: 'Giant'})}}>Giant</div>
                    </DropdownMenu>
                </Dropdown>
           </FormGroup> 
           <FormGroup tag='fieldset'>
            <legend>Sauce</legend>

            <FormGroup check>
            <Label check>
                    <Input type='checkbox' name='sauce' value='Marinara' onChange={handleChange} />
                    Some sauce
                </Label>
            </FormGroup>

            <FormGroup check>
            <Label check>
                    <Input type='radio' name='sauce' value='white' onChange={handleChange}/>
                    Not good one
                </Label>
            </FormGroup>

            <FormGroup check>
            <Label check>
                    <Input type='checkbox' name='sauce' value='brown' onChange={handleChange}/>
                    Special one
                </Label>
            </FormGroup>

            <FormGroup check>
            <Label check>
                    <Input type='radio' name='sauce' value='' onChange={handleChange}/>
                    Try this one
                </Label>
            </FormGroup>

            </FormGroup>

            <FormGroup tag='fieldset'>
            <legend>Toppings... Beware: extra charge! Nothing is free!</legend>

            <FormGroup check>
            <Label check>
                    <Input type='checkbox' name='toppings' data-cy='checkbox1' checked={formData.Pepperoni} onChange={handleToppings}/>
                    Peperoni
                </Label>
            </FormGroup>
            

            <FormGroup check>
            <Label check>
                    <Input type='radio' name='toppings' data-cy='checkbox2'  checked={formData.Sausage} onChange={handleToppings}/>
                    Sausage
                </Label>
            </FormGroup>

            <FormGroup check>
            <Label check>
                    <Input type='checkbox' name='toppings' data-cy='checkbox3'  checked={formData.Meatball} onChange={handleToppings}/>
                    Meatballs
                </Label>
            </FormGroup>

            <FormGroup check>
            <Label check>
                    <Input type='radio' name='toppings' data-cy='checkbox4'  checked={formData.Ham} onChange={handleToppings}/>
                    Ham
                </Label>
            </FormGroup>

            <FormGroup check>
            <Label check>
                    <Input type='checkbox' name='toppings' data-cy='checkbox5'  checked={formData.Bacon} onChange={handleToppings}/>
                    Bacon
                </Label>
            </FormGroup>

            <FormGroup check>
            <Label check>
                    <Input type='radio' name='toppings' data-cy='checkbox6'  checked={formData.Chicken} onChange={handleToppings}/>
                    Gimme everything.
                </Label>
            </FormGroup>

            <FormGroup check>
            <Label check>
                    <Input type='checkbox' name='toppings' data-cy='checkbox7'  checked={formData.Beef} onChange={handleToppings}/>
                    Beef!
                </Label>
            </FormGroup>
            </FormGroup>
            <FormGroup>
                <legend>
                    Special instructions: 
                    <Input type='textarea' name='special' value={formData.special} onChange={handleChange}/>

                    Customer feedback
                    <Input type='textarea' name='special' value={formData.special} onChange={handleChange}/>
                </legend>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
        </>
    )
}

export default OrderForm