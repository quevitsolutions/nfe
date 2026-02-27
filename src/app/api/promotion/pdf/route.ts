// app/api/promotion/pdf/route.ts
// Generates a personalised GICLUB PDF brochure on-the-fly
// GET /api/promotion/pdf?wallet=0x...&type=brochure|income|matrix|flyer

import { NextRequest, NextResponse } from 'next/server';
// @ts-expect-error — pdfkit has no default ESM export
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

// ── Brand tokens ────────────────────────────────────
const GOLD = '#F5C518';
const DARK = '#0D0D1A';
const NAVY = '#0A1628';
const WHITE = '#FFFFFF';
const LIGHT = '#E8EAF0';
const GREEN = '#00C896';
const PURPLE = '#7B2FBE';
const ORANGE = '#FF6B35';

// ── Helpers ─────────────────────────────────────────
type Doc = InstanceType<typeof PDFDocument>;

function rect(doc: Doc, x: number, y: number, w: number, h: number, color: string) {
    doc.save().rect(x, y, w, h).fill(color).restore();
}

function centreText(doc: Doc, text: string, y: number, opts: Record<string, unknown> = {}) {
    const width = (opts.width as number) ?? doc.page.width - 80;
    doc.text(text, 40, y, { width, align: 'center', ...opts });
}

function hr(doc: Doc, y: number, color = GOLD) {
    doc.save()
        .moveTo(40, y).lineTo(doc.page.width - 40, y)
        .strokeColor(color).strokeOpacity(0.4).lineWidth(1).stroke()
        .restore();
}

function sectionHead(doc: Doc, title: string, y: number): number {
    rect(doc, 40, y, doc.page.width - 80, 28, PURPLE);
    doc.fontSize(12).fillColor(WHITE).font('Helvetica-Bold')
        .text(title, 48, y + 7, { width: doc.page.width - 96 });
    return y + 38;
}

function bullet(doc: Doc, text: string, y: number, color = GOLD): number {
    doc.fontSize(9).fillColor(color).font('Helvetica-Bold').text('●', 46, y, { width: 12 });
    doc.fontSize(9).fillColor(WHITE).font('Helvetica').text(text, 62, y, { width: doc.page.width - 102 });
    return y + doc.currentLineHeight(true) + 4;
}

// ── Collect doc into Buffer ──────────────────────────
function docToBuffer(doc: Doc): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        doc.on('data', (c: Buffer) => chunks.push(c));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);
    });
}

// ════════════════════════════════════════════════════
// PDF Builders
// ════════════════════════════════════════════════════

function buildBrochure(link: string): Doc {
    const doc = new PDFDocument({ size: 'A4', margin: 0 });
    const PW = doc.page.width, PH = doc.page.height;

    // ── COVER ────────────────────────────────────────
    rect(doc, 0, 0, PW, PH, DARK);
    doc.save().polygon([PW - 160, 0], [PW, 0], [PW, 160]).fill(GOLD).restore();
    rect(doc, 0, PH - 60, PW, 60, PURPLE);

    // Logo circle
    doc.save().circle(PW / 2, 210, 58).fill(NAVY).restore();
    doc.save().circle(PW / 2, 210, 58).strokeColor(GOLD).strokeOpacity(0.7).lineWidth(2).stroke().restore();
    doc.fontSize(26).fillColor(GOLD).font('Helvetica-Bold').text('GIC', PW / 2 - 30, 196, { width: 60, align: 'center' });

    doc.fontSize(32).fillColor(GOLD).font('Helvetica-Bold');
    centreText(doc, 'GREAT INCOME CLUB', 300);
    doc.fontSize(13).fillColor(LIGHT).font('Helvetica');
    centreText(doc, 'Decentralized Community Income · BNB Smart Chain', 340);

    // Tagline box
    doc.save().roundedRect(100, 375, PW - 200, 40, 5).fill(GOLD).restore();
    doc.fontSize(13).fillColor(DARK).font('Helvetica-Bold');
    centreText(doc, 'Join Once for $5 · Earn Forever', 388);

    // Stats row
    [['$5', 'Entry'], ['4×', 'Income'], ['10', 'Levels'], ['70%', 'Matrix']].forEach(([v, l], i) => {
        const cx = 40 + i * (PW - 80) / 4 + (PW - 80) / 8;
        doc.save().circle(cx, 495, 30).fill(NAVY).restore();
        doc.save().circle(cx, 495, 30).strokeColor(GOLD).strokeOpacity(0.5).lineWidth(1.5).stroke().restore();
        doc.fontSize(14).fillColor(GOLD).font('Helvetica-Bold').text(v, cx - 28, 484, { width: 56, align: 'center' });
        doc.fontSize(8).fillColor(LIGHT).font('Helvetica').text(l, cx - 28, 504, { width: 56, align: 'center' });
    });

    doc.fontSize(9).fillColor(WHITE).font('Helvetica')
        .text('Smart Contract · 100% Transparent · Instant Wallet Payments', 40, PH - 42, { width: PW - 80, align: 'center' });

    // ── PAGE 2 — Income Streams ───────────────────────
    doc.addPage();
    rect(doc, 0, 0, PW, PH, DARK);
    rect(doc, 0, 0, PW, 55, NAVY);
    rect(doc, 0, 53, PW, 3, GOLD);
    doc.fontSize(16).fillColor(GOLD).font('Helvetica-Bold');
    centreText(doc, '4 AUTOMATED INCOME STREAMS', 18);

    let y = 75;
    const cardW = (PW - 100) / 2;
    const streams: [string, string, string][] = [
        [GREEN, 'Referral Income', 'Earn instantly when someone joins using your referral link. Paid directly to your wallet — no delays.'],
        [GOLD, 'Matrix Income (70%)', '70% of every registration flows through your binary matrix. Earn from spillover even without personal referrals.'],
        [PURPLE, 'Level Income', 'Earn from 10 levels deep in your downline. The more your team grows, the more passive streams you receive.'],
        [ORANGE, 'Global Reward Pools', 'Upgrade levels to unlock a share of global reward pools. Higher level = larger pool share.'],
    ];
    streams.forEach(([color, title, desc], i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const cx = 40 + col * (cardW + 12), cy = y + row * 100;
        doc.save().roundedRect(cx, cy, cardW, 90, 6).fill('#1A1A2E').restore();
        rect(doc, cx, cy, cardW, 4, color);
        doc.save().circle(cx + 22, cy + 22, 11).fill(color).restore();
        doc.fontSize(10).fillColor(DARK).font('Helvetica-Bold').text(String(i + 1), cx + 17, cy + 15, { width: 12, align: 'center' });
        doc.fontSize(10).fillColor(GOLD).font('Helvetica-Bold').text(title, cx + 38, cy + 12, { width: cardW - 48 });
        doc.fontSize(8).fillColor(LIGHT).font('Helvetica').text(desc, cx + 12, cy + 36, { width: cardW - 24, lineGap: 2 });
    });

    y += 2 * 100 + 12;
    hr(doc, y); y += 12;

    y = sectionHead(doc, '🔷  Binary Matrix — How Spillover Works', y);
    [
        'Every member has a position in an infinite binary matrix (2 slots beneath each person).',
        'When both slots beneath you fill, you earn 70% of those fees — automatically.',
        'Your upline can fill your matrix slots → you earn passively without referring anyone.',
        'Upgrading unlocks deeper positions with larger payouts.',
    ].forEach(line => { y = bullet(doc, line, y); y += 2; });

    // ── PAGE 3 — Join Guide & FAQ ─────────────────────
    doc.addPage();
    rect(doc, 0, 0, PW, PH, DARK);
    rect(doc, 0, 0, PW, 55, NAVY);
    rect(doc, 0, 53, PW, 3, GOLD);
    doc.fontSize(16).fillColor(GOLD).font('Helvetica-Bold');
    centreText(doc, 'HOW TO JOIN & FAQ', 18);

    y = 75;
    y = sectionHead(doc, '🚀  Get Started in 4 Simple Steps', y); y += 4;
    [
        ['Install Wallet', 'Download MetaMask or Trust Wallet on your phone/browser.'],
        ['Add BNB', 'Transfer ~$5.10 of BNB (entry $5 + ~$0.10 gas fee).'],
        ['Open the Link', 'Tap your sponsor\'s referral link.'],
        ['Click Register', 'Hit "Register" and confirm. You\'re in — instantly!'],
    ].forEach(([title, desc], i) => {
        doc.save().circle(58, y + 8, 10).fill(GREEN).restore();
        doc.fontSize(9).fillColor(DARK).font('Helvetica-Bold').text(String(i + 1), 53, y + 2, { width: 12, align: 'center' });
        doc.fontSize(10).fillColor(GOLD).font('Helvetica-Bold').text(title, 78, y, { width: PW - 120 });
        doc.fontSize(9).fillColor(LIGHT).font('Helvetica').text(desc, 78, y + 14, { width: PW - 120 });
        y += 42;
    });

    hr(doc, y); y += 12;
    y = sectionHead(doc, '❓  Common Questions', y); y += 4;
    [
        ['Is GICLUB a scam?', 'No. It\'s a public smart contract on BSC — every tx is visible on BscScan. No one controls your funds.'],
        ['Do I need referrals?', 'No. Matrix spillover from your upline provides passive income. Referrals accelerate earnings.'],
        ['When do I get paid?', 'Instantly — BNB is sent directly to your wallet the moment someone in your matrix transacts.'],
        ['Can I withdraw?', 'Nothing to withdraw — income lands directly in your BSC wallet. It\'s already yours.'],
    ].forEach(([q, a]) => {
        doc.fontSize(9).fillColor(GOLD).font('Helvetica-Bold').text('Q: ' + q, 46, y, { width: PW - 86 });
        y += doc.currentLineHeight() + 2;
        doc.fontSize(9).fillColor(LIGHT).font('Helvetica').text('A: ' + a, 46, y, { width: PW - 86, lineGap: 1 });
        y += doc.currentLineHeight(true) + 10;
    });

    // CTA
    const ctaY = PH - 100;
    doc.save().roundedRect(40, ctaY, PW - 80, 80, 8).fill(PURPLE).restore();
    rect(doc, 40, ctaY, PW - 80, 4, GOLD);
    doc.fontSize(14).fillColor(GOLD).font('Helvetica-Bold');
    centreText(doc, '🚀  Join Your Sponsor\'s Team Now', ctaY + 12);
    doc.fontSize(9).fillColor(WHITE).font('Helvetica');
    centreText(doc, link, ctaY + 34);
    centreText(doc, 'One-time $5 entry · No monthly fees · Instant wallet payments', ctaY + 52);

    return doc;
}

function buildFlyer(link: string): Doc {
    const doc = new PDFDocument({ size: 'A4', margin: 0 });
    const PW = doc.page.width, PH = doc.page.height;

    rect(doc, 0, 0, PW, PH, DARK);
    doc.save().polygon([PW - 120, 0], [PW, 0], [PW, 120]).fill(GOLD).restore();
    doc.save().polygon([0, PH - 120], [0, PH], [120, PH]).fill(PURPLE).restore();

    // Logo
    doc.save().circle(PW / 2, 140, 55).fill(NAVY).restore();
    doc.save().circle(PW / 2, 140, 55).strokeColor(GOLD).strokeOpacity(0.8).lineWidth(2).stroke().restore();
    doc.fontSize(22).fillColor(GOLD).font('Helvetica-Bold').text('GIC', PW / 2 - 26, 128, { width: 52, align: 'center' });

    doc.fontSize(28).fillColor(GOLD).font('Helvetica-Bold'); centreText(doc, 'GREAT INCOME CLUB', 220);
    doc.fontSize(11).fillColor(LIGHT).font('Helvetica'); centreText(doc, 'Decentralized · BNB Smart Chain · Smart Contract', 256);

    // Big hook
    doc.save().roundedRect(60, 285, PW - 120, 50, 8).fill('#1A1A2E').restore();
    doc.save().roundedRect(60, 285, PW - 120, 50, 8).strokeColor(GOLD).strokeOpacity(0.5).lineWidth(1).stroke().restore();
    doc.fontSize(16).fillColor(GOLD).font('Helvetica-Bold');
    centreText(doc, '💰 Join Once for $5 · Earn 4 Ways', 302, { width: PW - 120 });

    // 4 streams list
    let y = 360;
    [
        [GREEN, '✅ Referral Income       — Earn when you invite'],
        [GOLD, '✅ Matrix Income (70%)   — Earn from everyone in your matrix'],
        [PURPLE, '✅ Level Income           — Earn 10 levels deep'],
        [ORANGE, '✅ Reward Pools           — Share global rewards on upgrade'],
    ].forEach(([color, text]) => {
        doc.fontSize(11).fillColor(color as string).font('Helvetica-Bold');
        centreText(doc, text, y);
        y += 28;
    });

    // Trust badges
    y += 10;
    ['🔐 100% Smart Contract', '⚡ Instant Payments', '🌐 26 Languages', '📱 Works on Any Wallet'].forEach((badge, i) => {
        const bx = 60 + (i % 2) * ((PW - 120) / 2 + 6);
        const by = y + Math.floor(i / 2) * 34;
        doc.save().roundedRect(bx, by, (PW - 136) / 2, 26, 5).fill('#1A1A2E').restore();
        doc.fontSize(9).fillColor(LIGHT).font('Helvetica-Bold');
        doc.text(badge, bx, by + 8, { width: (PW - 136) / 2, align: 'center' });
    });

    y += 80;

    // CTA
    doc.save().roundedRect(80, y, PW - 160, 56, 8).fill(PURPLE).restore();
    rect(doc, 80, y, PW - 160, 4, GOLD);
    doc.fontSize(12).fillColor(WHITE).font('Helvetica-Bold');
    centreText(doc, '👉  Join Now:', y + 12, { width: PW - 160 });
    doc.fontSize(9).fillColor(GOLD).font('Helvetica');
    centreText(doc, link, y + 30, { width: PW - 160 });

    doc.end();
    return doc;
}

// ════════════════════════════════════════════════════
// API Handler
// ════════════════════════════════════════════════════
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get('wallet') || '';
    const type = searchParams.get('type') || 'brochure';

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://giclub.online';
    const refLink = wallet
        ? `${baseUrl}/register?ref=${wallet}`
        : `${baseUrl}/register`;

    let doc: Doc;
    let filename: string;

    if (type === 'flyer') {
        doc = buildFlyer(refLink);
        filename = 'GICLUB_Flyer.pdf';
    } else {
        doc = buildBrochure(refLink);
        filename = type === 'income' ? 'GICLUB_Income_Guide.pdf'
            : type === 'matrix' ? 'GICLUB_Matrix_Guide.pdf'
                : 'GICLUB_Brochure.pdf';
    }

    doc.end();
    const buffer = await docToBuffer(doc);

    return new NextResponse(buffer, {
        status: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Content-Length': String(buffer.length),
            'Cache-Control': 'no-store',
        },
    });
}
