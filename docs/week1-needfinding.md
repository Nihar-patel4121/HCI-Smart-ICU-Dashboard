# Week 1: Understand Your Users (Needfinding)
## Official Timeline: October 11 – 16

### 1. Needfinding & Contextual Inquiry Overview
During the initial needfinding stage, the study examined the clinical workflows and operational pressures facing nurses working in Intensive Care Units (ICUs). ICU nurses maintain responsibility for 2 to 4 critically ill patients concurrently, each wired to multiple medical devices (e.g., bedside multi-parameter monitors, mechanical ventilators, infusion pumps, arterial line transducers).

#### Observational Insights from Contextual Inquiry:
1. **Auditory Saturation**: An ICU nurse is subjected to an estimated 150 to 350 audible alarms per patient per day. The sheer volume makes it nearly impossible to distinguish true emergencies from minor transient dips by audio cues alone.
2. **False Positives & Motion Artifacts**: Over 80% of alarms trigger because of patient movement, coughing, or loosening of surface electrode patches (e.g., ECG lead impedance fluctuations).
3. **Information Fragmentation**: Standard bedside monitors alert the nurse to an isolated threshold violation (e.g., "HR 125 High") without clarifying whether the arterial line or pulse oximeter corroborate acute deterioration.
4. **Disruption of Patient Care**: Nurses frequently have to drop sterile procedures or medication administration just to walk over and silence a nuisance alarm.

---

### 2. Empathy Map: ICU Nursing Staff

An empathy map was synthesized to ground all subsequent interaction design decisions in real human experiences:

```
┌───────────────────────────────────────────────┬──────────────────────────────────────────────┐
│                  SAYS                         │                   THINKS                     │
├───────────────────────────────────────────────┼──────────────────────────────────────────────┤
│ • "I can't tell if that beep in Bed 4 is an   │ • "I hope this continuous beeping isn't      │
│   emergency or just an electrode slipping."   │   masking a real arrest in Bed 1."           │
│ • "I spend half my shift walking across the   │ • "I want to care for my patients, not spend │
│   unit just to silence non-actionable alarms."│   my shift pressing 'Silence' on machines."  │
│ • "Why doesn't the monitor notice the patient │ • "If a sensor falls off, don't yell at me   │
│   is coughing before it sounds like an arrest?│   like the patient is dying; tell me calmly."│
├───────────────────────────────────────────────┼──────────────────────────────────────────────┤
│                  DOES                         │                   FEELS                      │
├───────────────────────────────────────────────┼──────────────────────────────────────────────┤
│ • Hurries between beds to visually check if   │ • Anxious and hyper-vigilant during peak     │
│   chest rise matches monitor numbers.         │   medication and shift turnover rounds.      │
│ • Manually silences alarms before checking    │ • Mentally exhausted and drained by constant │
│   the patient due to ear-piercing beeps.      │   auditory pollution.                        │
│ • Re-tapes electrode leads repeatedly.        │ • Frustrated when false alarms disrupt deep  │
│ • Relies on intuition and peer shouts rather  │   care moments with delicate patients.       │
│   than trusting raw monitor alerts.           │ • Overwhelmed by cluttered monitor displays. │
└───────────────────────────────────────────────┴──────────────────────────────────────────────┘
```

---

### 3. User Personas

#### Persona 1: Senior ICU Staff Nurse
- **Name**: Priya Sharma, B.Sc. Nursing, RN
- **Experience**: 8 years in Cardiothoracic & Surgical ICUs
- **Workload**: Manages 3–4 post-operative surgical patients per 12-hour shift.
- **Goals**:
  - Quickly scan the unit dashboard to spot genuine physiological crises before brain or cardiac injury occurs.
  - Prioritize her physical interventions so critical patients receive immediate care while stable patients are not neglected.
  - Have transparent audit trails for shift handovers so colleagues know which alarms were reviewed and why.
- **Frustrations**:
  - Constant sensory assault from monitors makes sustained concentration difficult.
  - Monitors that treat an unplugged cable with the same shrill auditory priority as ventricular tachycardia.
- **HCI Implications**:
  - Needs glanceable visual priority coding (Critical vs Warning vs Advisory).
  - Needs one-tap acknowledgement that silences alarm sounds but keeps the clinical item visibly tracked until resolved.

#### Persona 2: Junior ICU Nurse / Resident Nurse
- **Name**: Rahul Verma, GNM, Staff Nurse
- **Experience**: 1 year in Medical ICU
- **Workload**: Manages 2 high-dependency beds under senior supervision.
- **Goals**:
  - Accurately interpret complex, multi-vital alarms without second-guessing himself.
  - Receive contextual explanation (e.g., whether a heart rate spike is corroborated by blood pressure and SpO2).
  - Learn standard operating protocols through clear system guidance.
- **Frustrations**:
  - Fear of missing a subtle cardiac deterioration while distracted by a loose cable alarm.
  - Cluttered monitor menus where finding historical trends requires five deep menu taps.
- **HCI Implications**:
  - Needs clear context cards indicating "Suspected Cause" and "Recommended Action".
  - Needs an intuitive, error-preventing interface that distinguishes "Acknowledged" from "Resolved".

---

### 4. One-Page Summary: Users and Problem Statement

#### Who are the users?
The primary users are **ICU registered nurses and bedside clinical caregivers**. Secondary users include charge nurses, ICU intensivists, and clinical engineering teams reviewing alarm history during quality audits.

#### What is the exact problem?
Commercial ICU monitors generate an unsustainable volume of alerts—often hundreds per shift per nurse. Because the vast majority are nuisance alarms caused by transient movements or high threshold sensitivity, nurses develop **Alarm Fatigue**. This cognitive overload leads to desensitization, slower response times, missed critical events, and heightened workplace burnout.

#### How does our solution address this?
Our **Smart ICU Alarm Fatigue Management Dashboard** redesigns the human-monitor relationship:
1. **Intelligent 3-Tier Categorization**:
   - **Critical (Red)**: Imminent life threat confirmed across multi-parameter telemetry (e.g., desaturation backed by tachycardia).
   - **Warning (Amber)**: Physiological trend drifts requiring clinical review within minutes.
   - **Advisory (Cyan/Blue)**: Technical artifacts, loose leads, or infusion completion warnings—distinctly presented without ear-piercing auditory stress.
2. **Contextual Explanation Engine**: Shows *why* an alarm fired, sensor confidence scores, and multi-vital correlation.
3. **Rigorous Tri-State Alarm Management**: Enforces clear state transitions: `Active` (unaddressed) → `Acknowledged` (caregiver assigned, noise silenced, pending check) → `Resolved` (patient stabilized, logged in audit history).

