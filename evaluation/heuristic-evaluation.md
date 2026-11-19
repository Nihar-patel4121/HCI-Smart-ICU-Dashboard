# Heuristic Evaluation Scoring Matrix & Audit Log (Nielsen's 10)

## 1. Heuristic Evaluation Rubric

| # | Heuristic Principle | Description | Rating (0–4) | Notes / Location |
|---|---|---|---|---|
| **H1** | **Visibility of System Status** | System keeps user informed through timely feedback. | **0** | Continuous vitals, pulsing red banner for critical alarms, active nurse indicator. |
| **H2** | **Match System & Real World** | Uses familiar clinical language and concepts. | **0** | IEC standard units: HR (bpm), SpO2 (%), BP (mmHg), MAP. |
| **H3** | **User Control & Freedom** | Supports undo, cancel, back buttons, and modal escape. | **0** | `Esc` key support, click outside modal, and persistent `Back to Dashboard` buttons. |
| **H4** | **Consistency & Standards** | Consistent styling, color semantics, and layout tokens. | **0** | Centralized CSS design system (`variables.css`). |
| **H5** | **Error Prevention** | Eliminates error-prone conditions; requires confirmation. | **0** | Confirmation modal for resolution; acknowledgment never deletes an active alarm. |
| **H6** | **Recognition Rather than Recall** | Makes objects, actions, and options visible. | **0** | Normal baseline targets printed alongside violated numbers in triage drawer. |
| **H7** | **Flexibility & Efficiency of Use** | Provides accelerators for expert nurses (shortcuts, search). | **0** | Full-text search, one-click severity filter pills, quick-triage banner button. |
| **H8** | **Aesthetic & Minimalist Design** | Uncluttered, purpose-driven healthcare interface. | **0** | No decorative AI gradients or non-functional placeholder buttons. |
| **H9** | **Help Users Recognize & Recover** | Plain-language error and empty states. | **0** | Friendly empty search state with clear reset suggestion. |
| **H10**| **Help & Documentation** | Inline protocols and operational instructions. | **0** | Step-by-step clinical nursing protocols in alarm drawer; scenario injector guide. |

---

## 2. Iterative Resolution Log
- All minor (Severity 1) and medium (Severity 2–3) issues discovered during evaluation rounds were resolved directly in the implemented prototype (v1.0.0).
- Detailed records are preserved in [docs/heuristic-evaluation.md](file:///c:/Users/HP/Desktop/HCI_Project/docs/heuristic-evaluation.md).

