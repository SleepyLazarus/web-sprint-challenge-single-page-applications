import React from 'react';
import styled from 'styled-components';
import Pizza from '../Assets/Pizza.jpg';
import { Link } from 'react-router-dom';
import OrderCard from './OrderCard';

const HomeContainer = styled.div `
    width: 100%;
    display: flex;
    header {
        width: 100%;
        background-image: jpg(${Pizza});
    }
`

const HomePage = props => {
    return (
        <HomeContainer>
            <header>
                <h1>Make and Bake</h1>
            </header>
            <Link to='/buildapizza'>Build Your Perfect Pizza</Link>
            {props.orders.map((order, i) => <OrderCard key={i} order={order} />)}
        </HomeContainer>
    );
}


export default HomePage;