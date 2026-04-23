import React, { forwardRef } from 'react';
import { userInfo, education, experiences, projects, skills, activities } from '../data/cvData';

// ─── Design tokens khớp với Portfolio ──────────────────────────────────────────
const C = {
  bg:        '#080812',
  bg2:       '#0f0f1a',
  bg3:       '#151526',
  brand1:    '#4f46e5',
  brand2:    '#7c3aed',
  brand3:    '#a855f7',
  text:      '#f1f0ff',
  muted:     '#9994cc',
  border:    'rgba(255,255,255,0.08)',
  glass:     'rgba(255,255,255,0.04)',
  pink:      '#e879f9',
  indigo:    '#818cf8',
};

// ─── Gradient text effect (simulated cho html2canvas) ──────────────────────────
// html2canvas không render CSS gradient text nên ta dùng màu đặc thay thế
const GRAD_COLOR = '#818cf8'; // gần giống gradient indigo→purple

// ─── Helpers ───────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 9.5, fontWeight: 700, letterSpacing: 2.5,
      textTransform: 'uppercase', color: C.brand3,
      marginBottom: 4,
      fontFamily: "'Be Vietnam Pro', sans-serif",
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <SectionLabel>{children}</SectionLabel>
      <div style={{
        width: 36, height: 3, borderRadius: 99,
        background: `linear-gradient(90deg, ${C.brand1}, ${C.brand3})`,
      }} />
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background:   'rgba(255,255,255,0.035)',
      border:       `1px solid ${C.border}`,
      borderRadius: 10,
      padding:      '12px 14px',
      marginBottom: 10,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Tag({ children, accent = false }) {
  return (
    <span style={{
      display:      'inline-block',
      padding:      '3px 8px',
      borderRadius: 6,
      fontSize:     9.5,
      fontWeight:   600,
      background:   accent ? `rgba(79,70,229,0.25)` : `rgba(168,85,247,0.12)`,
      border:       `1px solid ${accent ? 'rgba(79,70,229,0.4)' : 'rgba(168,85,247,0.25)'}`,
      color:        accent ? C.indigo : '#d8b4fe',
      marginRight:  4,
      marginBottom: 4,
    }}>
      {children}
    </span>
  );
}

function Dot() {
  return (
    <span style={{
      display:     'inline-block',
      width:       5, height: 5,
      borderRadius: '50%',
      background:  C.brand3,
      marginRight: 6,
      marginTop:   4,
      flexShrink:  0,
      verticalAlign: 'top',
    }} />
  );
}

function Bullet({ text }) {
  return (
    <div style={{ display: 'flex', marginBottom: 4 }}>
      <Dot />
      <span style={{ fontSize: 10, color: C.text, lineHeight: 1.5 }}>{text}</span>
    </div>
  );
}

function ContactItem({ icon, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
      <span style={{ fontSize: 11, minWidth: 14, textAlign: 'center' }}>{icon}</span>
      <span style={{ fontSize: 10, color: C.muted, wordBreak: 'break-all' }}>{text}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main CVTemplate
// ═══════════════════════════════════════════════════════════════════════════════

const CVTemplate = forwardRef((_props, ref) => {
  const BASE = import.meta.env.BASE_URL;

  return (
    <div
      ref={ref}
      style={{
        width:       794,
        fontFamily:  "'Be Vietnam Pro', 'Segoe UI', sans-serif",
        background:  C.bg,
        color:       C.text,
        fontSize:    11,
        lineHeight:  1.5,
        boxSizing:   'border-box',
      }}
    >
      {/* ═══ PAGE 1 ══════════════════════════════════════════════════════════ */}
      <div style={{ width: 794, minHeight: 1123, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>

        {/* ── HEADER ── */}
        <div style={{
          background:    `linear-gradient(135deg, ${C.bg3} 0%, ${C.bg2} 100%)`,
          borderBottom:  `1px solid ${C.border}`,
          padding:       '28px 32px 24px',
          display:       'flex',
          gap:           24,
          alignItems:    'center',
          position:      'relative',
          overflow:      'hidden',
        }}>
          {/* Blob decoration */}
          <div style={{
            position: 'absolute', top: -60, left: -60,
            width: 200, height: 200, borderRadius: '50%',
            background: `rgba(79,70,229,0.15)`,
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -40, right: 80,
            width: 150, height: 150, borderRadius: '50%',
            background: `rgba(168,85,247,0.12)`,
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }} />

          {/* Avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              position: 'absolute', inset: -3,
              borderRadius: 16,
              background: `linear-gradient(135deg, ${C.brand1}, ${C.brand3})`,
            }} />
            <img
              src={`${BASE}avatar.jpg`}
              alt="Avatar"
              crossOrigin="anonymous"
              style={{
                position:    'relative',
                width:       88, height: 108,
                objectFit:   'cover',
                borderRadius: 14,
                display:     'block',
              }}
            />
          </div>

          {/* Name + title + contact */}
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{
              fontSize:    26, fontWeight: 900,
              color:       GRAD_COLOR,
              letterSpacing: -0.5,
              fontFamily:  "'Be Vietnam Pro', sans-serif",
              marginBottom: 2,
            }}>
              {userInfo.name}
            </div>
            <div style={{
              fontSize: 12.5, fontWeight: 600,
              color: C.muted, marginBottom: 14,
            }}>
              {userInfo.title}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <ContactItem icon="📅" text={userInfo.dob} />
              <ContactItem icon="☎" text={userInfo.phone} />
              <ContactItem icon="✉" text={userInfo.email} />
              <ContactItem icon="📍" text={userInfo.address} />
              <ContactItem icon="🌐" text={userInfo.github} />
            </div>
          </div>

          {/* Summary / Bio */}
          <div style={{
            width:       195,
            fontSize:    10,
            color:       C.muted,
            lineHeight:  1.65,
            borderLeft:  `2px solid rgba(168,85,247,0.35)`,
            paddingLeft: 14,
            position:    'relative',
            alignSelf:   'center',
          }}>
            <div style={{ color: C.brand3, fontWeight: 700, fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 5 }}>
              Giới thiệu
            </div>
            {userInfo.summary}
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{ display: 'flex', flex: 1 }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{
            flex:         1,
            padding:      '20px 20px 20px 28px',
            borderRight:  `1px solid ${C.border}`,
          }}>

            {/* HỌC VẤN */}
            <SectionTitle>Học vấn</SectionTitle>
            {education.map((edu, i) => (
              <Card key={i}>
                <div style={{ fontWeight: 700, fontSize: 11.5, color: C.text, marginBottom: 2 }}>{edu.school}</div>
                <div style={{ fontSize: 10, color: C.brand3, marginBottom: 6, fontWeight: 600 }}>{edu.degree}</div>
                <Tag accent>{edu.period}</Tag>
                {edu.bullets?.map((b, j) => <Bullet key={j} text={b} />)}
              </Card>
            ))}

            {/* KINH NGHIỆM */}
            <div style={{ marginTop: 16 }}>
              <SectionTitle>Kinh nghiệm làm việc</SectionTitle>
              {experiences.map((exp, i) => (
                <Card key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 11.5, color: C.text }}>{exp.company}</div>
                      <div style={{ fontSize: 10.5, color: C.brand3, fontWeight: 600 }}>{exp.role}</div>
                    </div>
                    <Tag accent>{exp.period}</Tag>
                  </div>
                  <div style={{ fontSize: 10, color: C.muted, marginBottom: 6, fontStyle: 'italic', marginTop: 4 }}>{exp.desc}</div>
                  {exp.bullets.map((b, j) => <Bullet key={j} text={b} />)}
                </Card>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={{ width: 218, padding: '20px 22px 20px 18px', flexShrink: 0 }}>
            <SectionTitle>Kỹ năng</SectionTitle>

            <SkillGroup title="Core Stack" tags={skills.core} accent />
            <SkillGroup title="Architecture & Testing" tags={skills.architecture} />
            <SkillGroup title="DevOps & Tools" tags={skills.devops} />
          </div>
        </div>
      </div>

      {/* ═══ PAGE 2 ══════════════════════════════════════════════════════════ */}
      <div style={{
        width:       794,
        minHeight:   1123,
        padding:     '28px 28px 40px',
        boxSizing:   'border-box',
        background:  C.bg,
      }}>
        {/* Fallback simple border */}
        <div style={{
          borderTop:   `2px solid rgba(168,85,247,0.4)`,
          marginBottom: 20,
        }} />

        <SectionTitle>Dự án nổi bật</SectionTitle>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {projects.map((proj, i) => (
            <div
              key={i}
              style={{
                background:   'rgba(255,255,255,0.035)',
                border:       `1px solid ${C.border}`,
                borderRadius: 10,
                padding:      '12px 14px',
                display:      'flex',
                flexDirection: 'column',
              }}
            >
              {/* Project name */}
              <div style={{
                fontSize:    11.5, fontWeight: 800,
                color:       C.indigo,
                marginBottom: 6,
                fontFamily:  "'Be Vietnam Pro', sans-serif",
              }}>
                {proj.name}
              </div>

              {/* Desc */}
              <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.55, marginBottom: 8 }}>
                {proj.desc}
              </div>

              {/* Bullets */}
              {proj.bullets?.length > 0 && (
                <div style={{ marginBottom: 8 }}>
                  {proj.bullets.map((b, j) => <Bullet key={j} text={b} />)}
                </div>
              )}

              {/* Tech tags */}
              <div style={{ marginTop: 'auto', paddingTop: 6, borderTop: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
                  {proj.tech.split(' | ').map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── EXTRACURRICULAR ── */}
        <div style={{ marginTop: 20 }}>
          <SectionTitle>Hoạt động ngoại khoá</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {activities.map((act, i) => (
              <div key={i} style={{
                background:   'rgba(255,255,255,0.035)',
                border:       `1px solid ${C.border}`,
                borderRadius: 8,
                padding:      '8px 10px',
                display:      'flex',
                alignItems:   'flex-start',
                gap:          8,
              }}>
                <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{act.icon}</span>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: C.indigo, marginBottom: 2 }}>{act.name}</div>
                  <div style={{ fontSize: 9.5, color: C.muted, lineHeight: 1.45 }}>{act.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

CVTemplate.displayName = 'CVTemplate';
export default CVTemplate;

// ─── SkillGroup ────────────────────────────────────────────────────────────────
function SkillGroup({ title, tags, accent = false }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        fontSize: 9.5, fontWeight: 700, color: C.muted,
        letterSpacing: 1, textTransform: 'uppercase',
        marginBottom: 6,
      }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tags.map(tag => <Tag key={tag} accent={accent}>{tag}</Tag>)}
      </div>
    </div>
  );
}
