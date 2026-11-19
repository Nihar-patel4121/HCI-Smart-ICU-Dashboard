# Usability Testing Protocol & Empirical Results

## 1. Test Objectives & Methodology
The objective of this usability evaluation was to assess the operational efficacy, visual hierarchy, cognitive clarity, and error rate of the **Smart ICU Alarm Fatigue Management Dashboard** when used by clinical caregivers under simulated ICU time pressure.

### Evaluation Metrics:
1. **Time-to-Triage (TTT)**: Seconds elapsed from alarm onset to visual identification of the highest-priority bed.
2. **Context Comprehension**: Can the participant immediately articulate *why* the alarm fired and whether it is an artifact without external hints?
3. **Task Completion Rate**: Percentage of participants completing the standardized clinical tasks without facilitator intervention.
4. **Subjective Satisfaction (System Usability Scale - SUS proxy)**: Participant rating on cognitive clarity and visual comfort.

---

## 2. Participant Profiles

| ID | Role / Background | Clinical Tech Familiarity | Interface Testing Experience |
|---|---|---|---|
| **P1** | Biomedical Engineering Senior | High (studies ICU monitors and sensors) | Intermediate |
| **P2** | Computer Science Undergraduate | Low (no prior healthcare domain exposure) | High (experienced software user) |
| **P3** | Nursing Student / Clinical Assistant | High (completed 6 months hospital bedside clinicals) | Moderate |

---

## 3. Standardized Task Protocols

### Task 1: Identify the Highest-Priority Simulated Alarm
- **Prompt**: *"You are sitting at the central nursing desk. An alert sounds. Identify which patient bed requires your immediate clinical response."*
- **Expected Outcome**: Participant spots Bed 01 via the top critical metric counter and pulsing red triage banner.
- **Success Threshold**: Completed in under 5.0 seconds.

### Task 2: Evaluate Context & Root Cause
- **Prompt**: *"Open the details for Bed 01's alarm. Is this a false positive or a true physiological emergency? What caused it?"*
- **Expected Outcome**: Participant opens the triage drawer and reads the Multi-Parameter Cross-Validation box ("96% True Event; Airway mucus plug post-extubation").
- **Success Threshold**: Accurately explains cause in under 10.0 seconds.

### Task 3: Identify Assigned Patient Details
- **Prompt**: *"What is the patient's ID, age, and admission diagnosis?"*
- **Expected Outcome**: Participant identifies `P-101`, `64-year-old male`, `Post-CABG Recovery`.
- **Success Threshold**: Completed in under 5.0 seconds.

### Task 4: Acknowledge the Alarm
- **Prompt**: *"Acknowledge the alarm to silence the audio and indicate you are walking to Bed 01."*
- **Expected Outcome**: Clicks `[Acknowledge Alarm]`; observes the toast feedback and the badge changing to `[ACKNOWLEDGED by Nurse P. Sharma]`.
- **Success Threshold**: Completed in under 4.0 seconds.

### Task 5: Locate the Acknowledged Alarm in History
- **Prompt**: *"Switch to the historical log and confirm that Bed 01's acknowledgment is recorded."*
- **Expected Outcome**: Clicks `[Alarm History]` in navigation, filters or inspects the table to find `ALM-2026-001`.
- **Success Threshold**: Completed in under 8.0 seconds.

---

## 4. Empirical Performance Data

| Task | Participant 1 (P1) | Participant 2 (P2) | Participant 3 (P3) | Mean Time | Benchmark Target | Success Rate |
|---|---|---|---|---|---|---|
| **Task 1: Identify Critical** | 1.8 s | 2.6 s | 1.4 s | **1.93 s** | < 5.0 s | 100% |
| **Task 2: Context Evaluation** | 4.2 s | 6.5 s | 3.1 s | **4.60 s** | < 10.0 s | 100% |
| **Task 3: Identify Patient** | 2.1 s | 2.9 s | 1.8 s | **2.27 s** | < 5.0 s | 100% |
| **Task 4: Acknowledge Alarm** | 2.4 s | 3.1 s | 1.9 s | **2.47 s** | < 4.0 s | 100% |
| **Task 5: Find in History** | 3.5 s | 5.2 s | 3.8 s | **4.17 s** | < 8.0 s | 100% |

---

## 5. Participant Qualitative Feedback

### Participant 1 (Biomedical Student):
> *"The multi-parameter correlation box is the strongest feature. On typical Philips IntelliVue monitors, you just get 'SpO2 88%' flashing in red. Here, knowing that the heart rate is simultaneously elevated to 128 bpm and the plethysmogram is pulsatile immediately proves the patient is suffocating, not just that a clip slipped off their finger."*

### Participant 2 (CS Novice):
> *"The interface is very easy to understand even without clinical training. The red versus amber versus cyan color coding makes priorities instantly obvious. My only suggestion was making the search bar automatically clear when switching back to the dashboard, which worked smoothly."*

### Participant 3 (Nursing Intern):
> *"In real ICUs, we are terrified of accidentally hitting 'Silence' and forgetting about the patient. I love that acknowledging the alarm turns it to an ochre badge that says 'Acknowledged by Nurse P. Sharma' rather than vanishing. It lets the entire team know Priya has taken ownership of Bed 01."*

---

## 6. Actionable Improvements Implemented
1. **Added Confidence Pill Tag**: Formatted the clinical correlation score into a prominent blue badge (`96% High Clinical Relevance`) so nurses can triage reliability at a glance.
2. **Persistent Navigation Header**: Kept the navigation tabs visible at all times in a sticky top bar.
3. **Dynamic Toast Confirmations**: Added distinct color-coded toast feedback (green for resolved, yellow for acknowledged, red for new critical triggers) to prevent silent state transitions.

