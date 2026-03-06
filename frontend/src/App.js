import { useState } from "react";

// ─── All 10 sample documents ───────────────────────────────────────────────────
const DOCUMENTS = [
  // ── WBS ────────────────────────────────────────────────────────────────────
  {
    id: "wbs1",
    type: "wbs",
    title: "BF#2 Annual Reline Project",
    tag: "Blast Furnace",
    text: `Subject: BF#2 Annual Shutdown and Reline - Work Package Breakdown
Date: February 2026 | Project Manager: Mr. Rajesh Kumar

The annual shutdown for Blast Furnace #2 will commence on 15th March 2026 at 0600hrs. Total shutdown duration estimated at 18-21 days.

Pre-shutdown activities must be completed by 14th March. Mr. Sharma's civil team will handle final production reconciliation and raw material clearance (2 days prior to shutdown). Safety team inspection and permit preparation to be done by Ms. Patel (1 day, can run parallel to civil activities).

Shutdown Day 1-4: Refractory demolition and removal. Civil team under Mr. Sharma responsible. Estimated 3-4 days depending on lining condition. CRITICAL: Cooling must be complete before demolition starts - minimum 48 hours cooling time required.

Concurrent with demolition: Electrical team led by Mr. Anil Patel will disconnect all power systems, inspect switchgear and motors (2-3 days). Mechanical team to remove and inspect tuyeres, blow pipe assemblies (3 days, can start Day 2 after initial cooling).

Days 5-16: New refractory installation by M/s Vesuvius India Limited. Contract team of 25-30 workers. Estimated 10-12 days including curing time. Quality inspection at 50% completion (Day 10) and final inspection (Day 16) by Mr. Deshmukh's quality team (half day each inspection).

Days 14-17: Whilst refractory is curing, mechanical team must complete tuyere replacement and blow pipe refurbishment (5-6 days total). Instrumentation team led by Ms. Reddy to recalibrate all sensors and control systems (3 days, starting Day 15).

Day 17-18: Pre-commissioning checks. Electrical reconnection and testing by Mr. A. Patel's team (1.5 days). Safety systems verification by Ms. Patel (1 day, parallel to electrical). Final walkdown inspection by all department heads and plant manager (half day).

Day 19-21: Hot commissioning sequence. Gradual heat-up under supervision of Chief Operations Officer Mr. Venkatesh. First charging of burden and initial hot blast trial (2-3 days). Production team takes over post successful commissioning trial.`,
  },
  {
    id: "wbs2",
    type: "wbs",
    title: "CCM-3 Emergency Tundish Replacement",
    tag: "Continuous Casting",
    text: `RE: CCM-3 Emergency Tundish Change - Activity Schedule
Prepared by: Maintenance Planning Team | Date: 28 January 2026

Emergency tundish replacement required due to excessive refractory wear. Replacement to be executed during planned weekend shutdown (Saturday 1st Feb 0800hrs to Sunday 2nd Feb 2000hrs).

Saturday 0800-1000hrs: Production team to complete final heat and safely drain CCM-3. Mr. Ravi's operations team responsible. Parallel activity: Stores team (Mr. Ibrahim) to stage replacement tundish and refractory materials at CCM platform (can start Friday evening, 2 hours preparation).

Saturday 1000-1400hrs: Crane operations to remove old tundish. Requires 150T overhead crane - Mr. Prasad's team. SAFETY CRITICAL: Permit to work must be in place, all personnel clear from crane path. Estimated 4 hours including rigging and safe placement in designated scrap area.

Saturday 1400-1800hrs: Platform cleaning and inspection by civil team. Any platform repairs to be completed during this window - Mr. Sharma's team (4 hours allocated).

Saturday 1800hrs-Sunday 0600hrs: New tundish installation. Refractory contractor M/s Orient Refractories will install tundish and complete refractory lining (12 hours including drying time). Quality inspection by Mr. Deshmukh at 2300hrs and again at 0500hrs.

Sunday 0600-1200hrs: Preheating sequence. Electrical team to connect preheating burners and monitor temperature curve (6 hours minimum). Mr. A. Patel responsible for electrical connections and instrumentation checks (2 hours, starting 0600hrs).

Sunday 1200-1600hrs: Final commissioning checks. Mechanical team to verify all alignments, launder connections, stopper rod mechanisms (3 hours). Safety team final walkdown and clearance certificate (1 hour). Operations team to conduct water trials before production restart.

Sunday 1600-2000hrs: Buffer time for any issues. Production restart planned for 2000hrs if all checks satisfactory.`,
  },
  {
    id: "wbs3",
    type: "wbs",
    title: "Rolling Mill Automation Upgrade Phase 1",
    tag: "Rolling Mill",
    text: `Project: Hot Strip Mill - Automation Upgrade Phase 1
Duration: 8 weeks (April-May 2026) | Project Lead: Mr. Sanjay Mehta, Engineering Manager

Week 1-2 (1st-12th April): Engineering and detailed design. Controls engineering team under Ms. Kavitha to finalise PLC logic, HMI screens, network architecture (10 working days). Parallel activity: Procurement team (Mr. Gupta) to finalise supplier contracts and initiate long-lead item orders - specifically Allen Bradley ControlLogix PLCs and Siemens drives (2 weeks for PO processing).

Week 2-3 (8th-19th April): Civil works for new control room and cable trenching. Mr. Sharma's civil team (8 days estimated). Must be complete before electrical installation begins. Electrical team can start conduit installation in existing areas during this period (5 days work by Mr. Patel's team).

Week 3-5 (15th April-3rd May): Equipment delivery and staging. Logistics team coordinating deliveries - allow 2 weeks for customs clearance and inland transport. Stores team (Mr. Ibrahim) responsible for receiving inspection and staging in mill area (ongoing activity, 3 weeks).

Week 4-6 (22nd April-10th May): Main shutdown window for installation. Mill operations suspended:
  - Days 1-5: Old panel decommissioning and removal by vendor team (M/s Schneider Electric India, 15 technicians)
  - Days 6-12: New PLC panel installation, wiring, and termination (Vendor team plus 10 in-house electricians from Mr. Patel's group)
  - Days 8-15: Instrument calibration concurrent with panel work (Ms. Reddy's instrumentation team, 5 technicians)

Week 6-7 (6th-17th May): Testing and commissioning:
  - Week 6: Factory Acceptance Testing simulation in control room (Vendor team with Mr. Mehta and Ms. Kavitha)
  - Week 7: Site Acceptance Testing with actual mill equipment, no load trials (Combined vendor and plant team, 20-25 people)

Week 7-8 (13th-24th May): Production trials and optimisation. Operations team (Mr. Venkatesh) to run controlled production with new system. Gradual ramp-up from 50% capacity to full production (10 days estimated).`,
  },
  {
    id: "wbs4",
    type: "wbs",
    title: "SMS Ladle Refractory Maintenance Programme",
    tag: "Steel Making Shop",
    text: `Monthly Ladle Maintenance - March 2026 Schedule
Refractory Superintendent: Mr. Dinesh Rao

We have 12 ladles in SMS ladle fleet. Maintenance cycle requires 3-4 ladles under maintenance at any time to maintain production continuity.

Batch 1 Ladles (Ladle #3, #7, #11): Schedule for 1st-5th March
Day 1 (1st March): Ladle preparation and demolition. After final heat is poured, ladle to be transported to maintenance bay (1 hour). Cooling period 4 hours minimum before demolition. Demolition of worn refractory lining by civil gang (6-8 hours depending on lining condition). Mr. Sharma's team of 8 workers per ladle.

Day 2-3 (2nd-3rd March): Refractory contractor M/s Indian Refractories to install new lining. Base course installation Day 2 (6 hours work), working lining installation Day 3 (8 hours work). Each ladle requires 2 skilled masons plus 2 helpers. Quality inspection by Mr. Deshmukh at completion of base course and working lining (1 hour each inspection).

Day 4 (4th March): Drying sequence. Gas-fired drying following contractor's recommended curve. Heating and drying managed by refractory contractor's specialist (12 hours minimum). Temperature monitoring by instrumentation team.

Day 5 (5th March): Final inspection and commissioning. Visual inspection, refractory thickness verification, launder alignment check by quality team (2 hours). Safety clearance by Ms. Patel (1 hour). Ladle returned to service post approvals.

Batches 2-4 follow same sequence in weekly cycles through March (Batch 2: 8-12 March, Batch 3: 15-19 March, Batch 4: 22-26 March).`,
  },

  // ── SOP ────────────────────────────────────────────────────────────────────
  {
    id: "sop1",
    type: "sop",
    title: "Hot Metal Sampling & Temperature Measurement",
    tag: "BF-QC-003",
    text: `SOP Number: BF-QC-003 | Title: Blast Furnace Hot Metal Sampling Procedure
Revision: 4.2 | Effective Date: January 2026

SAFETY REQUIREMENTS: All personnel must wear complete PPE including aluminised suit, face shield, safety helmet, safety shoes, and heat-resistant gloves. This is safety critical and non-negotiable.

Step 1: Pre-sampling preparation by Sample Operator
Verify sampling equipment is ready - sample spoon, sample moulds, temperature probe, and PPE are in good condition. Equipment check must be completed before furnace tap begins.

Step 2: Communication and coordination by Shift Supervisor
Coordinate with furnace tapper and confirm sampling point and timing. Notify quality laboratory that sample will be ready in approximately 15 minutes.

Step 3: First sample collection at 5-minute mark by Sample Operator
Wait until hot metal flow is steady (approximately 5 minutes after tap starts). Collect hot metal sample from runner stream using long-handled sampling spoon. Pour into prepared cast iron sample moulds (3 samples minimum). SAFETY CRITICAL: Maintain safe distance, avoid any water contact with hot metal.

Step 4: Temperature measurement by Sample Operator
Immediately immerse calibrated immersion-type temperature probe into hot metal stream. Hold probe for 10 seconds minimum. Record temperature on sampling log sheet.

Step 5: Sample identification and logging by Sample Operator
Mark each sample mould with furnace number, tap number, date, time, and temperature whilst metal is still molten. Complete sampling log including operator name and supervisor signature.

Step 6: Second sample collection at 20-minute mark by Sample Operator
Repeat Steps 3-5 to collect mid-tap sample for consistency check across the tap.

Step 7: Sample cooling and transfer by Sample Operator
Allow samples to cool in moulds for minimum 30 minutes. Once safe to handle, transfer samples to laboratory sample trolley. Notify laboratory that samples are ready.

Step 8: Laboratory notification and documentation by Shift Supervisor
Inform quality laboratory supervisor of sample availability. Ensure all documentation accompanies samples.`,
  },
  {
    id: "sop2",
    type: "sop",
    title: "CCM Cold Startup Sequence",
    tag: "CCM-OP-011",
    text: `SOP Number: CCM-OP-011 | Title: CCM Cold Startup After Shutdown
Department: Steel Making Shop - Continuous Casting | Approved by: Chief Operations Officer

PREREQUISITES: This procedure applies only after planned shutdown of 8 hours or more when CCM has cooled down.

Step 1: Pre-startup inspection by Mechanical Fitter
Inspect all mechanical components - mould oscillation system, segment alignment, spray cooling nozzles, and withdrawal rolls. Any defects must be reported to shift in-charge before proceeding. Safety guards must be in position and secured.

Step 2: Tundish preheating initiation by Tundish Operator
Start preheating sequence using gas burners. Target temperature 1100-1200°C at tundish bottom. Minimum preheating time 4 hours. SAFETY CRITICAL: Verify all gas connections are tight and burner flames are stable before leaving unattended.

Step 3: Water system startup by Utilities Operator
Start secondary cooling water pumps and verify flow to all zones. Check pressure gauges read normal range (4.5-5.5 bar). Inspect all spray nozzles for blockages.

Step 4: Mould cooling water activation by CCM Operator
Start primary mould cooling water circulation. Flow rate must achieve 800-1000 litres per minute. Verify inlet and outlet temperatures are within 5°C difference. Check for any leaks.

Step 5: Hydraulic system check by CCM Operator
Verify hydraulic oil pressure for mould oscillation system (150-170 bar normal). Start oscillation mechanism and check stroke length and frequency match setpoints. Investigate any abnormal noise or vibration before proceeding.

Step 6: Dummy bar insertion by Maintenance Crew
Minimum 2 persons to manually insert dummy bar through entire casting length. Verify dummy bar head is properly positioned in mould and secured. Engage withdrawal pinch rolls gently.

Step 7: Control system initialisation by Panel Operator
Initialise CCM automation system, verify all interlocks are healthy, no alarm conditions exist. Set casting speed to minimum (0.8 metres/min). Confirm communication with ladle tracking system and SMS control room.

Step 8: Final safety walkdown by Shift In-charge
Conduct final walkdown of entire CCM area. Verify all personnel are clear of moving equipment zones, emergency stops are functional, safety barriers are in place. Issue clearance for casting to commence.

Step 9: First ladle positioning and casting start by Ladle Crane Operator
Position first ladle over tundish. Tundish temperature must be above 1100°C before ladle opening. SMS coordinator to confirm ladle temperature is 1580-1620°C. Open ladle slowly and monitor initial metal flow into tundish.`,
  },
  {
    id: "sop3",
    type: "sop",
    title: "Slab Dimensional Inspection",
    tag: "QC-INSP-025",
    text: `SOP Number: QC-INSP-025 | Title: Finished Slab Dimensional and Surface Quality Inspection
Issued by: Quality Assurance Department

Step 1: Slab identification and documentation by Quality Inspector
Verify slab identification number matches production records. Check heat number, grade, and customer order details. SAFETY: Wear safety helmet, safety shoes, and hand gloves during inspection.

Step 2: Visual surface inspection by Quality Inspector
Visually inspect all four surfaces (top, bottom, two edges) for cracks, seams, slivers, scale formation, or depressions. Use inspection hammer to tap suspect areas. Mark any defect locations with yellow marking chalk.

Step 3: Dimensional measurements by Quality Inspector
Using calibrated steel tape, verify Length (3 points), Width (3 points), and Thickness (5 points). All measurements must be within tolerance: ±3mm for length/width, ±1mm for thickness.

Step 4: Defect depth measurement by Quality Inspector
For any surface defects, use depth gauge to measure defect depth. REJECTION CRITERIA: Defects deeper than 2mm on top/bottom surface or 3mm on edge require rejection or downgrading.

Step 5: Surface temperature check by Quality Inspector
Use infrared thermometer to verify slab surface temperature is below 100°C before further handling. Hot slabs pose safety risk and cannot be accurately measured.

Step 6: Squareness and straightness check by Quality Inspector
Verify slab corners are square (90°±0.5°) and edges are straight (deviation <2mm per metre). Non-conforming slabs to be marked for cutting or conditioning.

Step 7: Documentation and disposition by Quality Inspector
Complete inspection report. Assign disposition: ACCEPT (green paint stamp), REWORK (yellow paint), or REJECT (red paint). Inspector to sign and date.

Step 8: Laboratory sample coordination by Quality Inspector
For slabs requiring chemical or mechanical property verification, mark for laboratory sampling and notify laboratory supervisor.

Step 9: Inspection record filing by Quality Inspector
Submit completed inspection sheet to quality control office within 2 hours. Update daily inspection summary in quality register.`,
  },
  {
    id: "sop4",
    type: "sop",
    title: "Confined Space Entry Procedure",
    tag: "SAFETY-CSE-008",
    text: `SOP Number: SAFETY-CSE-008 | Title: Confined Space Entry - BF Bustle Main and Hot Blast Stove
Category: SAFETY CRITICAL PROCEDURE | Authority: Plant Safety Officer

All confined space entry activities are high-risk. Violations may result in disciplinary action.

Step 1: Work permit application by Maintenance Supervisor
Apply for Confined Space Entry Permit minimum 24 hours before planned entry. Specify location, nature of work, estimated duration, and number of personnel.

Step 2: Atmospheric testing by Safety Officer
SAFETY CRITICAL: Conduct atmospheric testing using calibrated 4-gas monitor. Test for: oxygen level (must be 19.5-23.5%), flammable gases (<10% LEL), carbon monoxide (<35 ppm), and hydrogen sulphide (<10 ppm). Test at multiple levels as gases stratify.

Step 3: Ventilation setup by Safety Team
If atmospheric deficiency found, arrange forced ventilation using blowers. Minimum 30 minutes continuous ventilation required before re-testing. Maintain ventilation throughout entry period.

Step 4: Isolation and lockout by Electrical Team
SAFETY CRITICAL: Isolate and lockout all energy sources (electrical, pneumatic, hydraulic). Physical disconnection of hot blast valve is mandatory. Lockout tags applied by authorised personnel only.

Step 5: Communication system setup by Maintenance Crew
Establish two-way radio or sound-powered telephone communication between entrant and standby person outside. Mobile phones are not acceptable as sole communication method.

Step 6: Rescue equipment staging by Safety Team
Stage rescue equipment at entry point: full body harness, retrieval line, rescue tripod with winch, SCBA (minimum 2 sets), first aid kit, and stretcher. SAFETY CRITICAL: Equipment must be inspected and certified current.

Step 7: Permit issuance and briefing by Safety Officer
Conduct toolbox talk explaining hazards, emergency procedures, and communication protocols. Issue Confined Space Entry Permit only after all preconditions are met. Permit valid for single shift only.

Step 8: Entry and continuous monitoring by Entrant and Safety Watchman
Entrant wearing full body harness and retrieval line enters space. SAFETY CRITICAL: Safety watchman must maintain continuous contact with entrant and must NEVER enter the space to attempt rescue.

Step 9: Periodic atmospheric re-testing by Safety Officer
Re-test atmosphere every 2 hours during occupancy. Any adverse reading requires immediate evacuation.

Step 10: Emergency evacuation procedure by All Personnel
On emergency alarm, entrant evacuates immediately via retrieval line. Safety watchman raises alarm. Emergency response team dons SCBA before any rescue attempt.

Step 11: Work completion and permit closure by Maintenance Supervisor
Verify all personnel and tools have exited. Remove temporary equipment, restore isolation points, return permit to safety office with completion sign-off.`,
  },
  {
    id: "sop5",
    type: "sop",
    title: "Non-Conforming Product Quality Hold",
    tag: "QC-PROC-015",
    text: `SOP Number: QC-PROC-015 | Title: Non-Conforming Product Quality Hold and Disposition
Effective: January 2026

Step 1: Non-conformance identification by Any Personnel
Any personnel identifying non-conforming product must immediately mark material with RED FLAG tape and notify shift in-charge. Do not allow material to proceed to next operation.

Step 2: Immediate containment by Shift In-charge
Physically segregate non-conforming material to quarantine area. Update production tracking system. Notify quality control supervisor within 30 minutes of identification.

Step 3: Non-conformance documentation by Quality Inspector
Create Non-Conformance Report (NCR) documenting material identification, nature of non-conformance, quantity affected, and suspected root cause. NCR to be raised in quality management system within 2 hours.

Step 4: Material review board convening by Quality Control Manager
For significant non-conformances (>10 tonnes or customer-specific material), convene Material Review Board (MRB) comprising quality, production, and technical services managers. MRB to meet within 24 hours of NCR.

Step 5: Root cause investigation by Production Supervisor
Investigate root cause using process data, operator inputs, and equipment status. Document findings in NCR. Identify immediate corrective actions to prevent recurrence.

Step 6: Disposition decision by MRB or Quality Manager
Assign disposition: REWORK (can be reprocessed), USE AS IS (minor deviation with customer concession), SCRAP (cannot meet specifications), or RETURN TO SUPPLIER (raw material issue).

Step 7: Customer notification by Sales Coordinator
CRITICAL: If non-conformance affects customer order or delivery, notify customer within 4 hours of disposition decision. Document customer response.

Step 8: Corrective action implementation by Production Manager
Implement corrective actions from Step 5. May include process parameter changes, equipment maintenance, operator retraining, or raw material specification changes. Target completion within 7 days of NCR.

Step 9: Material disposition execution by Relevant Department
Execute rework, scrap, or return per MRB decision. Quality inspector to verify disposition is executed correctly and update NCR status.

Step 10: Effectiveness verification by Quality Manager
Review NCR closure and verify corrective actions have been effective (no repeat non-conformances for 30 days). Close NCR in system.`,
  },
  {
    id: "sop6",
    type: "sop",
    title: "Overhead Crane Pre-operation Safety Inspection",
    tag: "SAFETY-CRANE-002",
    text: `SOP Number: SAFETY-CRANE-002 | Title: Overhead Crane Pre-operation Safety Inspection
Applies to: All overhead cranes >10 tonne capacity
SAFETY CRITICAL PROCEDURE — Must be completed before every shift

Step 1: Visual inspection by Crane Operator
SAFETY CRITICAL: Conduct visual walkround inspection before taking control. Check wire rope condition (no broken wires, kinks, or excessive wear), hook condition (no cracks, deformation, or missing safety latch), oil leaks from gearbox, and condition of runway rails and end stops. Any defect must be reported to maintenance supervisor immediately. Do not operate crane if defects are found.

Step 2: Control system check by Crane Operator
Test all controls: emergency stop buttons (pendant and cabin e-stop), hoist up/down with no load, bridge travel (forward/reverse), trolley travel (left/right), and limit switches (upper/lower hoist limits). All controls must respond smoothly without sticking or delays.

Step 3: Warning systems test by Crane Operator
Activate crane warning bell/siren and verify audible throughout crane operational area. Warning must be given before any crane movement when personnel are in area.

Step 4: Load test with light load by Crane Operator
Perform test lift with light load (approximately 1-2 tonnes) before handling production loads. Observe for unusual noises, vibrations, or jerky movements. Test all directions of travel.

Step 5: Documentation completion by Crane Operator
Complete Pre-operation Checklist form with date, time, crane number, and operator signature. Note any defects or observations. Submit checklist to shift supervisor.

Step 6: Defect reporting and tagging by Maintenance Supervisor
If defects prevent crane operation, attach RED DANGER TAG to crane controls: "CRANE OUT OF SERVICE - DO NOT OPERATE" with defect details and supervisor signature.

Step 7: Safe working load verification by Crane Operator
Before lifting any load, verify load weight is within crane Safe Working Load (SWL) rating. Consult load charts posted in crane cabin. SAFETY CRITICAL: NEVER exceed SWL.

Step 8: Rigging inspection by Rigger/Slinger
SAFETY CRITICAL: Inspect all rigging equipment (slings, shackles, hooks) before use. Check sling identification tags, no cuts/abrasions/burns on synthetic slings, no kinks/broken wires on wire rope slings, no deformation on shackles and hooks, and load capacity markings are clearly visible. Defective rigging to be removed from service immediately.`,
  },
];

// ─── Colour theme ─────────────────────────────────────────────────────────────
const C = {
  bg: "#0b0d12",
  panel: "#10121a",
  border: "#1c1f2d",
  borderHover: "#2a2d3e",
  orange: "#f97316",
  orangeDim: "rgba(249,115,22,0.12)",
  blue: "#3b82f6",
  blueDim: "rgba(59,130,246,0.12)",
  green: "#22c55e",
  greenDim: "rgba(34,197,94,0.08)",
  red: "#ef4444",
  redDim: "rgba(239,68,68,0.06)",
  text: "#e2e8f0",
  muted: "#64748b",
  faint: "#1e2230",
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("wbs");
  const [selectedId, setSelectedId] = useState(null);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});
  const [viewMode, setViewMode] = useState("table");

  const docs = DOCUMENTS.filter((d) => d.type === activeTab);
  const selected = DOCUMENTS.find((d) => d.id === selectedId);
  const currentResult = selectedId ? results[selectedId] : null;
  const processedCount = Object.keys(results).length;

  async function processDoc(doc) {
    setLoading((p) => ({ ...p, [doc.id]: true }));
    setErrors((p) => ({ ...p, [doc.id]: null }));

    try {
      const res = await fetch("/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docType: doc.type, title: doc.title, text: doc.text }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Server error");
      }

      const data = await res.json();
      setResults((p) => ({ ...p, [doc.id]: data.data }));
      setSelectedId(doc.id);
    } catch (err) {
      setErrors((p) => ({ ...p, [doc.id]: err.message }));
    }

    setLoading((p) => ({ ...p, [doc.id]: false }));
  }

  async function processAll() {
    const pending = docs.filter((d) => !results[d.id]);
    for (const doc of pending) await processDoc(doc);
  }

  function exportCSV() {
    if (!currentResult) return;
    const isWBS = selected?.type === "wbs";
    const headers = isWBS
      ? ["task_name", "duration", "responsible_party", "dependencies"]
      : ["step_number", "action_description", "responsible_role", "safety_critical"];

    const rows = currentResult.map((r) =>
      headers.map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`).join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selected.title.replace(/\s+/g, "_")}.csv`;
    a.click();
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Segoe UI', 'Inter', system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      {/* ── Header ── */}
      <header style={{ background: C.panel, borderBottom: `1px solid ${C.border}`, padding: "16px 28px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${C.orange}, #dc2626)`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>⚙</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Manufacturing Doc Intelligence Agent</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 1, fontFamily: "monospace" }}>Claude AI · WBS & SOP Extraction · Steel Operations</div>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <StatBadge label="WBS" value={4} color={C.orange} />
          <StatBadge label="SOP" value={6} color={C.blue} />
          <StatBadge label="Done" value={processedCount} color={C.green} />
        </div>
      </header>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", height: "calc(100vh - 73px)" }}>
        {/* ── Sidebar ── */}
        <aside style={{ width: 280, flexShrink: 0, background: C.panel, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column" }}>
          {/* Tab switcher */}
          <div style={{ padding: "12px 14px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 6 }}>
            {[
              { key: "wbs", label: "▦  WBS", color: C.orange },
              { key: "sop", label: "☰  SOP", color: C.blue },
            ].map(({ key, label, color }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                style={{ flex: 1, padding: "7px 0", background: activeTab === key ? color : "transparent", color: activeTab === key ? "#fff" : C.muted, border: `1px solid ${activeTab === key ? color : C.border}`, borderRadius: 7, cursor: "pointer", fontWeight: 700, fontSize: 11, letterSpacing: "0.06em", transition: "all 0.15s" }}>
                {label}
              </button>
            ))}
          </div>

          {/* Process all button */}
          <div style={{ padding: "10px 14px", borderBottom: `1px solid ${C.border}` }}>
            <button onClick={processAll}
              style={{ width: "100%", padding: "8px 0", background: "transparent", color: activeTab === "wbs" ? C.orange : C.blue, border: `1px solid ${activeTab === "wbs" ? C.orange : C.blue}`, borderRadius: 7, cursor: "pointer", fontWeight: 700, fontSize: 11, letterSpacing: "0.06em" }}>
              ⚡ Process All {activeTab.toUpperCase()} ({docs.filter((d) => !results[d.id]).length} remaining)
            </button>
          </div>

          {/* Doc list */}
          <div style={{ overflowY: "auto", padding: "10px 10px", flex: 1 }}>
            {docs.map((doc) => {
              const done = !!results[doc.id];
              const busy = !!loading[doc.id];
              const err = errors[doc.id];
              const isActive = selectedId === doc.id;
              const accent = doc.type === "wbs" ? C.orange : C.blue;
              const accentDim = doc.type === "wbs" ? C.orangeDim : C.blueDim;

              return (
                <div key={doc.id} style={{ borderRadius: 9, marginBottom: 7, border: `1px solid ${isActive ? accent : C.border}`, background: isActive ? accentDim : C.bg, overflow: "hidden", transition: "all 0.15s" }}>
                  <div onClick={() => done && setSelectedId(doc.id)} style={{ padding: "10px 12px", cursor: done ? "pointer" : "default" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.text, lineHeight: 1.4 }}>{doc.title}</span>
                      {done && <span style={{ color: C.green, fontSize: 14, marginLeft: 6, flexShrink: 0 }}>✓</span>}
                      {err && <span style={{ color: C.red, fontSize: 14, marginLeft: 6 }}>✕</span>}
                    </div>
                    <span style={{ marginTop: 5, display: "inline-block", fontSize: 9, fontFamily: "monospace", color: accent, background: accentDim, borderRadius: 4, padding: "2px 6px", letterSpacing: "0.04em" }}>{doc.tag}</span>
                  </div>

                  <div style={{ borderTop: `1px solid ${C.faint}`, background: "#080a10", padding: "7px 12px" }}>
                    <button onClick={() => processDoc(doc)} disabled={busy}
                      style={{ width: "100%", padding: "6px 0", background: busy ? C.faint : done ? C.greenDim : accentDim, color: busy ? C.muted : done ? C.green : accent, border: `1px solid ${busy ? C.faint : done ? "rgba(34,197,94,0.25)" : accent + "44"}`, borderRadius: 6, cursor: busy ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase", transition: "all 0.15s" }}>
                      {busy ? "⟳  Extracting..." : done ? "↺  Re-extract" : "⚡  Extract"}
                    </button>
                    {err && <div style={{ marginTop: 5, fontSize: 10, color: C.red, lineHeight: 1.4 }}>{err}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* ── Main content ── */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {!currentResult ? (
            /* Empty state */
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, color: C.muted, padding: 40 }}>
              <div style={{ fontSize: 52 }}>🏭</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#475569" }}>Select a Document to Begin</div>
              <div style={{ fontSize: 13, color: "#334155", textAlign: "center", maxWidth: 340, lineHeight: 1.7 }}>
                Click <strong style={{ color: C.muted }}>⚡ Extract</strong> on any document in the panel, or use <strong style={{ color: C.muted }}>⚡ Process All</strong> to run the AI agent on every document at once.
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
                {[["▦", "4 WBS Documents", C.orange], ["☰", "6 SOP Documents", C.blue], ["⚡", "Claude Sonnet 4", "#a855f7"]].map(([icon, text, color]) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 7, background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 14px" }}>
                    <span style={{ color, fontSize: 14 }}>{icon}</span>
                    <span style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Result header */}
              <div style={{ padding: "14px 22px", borderBottom: `1px solid ${C.border}`, background: C.panel, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{selected?.title}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2, fontFamily: "monospace" }}>
                    {selected?.type === "wbs" ? `${currentResult.length} tasks extracted` : `${currentResult.length} procedure steps extracted`}
                    {" · "}{selected?.tag}
                  </div>
                </div>

                <button onClick={exportCSV} style={{ padding: "6px 14px", background: "transparent", color: C.green, border: `1px solid rgba(34,197,94,0.35)`, borderRadius: 7, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>
                  ⬇ CSV
                </button>

                <div style={{ display: "flex", border: `1px solid ${C.border}`, borderRadius: 7, overflow: "hidden" }}>
                  {[["table", "⊞ Table"], ["raw", "{} JSON"]].map(([v, label]) => (
                    <button key={v} onClick={() => setViewMode(v)}
                      style={{ padding: "6px 14px", background: viewMode === v ? C.faint : "transparent", color: viewMode === v ? C.text : C.muted, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, transition: "all 0.15s" }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table / JSON */}
              <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px" }}>
                {viewMode === "table"
                  ? selected?.type === "wbs"
                    ? <WBSTable data={currentResult} />
                    : <SOPTable data={currentResult} />
                  : <JSONView data={currentResult} />
                }
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatBadge({ label, value, color }) {
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 12px", textAlign: "center" }}>
      <div style={{ fontSize: 17, fontWeight: 800, color, lineHeight: 1.2 }}>{value}</div>
      <div style={{ fontSize: 9, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

function WBSTable({ data }) {
  return (
    <div style={{ borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: C.panel }}>
            <Th style={{ width: 40, textAlign: "center" }}>#</Th>
            <Th style={{ width: "34%" }}>Task / Description</Th>
            <Th style={{ width: "13%" }}>Duration</Th>
            <Th style={{ width: "26%" }}>Responsible Party</Th>
            <Th style={{ width: "27%" }}>Dependencies</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? C.bg : "#0d0f16", borderBottom: `1px solid ${C.faint}` }}>
              <Td style={{ textAlign: "center", color: C.orange, fontFamily: "monospace", fontWeight: 700 }}>{i + 1}</Td>
              <Td style={{ color: C.text, fontWeight: 500 }}>{row.task_name}</Td>
              <Td>
                <span style={{ background: C.orangeDim, color: "#fb923c", borderRadius: 5, padding: "2px 8px", fontSize: 11, fontFamily: "monospace", whiteSpace: "nowrap" }}>
                  {row.duration}
                </span>
              </Td>
              <Td style={{ color: "#94a3b8" }}>{row.responsible_party}</Td>
              <Td style={{ color: C.muted, fontSize: 12 }}>{row.dependencies}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SOPTable({ data }) {
  return (
    <div style={{ borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: C.panel }}>
            <Th style={{ width: 50, textAlign: "center" }}>Step</Th>
            <Th style={{ width: "50%" }}>Action / Description</Th>
            <Th style={{ width: "26%" }}>Responsible Role</Th>
            <Th style={{ width: "16%" }}>Safety Critical</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            const critical = row.safety_critical === "Yes";
            return (
              <tr key={i} style={{ background: critical ? C.redDim : i % 2 === 0 ? C.bg : "#0d0f16", borderBottom: `1px solid ${critical ? "rgba(239,68,68,0.1)" : C.faint}` }}>
                <Td style={{ textAlign: "center", color: C.blue, fontFamily: "monospace", fontWeight: 700 }}>{row.step_number}</Td>
                <Td style={{ color: C.text, lineHeight: 1.55 }}>{row.action_description}</Td>
                <Td style={{ color: "#94a3b8" }}>{row.responsible_role}</Td>
                <Td>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: critical ? "rgba(239,68,68,0.14)" : C.greenDim, color: critical ? "#f87171" : C.green, border: `1px solid ${critical ? "rgba(239,68,68,0.28)" : "rgba(34,197,94,0.2)"}`, borderRadius: 6, padding: "3px 9px", fontSize: 10, fontWeight: 800, letterSpacing: "0.05em" }}>
                    {critical ? "⚠ YES" : "✓ NO"}
                  </span>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function JSONView({ data }) {
  return (
    <pre style={{ background: "#070810", border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, fontSize: 12, fontFamily: "monospace", color: "#a0aec0", overflow: "auto", lineHeight: 1.75, margin: 0 }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

const thBase = { padding: "10px 14px", fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase", borderBottom: `1px solid ${C.border}`, textAlign: "left" };
const tdBase = { padding: "10px 14px", fontSize: 12, color: "#94a3b8", verticalAlign: "top" };

function Th({ style, children }) { return <th style={{ ...thBase, ...style }}>{children}</th>; }
function Td({ style, children }) { return <td style={{ ...tdBase, ...style }}>{children}</td>; }
