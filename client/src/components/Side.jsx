import React from 'react';
import styled from "styled-components"
import Logo from '../components/Logo';

function Side(){
    return (
        <Container>
            <Logo/>
            <Menu>
                <MenuItem>Dashboard</MenuItem>
                <MenuItem>Monitors</MenuItem>
                <MenuItem>Status Pages</MenuItem>
                <MenuItem>Teams</MenuItem>
                <MenuItem>Settings</MenuItem>
            </Menu>
        </Container>
        
    );
}

const Container = styled.div`
    width: 220px;
    // background-color: #679186;
    // border-right: solid #bbd4ce 2px;
    height: 100vh;
    padding: 20px;
`

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  font-weight: 500;
`;


export default Side;