import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';

async function generateProfile() {
  const pdfDoc = await PDFDocument.create();
  const timesRoman = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const timesBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const timesItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const red = rgb(0.85, 0.1, 0.15); // KRCC Brand Red #D91A26
  const dark = rgb(0.08, 0.1, 0.15); // KRCC Brand Dark #141A26
  const charcoal = rgb(0.2, 0.23, 0.28);
  const lightGrey = rgb(0.95, 0.96, 0.97);
  const white = rgb(1, 1, 1);
  const gold = rgb(0.8, 0.65, 0.2);

  // ================= PAGE 1: COVER =================
  const page1 = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page1.getSize();

  // Background header band
  page1.drawRectangle({
    x: 0,
    y: height - 160,
    width: width,
    height: 160,
    color: dark,
  });

  // Red accent stripe
  page1.drawRectangle({
    x: 0,
    y: height - 168,
    width: width,
    height: 8,
    color: red,
  });

  // Top header text
  page1.drawText('KHABEER AL RAIDA CONTRACTING COMPANY', {
    x: 45,
    y: height - 60,
    size: 18,
    font: timesBold,
    color: white,
  });

  page1.drawText('SHARIKAT KHABEER AL RAIDA LIL MUQAWALAT (KRCC)', {
    x: 45,
    y: height - 82,
    size: 11,
    font: timesRoman,
    color: rgb(0.8, 0.85, 0.9),
  });

  page1.drawText('BUILDING TODAY FOR A STRONGER TOMORROW  *  SINCE 2008', {
    x: 45,
    y: height - 120,
    size: 10.5,
    font: timesBold,
    color: red,
  });

  // Main Cover Title Box
  page1.drawRectangle({
    x: 45,
    y: height - 420,
    width: width - 90,
    height: 200,
    color: lightGrey,
    borderColor: rgb(0.88, 0.9, 0.92),
    borderWidth: 1,
  });

  page1.drawRectangle({
    x: 45,
    y: height - 230,
    width: 6,
    height: 10,
    color: red,
  });

  page1.drawText('CORPORATE COMPANY PROFILE', {
    x: 65,
    y: height - 270,
    size: 26,
    font: timesBold,
    color: dark,
  });

  page1.drawText('Specialized Solutions & Supply Portfolio', {
    x: 65,
    y: height - 300,
    size: 14,
    font: timesItalic,
    color: charcoal,
  });

  page1.drawText('Specializing in:', {
    x: 65,
    y: height - 335,
    size: 12,
    font: timesBold,
    color: red,
  });

  const coreBullets = [
    '* Advanced Waterproofing Systems (EPDM, PVC, Bitumen, GRP & HDPE)',
    '* Polyurethane Foam Spray & High-Efficiency Thermal Insulation',
    '* Heavy-Duty Industrial Epoxy Flooring & Self-Leveling Screeds',
    '* Certified Construction Materials Supply (Aggregates, Sand, Membranes)',
    '* Certified From: ISO, ARAMCO, SEC, CLASSIFICATION, SAC',
  ];

  let bulletY = height - 355;
  for (const b of coreBullets) {
    page1.drawText(b, {
      x: 75,
      y: bulletY,
      size: 10,
      font: timesRoman,
      color: dark,
    });
    bulletY -= 16;
  }

  // Cover Info footer block
  page1.drawRectangle({
    x: 45,
    y: 70,
    width: width - 90,
    height: 130,
    color: dark,
  });

  page1.drawRectangle({
    x: 45,
    y: 196,
    width: width - 90,
    height: 4,
    color: red,
  });

  page1.drawText('INTERNATIONAL OPERATIONS: SAUDI ARABIA (HQ) - UK - UAE - PAKISTAN', {
    x: 65,
    y: 165,
    size: 9,
    font: timesBold,
    color: white,
  });

  page1.drawText('Phone: +966 530 076 628  /  +966 566 200 276', {
    x: 65,
    y: 140,
    size: 10,
    font: timesRoman,
    color: rgb(0.9, 0.9, 0.9),
  });

  page1.drawText('Official Portal: www.krccksa.com', {
    x: 65,
    y: 120,
    size: 10,
    font: timesRoman,
    color: rgb(0.9, 0.9, 0.9),
  });

  page1.drawText('Corporate Inquiry: khabeeralraida6@gmail.com', {
    x: 65,
    y: 100,
    size: 10,
    font: timesRoman,
    color: rgb(0.9, 0.9, 0.9),
  });

  // ================= PAGE 2: ABOUT US & COMMITMENTS =================
  const page2 = pdfDoc.addPage([595.28, 841.89]);
  
  // Header bar
  page2.drawRectangle({ x: 0, y: height - 55, width: width, height: 55, color: dark });
  page2.drawRectangle({ x: 0, y: height - 60, width: width, height: 5, color: red });
  page2.drawText('KHABEER AL RAIDA CONTRACTING COMPANY (KRCC)', {
    x: 45,
    y: height - 35,
    size: 12,
    font: timesBold,
    color: white,
  });
  page2.drawText('Page 02', {
    x: width - 85,
    y: height - 35,
    size: 10,
    font: timesRoman,
    color: rgb(0.8, 0.8, 0.8),
  });

  page2.drawText('01. ABOUT KHABEER AL RAIDA CONTRACTING CO.', {
    x: 45,
    y: height - 95,
    size: 16,
    font: timesBold,
    color: dark,
  });

  const aboutParagraphs = [
    'KHABEER AL RAIDA CONTRACTING COMPANY (KRCC) is an internationally operating contracting and construction material supply firm established in 2008 to deliver superior protective, structural, and finishing solutions across commercial, industrial, infrastructure, and residential developments throughout the Kingdom of Saudi Arabia, with active operations and regional coordination in the United Kingdom (UK), United Arab Emirates (UAE), and Pakistan.',
    'Under our motto "BUILDING TODAY FOR A STRONGER TOMORROW", we engineer resilient building envelopes designed to withstand demanding climatic conditions. From high-specification waterproofing membranes to advanced thermal barrier polyurethane sprays, industrial chemical-resistant floorings, and subterranean containment linings, we pride ourselves on precision, safety, and rigorous compliance with engineering project specifications.',
    'We combine international engineering workforce expertise with reliable material sourcing, supplying certified construction aggregate, dune sand, crushed stone, sub-base materials, and high-performance membrane rolls to major contractor partners and developers.',
  ];

  let pY = height - 125;
  for (const p of aboutParagraphs) {
    const lines = wrapText(p, 85);
    for (const l of lines) {
      page2.drawText(l, { x: 45, y: pY, size: 9.5, font: timesRoman, color: charcoal });
      pY -= 14;
    }
    pY -= 10;
  }

  // Four Pillars Grid
  page2.drawText('CORE VALUES & OPERATIONAL STANDARDS', {
    x: 45,
    y: pY - 5,
    size: 13,
    font: timesBold,
    color: red,
  });
  pY -= 25;

  const pillars = [
    { title: 'Quality Workmanship', desc: 'Strict execution in accordance with approved consultant submittals, ASTM standards, and Saudi building codes.' },
    { title: 'Safety-First Protocol', desc: 'Comprehensive PPE, job safety analysis (JSA), hot-work protocols for torch application, and chemical safety.' },
    { title: 'Dependable Execution', desc: 'Meeting tight structural milestones with scheduled delivery, tested waterproofing seals, and warranty documentation.' },
    { title: 'Comprehensive Sourcing', desc: 'Direct access to premier membrane brands, industrial resins, and tested geological aggregate materials.' }
  ];

  for (const pil of pillars) {
    page2.drawRectangle({
      x: 45,
      y: pY - 45,
      width: width - 90,
      height: 48,
      color: lightGrey,
      borderColor: rgb(0.88, 0.9, 0.92),
      borderWidth: 1,
    });
    page2.drawRectangle({
      x: 45,
      y: pY - 45,
      width: 4,
      height: 48,
      color: red,
    });
    page2.drawText(pil.title, { x: 60, y: pY - 18, size: 11, font: timesBold, color: dark });
    page2.drawText(pil.desc, { x: 60, y: pY - 34, size: 8.5, font: timesRoman, color: charcoal });
    pY -= 56;
  }

  // ================= PAGE 3: THE 11 CONTRACTING SERVICES =================
  const page3 = pdfDoc.addPage([595.28, 841.89]);
  page3.drawRectangle({ x: 0, y: height - 55, width: width, height: 55, color: dark });
  page3.drawRectangle({ x: 0, y: height - 60, width: width, height: 5, color: red });
  page3.drawText('KHABEER AL RAIDA CONTRACTING COMPANY (KRCC)', {
    x: 45,
    y: height - 35,
    size: 12,
    font: timesBold,
    color: white,
  });
  page3.drawText('Page 03', {
    x: width - 85,
    y: height - 35,
    size: 10,
    font: timesRoman,
    color: rgb(0.8, 0.8, 0.8),
  });

  page3.drawText('02. SPECIALIZED CONTRACTING SERVICES (11 DISCIPLINES)', {
    x: 45,
    y: height - 90,
    size: 14,
    font: timesBold,
    color: dark,
  });

  const services = [
    { title: '1. Polyurethane Foam Spray Services', desc: 'High-density seamless spray foam insulation for roof decks and exterior walls, delivering thermal efficiency and moisture containment.' },
    { title: '2. Lightweight Foam Concrete', desc: 'Cellular lightweight concrete engineered for slope creation, void filling, and floor-leveling requirements with reduced dead loads.' },
    { title: '3. Waterproofing by Black EPDM Procedure', desc: 'Durable vulcanized synthetic rubber membrane systems for long-term building envelope and substructure protection.' },
    { title: '4. Waterproofing by White-on-Black EPDM Procedure', desc: 'Specialized dual-layer membrane with high solar-reflective white surface for superior thermal reflectance and cooling energy savings.' },
    { title: '5. Waterproofing by White PVC Procedure', desc: 'Thermoplastic PVC roofing membrane heat-welded for flat roofs, terraces, and commercial canopies.' },
    { title: '6. Torch-Applied Bitumen Membrane', desc: 'Heavy-duty polymer-modified bituminous rolls torched to foundations, retaining walls, basements, and podium decks.' },
    { title: '7. GRP Lining in Concrete Tanks', desc: 'Glass-reinforced plastic (fiberglass) seamless lining for underground water tanks, potable reservoirs, and chemical sumps.' },
    { title: '8. Epoxy Flooring Systems', desc: 'Multi-coat high-durability epoxy and polyurethane flooring for warehouses, workshops, healthcare facilities, and parking decks.' },
    { title: '9. Self-Leveling Concrete Screeds', desc: 'High-flow polymer-modified floor leveling compounds to achieve ultra-smooth surfaces prior to finish applications.' },
    { title: '10. HDPE Lining Systems', desc: 'High-Density Polyethylene geomembrane sheets with hot-wedge seaming for ponds, retention basins, and landfill containment.' },
    { title: '11. Wet Area Waterproofing', desc: 'Multi-layer polyurethane, acrylic, and cementitious waterproofing for bathrooms, kitchens, balconies, and wet utilities.' },
  ];

  let sY = height - 115;
  for (const s of services) {
    page3.drawText(s.title, { x: 45, y: sY, size: 9.5, font: timesBold, color: red });
    page3.drawText(s.desc, { x: 45, y: sY - 12, size: 8, font: timesRoman, color: charcoal });
    sY -= 28;
  }

  // ================= PAGE 4: MATERIAL SUPPLY & CONTACT =================
  const page4 = pdfDoc.addPage([595.28, 841.89]);
  page4.drawRectangle({ x: 0, y: height - 55, width: width, height: 55, color: dark });
  page4.drawRectangle({ x: 0, y: height - 60, width: width, height: 5, color: red });
  page4.drawText('KHABEER AL RAIDA CONTRACTING COMPANY (KRCC)', {
    x: 45,
    y: height - 35,
    size: 12,
    font: timesBold,
    color: white,
  });
  page4.drawText('Page 04', {
    x: width - 85,
    y: height - 35,
    size: 10,
    font: timesRoman,
    color: rgb(0.8, 0.8, 0.8),
  });

  page4.drawText('03. CONSTRUCTION MATERIAL SUPPLY DIVISION', {
    x: 45,
    y: height - 90,
    size: 14,
    font: timesBold,
    color: dark,
  });

  const materials = [
    { category: 'Waterproofing & Chemical Materials', items: 'APP / SBS Bituminous Membrane Rolls, Liquid Waterproofing, Primer, Protection Boards, PVC & EPDM Membranes, HDPE Sheets, GRP Resins & Woven Fabrics, Polyurethane Spray Chemicals, Epoxy Primers & Topcoats.' },
    { category: 'Earthwork & Backfilling Materials', items: 'Clean Dune Sand for thermal pipe bedding, Crushed Aggregates (various grades), Road Base, Sub-base (Class A/B), Sub-grade structural fill material for site grading and road foundations.' },
    { category: 'Quality & Datasheet Support', items: 'All materials supplied with manufacturer test certificates, technical data sheets (TDS), safety data sheets (SDS), and compliance with Saudi Ministry of Transport and Municipal requirements.' }
  ];

  let mY = height - 120;
  for (const m of materials) {
    page4.drawRectangle({
      x: 45,
      y: mY - 60,
      width: width - 90,
      height: 64,
      color: lightGrey,
      borderColor: rgb(0.88, 0.9, 0.92),
      borderWidth: 1,
    });
    page4.drawRectangle({
      x: 45,
      y: mY - 60,
      width: 4,
      height: 64,
      color: red,
    });
    page4.drawText(m.category, { x: 60, y: mY - 16, size: 10.5, font: timesBold, color: dark });
    const lines = wrapText(m.items, 85);
    let ly = mY - 32;
    for (const l of lines) {
      page4.drawText(l, { x: 60, y: ly, size: 8, font: timesRoman, color: charcoal });
      ly -= 11;
    }
    mY -= 76;
  }

  // ================= PAGE 5: APPROVED VENDOR LIST (18 ENTITIES) & CONTACT =================
  const page5 = pdfDoc.addPage([595.28, 841.89]);
  page5.drawRectangle({ x: 0, y: height - 55, width: width, height: 55, color: dark });
  page5.drawRectangle({ x: 0, y: height - 60, width: width, height: 5, color: red });
  page5.drawText('KHABEER AL RAIDA CONTRACTING COMPANY (KRCC)', {
    x: 45,
    y: height - 35,
    size: 12,
    font: timesBold,
    color: white,
  });
  page5.drawText('Page 05', {
    x: width - 85,
    y: height - 35,
    size: 10,
    font: timesRoman,
    color: rgb(0.8, 0.8, 0.8),
  });

  page5.drawText('04. OUR APPROVED VENDOR REGISTRATIONS (18 ENTITIES)', {
    x: 45,
    y: height - 90,
    size: 14,
    font: timesBold,
    color: dark,
  });

  page5.drawText('Officially pre-qualified & registered vendor with leading Saudi clients and contractors:', {
    x: 45,
    y: height - 108,
    size: 9.5,
    font: timesItalic,
    color: charcoal,
  });

  const vendorsList = [
    { num: '01', name: 'Saudi Aramco', code: 'Vendor Code: 10110264' },
    { num: '02', name: 'Saudi Electric Co. (SEC)', code: 'Vendor Code: 2008453' },
    { num: '03', name: 'NEOM', code: 'Vendor Code: 1100003834' },
    { num: '04', name: 'Al Yamama Co.', code: 'Vendor Code: 10011688' },
    { num: '05', name: 'Shapoorji Pallonji', code: 'Vendor Code: 10135951' },
    { num: '06', name: 'Saudi Radwa Food Co.', code: 'Vendor Code: SRF2990' },
    { num: '07', name: 'Alkifah Contracting', code: 'Vendor Code: 4000014817' },
    { num: '08', name: 'Al-Bawani', code: 'Vendor Code: 26-20-0006' },
    { num: '09', name: 'EFSIM (Facilities Mgmt)', code: 'Vendor Code: 5017861' },
    { num: '10', name: 'Saudi Binladin Group', code: 'Vendor Code: SBG_10533917' },
    { num: '11', name: 'Nesma & Partners Contracting', code: 'Vendor Code: VR07461' },
    { num: '12', name: 'SABIC', code: 'Vendor Code: BNO-300000004728' },
    { num: '13', name: 'Jeddah Central Development', code: 'Vendor Code: BNO-300000004728' },
    { num: '14', name: 'Spray Polyurethane Foam Alliance', code: 'Vendor Code: 52104592' },
    { num: '15', name: 'Tatweer Buildings Co. (TBC)', code: 'Vendor Code: 4030483919' },
    { num: '16', name: 'El Seif Engineering Contracting', code: 'Supplier: 25456 / Task: 8072318' },
    { num: '17', name: 'ROSHN Group Company', code: 'Vendor Code: 4082039' },
    { num: '18', name: 'UrbaCon Trading & Contracting', code: 'Vendor Code: 018808' },
  ];

  // Draw 2-column vendor grid
  let vY = height - 130;
  for (let i = 0; i < vendorsList.length; i += 2) {
    const left = vendorsList[i];
    const right = vendorsList[i + 1];

    // Left card
    page5.drawRectangle({
      x: 45,
      y: vY - 26,
      width: 245,
      height: 32,
      color: lightGrey,
      borderColor: rgb(0.88, 0.9, 0.92),
      borderWidth: 1,
    });
    page5.drawRectangle({ x: 45, y: vY - 26, width: 3, height: 32, color: red });
    page5.drawText(`${left.num}. ${left.name}`, { x: 55, y: vY - 10, size: 8.5, font: timesBold, color: dark });
    page5.drawText(left.code, { x: 55, y: vY - 22, size: 7.5, font: timesRoman, color: red });

    // Right card
    if (right) {
      page5.drawRectangle({
        x: 305,
        y: vY - 26,
        width: 245,
        height: 32,
        color: lightGrey,
        borderColor: rgb(0.88, 0.9, 0.92),
        borderWidth: 1,
      });
      page5.drawRectangle({ x: 305, y: vY - 26, width: 3, height: 32, color: red });
      page5.drawText(`${right.num}. ${right.name}`, { x: 315, y: vY - 10, size: 8.5, font: timesBold, color: dark });
      page5.drawText(right.code, { x: 315, y: vY - 22, size: 7.5, font: timesRoman, color: red });
    }

    vY -= 38;
  }

  // Contact & Project Engagement Section on Page 5
  page5.drawText('05. CONTACT OUR COMMERCIAL & ESTIMATING TEAM', {
    x: 45,
    y: vY - 10,
    size: 13,
    font: timesBold,
    color: dark,
  });

  page5.drawRectangle({
    x: 45,
    y: 50,
    width: width - 90,
    height: 165,
    color: dark,
  });

  page5.drawRectangle({
    x: 45,
    y: 211,
    width: width - 90,
    height: 4,
    color: red,
  });

  page5.drawText('KHABEER AL RAIDA CONTRACTING COMPANY', {
    x: 65,
    y: 185,
    size: 13,
    font: timesBold,
    color: white,
  });

  page5.drawText('BUILDING TODAY FOR A STRONGER TOMORROW  *  EST. 2008', {
    x: 65,
    y: 168,
    size: 9,
    font: timesBold,
    color: red,
  });

  page5.drawText('Mobile & WhatsApp Inquiries:', { x: 65, y: 145, size: 8.5, font: timesBold, color: white });
  page5.drawText('+966 530 076 628  /  +966 566 200 276', { x: 230, y: 145, size: 8.5, font: timesRoman, color: rgb(0.9, 0.9, 0.9) });

  page5.drawText('Official Website:', { x: 65, y: 125, size: 8.5, font: timesBold, color: white });
  page5.drawText('https://www.krccksa.com', { x: 230, y: 125, size: 8.5, font: timesRoman, color: rgb(0.9, 0.9, 0.9) });

  page5.drawText('Direct Email Inquiries:', { x: 65, y: 105, size: 8.5, font: timesBold, color: white });
  page5.drawText('khabeeralraida6@gmail.com', { x: 230, y: 105, size: 8.5, font: timesRoman, color: rgb(0.9, 0.9, 0.9) });

  page5.drawText('Headquarters Location:', { x: 65, y: 88, size: 8, font: timesBold, color: white });
  page5.drawText('Kingdom of Saudi Arabia (Riyadh & Central Region Operations)', { x: 230, y: 88, size: 8, font: timesRoman, color: rgb(0.9, 0.9, 0.9) });

  page5.drawText('International Operations:', { x: 65, y: 72, size: 8, font: timesBold, color: white });
  page5.drawText('Saudi Arabia (HQ) * United Kingdom (UK) * UAE * Pakistan', { x: 230, y: 72, size: 8, font: timesRoman, color: rgb(0.9, 0.9, 0.9) });

  const pdfBytes = await pdfDoc.save();

  // Save to /public/KRCC-Company-Profile.pdf
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const outputPath = path.join(publicDir, 'KRCC-Company-Profile.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('Successfully generated company profile PDF at:', outputPath);
}

function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + word).length > maxCharsPerLine) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }
  if (currentLine.trim().length > 0) {
    lines.push(currentLine.trim());
  }
  return lines;
}

generateProfile().catch(console.error);
