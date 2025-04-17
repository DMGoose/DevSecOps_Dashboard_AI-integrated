import React from 'react';
import styled from "styled-components"

function PageHead(){
    const now = new Date();
    const hours = now.getHours();
    let message = '';

    if (hours < 6) {
        message = 'It is late 😴';
        } else if (hours < 12) {
        message = 'Good morning ☀️';
        } else if (hours < 18) {
        message = 'Good afternoon 🌤️';
        } else {
        message = 'Good evening 🌙';
        }
    
    return (
        <Container>
            <Hello>Hello</Hello>
            <p>{message}</p>
        </Container>
    )
}

const Container = styled.div`
    height: 65px;
    padding:20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border-radius: 6px;
    // background-color:#679186;
    color: #444;
`

const Hello = styled.p`
    font-weight: bold;
    font-size:25px;
`

export default PageHead;