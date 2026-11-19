# Week 2: User Goals and Feature Mapping

## 1. Primary User Goals (3–5 Defined Goals)

| Goal ID | User Goal | Clinical / Operational Need | Success Metric |
|---|---|---|---|
| **UG-1** | **Rapid Triage at a Glance** | Identify the most critical, life-threatening simulated alarm across all assigned beds in under 5 seconds without auditory confusion. | Nurse can visually identify Bed #, Priority, and Vital in <3 seconds without guessing. |
| **UG-2** | **Understand Alarm Context & Validity** | Determine *why* an alarm fired and whether it is a genuine physiological crisis or a technical/motion artifact before running to the bedside. | Nurse views cross-parameter correlation (e.g., SpO2 + HR + plethysmograph) and root-cause hypothesis in 1 click. |
| **UG-3** | **Acknowledge and Assign Ownership** | Acknowledge an alarm to silence auditory urgency and inform team members that someone is responding, while keeping the patient visibly flagged. | 1-click acknowledgement with caregiver tag and visual state change from "Active" to "Acknowledged". |
| **UG-4** | **Resolve and Log Clinical Intervention** | Once the patient is stabilized or the sensor is replaced, resolve the alarm with an audit note, removing it from active alerts and updating history. | Clear resolution modal with required confirmation, preventing accidental dismissal. |
| **UG-5** | **Review Alarm History & Shift Audit** | Review historical alarm frequency, response latency, and false-positive rates during nursing shift handover or debriefs. | Filterable audit log showing timestamps, acting nurse, severity, and resolution remarks. |

---

## 2. Feature and Content Mapping Matrix

To support these 5 user goals, the dashboard specifies the following exact features and content items:

```
┌────────────────────────────┬──────────────────────────────────────┬────────────────────────────────────────┐
│ User Goal                  │ Required Features                    │ Screen Content & Elements              │
├────────────────────────────┼──────────────────────────────────────┼────────────────────────────────────────┤
│ UG-1: Rapid Triage         │ • Unit-wide priority counters        │ • Red "Critical (1)", Amber "Warning   │
│                            │ • Sorted alarm queue (severity first)│   (1)", Cyan "Advisory (1)" badges.    │
│                            │ • Bedside patient cards with live    │ • High-contrast typography & icons.    │
│                            │   vital telemetry.                   │ • Bed number, patient name, diagnosis. │
├────────────────────────────┼──────────────────────────────────────┼────────────────────────────────────────┤
│ UG-2: Understand Context   │ • Deep-dive alarm detail modal/drawer│ • Baseline normal range vs actual.     │
│                            │ • Multi-parameter correlation widget │ • "Confidence Score: 96% Clinical".    │
│                            │ • Suspected root-cause hypothesis    │ • Sensor contact impedance status.     │
│                            │ • Clinical protocol recommendation   │ • Step-by-step nursing guidelines.     │
├────────────────────────────┼──────────────────────────────────────┼────────────────────────────────────────┤
│ UG-3: Acknowledge & Assign │ • Tri-state action bar               │ • Primary button: "Acknowledge Alarm". │
│                            │ • Immediate visual feedback banner   │ • Modal prompt for Nurse ID / Note.    │
│                            │ • Status badge update (Active → Ack) │ • Toast notification: "Bed 01 Alarm    │
│                            │ • Audio suppression toggle           │   Acknowledged by Nurse P. Sharma".    │
├────────────────────────────┼──────────────────────────────────────┼────────────────────────────────────────┤
│ UG-4: Resolve & Log        │ • Resolve action with confirmation   │ • "Mark as Resolved" button.           │
│                            │ • Resolution reason selector         │ • Pre-set resolution reasons:          │
│                            │ • Real-time removal from active feed │   "Patient Stabilized", "Sensor        │
│                            │ • Shift event emitter                │   Replaced", "Medication Administered".│
├────────────────────────────┼──────────────────────────────────────┼────────────────────────────────────────┤
│ UG-5: Alarm History Audit  │ • Dedicated Alarm History view       │ • Data table with columns: Date/Time,  │
│                            │ • Multi-criteria filter bar          │   Bed, Severity, Type, Nurse, Status.  │
│                            │ • Full-text search by patient or ID  │ • Export / summary count pills.        │
│                            │ • Detailed historical audit log      │ • Empty state feedback for no results. │
└────────────────────────────┴──────────────────────────────────────┴────────────────────────────────────────┘
```

---

## 3. Human Factors & Feedback States Architecture
In high-stress ICU environments, system responsiveness must follow strict Norman principles of interaction:
1. **Waiting State**: Highlighting loading skeletons during scenario injection; no blocking spinners that hide critical vitals.
2. **Mistake & Error Prevention (Slips vs Mistakes)**:
   - "Resolve Alarm" requires explicit 1-click confirmation or resolution reason selection to prevent accidental closure of a dying patient's monitor.
   - Acknowledgement never closes or deletes the alarm; it shifts state to `Acknowledged` with an audible mute icon, preserving accountability.
3. **Task Completion Feedback**:
   - Clear, accessible toast notifications (auto-dismiss in 4 seconds, color-coded green/blue, accessible to screen readers).
   - Immediate DOM badge transition with animated border flash to confirm action persistence.

