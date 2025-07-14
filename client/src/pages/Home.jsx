import React, { useEffect, useState } from 'react';
import PageHead from '../components/PageHead';
import Side from '../components/Side';
import styled from "styled-components"
import OverviewCards from '../components/OverviewCards';
import AlertSummaryTable from '../components/AlertSummaryTable';
import AlertsGrid from '../components/AlertsGrid';

function Home({ reportData, repo }) {

    // const [reportData, setReportData] = useState([]);

    // const repo = 'DMGoose/DVWA-T';
    // const rawUrl = `https://raw.githubusercontent.com/${repo}/main/merged-security-reports.json`;

    // useEffect(() => {
    //     const controller = new AbortController();
    //     const fetchData = async () => {
    //         try {
    //             const res = await fetch(rawUrl, { signal: controller.signal });
    //             if (!res.ok) {
    //                 throw new Error(`HTTP error! status: ${res.status}`);
    //             }
    //             const data = await res.json();
    //             setReportData(data);
    //         }
    //         catch(err){
    //             if (err.name !== 'AbortError') {
    //                 console.error('Failed to load JSON:', err.message);
    //             }
    //         }
    //     };
    //     fetchData();

    //     return () => {
    //         controller.abort(); // 清理请求
    //     }
    // }, []);

    // //在 Home.jsx 中把数据保存到 localStorage
    // useEffect(() => {
    //     if (reportData.length > 0) {
    //       localStorage.setItem('reportData', JSON.stringify(reportData));
    //     }
    //   }, [reportData]);

    if (reportData.length === 0) return <div>Loading...</div>;

    return (
        <Container>
            {/* left side bar */}
            <Side />

            {/* tabbar */}
            <RightSection>
                <PageHead />
                <Wrapper>
                    <OverviewCards data={reportData} repo={repo} />
                    <AlertSummaryTable data={reportData} />
                    <AlertsGrid data={reportData} />
                </Wrapper>
            </RightSection>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    height:100vh;
    color:rgb(29, 36, 34);
`

const RightSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background-color:rgb(243, 243, 243);
`

const Wrapper = styled.div`
    padding: 20px;
`

export default Home;