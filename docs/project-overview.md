# Smart ICU Alarm Fatigue Management Dashboard
## Comprehensive HCI Academic Project Overview (Weeks 1 – 7)

### 1. Executive Summary & Problem Definition
In modern Intensive Care Units (ICUs), clinical staff are bombarded by an overwhelming volume of auditory and visual alarms from vital sign monitors, ventilators, infusion pumps, and telemetry transmitters. Clinical research demonstrates that **up to 72%–99% of ICU alarms are non-actionable, clinically insignificant, or caused by sensor artifacts** (e.g., loose ECG electrodes, motion-induced pulse oximeter dips).

This sensory overload induces **Alarm Fatigue**:
- Nurses become desensitized to alarm beeps and visual flashes.
- Critical, life-threatening physiological crises (e.g., ventricular fibrillation, severe hypoxemia) are buried beneath nuisance alarms.
- High cognitive burden results in delayed triage, caregiver burnout, and increased risk of sentinel events.

The **Smart ICU Alarm Fatigue Management Dashboard** is a Human-Computer Interaction (HCI) proof of concept designed specifically for ICU bedside and central nursing workflows. It addresses the root human-factor issues of alarm fatigue through intelligent prioritization, multi-parameter contextual correlation, visual hierarchy, and an unambiguous tri-state alarm lifecycle.

---

### 2. Academic Project Scope & Boundary
- **Nature of Project**: Academic Proof of Concept (PoC) for an undergraduate Human-Computer Interaction course following a 7-week User-Centered Design (UCD) framework.
- **Regulatory Clarification**: This software uses **simulated patient telemetry and deterministic demonstration scenarios**. It is an academic design prototype demonstrating interaction principles, cognitive load reduction, and usability engineering; it does **not** claim clinical validation, diagnostic certification, or direct medical device clearance.
- **Key Deliverables per Official Guidelines**:
  1. **Physical Prototype**: Paper/cardboard interactive prototype with printable screens and testing protocols.
  2. **Functional Proof of Concept**: Lightweight, responsive web application demonstrating core prioritization, contextual triage, acknowledgement, and history.
  3. **Usability Evaluations**: Usability testing with task observations, Cognitive Walkthrough using Norman's action stages, and Heuristic Evaluation based on Nielsen's 10 principles with peer review rubric.
  4. **Showcase Package**: Presentation slides, demonstration script, and reproducible artifacts.

---

### 3. Seven-Week Project Timeline Alignment

| Stage | Official Dates | Focus & Deliverables | Status |
|---|---|---|---|
| **Week 1** | Oct 11 – 16 | Needfinding: Contextual inquiry, empathy mapping, 2 nursing personas, problem statement, viva readiness. | **Completed (Documented)** |
| **Week 2** | Oct 19 – 23 | Paper Prototyping: 5 primary user goals, screen-flow diagrams, wireframes, storyboard, printable physical paper/cardboard kit, testing task sheet. | **Completed** |
| **Weeks 3–4** | Oct 26 – Nov 6 | Proof of Concept (PoC): Interactive web application (HTML5/CSS3/Vanilla JS), multi-parameter triage, simulated patient cards, tri-state alarm workflow, history log, scenario simulation controller. | **Completed** |
| **Weeks 5–6** | Nov 7 – 16 | Usability Evaluation: Formal usability test plan (5 tasks), step-by-step cognitive walkthrough, Nielsen's 10 heuristic evaluation matrix, peer review template, recorded improvements. | **Completed** |
| **Week 7** | Nov 17 – 20 | Final Showcase: Final presentation slide deck (.pptx), demonstration script, physical fabrication guide, complete documentation. | **Completed** |

---

### 4. Core HCI Design Principles Applied
1. **Preattentive Visual Processing**: Use of redundant visual encoding (color + shape + text badge) so critical alarms stand out in under 200 ms without inducing visual panic.
2. **Context Over Raw Data**: Rather than displaying an isolated number ("SpO2 88%"), provide cross-parameter context (e.g., "Pleth wave pulsatile; concomitant tachycardia 128 bpm confirms true physiological event, not motion artifact").
3. **Tri-State Lifecycle Separation**: Distinct separation between:
   - `Active`: Alert currently firing and unreviewed.
   - `Acknowledged`: A caregiver has taken ownership and silenced audible urgency; the condition remains under active nursing monitoring.
   - `Resolved`: Cause investigated, treated, and formally closed with recorded audit trail.
4. **Recognition over Recall (Nielsen Heuristic #6)**: All relevant patient baseline vitals, sensor statuses, and recommended protocols are visible directly within the alarm drawer without requiring memory recall across views.
5. **Aesthetic and Minimalist Healthcare Density**: Compact tables and cards tailored to bedside distance readability, purposeful whitespace, and subdued neutral tones to prevent ambient cognitive drain.

