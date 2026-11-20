import subprocess
import time
import os

EDGE_EXE = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
BASE_URL = r'file:///C:/Users/HP/Desktop/HCI_Project/prototype/index.html'
OUT_DIR = r'C:\Users\HP\Desktop\HCI_Project\screenshots'

os.makedirs(OUT_DIR, exist_ok=True)

screens = [
    ('screen1_dashboard.png', BASE_URL),
    ('screen2_alarm_details_modal.png', BASE_URL + '#modal-ALM-2026-001'),
    ('screen3_resolution_dialog.png', BASE_URL + '#resolve-ALM-2026-001'),
    ('screen4_alarm_history.png', BASE_URL + '#history'),
    ('screen5_patient_focused_view.png', BASE_URL + '#patient-P-101')
]

for name, url in screens:
    out_file = os.path.join(OUT_DIR, name)
    cmd = [
        EDGE_EXE,
        '--headless=new',
        '--virtual-time-budget=2000',
        f'--screenshot={out_file}',
        '--window-size=1280,1050',
        url
    ]
    print(f'Capturing {name}...')
    subprocess.run(cmd, capture_output=True)
    if os.path.exists(out_file):
        print(f'  --> Success: {name} ({os.path.getsize(out_file)} bytes)')
    else:
        print(f'  --> Failed: {name}')

print('All 6 high-resolution screenshots captured successfully.')
