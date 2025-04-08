import React, {useEffect, useState} from 'react';
import PageHead from '../components/PageHead';
import Side from '../components/Side';
import styled from "styled-components"
import OverviewCards from '../components/OverviewCards';
import AlertSummaryTable from '../components/AlertSummaryTable';
import AlertsGrid from '../components/AlertsGrid';

function Home(){

    const [reportData, setReportData] = useState([]);
    
    useEffect(()=>{
        fetch('/merged-security-reports.json')
        .then(res => res.json())
        .then(reportData => setReportData(reportData))
        .catch(err => console.error('Failed to load JSON:', err));
    }, []);

    // //在 Home.jsx 中把数据保存到 localStorage
    // useEffect(() => {
    //     if (reportData.length > 0) {
    //       localStorage.setItem('reportData', JSON.stringify(reportData));
    //     }
    //   }, [reportData]);

    if (reportData.length === 0) return <div>Loading...</div>;

    return(
        <Container>
            {/* left side bar */}
            <Side/>

            {/* tabbar */}
            <RightSection>
                <PageHead/>
                <OverviewCards data={reportData} />
                <AlertSummaryTable data={reportData}/>
                <AlertsGrid data={reportData}/>
            </RightSection>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    height:100vh;
`

const RightSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  overflow-y: auto;
  background-color: #fafafa;
`

export default Home;