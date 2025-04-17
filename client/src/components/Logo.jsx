import React from 'react';
import styled from 'styled-components';

function Logo(){
    return(
        <Container>
            <img src='/logo192.png' alt="logo"></img>
            <p>Kinyo</p>
        </Container>
    )
}

const Container = styled.div`
    color: #444;
    padding-top:5px;
    padding-left:5px;
    width:60px;
    height:60px;
    display:flex;
    align-items:center;
    margin-bottom:25px;
    img{
        width:50px;
        height:50px;
    }
    p{
        font-size:24px;
        font-weight: bold;
        color:#444;
        padding-left:20px;
        padding-right:5px;
        padding-top:5px;
    }
`;
export default Logo;

