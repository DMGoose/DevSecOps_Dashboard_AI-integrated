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
            <h1>Hello</h1>
            <p>{message}</p>
        </Container>
    )
}

const Container = styled.div`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export default PageHead;