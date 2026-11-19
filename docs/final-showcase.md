# Week 7: Final Showcase Presentation Guide & Demonstration Script
## Official Timeline: November 17 – 20

### 1. Final Showcase Deliverables Checklist
In strict adherence to the official guidelines:
- [x] **Deliverable 1: Paper / Cardboard Prototype**: Fabricated using printable sheets (`paper-prototype/printable-screens/printable_paper_prototype.html`), mounted on cardboard frame with sliding triage drawer.
- [x] **Deliverable 2: Functional Proof of Concept (PoC)**: Fully working web application (`prototype/index.html`) demonstrating real-time prioritization, context extraction, tri-state lifecycle, and historical audit logging.
- [x] **Deliverable 3: Final Presentation Slide Deck**: Comprehensive 15-slide PowerPoint deck (`presentation/final-presentation.pptx`) and presentation script.
- [x] **Deliverable 4: Evaluation Portfolio**: Empirical usability test results, cognitive walkthrough, Nielsen's heuristic evaluation, and peer evaluation rubric.

---

### 2. Slide-by-Slide Presentation Structure (15 Slides)

1. **Slide 1: Title & Team**: Smart ICU Alarm Fatigue Management Dashboard — An HCI Approach to Bedside Clinical Decision Support.
2. **Slide 2: Clinical Problem Statement**: Up to 99% of ICU alarms are non-actionable; alarm fatigue leads to nurse desensitization and missed life-threatening events.
3. **Slide 3: Target Users & Clinical Context**: Intensive Care Unit staff nurses, charge nurses, and intensivists managing 2–4 high-acuity beds.
4. **Slide 4: Week 1 Needfinding Findings**: Contextual inquiry insights, auditory saturation (150–350 alarms/patient/day), and sensor artifact frequency.
5. **Slide 5: User Personas & Empathy Map**: Nurse Priya Sharma (Senior RN, cognitive overload) and Nurse Rahul Verma (Junior RN, fear of false alarms).
6. **Slide 6: Week 2 User Goals**: 5 primary goals: Rapid triage, context evaluation, safe acknowledgment, clinical resolution, and shift audit.
7. **Slide 7: Paper Prototype & Storyboard**: Initial wireframe sketches, comic storyboard, and early physical prototype testing with 3 evaluators.
8. **Slide 8: Architecture & Design System**: Color-coded 3-tier hierarchy (Critical, Warning, Advisory), IEC 60601-1-8 medical audio tones, and typography.
9. **Slide 9: Working Proof of Concept Overview**: Tech stack (HTML5/CSS3/Vanilla JS), zero-dependency local execution, and responsive layout.
10. **Slide 10: Core Feature 1 — Multi-Patient Telemetry & Prioritization**: Bedside vitals grid, pulsing critical banner, and preattentive visual triage.
11. **Slide 11: Core Feature 2 — Contextual Triage Drawer**: Multi-parameter correlation, root-cause hypothesis (airway compromise vs lead dry-out), and protocol steps.
12. **Slide 12: Core Feature 3 — Unambiguous Tri-State Lifecycle**: Strict separation of `Active` → `Acknowledged` (silences audio, maintains visibility) → `Resolved` (confirmation dialog).
13. **Slide 13: Weeks 5–6 Evaluation — Usability Testing**: Mean time-to-triage of 1.93s, 100% completion rate across 5 standardized clinical tasks.
14. **Slide 14: Cognitive Walkthrough & Heuristic Iterations**: How feedback directly motivated persistent navigation, confirmation dialogs, and baseline reference tags.
15. **Slide 15: Conclusion & Future Work**: Academic PoC summary, human-centered takeaways, and prospective clinical telemetry integration.

---

### 3. Step-by-Step Live Viva Demonstration Script

#### Act 1: The Ambient Baseline & Sensory Overload (1 Minute)
- **Action**: Open `prototype/index.html` in Chrome or Edge. Ensure sound is turned on (`🔊 Sound: On`).
- **Narrative**:
  > *"Respected evaluators, modern ICU nurses manage multiple critically ill patients simultaneously. Commercial bedside monitors treat loose wires with the same shrill sirens as cardiac arrest. Here is our dashboard representing Ward 4B with 6 monitored beds. Notice that our top banner immediately indicates: 1 Critical, 1 Warning, and 1 Advisory."*

#### Act 2: Triage & Preattentive Detection (< 30 Seconds)
- **Action**: Point to the top pulsing banner and Bed 01 card.
- **Narrative**:
  > *"Without scanning all numbers, Nurse Priya instantly identifies Bed 01. The crimson banner highlights: 'Severe Hypoxemia with Tachycardia — SpO2: 88% | HR: 128 bpm'. In contrast, Bed 04 is an Advisory (Lead V4 impedance degradation), which has been silenced to eliminate nuisance auditory fatigue."*

#### Act 3: Opening Context & Cross-Validation (1 Minute)
- **Action**: Click `[Triage Immediately ➔]` on the banner.
- **Narrative**:
  > *"When Priya opens the alarm drawer, she doesn't just see a raw number. Our Smart Context engine correlates the pulse oximeter with the heart rate and plethysmograph waveform: 'High Confidence (96%) - True Physiological Event. Tachycardia (128 bpm) confirms active sympathetic response to oxygen deficit.' Priya also sees the baseline target (>92%) and the recommended bedside suctioning protocol."*

#### Act 4: Acknowledging the Alarm (30 Seconds)
- **Action**: Click `[🔔 Acknowledge Alarm]`.
- **Narrative**:
  > *"Priya taps Acknowledge. Notice what happens: The audible tone is silenced, a yellow toast notification confirms the action, and the card updates to 'ACKNOWLEDGED by Nurse Priya Sharma'. Crucially, the alarm does NOT disappear from the screen. Her colleagues know Priya is attending Bed 01."*

#### Act 5: Bedside Resolution & Confirmation Dialog (1 Minute)
- **Action**: Click Bed 01 card again, then click `[✅ Mark as Resolved]`.
- **Narrative**:
  > *"Once Priya suctions the patient's airway and SpO2 recovers to 96%, she marks the alarm as resolved. To prevent medical slips, our system displays a confirmation dialog. She selects 'Airway Cleared & SpO2 Restored', types 'Suctioned airway, O2 flow adjusted', and clicks Confirm. Bed 01 turns calm green 'STABLE'."*

#### Act 6: Shift Handover & Audit Log (1 Minute)
- **Action**: Click `[📋 Alarm History]` on the top navigation bar.
- **Narrative**:
  > *"During shift handover, incoming nurses don't have to guess what happened overnight. The Alarm History log documents every event: trigger timestamp, acting nurse, resolution category, and notes. We can filter by Bed, by Severity, or search for any nurse's name."*

#### Act 7: Demonstrating New Scenarios (1 Minute)
- **Action**: In the top purple bar, select `Scenario 2: Acute Ventilator Disconnect (Bed 02)`.
- **Narrative**:
  > *"Finally, our demo engine allows examiners to test edge cases. Here, an acute ventilator disconnect occurs on Bed 02: expiratory volume drops to 0.0, an urgent alarm sounds, and the dashboard immediately escalates Bed 02 to critical status. We can also click 'Reset Baseline' at any time."*

