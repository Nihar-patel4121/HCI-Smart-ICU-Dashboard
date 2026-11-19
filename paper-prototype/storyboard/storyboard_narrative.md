# Storyboard Narrative: End-to-End Clinical Use Case

## Protagonist & Shift Setting
- **Nurse**: Nurse Priya, ICU Staff Nurse (RN, On Duty)
- **Station**: ICU Ward 4 Central Nursing Desk & Bedside Telemetry
- **Representative Beds**: 3 Beds (Bed 1: Rajesh Kumar [Critical], Bed 2: Sunita Devi [Warning], Bed 3: Amit Patel [Stable])
- **Clinical Moment**: Multi-tier alarm triage during intensive care monitoring.

---

### Frame 1: Multi-Tier Alarm Detection (The Clinical Challenge)
During rounds at 11:55 hrs, multiple telemetry signals register at once. 
Instead of shrill, unprioritized screeching across all devices:
- **Bed 1 (Rajesh Kumar)** experiences a sudden acute oxygen drop down to 88% with heart rate spiking to 125 bpm and blood pressure dropping to 70 mmHg (post-heart surgery).
- **Bed 2 (Sunita Devi)** breathes rapidly at 26 breaths/min (pneumonia recovery).
- **Bed 4 (Meena Sharma)** has an ECG chest sticker slip loose during movement in bed.

---

### Frame 2: Glanceable Triage on Central Dashboard (Screen 1)
Nurse Priya glances at the **Smart ICU Alarm Dashboard** above the central station desk:
- **Top Active Alerts Feed**: Stratifies all three active situations cleanly in color-coded strips:
  1. `🚨 CRITICAL`: Bed 1 — Severe Oxygen Drop (SpO2 88%, HR 125, BP 70 mmHg) ➔ `[Inspect Bed 1 ➔]`
  2. `⚠️ WARNING`: Bed 2 — Fast Breathing (26/min, SpO2 91%, BP 89 mmHg) ➔ `[Inspect Bed 2 ➔]`
  3. `ℹ️ SENSOR`: Bed 4 — ECG Chest Sticker Loose (Vitals safe at 64 bpm; audio silenced) ➔ `[Check Bed 4 ➔]`
- **Cognitive Result**: Because the technical sensor alert on Bed 4 is already muted and prioritized low, Nurse Priya immediately focuses all clinical attention on **Bed 1**.

---

### Frame 3: One-Tap Context & Alarm Inspection (Screen 2)
Before rushing into Bed 1's room, Priya taps `[Inspect Critical Alarm ➔]`:
- The **Bedside Alarm Inspection Modal** opens:
  - **Clinical Bio**: Post Heart Surgery, Dr. Mehta, Target O2 >92%.
  - **Telemetry Vitals (Single Numbers)**: HR: 125 bpm | O2: 88% | Blood Pressure: 70 mmHg | Breathing: 26 /min.
  - **Action Protocol**: 1. Check airway | 2. Fit oxygen mask securely | 3. Sit patient upright.
- Priya taps `[+Airway Checked]` quick note and hits **`[🔔 Acknowledge Alarm]`**.

---

### Frame 4: Visual Acknowledged State & Quiet Care Mode (Screen 3)
The system immediately responds:
- Bed 1 turns yellow: `[ACKNOWLEDGED 🔔] — Nurse Priya assigned at bedside`.
- **5-Minute Quiet Mode** activates (`04:30 remaining`): Non-critical beeps are silenced so the patient can breathe and rest peacefully during bedside care, while critical safety monitoring remains 100% active.
- Floor colleagues immediately see that Nurse Priya is in the room and already managing Bed 1.

---

### Frame 5: Bedside Stabilization & Formal Resolution
Priya enters Bed 1, finds the oxygen mask slipped slightly off nose during coughing, repositions the mask securely, and adjusts the patient's head upright:
- Within 60 seconds, oxygen recovers steadily: 88% → 92% → 98%.
- Heart rate calms from 125 bpm down to 76 bpm.
- Blood pressure stabilizes from 70 mmHg to 85 mmHg.
- Priya taps **`[✅ Mark as Resolved]`**. Bed 1 returns to a calm, steady green `[NORMAL ✓]`.

---

### Frame 6: Shift Alarm History Log & Handover Audit (Screen 4)
At shift handover, Nurse Priya opens the **`Shift History Log`** tab:
- Chronological table displays:
  - `11:42:10 | Bed 1 | Rajesh Kumar | Oxygen Drop (SpO2 88%) | HIGH | Resolved | Nurse Priya`
  - `11:15:04 | Bed 2 | Sunita Devi | Rapid Breathing (26/min) | MEDIUM | Resolved | Nurse Priya`
  - `10:50:22 | Bed 4 | Meena Sharma | ECG Sticker Detached | LOW | Resolved | Nurse Priya`
- Verification confirms: **Average response time under 35 seconds**, zero missed alarms, and **78% reduction in alarm fatigue noise**.
