# Weeks 5–6: Usability Evaluation Synthesis Report
## Official Timeline: November 7 – 16

### 1. Executive Summary & Evaluation Scope
In accordance with the official project guidelines, the Smart ICU Alarm Fatigue Management Dashboard underwent three rigorous, complementary usability evaluation methods during Weeks 5–6:

1. **Formal Usability Testing**: Empirically measured 3 participants executing 5 standardized clinical nursing tasks.
2. **Cognitive Walkthrough**: Evaluated the primary alarm triage, acknowledgment, and resolution journey using Norman's 4-stage action theory.
3. **Heuristic Evaluation**: Inspected against Jakob Nielsen’s 10 Usability Heuristics, supplemented by a structured Peer Evaluation Rubric.

---

### 2. Method 1: Usability Testing Results

#### Testing Objectives & Setup:
- **Environment**: Simulated ICU Central Nursing Desk (Desktop workstation and tablet display).
- **Participants**:
  - Participant 1 (P1): Biomedical engineering senior student (high clinical metric familiarity).
  - Participant 2 (P2): Computer science undergraduate (novice in healthcare interfaces).
  - Participant 3 (P3): Nursing intern / healthcare assistant (practical bedside clinical familiarity).
- **Core Benchmark Tasks**:
  1. **Task 1**: Find the highest-priority simulated alarm across the unit.
  2. **Task 2**: Open its details and determine if it is a sensor artifact or a true physiological emergency.
  3. **Task 3**: Identify the assigned patient and admission reason.
  4. **Task 4**: Acknowledge the alarm to silence audio urgency.
  5. **Task 5**: Locate the acknowledged alarm in the historical audit log.

#### Quantitative & Qualitative Results:

| Task | P1 Time | P2 Time | P3 Time | Success Rate | Observed Friction Points |
|---|---|---|---|---|---|
| **Task 1: Identify Critical** | 1.8s | 2.6s | 1.4s | 100% | None. The top pulsing banner and red card were spotted instantly. |
| **Task 2: Context Evaluation** | 4.2s | 6.5s | 3.1s | 100% | P2 took longer reading the confidence score; suggested bolder labels. |
| **Task 3: Identify Patient** | 2.1s | 2.9s | 1.8s | 100% | Patient ID (`P-101`) and diagnosis (`Post-CABG`) easily readable in header. |
| **Task 4: Acknowledge** | 2.4s | 3.1s | 1.9s | 100% | Clear feedback received via toast and badge update. |
| **Task 5: Find in History** | 3.5s | 5.2s | 3.8s | 100% | P2 clicked the nav pill; filtering by status was immediate. |

---

### 3. Method 2: Cognitive Walkthrough Summary

The cognitive walkthrough assessed whether a nurse could successfully navigate the **Emergency Triage to Resolution** workflow without external coaching:

- **Step 1 (Noticing the Alarm)**: *Will the user know what to do?* Yes. The urgent red triage banner and top critical counter guide attention preattentively.
- **Step 2 (Inspecting Rationale)**: *Is the correct action visible?* Yes. Large, high-contrast button `[Triage Alarm ➔]` is present directly inside the banner and card footer.
- **Step 3 (Distinguishing State)**: *Will the user understand the action?* Yes. `[Acknowledge Alarm]` is clearly distinguished from `[Mark as Resolved]`, avoiding premature alarm termination.
- **Step 4 (Interpreting System State)**: *Does the system provide immediate feedback?* Yes. A persistent toast message confirms the action, audio volume drops to muted status, and the badge turns ochre `[ACKNOWLEDGED by Nurse P. Sharma]`.

---

### 4. Method 3: Heuristic Evaluation Summary (Nielsen's 10 Principles)

| Nielsen Heuristic | Interface Feature Inspected | Compliance | Severity (0-4) | Iterative Improvement Implemented |
|---|---|---|---|---|
| **#1: Visibility of System Status** | Live vitals, alarm lifecycle badges, audio toggle state. | High | 1 (Minor) | Added animated pulse dot for nurse connectivity and clear audio toggle indicator. |
| **#2: Match System & Real World** | Clinical terminology (`SpO2`, `MAP`, `Pleth`, `CABG`, `Tachycardia`). | High | 0 | Aligned labels with standard medical bedside monitor terminology (IEC 60601-1-8). |
| **#3: User Control & Freedom** | Closing modal with `Esc` key or overlay tap; returning to dashboard. | High | 1 (Minor) | Implemented global `Escape` key handler and persistent "➔ Back to Dashboard" buttons. |
| **#4: Consistency & Standards** | Button styles, badge colors across Dashboard, Drawer, and History. | High | 0 | Strict adherence to CSS custom property tokens (`--crit-border`, `--warn-border`, etc.). |
| **#5: Error Prevention** | Accidental resolution of active critical alarms. | High | 2 (Medium) | Built dedicated confirmation dialog requiring selection of a resolution reason. |
| **#6: Recognition Rather than Recall** | Showing baseline target ranges alongside actual readings in alarm drawer. | High | 1 (Minor) | Added `(Target Baseline: >92%)` directly below triggered reading `88%`. |
| **#7: Flexibility & Efficiency** | Quick triage button in banner; search and filter pills in History. | High | 0 | Supported full-text search debounce and one-click severity filter pills. |
| **#8: Aesthetic & Minimalist Design** | Card layout density, subdued neutral backgrounds, no distracting fluff. | High | 0 | Clean healthcare color palette with 8:1 contrast ratios and no gratuitous 3D effects. |
| **#9: Recognize & Recover from Errors** | Empty search results in History; cancel buttons on resolution modal. | High | 0 | Clear friendly empty state with icon and "Reset search" prompt. |
| **#10: Help & Documentation** | Inline clinical protocol steps; disclaimer footer; scenario guide. | High | 0 | Clear step-by-step nursing guidelines shown inside the contextual triage drawer. |

---

### 5. Documented Design Improvements Between Iterations

1. **Iteration 1 → Iteration 2 (Post-Usability Testing)**:
   - *Problem*: Participants were uncertain whether clicking "Acknowledge" would remove the patient card from view while the patient was still hypoxic.
   - *Fix*: Kept card permanently visible in the active grid; changed its state from pulsing red `[CRITICAL]` to steady ochre `[ACKNOWLEDGED by Nurse P. Sharma]`, replaced the bell with a muted bell icon, and added a toast notification.
2. **Iteration 2 → Iteration 3 (Post-Cognitive Walkthrough)**:
   - *Problem*: Closing the detail drawer by clicking outside was not obvious to novice evaluators.
   - *Fix*: Added an explicit, high-contrast close button (`✕`) at the top-right corner of the modal, supported keyboard `Esc` key listener, and added background click-to-dismiss.
3. **Iteration 3 → Iteration 4 (Post-Heuristic Evaluation)**:
   - *Problem*: Heuristic #5 (Error Prevention) flagged that a nurse might accidentally tap "Resolve" while rushing, closing an active resuscitation case without documentation.
   - *Fix*: Added a two-step confirmation dialog (`#resolve-dialog-overlay`) requiring the nurse to choose a clinical reason before closing the alarm into the history log.

