# Universal DevSecOps Dashboard
This is a universal dashboard that allows you to visualize the scanning results of various security tools across multiple repositories.
It combines CI/CD integration, multi-tool vulnerability scanning, JSON report merging, and an interactive React + Node.js-based dashboard with AI-powered remediation suggestions.

## Features
-  **Automated security scanning** using CodeQL (SAST), Trivy (SCA), and OWASP ZAP (DAST)
-  **SARIF report parsing and merging** into a unified `merged-security-reports.json`
-  **React-based Dashboard** to visualize vulnerabilities by severity, tool, and component
-  **Dynamic GitHub repo selection**: users can load reports from any public GitHub repo
-  **AI integration** for remediation suggestions (Gemma4.0)
-  **Deployed on Vercel(frontend) & Render(backend)** for real-time report access
-  **Extensible** for additional tools or features (e.g., login, history, export)

## Workflow
**It requires a prerequisite workflow**, which you can find in my DVWA-T repository:
`.github/workflows/workflow_intotal.yml`

1.Triggered on push / PR / manual

2.Scans app with CodeQL, Trivy, and ZAP

3.Merges reports into a single JSON via parse_reports.py

4.Pushes report to /public/data/merged.json

5.Auto-deploys updated dashboard

6.Dashboard reads JSON dynamically based on user input

## How to View a Security Report
Open the deployed dashboard: https://dev-sec-ops-dashboard-ai-integrated.vercel.app/

Enter a GitHub repository name containing a merged-security-reports.json (You should use the `workflow_intotal.yml` to automatically generate this file)

Dashboard will fetch, visualize, and allow interactive exploration of vulnerabilities

**Note**: 
You might need to wait a bit for the backend to fetch AI suggestions :)

The UI is still a work in progress. 

The left sidebar currently contains placeholders — more features will be added soon.

## Home page
![image](https://github.com/user-attachments/assets/6b70810d-5069-4a98-943e-b71c6e751d73)

## Vulnerability Card
![image](https://github.com/user-attachments/assets/fe5a55df-9bcb-4b2a-837d-49da5d8eae20)

## generate suggestions
![image](https://github.com/user-attachments/assets/c5ab9e5d-5b2f-4db5-bbde-e555ecd1068f)

