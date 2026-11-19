/**
 * Patient Store & Bedside Telemetry Rendering
 */

const PatientStore = {
  patients: [],

  init(initialData) {
    this.patients = JSON.parse(JSON.stringify(initialData));
  },

  getAll() {
    return this.patients;
  },

  getById(id) {
    return this.patients.find(p => p.id === id);
  },

  getByBed(bed) {
    return this.patients.find(p => p.bed === bed);
  },

  updatePatientStatus(id, newStatus) {
    const patient = this.getById(id);
    if (patient) {
      patient.status = newStatus;
    }
  },

  updatePatientVitals(id, newVitals) {
    const patient = this.getById(id);
    if (patient) {
      patient.vitals = { ...patient.vitals, ...newVitals };
    }
  },

  renderPatientGrid(containerId, onInspectAlarm, onViewPatient) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    this.patients.forEach(patient => {
      const card = document.createElement('div');
      const statusClass = `status-${patient.status.toLowerCase()}`;
      card.className = `patient-card ${statusClass}`;
      card.setAttribute('data-patient-id', patient.id);

      // Badge status determination
      let badgeHtml = '';
      if (patient.status === 'Critical') {
        badgeHtml = `<span class="badge badge-critical">🚨 Critical</span>`;
      } else if (patient.status === 'Warning') {
        badgeHtml = `<span class="badge badge-warning">⚠️ Warning</span>`;
      } else if (patient.status === 'Advisory') {
        badgeHtml = `<span class="badge badge-advisory">ℹ️ Advisory</span>`;
      } else if (patient.status === 'Acknowledged') {
        badgeHtml = `<span class="badge badge-acknowledged">🔔 Acknowledged</span>`;
      } else {
        badgeHtml = `<span class="badge badge-stable">✅ Stable</span>`;
      }

      // Check active alarms for this patient
      const activeAlarm = AlarmStore.getActiveAlarmForPatient(patient.id);

      // Sensor Status icon
      let sensorDotClass = 'sensor-dot';
      let sensorText = 'Sensors Normal';
      if (patient.sensors.spo2Probe && patient.sensors.spo2Probe.includes('Low Quality')) {
        sensorDotClass += ' danger';
        sensorText = 'SpO2 Signal Noise';
      } else if (patient.sensors.ecg && patient.sensors.ecg.includes('Loose')) {
        sensorDotClass += ' warning';
        sensorText = 'ECG Lead V4 Loose';
      }

      // Card action button
      let actionBtnHtml = '';
      if (activeAlarm) {
        if (activeAlarm.priority === 'Critical') {
          actionBtnHtml = `<button class="btn-card-action primary-alarm" data-alarm-id="${activeAlarm.id}">Triage Critical ➔</button>`;
        } else if (activeAlarm.priority === 'Warning') {
          actionBtnHtml = `<button class="btn-card-action warn-alarm" data-alarm-id="${activeAlarm.id}">Inspect Warning</button>`;
        } else {
          actionBtnHtml = `<button class="btn-card-action outline" data-alarm-id="${activeAlarm.id}">Review Alert</button>`;
        }
      } else {
        actionBtnHtml = `<button class="btn-card-action outline view-pt-btn" data-patient-id="${patient.id}">Bedside Telemetry</button>`;
      }

      card.innerHTML = `
        <div class="patient-card-header">
          <div class="patient-id-group">
            <span class="patient-bed-title">${patient.bed} • ${patient.name}</span>
            <span class="patient-dx">${patient.admissionReason} (${patient.age}y ${patient.gender})</span>
          </div>
          <div>${badgeHtml}</div>
        </div>
        <div class="patient-card-body">
          <div class="vitals-grid">
            <div class="vital-box">
              <span class="vital-label">Heart Rate (ECG)</span>
              <div class="vital-reading-row">
                <span class="vital-val ${patient.vitals.hr > 115 || patient.vitals.hr < 50 ? 'alert-crit' : ''}">${patient.vitals.hr}</span>
                <span class="vital-unit">bpm</span>
                <span class="vital-trend ${patient.vitals.hrTrend}">${patient.vitals.hrTrend === 'increasing' ? '↑' : patient.vitals.hrTrend === 'decreasing' ? '↓' : '→'}</span>
              </div>
            </div>
            <div class="vital-box">
              <span class="vital-label">Oxygen (SpO2)</span>
              <div class="vital-reading-row">
                <span class="vital-val ${patient.vitals.spo2 < 90 ? 'alert-crit' : patient.vitals.spo2 <= 92 ? 'alert-warn' : ''}">${patient.vitals.spo2}%</span>
                <span class="vital-unit">%</span>
                <span class="vital-trend ${patient.vitals.spo2Trend}">${patient.vitals.spo2Trend === 'decreasing' ? '↓' : patient.vitals.spo2Trend === 'increasing' ? '↑' : '→'}</span>
              </div>
            </div>
            <div class="vital-box">
              <span class="vital-label">NIBP / Art-Line</span>
              <div class="vital-reading-row">
                <span class="vital-val">${patient.vitals.bp}</span>
                <span class="vital-unit">mmHg</span>
                <span class="vital-trend stable">MAP ${patient.vitals.map}</span>
              </div>
            </div>
            <div class="vital-box">
              <span class="vital-label">Resp Rate (RR)</span>
              <div class="vital-reading-row">
                <span class="vital-val ${patient.vitals.rr > 24 ? 'alert-warn' : ''}">${patient.vitals.rr}</span>
                <span class="vital-unit">/min</span>
                <span class="vital-trend stable">T ${patient.vitals.temp}°C</span>
              </div>
            </div>
          </div>
          <div class="sensor-strip">
            <span class="sensor-status-tag">
              <span class="${sensorDotClass}"></span>
              ${sensorText}
            </span>
            <span>${patient.assignedNurse}</span>
          </div>
        </div>
        <div class="patient-card-footer">
          <button class="btn-card-action outline view-pt-btn" data-patient-id="${patient.id}">Telemetry Details</button>
          ${actionBtnHtml}
        </div>
      `;

      // Event handlers
      const triageBtn = card.querySelector('.btn-card-action.primary-alarm, .btn-card-action.warn-alarm, .btn-card-action[data-alarm-id]');
      if (triageBtn && onInspectAlarm) {
        triageBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const alarmId = triageBtn.getAttribute('data-alarm-id');
          onInspectAlarm(alarmId);
        });
      }

      const viewPtBtns = card.querySelectorAll('.view-pt-btn');
      viewPtBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (onViewPatient) onViewPatient(patient.id);
        });
      });

      card.addEventListener('click', () => {
        if (activeAlarm && onInspectAlarm) {
          onInspectAlarm(activeAlarm.id);
        } else if (onViewPatient) {
          onViewPatient(patient.id);
        }
      });

      container.appendChild(card);
    });
  }
};

