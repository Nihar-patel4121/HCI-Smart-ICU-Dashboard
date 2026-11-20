# Smart ICU Alarm Fatigue Management Dashboard
## Human-Computer Interaction (HCI) Academic Project • Weeks 1 to 7

[![Status](https://img.shields.io/badge/Status-Complete-success.svg)]()
[![Course](https://img.shields.io/badge/Course-HCI%20(IE403%2FIT314)-blue.svg)]()
[![Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-orange.svg)]()
[![Platform](https://img.shields.io/badge/Platform-Zero--Dependency%20Web-green.svg)]()

---

## 1. Executive Summary
In modern Intensive Care Units (ICUs), clinical monitors generate between **150 and 350 audible alarms per patient bed every day**. Peer-reviewed clinical research reveals that **72% to 99% of these alarms are non-actionable, clinically trivial, or caused by sensor artifacts** (such as loose ECG patches, coughing, or patient repositioning).

This persistent sensory bombardment causes **Alarm Fatigue**:
- Nurses become cognitively exhausted and desensitized to alarm beeps.
- Critical, life-threatening crises (such as ventricular tachycardia or acute hypoxemia) risk being delayed or missed.
- Caregivers suffer high cognitive stress and burnout during critical medication administration.

The **Smart ICU Alarm Fatigue Management Dashboard** is a bedside and central telemetry decision-support system designed to solve this problem. Developed under a strict 7-week User-Centered Design (UCD) framework, the system provides **3-tier intelligent prioritization**, **multi-parameter contextual cross-validation**, and an **unambiguous tri-state alarm lifecycle** (`Active` → `Acknowledged` → `Resolved`).

> ⚠️ **Academic Simulation Notice**: This system is an academic HCI Proof of Concept (PoC) using simulated patient telemetry and deterministic demonstration scenarios. It is designed to demonstrate human-factors engineering and interaction design; it does **not** claim clinical diagnostic clearance.

---

## 2. Seven-Week Deliverables Mapping

| Week | Official Syllabus Milestone | Project Deliverable Produced | Key File Reference |
|---|---|---|---|
| **Week 1** | Understand Your Users (Needfinding) | Contextual inquiry summary, Empathy map, 2 Nursing personas (Senior Nurse Priya, Junior Nurse Rahul), One-page problem definition. | [`docs/week1-needfinding.md`](file:///c:/Users/HP/Desktop/HCI_Project/docs/week1-needfinding.md) |
| **Week 2** | Build & Test a Paper Prototype | 5 primary user goals, complete screen-flow architecture, wireframes, comic storyboard, and user testing observations. | [`docs/week2-paper-prototype.md`](file:///c:/Users/HP/Desktop/HCI_Project/docs/week2-paper-prototype.md) |
| **Weeks 3–4** | Build the Proof of Concept (PoC) | Responsive, zero-dependency Web Application (HTML5/CSS3/Vanilla JS) with live multi-bed telemetry, priority ranking, context drawer, tri-state lifecycle, and audio tone synthesis. | [`prototype/index.html`](file:///c:/Users/HP/Desktop/HCI_Project/prototype/index.html)<br>[`docs/week3-4-poc.md`](file:///c:/Users/HP/Desktop/HCI_Project/docs/week3-4-poc.md) |
| **Weeks 5–6** | Usability Evaluation | Empirical testing across 5 benchmark tasks (mean TTT 1.93s, 100% completion), step-by-step cognitive walkthrough, Nielsen's 10 heuristic evaluation, and peer review template. | [`docs/week5-6-evaluation.md`](file:///c:/Users/HP/Desktop/HCI_Project/docs/week5-6-evaluation.md)<br>[`evaluation/`](file:///c:/Users/HP/Desktop/HCI_Project/evaluation/) |
| **Week 7** | Final Showcase | Complete 15-slide PowerPoint deck with speaker notes, step-by-step live viva demonstration script, and reproducible submission artifacts. | [`presentation/final-presentation.pptx`](file:///c:/Users/HP/Desktop/HCI_Project/presentation/final-presentation.pptx)<br>[`docs/final-showcase.md`](file:///c:/Users/HP/Desktop/HCI_Project/docs/final-showcase.md) |

---

## 3. Project Architecture & Directory Structure

```
c:\Users\HP\Desktop\HCI_Project\
│
├── Doctor_Feedback.txt                # Clinical Domain Expert Review & Suggestions
├── index.html                         # Root Standalone Dashboard (1-Click GitHub Pages)
├── README.md                          # Master Project Documentation & Quickstart
│
├── docs/                              # Comprehensive Academic Reports
│   ├── project-overview.md            # High-level architecture & HCI scope
│   ├── week1-needfinding.md           # Contextual inquiry, empathy map & personas
│   ├── week2-paper-prototype.md       # User goals, screen flows & paper testing
│   ├── user-goals.md                  # 5 User goals and feature mapping
│   ├── storyboard.md                  # Comic-style nursing journey narrative
│   ├── week3-4-poc.md                 # Working proof of concept technical specs
│   ├── week5-6-evaluation.md          # Evaluation synthesis & iterative changes
│   ├── usability-testing.md           # 5-task testing protocol & empirical results
│   ├── cognitive-walkthrough.md       # Norman's action cycle evaluation
│   ├── heuristic-evaluation.md        # Nielsen's 10 heuristics audit
│   └── final-showcase.md              # Slide deck guide & viva demo script
│
├── prototype/                         # Interactive Working Proof of Concept
│   ├── index.html                     # Semantic single-page web application
│   ├── css/
│   │   └── style.css                  # Comprehensive medical design system
│   └── js/
│       └── app.js                     # State management, smart triage & simulation
│
├── data/                              # Simulated Clinical Telemetry Datasets
│   ├── patients.json                  # 6 Monitored beds with baseline vitals
│   └── alarms.json                    # Deterministic alarm events & context
│
├── evaluation/                        # Evaluation Forms & Testing Sheets
│   ├── expert-physician-feedback.md   # Doctor review transcript & design response
│   ├── usability-test-template.md     # Standardized participant observation sheet
│   ├── cognitive-walkthrough.md       # Wharton/Norman walkthrough recording sheet
│   ├── heuristic-evaluation.md        # Nielsen heuristic scoring rubric
│   └── peer-evaluation-template.md    # Peer group exchange evaluation form
│
├── presentation/                      # Final Showcase Slide Deck
│   ├── final-presentation.pptx        # 15-Slide Professional PowerPoint Presentation
│   └── generate_deck.py               # Automated slide deck build script
│
└── screenshots/                       # High-Resolution UI Captures
    ├── screen1_dashboard.png          # Main Triage Dashboard with 3-tier alert feed
    ├── screen2_alarm_details_modal.png# Bedside Alarm Inspection Modal
    ├── screen3_resolution_dialog.png  # Alarm Resolution Confirmation Dialog
    ├── screen4_alarm_history.png      # Shift Alarm History Log table
    └── screen5_patient_focused_view.png# Focused Patient Telemetry View
```

---

## 4. How to Run the Application on Windows

The application has been engineered to have **zero external runtime dependencies**. It does not require Node.js installation, Python servers, or build tools to operate.

### Method 1: Instant Direct Launch (Easiest)
1. Open Windows File Explorer and navigate to:
   ```
   c:\Users\HP\Desktop\HCI_Project\prototype\
   ```
2. Double-click **`index.html`**.
3. The dashboard opens instantly in your default web browser (Google Chrome, Microsoft Edge, or Firefox).

### Method 2: Running via VS Code Live Server
1. Launch **Visual Studio Code**.
2. Click **File ➔ Open Folder...** and select `c:\Users\HP\Desktop\HCI_Project`.
3. In the Explorer pane, right-click on `prototype/index.html`.
4. Select **"Open with Live Server"** (or press `Alt + L, Alt + O`).
5. The application will launch at `http://127.0.0.1:5500/prototype/index.html`.

### Method 3: Running via Python Local HTTP Server
Open PowerShell in the project directory and run:
```powershell
cd c:\Users\HP\Desktop\HCI_Project\prototype
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in any browser.

---

## 5. Live Demonstration Script for Viva / Evaluation

When presenting the project to examiners or evaluators, follow this exact 5-minute demonstration sequence:

1. **Step 1: Point Out the Multi-Patient Overview**
   - Show the 6 monitored patient beds (Bed 01 to Bed 06).
   - Point out that the top header displays four distinct counters: `1 Critical`, `1 Warning`, `1 Advisory`, and `1 Acknowledged`.
   - Explain how the top pulsing crimson banner surfaces the most urgent emergency without requiring the nurse to scan all 6 beds.

2. **Step 2: Inspect Context & Root Cause (Triage)**
   - Click **`[Triage Immediately ➔]`** on the top red banner.
   - The **Contextual Triage Drawer** slides into view.
   - Highlight the **Multi-Parameter Cross-Validation** box:
     - Notice that SpO2 is 88% (Baseline target: >92%).
     - Notice that Heart Rate is 128 bpm (Sinus Tachycardia).
     - Show the confidence score: *"96% High Clinical Relevance — True Physiological Event (Not a Motion Artifact)"*.
     - Point out the step-by-step recommended nursing action protocol.

3. **Step 3: Acknowledge the Alarm (Muting Audio)**
   - Click the yellow **`[🔔 Acknowledge Alarm]`** button.
   - Notice the system feedback:
     - The audible alarm tone is silenced.
     - A confirmation toast appears at the bottom-right: *"Alarm ALM-2026-001 Acknowledged by Nurse P. Sharma"*.
     - The bed card shifts from a pulsing red border to an ochre badge: `[ACKNOWLEDGED by Nurse P. Sharma]`.
     - *Emphasize to the examiner*: Crucially, the alarm **does not disappear** from the screen; it stays visible so the team knows Nurse Priya has taken ownership.

4. **Step 4: Resolve the Alarm (Preventing Slips)**
   - Click the Bed 01 card again, then click the green **`[✅ Mark as Resolved]`** button.
   - The **Resolution Confirmation Dialog** appears.
   - Select reason: *"Airway Cleared & SpO2 Restored"*.
   - Type note: *"Airway suctioned; SpO2 recovered to 96%."*
   - Click **`[Confirm & Resolve Alarm]`**.
   - Notice that Bed 01 returns to a calm green `[STABLE]` state, and all vitals normalize.

5. **Step 5: Inspect the Historical Audit Trail**
   - Click **`[📋 Alarm History]`** in the top navigation bar.
   - Show the complete chronological log containing every triggered, acknowledged, and resolved event.
   - Demonstrate the filter pills: click `[Critical]`, `[Warning]`, or type "Sharma" in the search bar.

6. **Step 6: Inject New Scenarios on Demand**
   - In the top purple toolbar, click the **Demo Scenario Injector** dropdown.
   - Select **`Scenario 2: Acute Ventilator Disconnect (Bed 02)`**.
   - Watch the alarm sound immediately, Bed 02 turns crimson, and the dashboard updates in real time.
   - Click **`↺ Reset Baseline`** to return to the starting shift state.

---

## 6. User Interface Architecture & Key Views

The dashboard provides 5 core interactive interfaces:
1. **Central Triage Dashboard ([screen1_dashboard.png](screenshots/screen1_dashboard.png))**: Displays live station clock, 5 KPI counters, 3-tier active alerts feed (Critical, Warning, Sensor), and 6 patient bed cards with single-number Mean Arterial Pressure.
2. **Bedside Alarm Inspection Modal ([screen2_alarm_details_modal.png](screenshots/screen2_alarm_details_modal.png))**: Displays clinical condition, telemetry vitals, action protocol, quick-insert nurse notes, 5-min quiet mode, and acknowledge/resolve actions.
3. **Alarm Resolution Dialog ([screen3_resolution_dialog.png](screenshots/screen3_resolution_dialog.png))**: Confirmation workflow to prevent accidental slip dismissals and record resolution reasons.
4. **Shift Alarm History Log ([screen4_alarm_history.png](screenshots/screen4_alarm_history.png))**: Chronological audit trail of all nurse actions, timestamps, and bedside notes.
5. **Focused Patient Telemetry View ([screen5_patient_focused_view.png](screenshots/screen5_patient_focused_view.png))**: High-density physiological trend monitoring.

---

## 7. Usability Evaluation & Clinical Expert Feedback

- **Clinical Doctor Feedback**: Evaluated by an ICU Physician (see [`Doctor_Feedback.txt`](file:///c:/Users/HP/Desktop/HCI_Project/Doctor_Feedback.txt) and [`evaluation/expert-physician-feedback.md`](file:///c:/Users/HP/Desktop/HCI_Project/evaluation/expert-physician-feedback.md)).
  - Confirmed the central dashboard effectively aggregates multiple patient readings in one place.
  - Commended the color-coded prioritization for rapidly identifying which patient needs immediate attention.
  - Recommended patient-tailored target thresholds and dual/MAP blood pressure visibility (both addressed in prototype).
  - Validated the vital necessity of the Shift Alarm History Log for auditing clinical condition changes.
- **Usability Testing**: Evaluated with 3 independent participants across 5 standardized clinical tasks.
  - Mean Time-to-Triage: **1.93 seconds** (target was < 5.0s).
  - Context Comprehension: **4.60 seconds** (target was < 10.0s).
  - Task Completion Rate: **100%** with zero clinical errors.
- **Cognitive Walkthrough**: Verified low Gulf of Execution and Gulf of Evaluation using Donald Norman's 4-stage action cycle.
- **Heuristic Evaluation**: Evaluated against Nielsen's 10 Usability Heuristics. All initial minor and medium issues were resolved in the final PoC.

---

## 8. GitHub Hosting & Deployment Guide

This project includes a root `index.html` allowing 1-click zero-configuration live deployment on **GitHub Pages**:
1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings ➔ Pages**.
   - Under **Build and deployment ➔ Source**, select **Deploy from a branch**.
   - Set **Branch** to `main` and folder to `/ (root)`.
   - Click **Save**.
3. Your interactive dashboard is live at `https://<your-username>.github.io/<repo-name>/` to share with evaluators and course instructors!

---

## 9. Academic Authorship & Submission Verification
- **Course**: Human-Computer Interaction (HCI)
- **Project Title**: Smart ICU Alarm Fatigue Management Dashboard
- **Deliverables**: Working Proof of Concept Web App, Usability Evaluation Portfolio, Physician Review, and Final Presentation Slide Deck.

