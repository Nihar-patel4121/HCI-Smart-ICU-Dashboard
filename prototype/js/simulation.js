/**
 * Simulation Controller & Web Audio Chime Generator
 * Provides deterministic scenarios for HCI evaluation and showcase demonstrations
 */

const SimulationEngine = {
  audioCtx: null,
  isAudioMuted: false,
  soundInterval: null,

  init() {
    // Audio Context is initialized on first user gesture
    window.addEventListener('click', () => {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      }
    }, { once: true });
  },

  playAlertTone(type = 'critical') {
    if (this.isAudioMuted) return;
    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.audioCtx = new AudioContext();
      }
      if (!this.audioCtx || this.audioCtx.state === 'suspended') {
        this.audioCtx && this.audioCtx.resume();
      }
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;

      if (type === 'critical') {
        // IEC 60601-1-8 inspired 3-pulse urgent medical harmonic tone (C5 - E5 - G5)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.12); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.24); // G5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'warning') {
        // 2-tone melodic warning (F4 - A4)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(349.23, now);
        osc.frequency.setValueAtTime(440.00, now + 0.15);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        osc.start(now);
        osc.stop(now + 0.35);
      } else {
        // Soft advisory chime (Single 880Hz soft ping)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.26);
      }
    } catch (e) {
      console.warn('Audio tone unavailable:', e);
    }
  },

  toggleMute(btnElement) {
    this.isAudioMuted = !this.isAudioMuted;
    if (btnElement) {
      if (this.isAudioMuted) {
        btnElement.classList.add('muted');
        btnElement.innerHTML = '🔇 Sound: Off';
      } else {
        btnElement.classList.remove('muted');
        btnElement.innerHTML = '🔊 Sound: On';
      }
    }
    return this.isAudioMuted;
  },

  loadScenario(scenarioName, callback) {
    if (scenarioName === 'SCENARIO_1_DEFAULT') {
      // Dual alarm baseline: Bed 01 Critical + Bed 04 Artifact
      PatientStore.init(DEFAULT_PATIENTS);
      AlarmStore.init(DEFAULT_ALARMS);
      this.playAlertTone('critical');
      App.showToast('Scenario 1 Loaded: Dual Alarm (Critical Desaturation + Advisory Lead Degradation)', 'danger');
    } 
    else if (scenarioName === 'SCENARIO_2_VENT_DISCONNECT') {
      // Introduce an acute ventilator circuit disconnect on Bed 02
      PatientStore.updatePatientStatus('P-102', 'Critical');
      PatientStore.updatePatientVitals('P-102', {
        spo2: 84,
        spo2Trend: 'decreasing',
        rr: 6,
        hr: 114
      });

      const ventAlarm = {
        id: `ALM-2026-00${AlarmStore.getAll().length + 1}`,
        patientId: 'P-102',
        bed: 'Bed 02',
        priority: 'Critical',
        category: 'Mechanical Ventilation',
        title: 'Ventilator Circuit Disconnect / Apnea Detected',
        description: 'Expiratory minute volume dropped to zero. Sustained apnea > 15s with rapid desaturation.',
        triggerValue: 'Exp Vol: 0.0 L/min | RR: 6 /min',
        normalRange: 'Exp Vol > 5.0 L/min | RR: 12-20',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        status: 'Active',
        context: {
          suspectedRootCause: 'Y-piece tubing disconnected from endotracheal tube or water trap pop-off.',
          recommendedAction: '1. Immediately re-attach ventilator limb. 2. Manual bag ventilation if circuit cannot be sealed within 10s.',
          multiParameterCorrelation: 'Immediate SpO2 desaturation (84%) confirms cessation of alveolar ventilation. Life threat.',
          confidenceScore: '99% Confirmed Acute Mechanical Failure'
        },
        history: [
          { action: 'Triggered', by: 'Dräger Evita V500', time: new Date().toLocaleTimeString(), note: 'Airway pressure = 0 mbar' }
        ]
      };

      AlarmStore.addSimulatedAlarm(ventAlarm);
      this.playAlertTone('critical');
      App.showToast('🚨 Simulated Event Injected: Bed 02 Ventilator Disconnect!', 'danger');
    }
    else if (scenarioName === 'SCENARIO_3_ARRHYTHMIA') {
      // Trigger Ventricular Tachycardia on Bed 03
      PatientStore.updatePatientStatus('P-103', 'Critical');
      PatientStore.updatePatientVitals('P-103', {
        hr: 175,
        hrTrend: 'increasing',
        bp: '70/40',
        map: 50
      });

      const vtAlarm = {
        id: `ALM-2026-00${AlarmStore.getAll().length + 1}`,
        patientId: 'P-103',
        bed: 'Bed 03',
        priority: 'Critical',
        category: 'Cardiac Arrhythmia',
        title: 'Sustained Ventricular Tachycardia (Wide Complex)',
        description: 'Monomorphic ventricular tachycardia at 175 bpm with profound hemodynamic collapse (MAP 50 mmHg).',
        triggerValue: 'HR: 175 bpm (VT) | MAP: 50 mmHg',
        normalRange: 'NSR 60-100 bpm | MAP > 65 mmHg',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        status: 'Active',
        context: {
          suspectedRootCause: 'Ischemic myocardial irritability or severe electrolyte imbalance (K+ / Mg++).',
          recommendedAction: '1. Check pulse and responsiveness. 2. Call Crash Team / Code Blue. 3. Prepare synchronized cardioversion defibrillator.',
          multiParameterCorrelation: 'Arterial line transducer confirms severe pulse deficit and precipitously falling blood pressure (70/40).',
          confidenceScore: '98% Confirmed Lethal Arrhythmia'
        },
        history: [
          { action: 'Triggered', by: 'Arrhythmia Multi-Lead Algorithm', time: new Date().toLocaleTimeString(), note: 'VT run > 8 complexes' }
        ]
      };

      AlarmStore.addSimulatedAlarm(vtAlarm);
      this.playAlertTone('critical');
      App.showToast('🚨 Simulated Event Injected: Bed 03 Ventricular Tachycardia!', 'danger');
    }
    else if (scenarioName === 'SCENARIO_4_ALL_STABLE') {
      // Resolve all alarms to demonstrate calm ICU state
      AlarmStore.getAll().forEach(alarm => {
        if (alarm.status !== 'Resolved') {
          alarm.status = 'Resolved';
          alarm.resolvedBy = 'Nurse Priya Sharma (RN)';
          alarm.resolvedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
          if (!alarm.history) alarm.history = [];
          alarm.history.push({
            action: 'Resolved',
            by: 'Shift Turnover Protocol',
            time: new Date().toLocaleTimeString(),
            note: 'All bedside parameters stabilized. Unit quiet.'
          });
        }
      });

      PatientStore.getAll().forEach(p => {
        p.status = 'Stable';
        p.vitals.spo2 = 98;
        p.vitals.hr = 74;
        p.sensors.spo2Probe = 'Connected';
        p.sensors.ecg = 'Connected';
      });

      this.playAlertTone('advisory');
      App.showToast('All Patients Stabilized: Alarms Resolved and Moved to History', 'success');
    }

    if (callback) callback();
  }
};

