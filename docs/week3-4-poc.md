# Weeks 3–4: Working Proof of Concept (PoC) Documentation
## Official Timeline: October 26 – November 6

### 1. Proof of Concept Architecture & Technical Strategy
Following the official guidelines ("Depth in a few features beats a shallow version of everything... build a simple app"), the Smart ICU Alarm Fatigue Management Dashboard is engineered as a responsive, zero-dependency Web Application using standard **HTML5, CSS3, and modern Vanilla JavaScript (ES6+)**.

#### Technology Stack Rationale:
1. **Zero External Runtime Dependencies**:
   - No build tools (Webpack/Vite), no npm package vulnerabilities, and no backend database required for local evaluation.
   - Runs instantly in any standard browser (Chrome, Edge, Firefox, Safari) simply by double-clicking `prototype/index.html` or running VS Code Live Server.
2. **Deterministic Data Simulation**:
   - Grounded in realistic clinical telemetry data (`data/patients.json` and `data/alarms.json`), simulating 6 monitored ICU beds with dynamic hemodynamics (Heart Rate, Pulse Oximetry SpO2, Arterial Line MAP, Respiratory Rate, and Sensor Quality).
3. **Medical Harmonic Audio Synthesis**:
   - Built-in Web Audio API tone generator modeling IEC 60601-1-8 medical alarm acoustic cues (sine wave triad for critical emergencies, two-tone chime for warnings, and a soft triangle ping for advisories) with one-click mute controls.

---

### 2. Core Implemented Features & Deep Functionality

#### Feature 1: Central & Bedside Multi-Patient Overview
- Displays 6 modular patient telemetry cards showing patient identifier, admission diagnosis, age/gender, and assigned nurse.
- Real-time numerical display of HR, SpO2, BP/MAP, and RR with visual trend arrows (`↑`, `↓`, `→`).
- Prominent status badges (`Critical`, `Warning`, `Advisory`, `Acknowledged`, `Stable`).
- Hardware sensor integrity indicators (e.g., loose ECG lead detection, weak plethysmogram signal quality).

#### Feature 2: Intelligent 3-Tier Alarm Prioritization
- **Critical (Red)**: Imminent life threat (e.g., severe hypoxemia with tachycardia, ventilator disconnect, ventricular tachycardia). Always bubbles to the top of the queue and triggers a pulsing banner.
- **Warning (Amber)**: Physiological trend drift requiring clinical review within minutes (e.g., tachypnea, NIBP timeout).
- **Advisory (Cyan)**: Non-urgent sensor artifacts (e.g., ECG lead gel dry-out, syringe pump near empty). Audio urgency is suppressed to reduce auditory fatigue.

#### Feature 3: Contextual Alarm Triage Drawer
- Clicking any active alarm opens an in-depth slide-in modal presenting:
  - **Violated Parameters**: Actual reading vs standard physiological baseline target (e.g., SpO2 88% vs baseline >92%).
  - **Cross-Parameter Context**: Explains *why* the alarm fired (e.g., "Airway compromise post-extubation. Pleth wave pulsatile; tachycardia confirms sympathetic response to hypoxemia").
  - **Confidence Score**: Quantitative indicator of clinical validity (e.g., "96% Confirmed Physiological Event - Not Motion Artifact").
  - **Action Protocol**: Standardized step-by-step nursing instructions.

#### Feature 4: Unambiguous Tri-State Alarm Lifecycle
Standard commercial monitors often confuse nurses by making "acknowledge" either silence the audio or dismiss the alert entirely. Our dashboard enforces three distinct states:
1. **Active**: Alert is currently sounding; highlighted in red/amber; unattended.
2. **Acknowledged**: Nurse takes ownership with a single tap. Audio urgency is silenced, the card transitions to an ochre badge (`[ACKNOWLEDGED by Nurse P. Sharma]`), and remains visible in the active queue so the team knows it is being attended.
3. **Resolved**: Nurse completes the bedside intervention, opens the resolution dialog, selects a clinical reason (e.g., "Airway Suctioned / SpO2 Restored"), enters an optional note, and confirms. The patient card returns to steady green `[STABLE]`, and the event is permanently written to the audit log.

#### Feature 5: Alarm History & Chronological Audit Trail
- Dedicated historical view displaying all triggered, acknowledged, and resolved events.
- Multi-criteria filtering:
  - Full-text search across Alarm ID, Bed, Patient Name, and Nurse.
  - Priority filter pills (`All`, `Critical`, `Warning`, `Advisory`).
  - Status dropdown (`All`, `Active`, `Acknowledged`, `Resolved`).
  - Bed selector (`Bed 01` to `Bed 06`).
- Complete event timelines recording exact timestamps and caregiver names for shift handover.

#### Feature 6: Interactive Demo Scenario Injector
Located in the top toolbar, this controller allows evaluators and viva examiners to trigger deterministic clinical scenarios:
- **Scenario 1**: Critical Dual Alarm (Desaturation + Lead Artifact)
- **Scenario 2**: Acute Ventilator Disconnect (Bed 02)
- **Scenario 3**: Sustained Ventricular Tachycardia (Bed 03)
- **Scenario 4**: Shift Turnover (All Patients Stabilized / Clean State)
- **Reset Baseline**: Instantly restores initial demo data.

---

### 3. File Map for Proof of Concept

```
HCI_Project/prototype/
├── index.html          # Semantic HTML5 single-page application structure
├── css/
│   ├── variables.css   # Healthcare design tokens & color definitions
│   ├── main.css        # Layout, sticky header, simulation bar, and toasts
│   └── components.css  # Patient cards, alarm drawer, history table, waveforms
└── js/
    ├── patients.js     # Patient telemetry data store & grid renderer
    ├── alarms.js       # Tri-state lifecycle, prioritization, and audit log
    ├── simulation.js   # Deterministic scenario engine & Web Audio chime
    └── app.js          # App orchestrator, navigation router, and modal handlers
```

