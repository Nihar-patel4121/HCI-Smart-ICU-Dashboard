/**
 * Smart ICU Alarm Dashboard - Student Prototype
 * Designed for 1 Nurse (Nurse Priya) and exactly 6 Patient Beds
 * HCI Alarm Fatigue Management System (Plain, Meaningful English)
 */

// Initial Data for the 6 Monitored Patients (Easy-to-understand terms)
const INITIAL_PATIENTS = [
  {
    bed: 1,
    name: "Rajesh Kumar (Age 64)",
    condition: "Recovering from Heart Surgery",
    doctor: "Dr. Mehta (Heart Specialist)",
    lines: "Oxygen Mask (4L/min), IV Saline Drip",
    target: "Keep Oxygen > 92%, Heart Rate 60-100",
    status: "High", // High | Medium | Low | Acknowledged | Normal | Checked
    alarmTitle: "Critical: Oxygen Level Dangerously Low (SpO2 88%)",
    alarmReason: "Patient oxygen dropped to 88% (safe is above 90%). Heart rate spiked to 125 bpm.",
    actionGuide: [
      "1. Check patient breathing and alertness immediately.",
      "2. Make sure the oxygen mask is fitted securely on face.",
      "3. Adjust sitting position to help breathing."
    ],
    vitals: { hr: 125, spo2: 88, bp: 70, rr: 26 },
    nurseNote: "",
    muteUntil: null
  },
  {
    bed: 2,
    name: "Sunita Devi (Age 52)",
    condition: "Chest Infection (Pneumonia Recovery)",
    doctor: "Dr. Sen (Chest Specialist)",
    lines: "Nose Oxygen Tube, IV Drip",
    target: "Keep Oxygen > 90%, Normal Breathing",
    status: "Medium",
    alarmTitle: "Warning: Breathing Faster Than Normal (26/min)",
    alarmReason: "Patient is taking 26 breaths/min (normal is 12-20). Oxygen is slightly low at 91%.",
    actionGuide: [
      "1. Check if patient feels short of breath.",
      "2. Check if prescribed breathing steam / medicine is due.",
      "3. Re-check oxygen saturation in 5 minutes."
    ],
    vitals: { hr: 94, spo2: 91, bp: 89, rr: 26 },
    nurseNote: "",
    muteUntil: null
  },
  {
    bed: 3,
    name: "Amit Patel (Age 71)",
    condition: "Recovering from Infection (Stable)",
    doctor: "Dr. Sharma (General Physician)",
    lines: "IV Saline Drip",
    target: "Blood Pressure & Temperature Normal",
    status: "Normal",
    alarmTitle: null,
    alarmReason: null,
    actionGuide: [],
    vitals: { hr: 76, spo2: 98, bp: 85, rr: 16 },
    nurseNote: "",
    muteUntil: null
  },
  {
    bed: 4,
    name: "Meena Sharma (Age 45)",
    condition: "Head Injury Observation (Stable)",
    doctor: "Dr. Iyer (Brain Specialist)",
    lines: "Vital Signs Monitor, IV Drip",
    target: "Keep Head Pressure Normal & Safe",
    status: "Low",
    alarmTitle: "Sensor Alert: Heart Monitor Sticker Loose",
    alarmReason: "Chest sticker came slightly loose when patient moved in bed. Heart vitals are actually normal (64 bpm).",
    actionGuide: [
      "1. Re-stick chest sensor sticker during next routine round.",
      "2. Loud buzzer is silenced so patient can rest peacefully.",
      "3. Patient vitals remain completely safe."
    ],
    vitals: { hr: 64, spo2: 99, bp: 97, rr: 14 },
    nurseNote: "",
    muteUntil: null
  },
  {
    bed: 5,
    name: "Vikram Singh (Age 59)",
    condition: "Recovering from Heart Procedure (Stable)",
    doctor: "Dr. Nair (Heart Specialist)",
    lines: "Wireless Heart Monitor",
    target: "Normal Steady Heart Rhythm (60-90 bpm)",
    status: "Normal",
    alarmTitle: null,
    alarmReason: null,
    actionGuide: [],
    vitals: { hr: 72, spo2: 96, bp: 93, rr: 18 },
    nurseNote: "",
    muteUntil: null
  },
  {
    bed: 6,
    name: "Ananya Roy (Age 38)",
    condition: "Recovering from Back Surgery (Stable)",
    doctor: "Dr. Rao (Bone & Spine Specialist)",
    lines: "Pain Relief Drip, Oxygen Clip",
    target: "Oxygen above 95%, Low Pain",
    status: "Normal",
    alarmTitle: null,
    alarmReason: null,
    actionGuide: [],
    vitals: { hr: 68, spo2: 98, bp: 86, rr: 15 },
    nurseNote: "",
    muteUntil: null
  }
];

// Active State
let patients = JSON.parse(JSON.stringify(INITIAL_PATIENTS));
let currentSelectedBed = null;
let currentFilter = "ALL"; // ALL | High | Medium | Low | Stable
let isNightShiftMode = false;

// History Log (Starts completely empty until Nurse Priya acknowledges or resolves)
let alarmHistory = [];

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  renderDashboard();
  renderHistory();
  updateLiveClock();
  setInterval(updateLiveClock, 1000);

  if (window.location.hash.includes("modal")) {
    openAlarmModal(1);
  } else if (window.location.hash.includes("history")) {
    showTab("history");
  }
});

// Live Station Clock
function updateLiveClock() {
  const clockEl = document.getElementById("live-clock");
  if (!clockEl) return;
  const now = new Date();
  const hrs = String(now.getHours()).padStart(2, "0");
  const mins = String(now.getMinutes()).padStart(2, "0");
  const secs = String(now.getSeconds()).padStart(2, "0");
  clockEl.textContent = `${hrs}:${mins}:${secs}`;
}

// Switch between Dashboard and History Tab
function showTab(tabName) {
  const dashView = document.getElementById("dashboard-view");
  const histView = document.getElementById("history-view");
  const tabDash = document.getElementById("tab-dashboard");
  const tabHist = document.getElementById("tab-history");

  if (tabName === "dashboard") {
    dashView.style.display = "block";
    histView.style.display = "none";
    tabDash.classList.add("active");
    tabHist.classList.remove("active");
  } else {
    dashView.style.display = "none";
    histView.style.display = "block";
    tabDash.classList.remove("active");
    tabHist.classList.add("active");
    renderHistory();
  }
}

// Set Smart Triage Filter (HCI Alarm Fatigue Reduction)
function setFilter(filterType) {
  currentFilter = filterType;

  // Update pill active classes
  const pills = {
    ALL: document.getElementById("filter-all"),
    High: document.getElementById("filter-high"),
    Medium: document.getElementById("filter-medium"),
    Low: document.getElementById("filter-low"),
    Stable: document.getElementById("filter-stable")
  };

  Object.keys(pills).forEach((k) => {
    if (pills[k]) {
      if (k === filterType) {
        pills[k].classList.add("active");
      } else {
        pills[k].classList.remove("active");
      }
    }
  });

  renderDashboard();
}

// Render 6 Beds and Summary Counts
function renderDashboard() {
  const grid = document.getElementById("patient-grid");
  if (!grid) return;
  grid.innerHTML = "";

  let countHigh = 0;
  let countMedium = 0;
  let countLow = 0;
  let countAck = 0;
  let countNormal = 0;

  let highestUrgentPatient = null;

  // Compute tallies across all 6 patients
  patients.forEach((p) => {
    if (p.status === "High") {
      countHigh++;
      if (!highestUrgentPatient) highestUrgentPatient = p;
    } else if (p.status === "Medium") {
      countMedium++;
    } else if (p.status === "Low") {
      countLow++;
    } else if (p.status === "Acknowledged") {
      countAck++;
    } else {
      countNormal++;
    }
  });

  // Update Summary KPI numbers
  if (document.getElementById("count-high")) document.getElementById("count-high").textContent = countHigh;
  if (document.getElementById("count-medium")) document.getElementById("count-medium").textContent = countMedium;
  if (document.getElementById("count-low")) document.getElementById("count-low").textContent = countLow;
  if (document.getElementById("count-ack")) document.getElementById("count-ack").textContent = countAck;
  if (document.getElementById("count-normal")) document.getElementById("count-normal").textContent = countNormal;

  // Update Triage Pill count numbers
  if (document.getElementById("pill-count-high")) document.getElementById("pill-count-high").textContent = countHigh;
  if (document.getElementById("pill-count-medium")) document.getElementById("pill-count-medium").textContent = countMedium;
  if (document.getElementById("pill-count-low")) document.getElementById("pill-count-low").textContent = countLow;
  if (document.getElementById("pill-count-stable")) document.getElementById("pill-count-stable").textContent = countNormal;

  // Active Unit Alerts Feed (Shows All Criticals, Warnings, and Sensor Alerts)
  const feed = document.getElementById("active-alerts-feed") || document.getElementById("urgent-banner");
  if (feed) {
    feed.innerHTML = "";

    // Collect all patients with active alarms or sensor advisories
    const activeAlertPatients = patients.filter(
      (p) => p.status === "High" || p.status === "Medium" || p.status === "Low"
    );

    if (activeAlertPatients.length === 0) {
      // Unit Stable Feed Banner
      feed.innerHTML = `
        <div class="alert-strip-item strip-stable">
          <div class="strip-content-left">
            <span class="strip-badge badge-stable">✓ UNIT STABLE</span>
            <div class="strip-text">
              <strong>All 6 Beds Operating Within Safe Limits</strong>
              <span>Zero active emergencies, warnings, or sensor disconnections. Ward 4 is calm.</span>
            </div>
          </div>
          <span class="strip-stable-tag">✓ Monitored by Nurse Priya</span>
        </div>
      `;
    } else {
      activeAlertPatients.forEach((p) => {
        let stripClass = "strip-critical";
        let badgeClass = "badge-critical";
        let badgeLabel = "🚨 CRITICAL ALERT";
        let btnClass = "btn-strip-critical";
        let btnText = `Inspect Bed ${p.bed} Alarm ➔`;

        if (p.status === "Medium") {
          stripClass = "strip-warning";
          badgeClass = "badge-warning";
          badgeLabel = "⚠️ WARNING ALERT";
          btnClass = "btn-strip-warning";
          btnText = `Inspect Bed ${p.bed} Warning ➔`;
        } else if (p.status === "Low") {
          stripClass = "strip-sensor";
          badgeClass = "badge-sensor";
          badgeLabel = "ℹ️ SENSOR ALERT";
          btnClass = "btn-strip-sensor";
          btnText = `Check Bed ${p.bed} Sensor ➔`;
        }

        feed.innerHTML += `
          <div class="alert-strip-item ${stripClass}">
            <div class="strip-content-left">
              <span class="strip-badge ${badgeClass}">${badgeLabel}</span>
              <div class="strip-text">
                <strong>Bed ${p.bed} — ${p.alarmTitle}</strong>
                <span>${p.alarmReason || "Bedside check recommended."}</span>
              </div>
            </div>
            <button class="btn-strip ${btnClass}" onclick="openAlarmModal(${p.bed})">${btnText}</button>
          </div>
        `;
      });
    }
  }

  // Filter patients according to active triage focus
  const filteredPatients = patients.filter((p) => {
    if (currentFilter === "ALL") return true;
    if (currentFilter === "High") return p.status === "High";
    if (currentFilter === "Medium") return p.status === "Medium";
    if (currentFilter === "Low") return p.status === "Low";
    if (currentFilter === "Stable") return p.status === "Normal" || p.status === "Checked";
    return true;
  });

  if (filteredPatients.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #fff; border-radius: 10px; border: 1px dashed #cbd5e1; color: #64748b;">
        <span style="font-size: 28px; display: block; margin-bottom: 8px;">✓</span>
        <strong>No patients currently match this category (${currentFilter}).</strong>
        <p style="font-size: 13px; margin-top: 4px;">Click <a href="javascript:void(0)" onclick="setFilter('ALL')" style="color: #0284c7; font-weight: 700;">All Beds (6)</a> to view all beds.</p>
      </div>
    `;
    return;
  }

  filteredPatients.forEach((p) => {
    // Determine badge and style
    let badgeClass = "badge-normal";
    let badgeText = "Normal";
    let cardClass = "";
    let btnClass = "gray";
    let btnText = "View Vitals Details";
    let calloutClass = "";
    let calloutHtml = `<span style="color:#16a34a;">✓ Vital signs within safe normal range</span>`;

    if (p.status === "High") {
      badgeClass = "badge-high";
      badgeText = "HIGH ALARM";
      cardClass = "status-high";
      btnClass = "red";
      btnText = "🚨 Inspect Critical Alarm ➔";
      calloutClass = "has-high";
      calloutHtml = `⚠️ <strong>${p.alarmTitle}</strong>`;
    } else if (p.status === "Medium") {
      badgeClass = "badge-medium";
      badgeText = "WARNING";
      cardClass = "status-medium";
      btnClass = "orange";
      btnText = "Inspect Warning ➔";
      calloutClass = "has-medium";
      calloutHtml = `⚠️ <strong>${p.alarmTitle}</strong>`;
    } else if (p.status === "Low") {
      badgeClass = "badge-low";
      badgeText = "SENSOR ALERT";
      cardClass = "status-low";
      btnClass = "blue";
      btnText = "Check Sensor Alert ➔";
      calloutClass = "has-low";
      calloutHtml = `ℹ️ <strong>${p.alarmTitle}</strong>`;
    } else if (p.status === "Acknowledged") {
      badgeClass = "badge-ack";
      badgeText = "ACKNOWLEDGED";
      cardClass = "status-acknowledged";
      btnClass = "yellow";
      btnText = "✓ Under Care (Nurse Priya)";
      calloutClass = "has-ack";
      calloutHtml = `🔔 <strong>Acknowledged by Nurse Priya</strong>`;
    } else if (p.status === "Checked") {
      badgeClass = "badge-normal";
      badgeText = "CHECKED & OK";
      cardClass = "";
      btnClass = "gray";
      btnText = "✓ Verified (Nurse Priya)";
      calloutClass = "";
      calloutHtml = `<span style="color:#16a34a;">✓ Bedside Check Completed by Nurse Priya</span>`;
    } else {
      // Normal
      badgeClass = "badge-normal";
      badgeText = "NORMAL";
      cardClass = "";
      btnClass = "gray";
      btnText = "Check Patient Vitals ➔";
      calloutClass = "";
      calloutHtml = `<span style="color:#16a34a;">✓ Vital signs within safe normal range</span>`;
    }

    const card = document.createElement("div");
    card.className = `patient-card ${cardClass}`;
    card.innerHTML = `
      <div class="card-top">
        <div>
          <div class="bed-label">Bed ${p.bed}: ${p.name}</div>
          <div class="patient-info-sub">${p.condition}</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 3px;">
            <span>👨‍⚕️ ${p.doctor}</span> • <span>🎯 ${p.target}</span>
          </div>
        </div>
        <span class="badge ${badgeClass}">${badgeText}</span>
      </div>

      <div class="vitals-grid">
        <div class="vital-tile">
          <span class="vital-label">Heart Rate</span>
          <div class="vital-val-row">
            <span class="vital-val ${p.vitals.hr > 110 ? 'alert' : ''}">${p.vitals.hr}</span>
            <span class="vital-unit">bpm</span>
          </div>
        </div>
        <div class="vital-tile">
          <span class="vital-label">Oxygen (SpO2)</span>
          <div class="vital-val-row">
            <span class="vital-val ${p.vitals.spo2 < 90 ? 'alert' : p.vitals.spo2 <= 92 ? 'warn' : ''}">${p.vitals.spo2}%</span>
            <span class="vital-unit">sat</span>
          </div>
        </div>
        <div class="vital-tile">
          <span class="vital-label">Blood Pressure</span>
          <div class="vital-val-row">
            <span class="vital-val">${p.vitals.bp}</span>
            <span class="vital-unit">mmHg</span>
          </div>
        </div>
        <div class="vital-tile">
          <span class="vital-label">Breathing</span>
          <div class="vital-val-row">
            <span class="vital-val ${p.vitals.rr > 22 ? 'warn' : ''}">${p.vitals.rr}</span>
            <span class="vital-unit">/min</span>
          </div>
        </div>
      </div>

      <div class="alarm-callout ${calloutClass}">
        ${calloutHtml}
      </div>

      <button class="card-action-btn ${btnClass}" onclick="openAlarmModal(${p.bed})">
        ${btnText}
      </button>
    `;

    grid.appendChild(card);
  });
}

// Open Simple Alarm Modal
function openAlarmModal(bedNumber) {
  const patient = patients.find((p) => p.bed === bedNumber);
  if (!patient) return;

  currentSelectedBed = bedNumber;

  if (document.getElementById("modal-bed-chip")) {
    document.getElementById("modal-bed-chip").textContent = `BED ${patient.bed}`;
  }
  document.getElementById("modal-bed-name").textContent = `${patient.name}`;
  document.getElementById("modal-hr").textContent = `${patient.vitals.hr} bpm`;
  document.getElementById("modal-spo2").textContent = `${patient.vitals.spo2}%`;
  document.getElementById("modal-bp").textContent = typeof patient.vitals.bp === "number" ? `${patient.vitals.bp} mmHg` : patient.vitals.bp;
  document.getElementById("modal-rr").textContent = `${patient.vitals.rr} /min`;

  // Populate Clinical Bio Box (Plain Words)
  if (document.getElementById("modal-diagnosis")) document.getElementById("modal-diagnosis").textContent = patient.condition;
  if (document.getElementById("modal-doctor")) document.getElementById("modal-doctor").textContent = patient.doctor;
  if (document.getElementById("modal-lines")) document.getElementById("modal-lines").textContent = patient.lines;
  if (document.getElementById("modal-baseline")) document.getElementById("modal-baseline").textContent = patient.target;

  // Prefill or clear nurse note
  const noteInput = document.getElementById("modal-nurse-note");
  if (noteInput) {
    noteInput.value = patient.nurseNote || "";
  }

  const alertBox = document.getElementById("modal-alert-box");
  const actionGuide = document.getElementById("modal-action-guide");
  const btnAck = document.getElementById("btn-modal-ack");
  const btnResolve = document.getElementById("btn-modal-resolve");
  const btnCheck = document.getElementById("btn-modal-check");
  const btnMute = document.getElementById("btn-modal-mute");

  if (patient.alarmTitle) {
    alertBox.style.display = "block";
    alertBox.className = "modal-section alert-info-box";
    document.getElementById("modal-alarm-title").textContent = patient.alarmTitle;
    document.getElementById("modal-alarm-reason").textContent = patient.alarmReason;

    // Build simple guide list in easy English
    actionGuide.innerHTML = "";
    patient.actionGuide.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      actionGuide.appendChild(li);
    });

    if (btnCheck) btnCheck.style.display = "none";

    if (patient.status === "Acknowledged") {
      btnAck.style.display = "none";
      btnResolve.style.display = "inline-block";
    } else {
      btnAck.style.display = "inline-block";
      btnResolve.style.display = "inline-block";
    }

    if (btnMute) btnMute.style.display = "inline-block";
  } else {
    // Normal / Stable Bed (Patient is OK)
    alertBox.style.display = "block";
    alertBox.className = "modal-section alert-info-box alert-stable-box";
    document.getElementById("modal-alarm-title").textContent = "✓ Patient Vital Signs Safe & Stable";
    document.getElementById("modal-alarm-reason").textContent = "All vital signs are within normal safe limits. Patient is resting comfortably with no active alarms.";

    actionGuide.innerHTML = `
      <li>1. Visually check that patient is breathing and resting comfortably.</li>
      <li>2. Verify that the finger clip sensor and heart monitor stickers are securely attached.</li>
      <li>3. Click below to record that Nurse Priya has checked and verified this patient.</li>
    `;

    btnAck.style.display = "none";
    btnResolve.style.display = "none";
    if (btnCheck) {
      btnCheck.style.display = "inline-block";
      btnCheck.textContent = patient.status === "Checked" 
        ? "✓ Re-Verify Bedside Check (Nurse Priya)" 
        : "✓ Acknowledge Bedside Check (Nurse Priya)";
    }
    if (btnMute) btnMute.style.display = "none";
  }

  document.getElementById("alarm-modal").style.display = "flex";
}

// Close Modal
function closeModal() {
  document.getElementById("alarm-modal").style.display = "none";
  currentSelectedBed = null;
}

// Quick Nurse Note Insert Tags
function appendNurseNote(tagText) {
  const noteInput = document.getElementById("modal-nurse-note");
  if (!noteInput) return;
  if (!noteInput.value.trim()) {
    noteInput.value = tagText;
  } else {
    noteInput.value = noteInput.value.trim() + " " + tagText;
  }
  noteInput.focus();
}

// Acknowledge Alarm (Nurse Priya takes ownership of an active alarm)
function acknowledgeCurrentAlarm() {
  const patient = patients.find((p) => p.bed === currentSelectedBed);
  if (!patient) return;

  const originalPriority = patient.status; // "High", "Medium", or "Low"
  patient.status = "Acknowledged";

  // Save nurse note
  const noteInput = document.getElementById("modal-nurse-note");
  const noteText = noteInput ? noteInput.value.trim() : "";
  if (noteText) patient.nurseNote = noteText;

  closeModal();
  renderDashboard();

  // Log directly in Alarm History
  alarmHistory.unshift({
    time: new Date().toLocaleTimeString(),
    bed: `Bed ${patient.bed}`,
    patient: patient.name.split(" ")[0],
    description: patient.alarmTitle || "Clinical Alert",
    priority: originalPriority,
    status: "Acknowledged",
    nurse: "Nurse Priya",
    note: noteText || "Bedside check started"
  });

  renderHistory();
  showToast(`Bed ${patient.bed} alarm acknowledged by Nurse Priya.`);
}

// Resolve Alarm (Nurse Priya completed check and patient is stabilized)
function resolveCurrentAlarm() {
  const patient = patients.find((p) => p.bed === currentSelectedBed);
  if (!patient) return;

  const resolvedAlarmName = patient.alarmTitle;

  // Save nurse note
  const noteInput = document.getElementById("modal-nurse-note");
  const noteText = noteInput ? noteInput.value.trim() : "";
  if (noteText) patient.nurseNote = noteText;

  // Reset to normal vitals
  patient.status = "Normal";
  patient.alarmTitle = null;
  patient.alarmReason = null;
  patient.actionGuide = [];

  if (patient.bed === 1) {
    patient.vitals.spo2 = 98;
    patient.vitals.hr = 76;
    patient.vitals.rr = 16;
  } else if (patient.bed === 2) {
    patient.vitals.spo2 = 97;
    patient.vitals.rr = 18;
  } else if (patient.bed === 4) {
    patient.vitals.hr = 64;
  }

  closeModal();
  renderDashboard();

  // Add to History Table
  alarmHistory.unshift({
    time: new Date().toLocaleTimeString(),
    bed: `Bed ${patient.bed}`,
    patient: patient.name.split(" ")[0],
    description: resolvedAlarmName || "Alarm Cleared & Patient Safe",
    priority: "Resolved",
    status: "Resolved & Normal",
    nurse: "Nurse Priya",
    note: noteText || "Patient stabilized and comfortable"
  });

  renderHistory();
  showToast(`Bed ${patient.bed} marked as Resolved and Safe.`);
}

// Option when Patient is OK: Acknowledge Routine Bedside Check
function acknowledgeRoutineCheck() {
  const patient = patients.find((p) => p.bed === currentSelectedBed);
  if (!patient) return;

  // Save nurse note
  const noteInput = document.getElementById("modal-nurse-note");
  const noteText = noteInput ? noteInput.value.trim() : "";
  if (noteText) patient.nurseNote = noteText;

  patient.status = "Checked";
  closeModal();
  renderDashboard();

  // Log in Alarm History as a routine verification
  alarmHistory.unshift({
    time: new Date().toLocaleTimeString(),
    bed: `Bed ${patient.bed}`,
    patient: patient.name.split(" ")[0],
    description: "Routine Bedside Check (Vitals Safe)",
    priority: "Normal",
    status: "Checked & Acknowledged",
    nurse: "Nurse Priya",
    note: noteText || "All vital signs verified safe and normal"
  });

  renderHistory();
  showToast(`Bed ${patient.bed} check acknowledged by Nurse Priya.`);
}

// 5-Minute Quiet Mode (During Care)
function startProcedureMute() {
  const patient = patients.find((p) => p.bed === currentSelectedBed);
  if (!patient) return;

  const now = new Date();
  patient.muteUntil = new Date(now.getTime() + 5 * 60000);

  alarmHistory.unshift({
    time: now.toLocaleTimeString(),
    bed: `Bed ${patient.bed}`,
    patient: patient.name.split(" ")[0],
    description: "⏱️ 5-Minute Quiet Mode (Care in Progress)",
    priority: "Low",
    status: "Quiet Mode Active",
    nurse: "Nurse Priya",
    note: "Non-critical beeps paused for 5 min while nurse changes dressing / cares for patient."
  });

  closeModal();
  renderDashboard();
  renderHistory();
  showToast(`⏱️ Bed ${patient.bed}: 5-Min Quiet Mode active. Non-critical beeps paused.`);
}

// Render History Table (Starts EMPTY, populated as Nurse Priya acknowledges or resolves)
function renderHistory() {
  const tbody = document.getElementById("history-table-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (alarmHistory.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 45px 16px; color: #64748b;">
          <div style="font-size: 32px; margin-bottom: 8px;">📋</div>
          <strong style="font-size: 15px; color: #334155; display: block;">No Alarms in History Yet</strong>
          <p style="font-size: 12px; margin-top: 4px; color: #94a3b8;">
            The alarm history log is currently empty. When Nurse Priya acknowledges an alarm, resolves one, or verifies a stable patient, it will automatically appear here.
          </p>
        </td>
      </tr>
    `;
    return;
  }

  alarmHistory.forEach((item) => {
    let badgeClass = "badge-normal";
    if (item.priority === "High") badgeClass = "badge-high";
    else if (item.priority === "Medium") badgeClass = "badge-medium";
    else if (item.priority === "Low") badgeClass = "badge-low";
    else if (item.priority === "Acknowledged") badgeClass = "badge-ack";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.time}</td>
      <td><strong>${item.bed}</strong></td>
      <td>${item.patient}</td>
      <td>
        <div>${item.description}</div>
        ${item.note ? `<div style="font-size: 11px; color: #64748b; margin-top: 2px;">📝 <em>${item.note}</em></div>` : ''}
      </td>
      <td><span class="badge ${badgeClass}">${item.priority}</span></td>
      <td><strong>${item.status}</strong></td>
      <td>👩‍⚕️ ${item.nurse}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Simple Toast Notification
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3200);
}

// ==========================================================================
// Clinical Simulator & Nurse Shift Tools (Easy-to-Understand Scenarios)
// ==========================================================================

const CLINICAL_EVENTS = {
  spo2_drop: {
    status: "High",
    title: "Critical: Oxygen Dangerously Low (SpO2 88%)",
    reason: "Patient oxygen dropped to 88% (normal is 95-100%). Heart rate spiked to 125 bpm. Immediate check needed.",
    vitals: { hr: 125, spo2: 88, bp: 70, rr: 26 },
    guide: [
      "1. Check patient breathing and alertness immediately.",
      "2. Make sure the oxygen mask is fitted properly on face.",
      "3. Adjust patient head and sitting position to help breathing."
    ]
  },
  tachycardia: {
    status: "High",
    title: "Critical: Heart Rate Dangerously High (145 bpm)",
    reason: "Heart rate spiked to 145 beats/min (normal is 60-100). Blood pressure dropped to 65 mmHg.",
    vitals: { hr: 145, spo2: 92, bp: 65, rr: 24 },
    guide: [
      "1. Check patient pulse and responsiveness immediately.",
      "2. Call the on-duty doctor right away.",
      "3. Keep patient calm and resting flat in bed."
    ]
  },
  tachypnea: {
    status: "Medium",
    title: "Warning: Breathing Too Fast (28 breaths/min)",
    reason: "Patient is taking 28 breaths per minute (normal is 12-20). Oxygen is slightly low at 91%.",
    vitals: { hr: 96, spo2: 91, bp: 90, rr: 28 },
    guide: [
      "1. Check if patient feels breathless or in discomfort.",
      "2. Check if prescribed breathing medicine / nebulizer is due.",
      "3. Re-check oxygen level in 5 minutes."
    ]
  },
  nibp_error: {
    status: "Medium",
    title: "Warning: Blood Pressure Cuff Moved / Retry",
    reason: "The arm cuff could not complete reading because patient moved their arm or cuff loosened.",
    vitals: { hr: 80, spo2: 96, bp: "--", rr: 18 },
    guide: [
      "1. Straighten patient arm and re-wrap the blood pressure cuff.",
      "2. Ensure the rubber tube is not twisted or bent under bed rails.",
      "3. Press button to retake blood pressure once patient is still."
    ]
  },
  ecg_loose: {
    status: "Low",
    title: "Sensor Alert: Heart Monitor Sticker Loose",
    reason: "Chest sensor sticker lost good contact when patient turned in bed. Heart vitals are actually normal (64 bpm).",
    vitals: { hr: 72, spo2: 98, bp: 90, rr: 16 },
    guide: [
      "1. Re-stick the chest sticker during next nursing round.",
      "2. Loud sound is silenced so patient can sleep peacefully.",
      "3. Patient condition is safe and stable."
    ]
  },
  infusion_low: {
    status: "Low",
    title: "Reminder: Medicine Drip Pump Nearly Empty",
    reason: "Medicine syringe has less than 10% left (around 15 minutes of medicine remaining).",
    vitals: { hr: 74, spo2: 97, bp: 93, rr: 16 },
    guide: [
      "1. Check doctor's medicine chart for the refill order.",
      "2. Get replacement medicine syringe from nursing station.",
      "3. Load and restart pump before line runs completely dry."
    ]
  }
};

// 1. Trigger Alert on ANY Selected Bed (Bed 1 to Bed 6)
function triggerCustomBedAlert() {
  const bedSelect = document.getElementById("sim-bed-select");
  const eventSelect = document.getElementById("sim-event-select");
  if (!bedSelect || !eventSelect) return;

  const targetBedNum = parseInt(bedSelect.value, 10);
  const eventKey = eventSelect.value;
  const eventData = CLINICAL_EVENTS[eventKey];
  if (!eventData) return;

  const patient = patients.find((p) => p.bed === targetBedNum);
  if (!patient) return;

  patient.status = eventData.status;
  patient.alarmTitle = eventData.title;
  patient.alarmReason = eventData.reason;
  patient.vitals = { ...eventData.vitals };
  patient.actionGuide = [...eventData.guide];

  // If Night Mode is active and it's a Low alarm, notify nurse that audio is silenced
  if (isNightShiftMode && eventData.status === "Low") {
    showToast(`🌙 Night Mode: Bed ${patient.bed} Sensor Alert logged quietly (Sound Silenced).`);
  } else {
    showToast(`🚨 Alert triggered on Bed ${patient.bed}: ${eventData.title}`);
  }

  renderDashboard();
}

// 2. Batch Check All Stable Beds (Simulates Nurse Priya's Shift Ward Rounds)
function checkAllStableBeds() {
  let checkedCount = 0;
  const now = new Date().toLocaleTimeString();

  patients.forEach((p) => {
    if (p.status === "Normal") {
      p.status = "Checked";
      checkedCount++;
      // Log routine check into alarm history
      alarmHistory.unshift({
        time: now,
        bed: `Bed ${p.bed}`,
        patient: p.name.split(" ")[0],
        description: "Routine Bedside Check (Vitals Safe)",
        priority: "Normal",
        status: "Checked & Acknowledged",
        nurse: "Nurse Priya",
        note: "All baseline readings verified safe and normal"
      });
    }
  });

  renderDashboard();
  renderHistory();

  if (checkedCount > 0) {
    showToast(`📋 Routine Round Completed: ${checkedCount} stable bed(s) verified by Nurse Priya.`);
  } else {
    showToast("All stable beds have already been checked for this round.");
  }
}

// 3. Toggle Night Shift Mode (Demonstrates HCI Alarm Fatigue Reduction)
function toggleNightShiftMode() {
  isNightShiftMode = !isNightShiftMode;
  const btn = document.getElementById("btn-night-mode");

  if (isNightShiftMode) {
    if (btn) {
      btn.classList.add("active");
      btn.innerHTML = "🌙 Night Mode: ON (Muting Low Alerts)";
    }
    showToast("Night Mode Activated: Non-urgent sensor beeps silenced so patients can sleep.");
  } else {
    if (btn) {
      btn.classList.remove("active");
      btn.innerHTML = "🌙 Night Mode: Off";
    }
    showToast("Day Mode: Standard alarm sounds restored.");
  }
}

// 4. Return All Beds to Good / Reset to Clean Baseline
function resetAllBeds() {
  patients = JSON.parse(JSON.stringify(INITIAL_PATIENTS));
  patients.forEach((p) => {
    p.status = "Normal";
    p.alarmTitle = null;
    p.alarmReason = null;
    p.actionGuide = [];
    if (p.bed === 1) { p.vitals.spo2 = 98; p.vitals.hr = 76; p.vitals.bp = 85; p.vitals.rr = 16; }
    if (p.bed === 2) { p.vitals.spo2 = 97; p.vitals.bp = 89; p.vitals.rr = 18; }
    if (p.bed === 4) { p.vitals.hr = 70; }
  });

  currentFilter = "ALL";
  setFilter("ALL");
  renderDashboard();
  showToast("↺ All 6 beds returned to normal safe vitals.");
}
