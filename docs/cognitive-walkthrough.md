# Cognitive Walkthrough Report

## 1. Methodology & Evaluation Framework
A formal Cognitive Walkthrough (Wharton et al., 1994) was conducted to evaluate the learnability, cognitive friction, and action mappings of the **Smart ICU Alarm Fatigue Management Dashboard**.

For each step within the primary nursing user journeys, four standardized cognitive questions derived from Donald Norman’s Action Cycle were examined:
1. **Goal Formation**: *Will the user try to achieve the right effect?*
2. **Action Affordance & Visibility**: *Will the user notice that the correct action is available?*
3. **Semantic Mapping**: *Will the user associate the correct action with the effect they are trying to achieve?*
4. **System Feedback & Gulf of Evaluation**: *If the correct action is performed, will the user understand that progress has been made?*

---

## 2. Journey 1: Acute Emergency Triage (Bed 01 Hypoxemia)
**User Persona**: Nurse Priya Sharma, RN  
**Goal**: Identify and inspect the critical desaturation event on Bed 01.

| Step | Action Required | Q1: Will user try to achieve right effect? | Q2: Is correct action visible? | Q3: Is semantic mapping clear? | Q4: Does system provide clear feedback? | Walkthrough Verdict & Notes |
|---|---|---|---|---|---|---|
| **1.1** | Glance at dashboard upon alarm onset. | **Yes**: The nurse needs to know which bed is in crisis immediately. | **Yes**: The top triage banner is pulsing crimson, and the `[1 CRITICAL]` metric counter is highlighted. | **Yes**: Red universally maps to life threat in healthcare monitors. | **Yes**: The banner displays: *"Bed 01 — Severe Hypoxemia with Tachycardia"*. | **PASS**: Preattentive processing completes in under 200ms. |
| **1.2** | Click `[Triage Immediately ➔]` on banner or Bed 01 card. | **Yes**: Nurse wants to review parameters before reaching bedside. | **Yes**: Prominent button in the banner and on Bed 01 card. | **Yes**: Button label explicitly states *"Triage Immediately"*. | **Yes**: Slide-in modal drawer opens smoothly with dark backdrop. | **PASS**: High affordance, no ambiguous icons. |
| **1.3** | Review violated parameters and clinical context. | **Yes**: Nurse needs to verify if reading is genuine or sensor artifact. | **Yes**: Parameter grid shows actual reading (88%) next to normal baseline target (>92%). | **Yes**: Multi-parameter correlation clearly states: *"96% True Physiological Event"*. | **Yes**: High readability with contrasting boxes for trigger, context, and protocol. | **PASS**: Prevents cognitive overload by synthesizing data. |

---

## 3. Journey 2: Alarm Acknowledgment & Team Ownership
**User Persona**: Nurse Priya Sharma, RN  
**Goal**: Silence the loud audible alarm and signal to colleagues that Bed 01 is actively being attended.

| Step | Action Required | Q1: Will user try to achieve right effect? | Q2: Is correct action visible? | Q3: Is semantic mapping clear? | Q4: Does system provide clear feedback? | Walkthrough Verdict & Notes |
|---|---|---|---|---|---|---|
| **2.1** | Locate acknowledgment button in modal. | **Yes**: Nurse wants to silence audio and take responsibility. | **Yes**: Ochre button `[🔔 Acknowledge Alarm]` is visible in the modal footer. | **Yes**: Bell icon and text communicate muting and ownership. | **Yes**: Hover state brightens button. | **PASS**: High visibility in footer action bar. |
| **2.2** | Click `[🔔 Acknowledge Alarm]`. | **Yes**: Caregiver commits the action. | **Yes**: Button is directly clickable. | **Yes**: Action directly triggers acknowledgment handler. | **Yes**: Audible chime drops; yellow toast appears: *"Alarm ALM-001 Acknowledged by Nurse P. Sharma"*; card turns ochre. | **PASS**: Crucial improvement: alarm does NOT disappear from view. |

---

## 4. Journey 3: Clinical Resolution & Shift Audit Trail
**User Persona**: Nurse Priya Sharma, RN  
**Goal**: Mark patient as stabilized after airway suctioning, log the intervention, and update history.

| Step | Action Required | Q1: Will user try to achieve right effect? | Q2: Is correct action visible? | Q3: Is semantic mapping clear? | Q4: Does system provide clear feedback? | Walkthrough Verdict & Notes |
|---|---|---|---|---|---|---|
| **3.1** | Re-open Bed 01 drawer and click `[✅ Mark as Resolved]`. | **Yes**: Patient has stabilized; nurse wants to clear alert state. | **Yes**: Green button is prominent in modal footer. | **Yes**: "Mark as Resolved" indicates permanent closure. | **Yes**: Opens Resolution Confirmation Dialog overlay. | **PASS**: Error-prevention dialog prevents accidental dismissal. |
| **3.2** | Select reason: *"Airway Cleared & SpO2 Restored"* and confirm. | **Yes**: Nurse documents clinical rationale. | **Yes**: Dropdown list contains realistic clinical reasons; textarea is provided. | **Yes**: "Confirm & Resolve" button completes workflow. | **Yes**: Patient status changes to calm green `[STABLE]`; toast confirms logging; alarm moves to history table. | **PASS**: Seamless transition with full audit fidelity. |
| **3.3** | Verify event in `[Alarm History]`. | **Yes**: Nurse wants to verify shift documentation. | **Yes**: Persistent navigation tab `[📋 Alarm History]` is at the top of the screen. | **Yes**: Tab title maps directly to history. | **Yes**: History table lists ALM-001 with timestamps, nurse name, and "Resolved" badge. | **PASS**: Zero cognitive friction. |

---

## 5. Summary of Walkthrough Findings
- **Gulf of Execution**: Extremely low. Primary actions are surfaced with descriptive textual labels (`Triage Immediately`, `Acknowledge Alarm`, `Mark as Resolved`) rather than cryptic icons.
- **Gulf of Evaluation**: Minimized through immediate multi-modal feedback: audible tone dampening, visual badge state color changes, and persistent toast notifications.

