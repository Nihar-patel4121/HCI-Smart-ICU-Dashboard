/**
 * Alarm Management Store: Prioritization, Tri-State Lifecycle & History
 */

const AlarmStore = {
  alarms: [],
  activeFilter: 'ALL',
  searchQuery: '',
  bedFilter: 'ALL',
  statusFilter: 'ALL',

  init(initialAlarms) {
    this.alarms = JSON.parse(JSON.stringify(initialAlarms));
  },

  getAll() {
    return this.alarms;
  },

  getById(id) {
    return this.alarms.find(a => a.id === id);
  },

  getActiveAlarms() {
    return this.alarms.filter(a => a.status === 'Active' || a.status === 'Acknowledged');
  },

  getActiveAlarmForPatient(patientId) {
    // Return highest priority active or acknowledged alarm
    const ptAlarms = this.alarms.filter(a => a.patientId === patientId && (a.status === 'Active' || a.status === 'Acknowledged'));
    if (ptAlarms.length === 0) return null;

    const priorityWeight = { 'Critical': 3, 'Warning': 2, 'Advisory': 1 };
    ptAlarms.sort((a, b) => {
      // Active comes before Acknowledged
      if (a.status !== b.status) {
        return a.status === 'Active' ? -1 : 1;
      }
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    });

    return ptAlarms[0];
  },

  getHighestPriorityActiveAlarm() {
    const active = this.alarms.filter(a => a.status === 'Active');
    if (active.length === 0) return null;

    const priorityWeight = { 'Critical': 3, 'Warning': 2, 'Advisory': 1 };
    active.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
    return active[0];
  },

  getMetricsSummary() {
    const activeCritical = this.alarms.filter(a => a.status === 'Active' && a.priority === 'Critical').length;
    const activeWarning = this.alarms.filter(a => a.status === 'Active' && a.priority === 'Warning').length;
    const activeAdvisory = this.alarms.filter(a => a.status === 'Active' && a.priority === 'Advisory').length;
    const acknowledged = this.alarms.filter(a => a.status === 'Acknowledged').length;
    const resolved = this.alarms.filter(a => a.status === 'Resolved').length;

    return {
      activeCritical,
      activeWarning,
      activeAdvisory,
      acknowledged,
      resolved,
      totalActive: activeCritical + activeWarning + activeAdvisory
    };
  },

  acknowledgeAlarm(alarmId, nurseName, note = '') {
    const alarm = this.getById(alarmId);
    if (!alarm) return false;

    alarm.status = 'Acknowledged';
    alarm.acknowledgedBy = nurseName || 'Nurse Priya Sharma (RN)';
    const now = new Date();
    alarm.acknowledgedAt = now.toISOString().replace('T', ' ').substring(0, 19);

    if (!alarm.history) alarm.history = [];
    alarm.history.push({
      action: 'Acknowledged',
      by: alarm.acknowledgedBy,
      time: now.toLocaleTimeString(),
      note: note || 'Auditory alert silenced. Nurse responding to bedside.'
    });

    // Update patient status to acknowledged if no other higher critical alarm is active
    if (typeof PatientStore !== 'undefined') {
      const patient = PatientStore.getById(alarm.patientId);
      if (patient) {
        patient.status = 'Acknowledged';
      }
    }

    return true;
  },

  resolveAlarm(alarmId, nurseName, reason, note = '') {
    const alarm = this.getById(alarmId);
    if (!alarm) return false;

    alarm.status = 'Resolved';
    alarm.resolvedBy = nurseName || 'Nurse Priya Sharma (RN)';
    const now = new Date();
    alarm.resolvedAt = now.toISOString().replace('T', ' ').substring(0, 19);

    if (!alarm.history) alarm.history = [];
    alarm.history.push({
      action: 'Resolved',
      by: alarm.resolvedBy,
      time: now.toLocaleTimeString(),
      note: `Reason: ${reason}. Note: ${note || 'Intervention completed, patient stable.'}`
    });

    // Update patient status
    if (typeof PatientStore !== 'undefined') {
      const patient = PatientStore.getById(alarm.patientId);
      if (patient) {
        patient.status = 'Stable';
        // Normalize vitals if it was bed 01
        if (patient.id === 'P-101') {
          patient.vitals.spo2 = 96;
          patient.vitals.spo2Trend = 'stable';
          patient.vitals.hr = 82;
          patient.vitals.hrTrend = 'stable';
          patient.vitals.rr = 18;
          patient.sensors.spo2Probe = 'Connected';
        } else if (patient.id === 'P-104') {
          patient.sensors.ecg = 'Connected';
        }
      }
    }

    return true;
  },

  addSimulatedAlarm(newAlarm) {
    this.alarms.unshift(newAlarm);
    if (typeof PatientStore !== 'undefined') {
      const patient = PatientStore.getById(newAlarm.patientId);
      if (patient) {
        patient.status = newAlarm.priority;
      }
    }
  },

  renderPriorityBanner(containerId, onInspect) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const criticalAlarm = this.getHighestPriorityActiveAlarm();

    if (!criticalAlarm || criticalAlarm.priority !== 'Critical') {
      container.style.display = 'none';
      return;
    }

    container.style.display = 'flex';
    container.innerHTML = `
      <div class="triage-banner-left">
        <span class="triage-pulse-badge">🚨 CRITICAL ALARM</span>
        <div>
          <div class="triage-title">${criticalAlarm.bed} (${criticalAlarm.patientId}) — ${criticalAlarm.title}</div>
          <div class="triage-params">Trigger: <strong>${criticalAlarm.triggerValue}</strong> | ${criticalAlarm.context.confidenceScore}</div>
        </div>
      </div>
      <div class="triage-banner-right">
        <button class="triage-action-btn" id="banner-triage-btn" data-alarm-id="${criticalAlarm.id}">Triage Immediately ➔</button>
      </div>
    `;

    const btn = document.getElementById('banner-triage-btn');
    if (btn && onInspect) {
      btn.addEventListener('click', () => onInspect(criticalAlarm.id));
    }
  },

  renderMetricsSummary(counters) {
    const summary = this.getMetricsSummary();

    if (counters.critical) counters.critical.textContent = summary.activeCritical;
    if (counters.warning) counters.warning.textContent = summary.activeWarning;
    if (counters.advisory) counters.advisory.textContent = summary.activeAdvisory;
    if (counters.acknowledged) counters.acknowledged.textContent = summary.acknowledged;
  },

  renderHistoryTable(containerId, onInspect) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Apply filtering
    let filtered = [...this.alarms];

    if (this.activeFilter !== 'ALL') {
      filtered = filtered.filter(a => a.priority.toUpperCase() === this.activeFilter);
    }

    if (this.statusFilter !== 'ALL') {
      filtered = filtered.filter(a => a.status.toUpperCase() === this.statusFilter);
    }

    if (this.bedFilter !== 'ALL') {
      filtered = filtered.filter(a => a.bed === this.bedFilter);
    }

    if (this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(a => 
        a.id.toLowerCase().includes(q) ||
        a.title.toLowerCase().includes(q) ||
        a.bed.toLowerCase().includes(q) ||
        a.patientId.toLowerCase().includes(q) ||
        (a.acknowledgedBy && a.acknowledgedBy.toLowerCase().includes(q))
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <h4>No matching alarms found</h4>
          <p>Try resetting the search filters or check all status categories.</p>
        </div>
      `;
      return;
    }

    let rowsHtml = '';
    filtered.forEach(alarm => {
      let badgeClass = 'badge-critical';
      if (alarm.priority === 'Warning') badgeClass = 'badge-warning';
      if (alarm.priority === 'Advisory') badgeClass = 'badge-advisory';

      let statusBadgeClass = 'badge-critical';
      if (alarm.status === 'Acknowledged') statusBadgeClass = 'badge-acknowledged';
      if (alarm.status === 'Resolved') statusBadgeClass = 'badge-stable';

      const actorInfo = alarm.status === 'Resolved' 
        ? `${alarm.resolvedBy || 'Nurse'}<br><small style="color:#64748b">${alarm.resolvedAt || ''}</small>`
        : alarm.status === 'Acknowledged'
        ? `${alarm.acknowledgedBy || 'Nurse'}<br><small style="color:#64748b">${alarm.acknowledgedAt || ''}</small>`
        : '<span style="color:#b91c1c; font-weight:bold;">Active (Unattended)</span>';

      rowsHtml += `
        <tr style="cursor: pointer;" data-alarm-id="${alarm.id}">
          <td style="font-family: var(--font-mono); font-size: 11px;">${alarm.timestamp}</td>
          <td style="font-family: var(--font-mono); font-weight: 700;">${alarm.id}</td>
          <td><strong>${alarm.bed}</strong> <span style="color:#64748b">(${alarm.patientId})</span></td>
          <td><span class="badge ${badgeClass}">${alarm.priority}</span></td>
          <td>
            <strong>${alarm.title}</strong><br>
            <small style="color: #64748b;">${alarm.description}</small>
          </td>
          <td>${actorInfo}</td>
          <td><span class="badge ${statusBadgeClass}">${alarm.status}</span></td>
        </tr>
      `;
    });

    container.innerHTML = `
      <table class="audit-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Alarm ID</th>
            <th>Bed / Patient</th>
            <th>Priority</th>
            <th>Clinical Description</th>
            <th>Caregiver Action</th>
            <th>Lifecycle Status</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;

    // Row click
    container.querySelectorAll('tbody tr').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-alarm-id');
        if (onInspect) onInspect(id);
      });
    });
  }
};

