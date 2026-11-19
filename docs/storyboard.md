# Week 2: Storyboard – User Journey Narrative

## Comic-Style Scenario: "A Night Shift in the Cardiothoracic ICU"
**Protagonist**: Nurse Priya Sharma, RN (8 years ICU experience)  
**Setting**: Central Nursing Station & Bed 01, 22:30 hrs  
**Task**: Triage concurrent alarms, distinguish false alarm from life threat, respond and resolve.

---

### Scene 1: The Ambient Noise Onset
```
┌────────────────────────────────────────────────────────────────────────┐
│ SCENE 1: Sensory Overload in the Unit                                  │
│                                                                        │
│ [Image/Sketch Concept]:                                                │
│ Central nursing station. Multiple monitors beeping out of sync.        │
│ Nurse Priya is drawing up IV antibiotics for Bed 03.                   │
│ A loud high-pitched chime sounds from Bed 04; a lower beep from Bed 01.│
│                                                                        │
│ PRIYA (Thinking):                                                      │
│ "Two alarms firing at once again. Is Bed 04 having an arrhythmia, or   │
│ did the patient just turn over and loosen a patch?"                    │
│                                                                        │
│ Visual Action: Priya glances up at the Smart ICU Alarm Dashboard.     │
└────────────────────────────────────────────────────────────────────────┘
```

### Scene 2: The Dashboard at a Glance (Preattentive Triage)
```
┌────────────────────────────────────────────────────────────────────────┐
│ SCENE 2: Instant Cognitive Parsing                                    │
│                                                                        │
│ [Image/Sketch Concept]:                                                │
│ Close-up of the Smart ICU Dashboard screen.                            │
│ Top banner shows: [CRITICAL: 1 (Red)] [WARNING: 1 (Amber)] [ADVISORY: 1 (Cyan)]│
│ Bed 01 has a bright pulsing crimson badge: "Hypoxemia + Tachycardia".   │
│ Bed 04 has a calm blue badge: "ECG Lead V4 Signal Degradation".       │
│                                                                        │
│ PRIYA (Speaking aloud to Junior Nurse Rahul):                          │
│ "Rahul, Bed 04 is just an electrode impedance warning—check it on your  │
│ next walk. I am moving to Bed 01 right now; SpO2 is down to 88%!"     │
│                                                                        │
│ HCI Outcome: Triage completed in under 2 seconds without ambiguity.   │
└────────────────────────────────────────────────────────────────────────┘
```

### Scene 3: Context Inspection & One-Tap Acknowledgment
```
┌────────────────────────────────────────────────────────────────────────┐
│ SCENE 3: Verifying Context & Taking Ownership                          │
│                                                                        │
│ [Image/Sketch Concept]:                                                │
│ Priya taps the Bed 01 Critical Alarm card.                             │
│ A contextual drawer slides in smoothly:                                │
│ - Shows SpO2 88% along with HR 128 bpm and RR 26 bpm.                 │
│ - "Multi-Parameter Correlation: 96% High Clinical Relevance."         │
│ - Suspected cause: Airway compromise post-extubation.                 │
│                                                                        │
│ Visual Action: Priya taps [ACKNOWLEDGE ALARM (Nurse Priya)].           │
│ The audio tone drops to a muted alert.                                 │
│ Badge changes from [ACTIVE] to [ACKNOWLEDGED by P. Sharma].           │
│ The team at the central desk sees Bed 01 is actively being attended.  │
└────────────────────────────────────────────────────────────────────────┘
```

### Scene 4: Bedside Clinical Action
```
┌────────────────────────────────────────────────────────────────────────┐
│ SCENE 4: Direct Patient Intervention at Bedside                        │
│                                                                        │
│ [Image/Sketch Concept]:                                                │
│ Bedside at Bed 01. Patient A is restless, displaying shallow breathing │
│ with mucus plug in airway. Priya quickly suctions the airway and       │
│ titrates oxygen flow up on the Venturi mask.                          │
│                                                                        │
│ PRIYA:                                                                 │
│ "Airway clear. Chest excursion improving. SpO2 rising back to 96%."   │
│ Heart rate decelerates back to 84 bpm.                                │
│                                                                        │
│ HCI Outcome: Action was timely because Priya was not delayed by the   │
│ nuisance lead alarm in Bed 04.                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### Scene 5: Formal Resolution & Audit Trail
```
┌────────────────────────────────────────────────────────────────────────┐
│ SCENE 5: Safe Alarm Resolution on Bedside Tablet                       │
│                                                                        │
│ [Image/Sketch Concept]:                                                │
│ Priya taps [RESOLVE ALARM] on the Bedside Tablet.                     │
│ A quick confirmation modal appears:                                    │
│ Selects Reason: [Patient Stabilized / Airway Cleared].                │
│ Enters note: "Airway suctioned; SpO2 recovered to 96%."               │
│ Taps [CONFIRM RESOLUTION].                                            │
│                                                                        │
│ Visual Action: Bed 01 status changes to calm GREEN "Normal / Stable".  │
│ Toast notification: "ALM-001 Resolved and Logged to Audit History".    │
└────────────────────────────────────────────────────────────────────────┘
```

### Scene 6: Shift Handover & Retrospective Review
```
┌────────────────────────────────────────────────────────────────────────┐
│ SCENE 6: Morning Handover with Historical Audit Log                    │
│                                                                        │
│ [Image/Sketch Concept]:                                                │
│ Morning shift change. Nurse Priya and incoming Nurse Sunita review     │
│ the "Alarm History" tab.                                               │
│ Filter: [Last 12 Hours] [Bed 01].                                      │
│ Full timeline is shown: Triggered 22:31 → Ack 22:32 → Resolved 22:40. │
│                                                                        │
│ SUNITA:                                                                │
│ "Great documentation. I can clearly see Bed 01 had a genuine airway   │
│ event rather than random telemetry noise."                             │
│                                                                        │
│ Conclusion: Clear closure, high clinical trust, minimal fatigue.       │
└────────────────────────────────────────────────────────────────────────┘
```

