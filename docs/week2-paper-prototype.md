# Week 2 Deliverable: Paper & Cardboard Prototype Guide
## Official Timeline: October 19 – 23

### 1. Prototype Rationale & Materials
In adherence to the official guidelines for Week 2 and the Week 7 final showcase, this document provides the exact blueprints to fabricate a reproducible **physical paper and cardboard prototype**.

#### Required Physical Materials:
1. **Base Cardboard Sheet (12" x 18" or A3 size)**: Represents the Bedside / Central Station Tablet bezel and hardware frame.
2. **Cardstock Paper (200+ GSM or standard A4)**: For printable screen inserts and sliding context drawers.
3. **Transparent Sticky Tabs / Post-it Notes**: Used to simulate real-time notification toasts and status badges (`[Active]`, `[Acknowledged]`, `[Resolved]`).
4. **Scissors, Glue stick, and Clear Tape**: To mount rails enabling sliding side drawers.
5. **Color Marker Pens**: Red, Amber, Cyan/Blue, and Green to highlight alarm priority states on paper wireframes.

---

### 2. Complete Application Screen Architecture & Navigation Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        MAIN NAVIGATION BAR                             │
│  [Logo: SmartICU]   [ICU Unit 04 - Shift 2]   (View: Dashboard | History | Simulator) │
└───────────────────┬───────────────────────────────┬────────────────────┘
                    │                               │
         ┌──────────▼──────────┐          ┌─────────▼─────────┐
         │ SCREEN 1: DASHBOARD │          │ SCREEN 4: HISTORY │
         │ • Metric Summary    │          │ • Filter by Bed   │
         │ • Active Alarms List│          │ • Filter Severity │
         │ • 6 Bedside Cards   │          │ • Audit Timeline  │
         └──────────┬──────────┘          └───────────────────┘
                    │ (Tap Alarm Card)
         ┌──────────▼─────────────────────────────┐
         │ SCREEN 2: ALARM CONTEXT & TRIAGE MODAL │
         │ • Multi-parameter trend context        │
         │ • Suspected root-cause hypothesis      │
         │ • Normal range vs trigger value        │
         │ • Recommended nursing protocols        │
         └──────────┬─────────────────────────────┘
                    │
         ┌──────────┴─────────────────────────────┐
         │ SCREEN 3: ALARM MANAGEMENT LIFECYCLE   │
         │ 1. [Acknowledge (Nurse ID)]            │
         │    → Silences audio, marks Acked       │
         │ 2. [Resolve (Select Reason + Note)]    │
         │    → Removes from Active, logs History │
         └────────────────────────────────────────┘
```

---

### 3. Screen Wireframe Specifications for Physical Paper Drawing

#### Screen 1: Central & Bedside Multi-Patient Overview
- **Header (Top 15%)**:
  - Title: "ICU MONITORING SUITE — CENTRAL WARD 4B"
  - Shift Timer: "Shift: Night (20:00 - 08:00) | Logged Nurse: P. Sharma (RN)"
  - Status Counters:
    - `[ 1 CRITICAL (Red) ]`
    - `[ 1 WARNING (Amber) ]`
    - `[ 1 ADVISORY (Cyan) ]`
    - `[ 1 ACKNOWLEDGED (Yellow-Green) ]`
- **Primary Alarm Priority Queue (Middle 35%)**:
  - Stacked cards sorted strictly by priority (Critical first).
  - Each alarm pill shows: `[Priority Badge]` `[Bed #]` `[Alarm Title]` `[Trigger Value]` `[Elapsed Time]` `[Action: Inspect]`.
- **Bedside Telemetry Grid (Bottom 50%)**:
  - 6 modular patient cards (Bed 01 through Bed 06).
  - Displays: Patient ID, Diagnosis, HR (bpm), SpO2 (%), BP (mmHg), RR (/min), and Sensor Integrity Indicator.

#### Screen 2: Contextual Triage Drawer (Physical Slider)
- Fabricated as a sliding paper card that pulls out from the right side of the base cardboard sheet:
  - Header: "ALM-2026-001 | Bed 01 — Severe Hypoxemia with Tachycardia"
  - Parameter Comparison Box:
    - SpO2: 88% (Baseline: >92%)
    - HR: 128 bpm (Baseline: 60-100 bpm)
    - Arterial Line MAP: 65 mmHg
  - Clinical Correlation Card: "High Confidence (96%) - True physiological deterioration. Pulsatile plethysmogram present."
  - Suspected Root Cause: "Mucus plug / airway compromise post-extubation."
  - Action Protocol: "1. Suction airway. 2. Verify oxygen delivery circuit. 3. Call respiratory therapist if uncorrected."

#### Screen 3: Tri-State Action Overlay
- Paper overlay flap:
  - Buttons:
    - `[ Acknowledge Alarm ]` (Green outline button)
    - `[ Mark as Resolved ]` (Blue solid button)
    - `[ Close / Return ]` (Top-right 'X')
  - Modal prompt when "Resolve" is tapped:
    - Dropdown: Reason ("Patient Stabilized", "Sensor Repositioned", "Medication Administered").
    - Notes textarea: "[ Enter resolution summary... ]".

#### Screen 4: Alarm History & Audit Log
- Replaceable full-screen paper sheet:
  - Filter bar: `[All Beds v]` `[All Priorities v]` `[Last 12 Hours v]`.
  - Structured log table:
    - 22:31:14 | Bed 01 | Critical | Hypoxemia | Active
    - 22:15:30 | Bed 03 | Warning | NIBP Timeout | Acknowledged (R. Verma)
    - 22:05:12 | Bed 05 | Advisory | Infusion Pump Empty | Resolved (P. Sharma)

---

### 4. "Human Computer" Paper Testing Methodology & Observations
Following guideline step 5 ("Test with at least 3 people: act as the 'computer' yourself by swapping paper screens and responding to their taps"), a formal testing session was conducted with three independent evaluators.

#### Participant Profiles:
- **Participant 1 (P1)**: Final-year biomedical student (familiar with clinical metrics).
- **Participant 2 (P2)**: Computer science undergraduate (expert in digital interfaces, novice in healthcare).
- **Participant 3 (P3)**: Healthcare volunteer / nursing intern (strong clinical domain familiarity).

#### Standardized Tasks Given to Participants:
1. **Task 1**: "Look at the main dashboard and identify which patient requires your immediate attention."
2. **Task 2**: "Open the details for that urgent alarm and tell me if it is a false alarm or a true emergency."
3. **Task 3**: "Acknowledge the alarm to stop the audio tone."
4. **Task 4**: "Navigate to the historical log and locate Bed 05's resolved syringe alarm."

---

### 5. Testing Observations & Concrete Prototype Iterations

| Participant | Task 1 (Identify Critical) | Task 2 (Inspect Context) | Task 3 (Acknowledge) | Task 4 (Find History) | Observed Friction & Misunderstandings |
|---|---|---|---|---|---|
| **P1** | Succeeded in 2.1s (Red badge was immediate). | Succeeded in 5.4s; appreciated the correlation score. | Confused about whether "Acknowledge" would delete the alarm. | Succeeded in 3.8s. | **Friction**: P1 feared that pressing "Acknowledge" would remove the patient from active view before they reached the bed. |
| **P2** | Succeeded in 3.0s. | Succeeded in 7.1s; needed clearer normal range labels. | Pressed Acknowledge easily. | Searched for History under a hidden hamburger menu. | **Friction**: Hamburger menu hid the History view; P2 suggested a persistent top navigation bar. |
| **P3** | Succeeded in 1.8s. | Expressed relief at seeing "Electrode Dry-out" on Bed 04 without high alarm bells. | Wanted to see who acknowledged the alarm directly on the card. | Succeeded in 4.2s. | **Friction**: P3 wanted the nurse's initials displayed immediately on acknowledged cards for shift coordination. |

#### Design Improvements Made in Updated Prototype:
1. **Unambiguous Acknowledged State**:
   - Instead of hiding the card, the updated prototype keeps the card in the list, changes its badge from pulsating red `[ACTIVE]` to steady `[ACKNOWLEDGED]`, displays `Ack by: Nurse P. Sharma`, and replaces the speaker icon with a muted icon.
2. **Persistent Top Navigation Bar**:
   - Replaced all hidden slide-out navigation with persistent top pills: `[Dashboard]` and `[Alarm History]`.
3. **Explicit Normal Range Benchmarks**:
   - Added standard baseline ranges directly alongside trigger values (e.g., `SpO2: 88% (Normal: >92%)`) so non-specialist or junior nurses immediately comprehend the degree of deviation.

