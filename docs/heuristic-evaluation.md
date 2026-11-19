# Heuristic Evaluation Report (Nielsen’s 10 Usability Heuristics)

## 1. Evaluation Overview
This evaluation audits the **Smart ICU Alarm Fatigue Management Dashboard** against Jakob Nielsen’s 10 Usability Heuristics for User Interface Design.

### Severity Rating Scale (Nielsen):
- **0 = No Problem**: Does not impact usability.
- **1 = Cosmetic Problem Only**: Need not be fixed unless extra time is available.
- **2 = Minor Usability Problem**: Low priority; fixing will improve user efficiency.
- **3 = Major Usability Problem**: High priority; causes notable user confusion or delayed triage.
- **4 = Usability Catastrophe**: Critical imperative; prevents clinical task completion or causes medical error.

---

## 2. Comprehensive Heuristic Audit Matrix

### Heuristic 1: Visibility of System Status
- **Inspection**: Real-time telemetry indicators, live patient vital updates, alarm lifecycle badges (`Active`, `Acknowledged`, `Resolved`), and audio status.
- **Compliance**: **High**.
- **Observed Issue**: Early wireframes lacked indication of whether the nurse was actively connected to the telemetry central network.
- **Severity**: **1 (Cosmetic / Minor)**.
- **Improvement Implemented**: Added a pulsating green status dot next to `"Nurse Priya Sharma (RN)"` in the top header and a distinct sound toggle pill (`🔊 Sound: On / 🔇 Sound: Off`).

---

### Heuristic 2: Match Between System and the Real World
- **Inspection**: Terminology, vital sign abbreviations, and clinical units.
- **Compliance**: **High**.
- **Observed Issue**: Non-standard vital sign groupings in initial sketches.
- **Severity**: **0 (No Problem)**.
- **Improvement Implemented**: Standardized on standard ICU bedside conventions: `HR (bpm)`, `SpO2 (%)`, `NIBP / Art-Line MAP (mmHg)`, and `RR (/min)` compliant with IEC 60601-1-8 medical device standards.

---

### Heuristic 3: User Control and Freedom
- **Inspection**: Ability to cancel actions, close modals, and return from deep patient views.
- **Compliance**: **High**.
- **Observed Issue**: Users initially had to click a small close button to dismiss the alarm drawer.
- **Severity**: **2 (Minor Usability Problem)**.
- **Improvement Implemented**: Added global keyboard `Escape` listener, backdrop click-to-dismiss, and explicit `"➔ Back to Dashboard"` buttons on all secondary views.

---

### Heuristic 4: Consistency and Standards
- **Inspection**: Color coding, button styles, typography, and navigation patterns.
- **Compliance**: **High**.
- **Observed Issue**: In early drafts, acknowledged alarms used conflicting blue and yellow tints.
- **Severity**: **1 (Minor Usability Problem)**.
- **Improvement Implemented**: Standardized on a centralized CSS token system (`variables.css`):
  - **Crimson Red (`#ef4444`)**: Critical alarms and immediate life threats.
  - **Amber Orange (`#f59e0b`)**: Warnings and physiological drift.
  - **Sky Blue (`#38bdf8`)**: Advisories and technical sensor artifacts.
  - **Ochre Yellow (`#ca8a04`)**: Acknowledged states under active care.
  - **Medical Green (`#22c55e`)**: Stable and resolved states.

---

### Heuristic 5: Error Prevention
- **Inspection**: Prevention of accidental dismissal or premature resolution of active alarms.
- **Compliance**: **High**.
- **Observed Issue**: In early concepts, clicking "Acknowledge" risked accidentally terminating the active alarm feed for other team members.
- **Severity**: **3 (Major Usability Problem)**.
- **Improvement Implemented**: Separated the alarm lifecycle into a strict tri-state model:
  1. `Acknowledge`: Silences audio, marks ownership, but **keeps patient card visible in active queue**.
  2. `Resolve`: Protected behind a dedicated confirmation dialog requiring the nurse to select a resolution reason from a validated clinical dropdown list.

---

### Heuristic 6: Recognition Rather than Recall
- **Inspection**: Showing baseline physiological targets directly alongside triggered values.
- **Compliance**: **High**.
- **Observed Issue**: Junior nurses had to recall normal SpO2 and MAP ranges from memory when reviewing atypical alarms.
- **Severity**: **2 (Minor Usability Problem)**.
- **Improvement Implemented**: Every triggered vital reading in the detail drawer now displays its target reference range (e.g., `SpO2: 88% ↓ (Target Baseline: >92%)`).

---

### Heuristic 7: Flexibility and Efficiency of Use
- **Inspection**: Shortcuts for expert nurses; search and filter controls in history.
- **Compliance**: **High**.
- **Observed Issue**: Locating previous shift alarms required scrolling through a long unindexed table.
- **Severity**: **2 (Minor Usability Problem)**.
- **Improvement Implemented**: Implemented dynamic search filtering (searches alarm ID, patient name, bed, and attending nurse) plus one-click priority filter pills (`All`, `Critical`, `Warning`, `Advisory`).

---

### Heuristic 8: Aesthetic and Minimalist Design
- **Inspection**: Visual hierarchy, clutter reduction, typography, and density.
- **Compliance**: **High**.
- **Observed Issue**: Traditional commercial ICU monitors display cluttered waveform menus that obscure actionable numbers.
- **Severity**: **1 (Minor Usability Problem)**.
- **Improvement Implemented**: Used purposeful whitespace, high-contrast healthcare typography, compact vital blocks, and eliminated all gratuitous decorative 3D gradients and non-functional buttons.

---

### Heuristic 9: Help Users Recognize, Diagnose, and Recover from Errors
- **Inspection**: Empty states, invalid search terms, confirmation dialog cancellation.
- **Compliance**: **High**.
- **Observed Issue**: When a search returned no results, the history table was blank with no explanation.
- **Severity**: **1 (Minor Usability Problem)**.
- **Improvement Implemented**: Designed an informative empty-state component displaying an icon, friendly explanation, and prompt to reset the search filters.

---

### Heuristic 10: Help and Documentation
- **Inspection**: Inline clinical guidance, simulation scenario instructions, and academic disclaimers.
- **Compliance**: **High**.
- **Observed Issue**: New nurses may not know the recommended protocol when an alarm fires.
- **Severity**: **1 (Minor Usability Problem)**.
- **Improvement Implemented**: Integrated a dedicated `"Recommended Clinical Protocol"` checklist inside the detail drawer for every alarm category, plus an interactive scenario selector in the top toolbar.

---

## 3. Peer Evaluation Protocol & Rubric
To fulfill the requirement to *"Swap with a peer group and evaluate each other's work"*, the project includes a standardized peer review scoring sheet (`evaluation/peer-evaluation-template.md`) covering:
- **Clarity of Prioritization**: Can a peer group evaluator distinguish critical from advisory alerts in < 3 seconds?
- **Workflow Integrity**: Does acknowledgment preserve accountability?
- **Aesthetic Density**: Is the healthcare interface free from distracting visual noise?

