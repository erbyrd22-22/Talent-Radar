import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://reaqaxufwxcvarypfsdz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlYXFheHVmd3hjdmFyeXBmc2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NzQwMzQsImV4cCI6MjA4NTA1MDAzNH0.8uvcFSRNQQDBH7GtxnaNhdv96iAiComLosBEtxEw818';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    users: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    arrowUp: <><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></>,
    chevronLeft: <polyline points="15 18 9 12 15 6"/>,
    chevronRight: <polyline points="9 18 15 12 9 6"/>,
    chevronUp: <polyline points="18 15 12 9 6 15"/>,
    chevronDown: <polyline points="6 9 12 15 18 9"/>,
    refresh: <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    userPlus: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>,
    cloudOff: <><line x1="1" y1="1" x2="23" y2="23"/><path d="M18.83 16.83A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-11.31-5"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    mapPin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icons[name]}</svg>;
};

const timeAgo = (date) => {
  if (!date) return '';
  const days = Math.floor((new Date() - new Date(date)) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 30) return days + ' days ago';
  const m = Math.floor(days / 30);
  return m === 1 ? '1 month ago' : m + ' months ago';
};

function TemplateForm({ template, onSave, onClose, isSaving }) {
  const [name, setName] = useState(template?.name || '');
  const [subject, setSubject] = useState(template?.subject || '');
  const [body, setBody] = useState(template?.body || '');
  return (
    <div>
      <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-slate-800">{template ? 'Edit' : 'Create'} Template</h2><button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl"><Icon name="x" size={20} color="#64748b" /></button></div>
      <div className="space-y-4">
        <div><label className="block text-xs font-semibold text-slate-500 mb-2">Name *</label><input className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={name} onChange={e => setName(e.target.value)} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-2">Subject *</label><input className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={subject} onChange={e => setSubject(e.target.value)} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-2">Body *</label><textarea className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm resize-none" rows={6} value={body} onChange={e => setBody(e.target.value)} /></div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4"><div className="text-xs font-bold text-blue-600 mb-1">Variables</div><p className="text-xs text-slate-600">{"{{candidateName}}, {{company}}, {{senderName}}"}</p></div>
      </div>
      <div className="flex gap-3 justify-end mt-6 pt-4 border-t"><button onClick={onClose} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600">Cancel</button><button onClick={() => onSave({ id: template?.id, name, subject, body })} disabled={!name || !subject || !body || isSaving} className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50">{isSaving ? 'Saving...' : template ? 'Update' : 'Create'}</button></div>
    </div>
  );
}

export default function TalentRadar() {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [testEmails, setTestEmails] = useState([]);
  const [activities, setActivities] = useState([]);
  const [settings, setSettings] = useState({ sender_name: '', company_name: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchParams, setSearchParams] = useState({ industry: '', jobLevel: '', status: '', dateStart: '', dateEnd: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'job_change_date', direction: 'desc' });
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modals, setModals] = useState({});
  const [selectedTestEmail, setSelectedTestEmail] = useState(null);
  const [newCandidate, setNewCandidate] = useState({ name: '', email: '', location: '', previous_company: '', previous_title: '', previous_role: 'Mid Level', new_company: '', new_title: '', new_role: 'Mid Level', industry: 'Technology', job_change_date: '', status: 'new', change_type: 'lateral' });
  const [newFollowUp, setNewFollowUp] = useState({ candidate_name: '', date: '', note: '' });
  const [newTestEmail, setNewTestEmail] = useState({ name: '', email: '', company: '' });

  const industries = ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Marketing', 'Sales', 'Engineering'];
  const jobLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Director', 'VP', 'Executive', 'C-Suite'];
  const statuses = ['new', 'contacted', 'responded', 'interviewing', 'hired', 'not interested'];

  useEffect(() => { loadAllData(); }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [c, t, e, f, te, a, s] = await Promise.all([
        supabase.from('candidates').select('*').order('created_at', { ascending: false }),
        supabase.from('email_templates').select('*').order('created_at', { ascending: false }),
        supabase.from('sent_emails').select('*').order('sent_at', { ascending: false }),
        supabase.from('follow_ups').select('*').order('date', { ascending: true }),
        supabase.from('test_emails').select('*'),
        supabase.from('activities').select('*').order('timestamp', { ascending: false }).limit(50),
        supabase.from('settings').select('*').single()
      ]);
      if (c.data) setCandidates(c.data);
      if (t.data) setEmailTemplates(t.data);
      if (e.data) setSentEmails(e.data);
      if (f.data) setFollowUps(f.data);
      if (te.data) setTestEmails(te.data);
      if (a.data) setActivities(a.data);
      if (s.data) setSettings(s.data);
      setIsConnected(true);
    } catch (err) { setIsConnected(false); }
    setIsLoading(false);
  };

  const notify = (msg) => { setNotification(msg); setTimeout(() => setNotification(null), 3000); };
  const logActivity = async (type, desc) => { const { data } = await supabase.from('activities').insert([{ type, description: desc }]).select().single(); if (data) setActivities(p => [data, ...p]); };
  const openModal = (m) => setModals(p => ({ ...p, [m]: true }));
  const closeModal = (m) => setModals(p => ({ ...p, [m]: false }));

  const filteredCandidates = useMemo(() => {
    let list = candidates.filter(c => {
      if (searchParams.industry && c.industry !== searchParams.industry) return false;
      if (searchParams.jobLevel && c.new_role !== searchParams.jobLevel) return false;
      if (searchParams.status && c.status !== searchParams.status) return false;
      if (searchParams.dateStart && c.job_change_date && new Date(c.job_change_date) < new Date(searchParams.dateStart)) return false;
      if (searchParams.dateEnd && c.job_change_date && new Date(c.job_change_date) > new Date(searchParams.dateEnd)) return false;
      return true;
    });
    list.sort((a, b) => {
      let av = a[sortConfig.key], bv = b[sortConfig.key];
      if (sortConfig.key === 'job_change_date') { av = av ? new Date(av).getTime() : 0; bv = bv ? new Date(bv).getTime() : 0; }
      else if (sortConfig.key === 'match_score') { av = av || 0; bv = bv || 0; }
      else { av = (av || '').toString().toLowerCase(); bv = (bv || '').toString().toLowerCase(); }
      return sortConfig.direction === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });
    return list;
  }, [candidates, searchParams, sortConfig]);

  const handleSort = (key) => setSortConfig(p => ({ key, direction: p.key === key && p.direction === 'desc' ? 'asc' : 'desc' }));

  const handleAddCandidate = async () => {
    setIsSaving(true);
    const { data } = await supabase.from('candidates').insert([{ ...newCandidate, match_score: Math.floor(Math.random() * 30) + 70 }]).select().single();
    if (data) { setCandidates(p => [data, ...p]); await logActivity('candidate', 'Added: ' + data.name); notify('Added!'); closeModal('addCandidate'); setNewCandidate({ name: '', email: '', location: '', previous_company: '', previous_title: '', previous_role: 'Mid Level', new_company: '', new_title: '', new_role: 'Mid Level', industry: 'Technology', job_change_date: '', status: 'new', change_type: 'lateral' }); }
    setIsSaving(false);
  };

  const handleDeleteCandidate = async (id) => { const c = candidates.find(x => x.id === id); await supabase.from('candidates').delete().eq('id', id); setCandidates(p => p.filter(x => x.id !== id)); await logActivity('candidate', 'Deleted: ' + c?.name); notify('Deleted'); closeModal('viewCandidate'); setSelectedCandidate(null); };
  const handleSaveTemplate = async (t) => { setIsSaving(true); if (editingTemplate) { const { data } = await supabase.from('email_templates').update({ name: t.name, subject: t.subject, body: t.body }).eq('id', t.id).select().single(); if (data) setEmailTemplates(p => p.map(x => x.id === data.id ? data : x)); } else { const { data } = await supabase.from('email_templates').insert([t]).select().single(); if (data) setEmailTemplates(p => [data, ...p]); } notify('Saved!'); closeModal('template'); setEditingTemplate(null); setIsSaving(false); };
  const handleDeleteTemplate = async (id) => { await supabase.from('email_templates').delete().eq('id', id); setEmailTemplates(p => p.filter(x => x.id !== id)); notify('Deleted'); };
  const handleSendEmail = async (cand, tmpl) => { setIsSaving(true); const { data } = await supabase.from('sent_emails').insert([{ candidate_id: cand.id, candidate_name: cand.name, candidate_email: cand.email, template_id: tmpl.id, template_name: tmpl.name, subject: tmpl.subject, status: 'sent' }]).select().single(); if (data) { setSentEmails(p => [data, ...p]); await supabase.from('candidates').update({ status: 'contacted' }).eq('id', cand.id); setCandidates(p => p.map(c => c.id === cand.id ? { ...c, status: 'contacted' } : c)); await logActivity('email', 'Sent to ' + cand.name); notify('Sent!'); } closeModal('sendEmail'); setSelectedCandidate(null); setSelectedTemplate(null); setIsSaving(false); };
  const handleAddFollowUp = async () => { if (!newFollowUp.date || !newFollowUp.candidate_name) return; setIsSaving(true); const { data } = await supabase.from('follow_ups').insert([newFollowUp]).select().single(); if (data) { setFollowUps(p => [...p, data].sort((a, b) => new Date(a.date) - new Date(b.date))); await logActivity('followup', 'Scheduled: ' + newFollowUp.candidate_name); notify('Added!'); } closeModal('followUp'); setNewFollowUp({ candidate_name: '', date: '', note: '' }); setIsSaving(false); };
  const toggleFollowUp = async (f) => { const { data } = await supabase.from('follow_ups').update({ completed: !f.completed }).eq('id', f.id).select().single(); if (data) setFollowUps(p => p.map(x => x.id === data.id ? data : x)); };
  const deleteFollowUp = async (id) => { await supabase.from('follow_ups').delete().eq('id', id); setFollowUps(p => p.filter(x => x.id !== id)); notify('Removed'); };
  const handleAddTestEmail = async () => { if (!newTestEmail.name || !newTestEmail.email) return; setIsSaving(true); const { data } = await supabase.from('test_emails').insert([newTestEmail]).select().single(); if (data) setTestEmails(p => [...p, data]); notify('Added!'); closeModal('testEmail'); setNewTestEmail({ name: '', email: '', company: '' }); setIsSaving(false); };
  const deleteTestEmail = async (id) => { await supabase.from('test_emails').delete().eq('id', id); setTestEmails(p => p.filter(x => x.id !== id)); notify('Removed'); };
  const handleSendTest = async () => { await logActivity('email', 'Test sent to ' + selectedTestEmail.email); notify('Test sent!'); closeModal('sendTest'); setSelectedTestEmail(null); setSelectedTemplate(null); };
  const saveSettings = async () => { setIsSaving(true); await supabase.from('settings').update(settings).eq('id', 1); notify('Saved!'); closeModal('settings'); setIsSaving(false); };
  const exportData = () => { const blob = new Blob([JSON.stringify({ candidates, emailTemplates, sentEmails, followUps, activities, settings }, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'talent-radar-' + new Date().toISOString().split('T')[0] + '.json'; a.click(); notify('Exported!'); };
  const getDaysInMonth = (d) => { const y = d.getFullYear(), m = d.getMonth(), first = new Date(y, m, 1), last = new Date(y, m + 1, 0), days = []; for (let i = 0; i < first.getDay(); i++) days.push(null); for (let i = 1; i <= last.getDate(); i++) days.push(new Date(y, m, i)); return days; };
  const getFollowUpsForDate = (d) => d ? followUps.filter(f => f.date === d.toISOString().split('T')[0]) : [];
  const stats = useMemo(() => ({ total: candidates.length, newCount: candidates.filter(c => c.status === 'new').length, contacted: candidates.filter(c => c.status === 'contacted').length, emails: sentEmails.length, followUpsCount: followUps.filter(f => !f.completed).length }), [candidates, sentEmails, followUps]);
  const SortIcon = ({ col }) => sortConfig.key !== col ? <Icon name="chevronDown" size={12} color="#cbd5e1" /> : <Icon name={sortConfig.direction === 'asc' ? 'chevronUp' : 'chevronDown'} size={12} color="#3b82f6" />;

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100"><div className="text-center"><div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" /><p className="text-slate-500">Connecting...</p></div></div>;

  const Modal = ({ id, children, wide }) => modals[id] ? <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => closeModal(id)}><div className={`bg-white rounded-2xl p-6 ${wide ? 'max-w-2xl' : 'max-w-lg'} w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl`} onClick={e => e.stopPropagation()}>{children}</div></div> : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 font-sans text-slate-700">
      {notification && <div className="fixed bottom-5 right-5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-3 rounded-xl flex items-center gap-2 z-50 shadow-lg"><Icon name="check" size={16} color="white" />{notification}</div>}

      <header className="bg-white/90 backdrop-blur border-b border-slate-200/50 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"><Icon name="users" size={22} color="white" /></div>
          <div><h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">TalentRadar</h1><div className="flex items-center gap-1 text-xs" style={{ color: isConnected ? '#10b981' : '#ef4444' }}><Icon name={isConnected ? 'cloud' : 'cloudOff'} size={11} />{isConnected ? 'Connected' : 'Disconnected'}</div></div>
        </div>
        <div className="flex gap-4 items-center">
          {[{ l: 'Candidates', v: stats.total, c: '#3b82f6' }, { l: 'Contacted', v: stats.contacted, c: '#10b981' }, { l: 'Follow-ups', v: stats.followUpsCount, c: '#f59e0b' }].map((s, i) => <div key={i} className="text-center px-4 border-r border-slate-200 last:border-0"><div className="text-lg font-bold" style={{ color: s.c }}>{s.v}</div><div className="text-xs text-slate-500">{s.l}</div></div>)}
          <div className="flex gap-2 ml-2">
            <button onClick={loadAllData} className="p-2.5 bg-white border border-slate-200 rounded-xl hover:border-blue-300"><Icon name="refresh" size={16} color="#64748b" /></button>
            <button onClick={exportData} className="p-2.5 bg-white border border-slate-200 rounded-xl hover:border-blue-300"><Icon name="download" size={16} color="#64748b" /></button>
            <button onClick={() => openModal('settings')} className="p-2.5 bg-white border border-slate-200 rounded-xl hover:border-blue-300"><Icon name="settings" size={16} color="#64748b" /></button>
          </div>
        </div>
      </header>

      <nav className="flex gap-2 px-8 py-4 bg-white/50 border-b border-slate-200/50">
        {[{ id: 'dashboard', l: 'Dashboard', i: 'search' }, { id: 'candidates', l: 'Search Results', i: 'users' }, { id: 'emails', l: 'Email Tracking', i: 'mail' }, { id: 'calendar', l: 'Calendar', i: 'calendar' }, { id: 'templates', l: 'Templates', i: 'file' }, { id: 'activity', l: 'Activity', i: 'activity' }].map(t => <button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold ${activeTab === t.id ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'}`}><Icon name={t.i} size={15} color={activeTab === t.id ? 'white' : '#64748b'} />{t.l}</button>)}
      </nav>

      <main className="p-8">
        {activeTab === 'dashboard' && <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Icon name="search" size={20} color="#3b82f6" />Search Job Changes</h3>
            <div className="grid grid-cols-5 gap-4">
              <div><label className="block text-xs font-semibold text-slate-500 mb-2">Date Start</label><input type="date" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={searchParams.dateStart} onChange={e => setSearchParams(p => ({ ...p, dateStart: e.target.value }))} /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-2">Date End</label><input type="date" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={searchParams.dateEnd} onChange={e => setSearchParams(p => ({ ...p, dateEnd: e.target.value }))} /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-2">Industry</label><select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={searchParams.industry} onChange={e => setSearchParams(p => ({ ...p, industry: e.target.value }))}><option value="">All</option>{industries.map(i => <option key={i}>{i}</option>)}</select></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-2">Job Level</label><select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={searchParams.jobLevel} onChange={e => setSearchParams(p => ({ ...p, jobLevel: e.target.value }))}><option value="">All</option>{jobLevels.map(l => <option key={l}>{l}</option>)}</select></div>
              <div className="flex items-end"><button onClick={() => { logActivity('search', 'Searched: ' + (searchParams.industry || 'All') + ', ' + (searchParams.jobLevel || 'All')); setActiveTab('candidates'); }} className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg"><Icon name="search" size={16} color="white" />Search</button></div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[{ l: 'Total', v: stats.total, i: 'users', c: '#3b82f6', bg: 'from-blue-50 to-blue-100' }, { l: 'New', v: stats.newCount, i: 'userPlus', c: '#10b981', bg: 'from-emerald-50 to-emerald-100' }, { l: 'Emails', v: stats.emails, i: 'mail', c: '#8b5cf6', bg: 'from-violet-50 to-violet-100' }, { l: 'Follow-ups', v: stats.followUpsCount, i: 'bell', c: '#f59e0b', bg: 'from-amber-50 to-amber-100' }].map((s, i) => <div key={i} className={`bg-gradient-to-br ${s.bg} rounded-2xl p-5 border border-white shadow-sm`}><div className="flex items-center justify-between"><div><div className="text-2xl font-bold text-slate-800">{s.v}</div><div className="text-sm text-slate-600 mt-1">{s.l}</div></div><div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: s.c + '20' }}><Icon name={s.i} size={24} color={s.c} /></div></div></div>)}
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={() => openModal('addCandidate')} className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg"><Icon name="userPlus" size={18} color="white" />Add Candidate</button>
                <button onClick={() => { setEditingTemplate(null); openModal('template'); }} className="w-full py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:border-blue-300"><Icon name="plus" size={18} color="#64748b" />Create Template</button>
                <button onClick={() => openModal('testEmail')} className="w-full py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:border-blue-300"><Icon name="mail" size={18} color="#64748b" />Add Test Email</button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
              <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-slate-800">Email Templates</h3><button onClick={() => { setEditingTemplate(null); openModal('template'); }} className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100"><Icon name="plus" size={16} color="#3b82f6" /></button></div>
              <div className="space-y-2 max-h-52 overflow-y-auto">
                {emailTemplates.map(t => <div key={t.id} className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 flex justify-between items-start"><div><div className="font-semibold text-slate-800 text-sm">{t.name}</div><div className="text-xs text-slate-500">{t.subject}</div></div><div className="flex gap-1"><button onClick={() => { setEditingTemplate(t); openModal('template'); }} className="p-1.5 hover:bg-white rounded-lg"><Icon name="edit" size={12} color="#64748b" /></button><button onClick={() => handleDeleteTemplate(t.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Icon name="trash" size={12} color="#ef4444" /></button></div></div>)}
                {emailTemplates.length === 0 && <p className="text-slate-400 text-sm text-center py-8">No templates yet</p>}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
              <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-slate-800">Test Emails</h3><button onClick={() => openModal('testEmail')} className="p-2 bg-emerald-50 rounded-lg hover:bg-emerald-100"><Icon name="plus" size={16} color="#10b981" /></button></div>
              <div className="space-y-2 max-h-52 overflow-y-auto">
                {testEmails.map(t => <div key={t.id} className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex justify-between items-center"><div><div className="font-semibold text-emerald-800 text-sm">{t.name}</div><div className="text-xs text-emerald-600">{t.email}</div></div><div className="flex gap-1"><button onClick={() => { setSelectedTestEmail(t); openModal('sendTest'); }} className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-semibold hover:bg-emerald-600">Test</button><button onClick={() => deleteTestEmail(t.id)} className="p-1.5 hover:bg-red-100 rounded-lg"><Icon name="trash" size={12} color="#ef4444" /></button></div></div>)}
                {testEmails.length === 0 && <p className="text-slate-400 text-sm text-center py-8">No test emails</p>}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4">Recent Activity</h3>
            <div className="space-y-2">{activities.slice(0, 5).map(a => <div key={a.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: a.type === 'email' ? '#10b98120' : a.type === 'search' ? '#3b82f620' : '#8b5cf620' }}><Icon name={a.type === 'email' ? 'mail' : a.type === 'search' ? 'search' : 'users'} size={14} color={a.type === 'email' ? '#10b981' : a.type === 'search' ? '#3b82f6' : '#8b5cf6'} /></div><div className="flex-1"><div className="text-sm text-slate-700">{a.description}</div><div className="text-xs text-slate-400">{new Date(a.timestamp).toLocaleString()}</div></div></div>)}{activities.length === 0 && <p className="text-slate-400 text-sm text-center py-8">No activity yet</p>}</div>
          </div>
        </div>}

        {activeTab === 'candidates' && <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-5">
            <div className="flex gap-4 items-end flex-wrap">
              <div className="flex-1 min-w-[130px]"><label className="block text-xs font-semibold text-slate-500 mb-2">Date Start</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm" value={searchParams.dateStart} onChange={e => setSearchParams(p => ({ ...p, dateStart: e.target.value }))} /></div>
              <div className="flex-1 min-w-[130px]"><label className="block text-xs font-semibold text-slate-500 mb-2">Date End</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm" value={searchParams.dateEnd} onChange={e => setSearchParams(p => ({ ...p, dateEnd: e.target.value }))} /></div>
              <div className="flex-1 min-w-[130px]"><label className="block text-xs font-semibold text-slate-500 mb-2">Industry</label><select className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm" value={searchParams.industry} onChange={e => setSearchParams(p => ({ ...p, industry: e.target.value }))}><option value="">All</option>{industries.map(i => <option key={i}>{i}</option>)}</select></div>
              <div className="flex-1 min-w-[130px]"><label className="block text-xs font-semibold text-slate-500 mb-2">Job Level</label><select className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm" value={searchParams.jobLevel} onChange={e => setSearchParams(p => ({ ...p, jobLevel: e.target.value }))}><option value="">All</option>{jobLevels.map(l => <option key={l}>{l}</option>)}</select></div>
              <div className="flex-1 min-w-[130px]"><label className="block text-xs font-semibold text-slate-500 mb-2">Status</label><select className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm" value={searchParams.status} onChange={e => setSearchParams(p => ({ ...p, status: e.target.value }))}><option value="">All</option>{statuses.map(s => <option key={s}>{s}</option>)}</select></div>
              <button onClick={() => openModal('addCandidate')} className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg"><Icon name="userPlus" size={16} color="white" />Add</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-800">{filteredCandidates.length} Results Found</h3></div>
            {filteredCandidates.length === 0 ? <div className="p-16 text-center"><Icon name="users" size={48} color="#cbd5e1" /><p className="text-slate-500 mt-4">No candidates found</p></div> : <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase cursor-pointer hover:text-blue-600" onClick={() => handleSort('name')}><div className="flex items-center gap-1">Candidate <SortIcon col="name" /></div></th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase">Previous Position</th>
                  <th className="px-2 py-3 w-10"></th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase">New Position</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase cursor-pointer hover:text-blue-600" onClick={() => handleSort('job_change_date')}><div className="flex items-center gap-1">Change Date <SortIcon col="job_change_date" /></div></th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase cursor-pointer hover:text-blue-600" onClick={() => handleSort('match_score')}><div className="flex items-center gap-1">Match <SortIcon col="match_score" /></div></th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase">Contact</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase">Actions</th>
                </tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCandidates.map(c => <tr key={c.id} className="hover:bg-blue-50/30">
                    <td className="px-5 py-4"><div className="font-semibold text-slate-800">{c.name}</div><div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Icon name="mapPin" size={10} color="#94a3b8" />{c.location || 'Unknown'}</div></td>
                    <td className="px-5 py-4"><div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2 inline-block"><div className="font-semibold text-red-800 text-sm">{c.previous_title || 'N/A'}</div><div className="text-xs text-red-600">{c.previous_company || 'N/A'}</div><div className="text-xs text-red-500 mt-0.5">{c.previous_role}</div></div></td>
                    <td className="px-2 py-4 text-center"><div className={`w-8 h-8 rounded-full flex items-center justify-center ${c.change_type === 'promotion' ? 'bg-emerald-100' : 'bg-violet-100'}`}><Icon name={c.change_type === 'promotion' ? 'arrowUp' : 'arrowRight'} size={16} color={c.change_type === 'promotion' ? '#10b981' : '#8b5cf6'} /></div></td>
                    <td className="px-5 py-4"><div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 inline-block"><div className="font-semibold text-emerald-800 text-sm">{c.new_title || 'N/A'}</div><div className="text-xs text-emerald-600">{c.new_company || 'N/A'}</div><div className="text-xs text-emerald-500 mt-0.5">{c.new_role}</div></div></td>
                    <td className="px-5 py-4"><div className="text-sm text-slate-700">{c.job_change_date ? new Date(c.job_change_date).toLocaleDateString() : 'N/A'}</div><div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><Icon name="clock" size={10} color="#94a3b8" />{timeAgo(c.job_change_date)}</div></td>
                    <td className="px-5 py-4"><div className="flex items-center gap-2"><div className="w-12 h-2 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: (c.match_score || 0) + '%' }} /></div><span className="text-sm font-semibold text-slate-700">{c.match_score || 0}%</span></div></td>
                    <td className="px-5 py-4">{c.email ? <div className="flex items-center gap-1.5 text-emerald-600"><Icon name="check" size={14} color="#10b981" /><span className="text-xs font-medium">Available</span></div> : <div className="flex items-center gap-1.5 text-slate-400"><Icon name="x" size={14} color="#cbd5e1" /><span className="text-xs">No email</span></div>}</td>
                    <td className="px-5 py-4"><div className="flex gap-2"><button onClick={() => { setSelectedCandidate(c); openModal('viewCandidate'); }} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200"><Icon name="eye" size={14} color="#64748b" /></button>{c.email && <button onClick={() => { setSelectedCandidate(c); openModal('sendEmail'); }} className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg hover:shadow-md"><Icon name="send" size={14} color="white" /></button>}<button onClick={() => handleDeleteCandidate(c.id)} className="p-2 bg-red-50 rounded-lg hover:bg-red-100"><Icon name="trash" size={14} color="#ef4444" /></button></div></td>
                  </tr>)}
                </tbody>
              </table>
            </div>}
          </div>
        </div>}

        {activeTab === 'emails' && <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-800">Email History ({sentEmails.length})</h3></div>
          {sentEmails.length === 0 ? <div className="p-16 text-center"><Icon name="mail" size={48} color="#cbd5e1" /><p className="text-slate-500 mt-4">No emails sent</p></div> : <table className="w-full"><thead><tr className="bg-slate-50"><th className="px-5 py-3 text-left text-xs font-bold text-slate-500">Recipient</th><th className="px-5 py-3 text-left text-xs font-bold text-slate-500">Template</th><th className="px-5 py-3 text-left text-xs font-bold text-slate-500">Subject</th><th className="px-5 py-3 text-left text-xs font-bold text-slate-500">Sent</th><th className="px-5 py-3 text-left text-xs font-bold text-slate-500">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{sentEmails.map(e => <tr key={e.id} className="hover:bg-slate-50"><td className="px-5 py-4"><div className="font-semibold text-slate-800 text-sm">{e.candidate_name}</div><div className="text-xs text-slate-500">{e.candidate_email}</div></td><td className="px-5 py-4 text-sm text-slate-600">{e.template_name}</td><td className="px-5 py-4 text-sm text-slate-600 max-w-xs truncate">{e.subject}</td><td className="px-5 py-4 text-sm text-slate-500">{new Date(e.sent_at).toLocaleString()}</td><td className="px-5 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${e.status === 'opened' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{e.status}</span></td></tr>)}</tbody></table>}
        </div>}

        {activeTab === 'calendar' && <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6"><h3 className="text-lg font-bold text-slate-800">{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3><div className="flex gap-2"><button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200"><Icon name="chevronLeft" size={16} color="#64748b" /></button><button onClick={() => setCurrentMonth(new Date())} className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium hover:bg-slate-200">Today</button><button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200"><Icon name="chevronRight" size={16} color="#64748b" /></button></div></div>
            <div className="grid grid-cols-7 gap-2 mb-2">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="text-center text-xs font-bold text-slate-500 py-2">{d}</div>)}</div>
            <div className="grid grid-cols-7 gap-2">{getDaysInMonth(currentMonth).map((d, i) => { const fups = d ? getFollowUpsForDate(d) : []; const isToday = d && d.toDateString() === new Date().toDateString(); return <div key={i} onClick={() => { if (d) { setNewFollowUp(p => ({ ...p, date: d.toISOString().split('T')[0] })); openModal('followUp'); } }} className={`min-h-[80px] p-2 rounded-xl cursor-pointer ${isToday ? 'bg-blue-100 border-2 border-blue-500' : d ? 'bg-slate-50 hover:bg-slate-100 border border-slate-200' : 'bg-slate-50/50'}`}>{d && <><div className={`text-sm font-semibold ${isToday ? 'text-blue-600' : 'text-slate-700'}`}>{d.getDate()}</div>{fups.slice(0, 2).map(f => <div key={f.id} className={`text-xs px-1.5 py-0.5 rounded mt-1 truncate ${f.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{f.candidate_name}</div>)}</>}</div>; })}</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-slate-800">Follow-ups</h3><button onClick={() => openModal('followUp')} className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100"><Icon name="plus" size={16} color="#3b82f6" /></button></div>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">{followUps.filter(f => !f.completed).map(f => <div key={f.id} className="p-4 bg-slate-50 rounded-xl"><div className="flex justify-between items-start"><div><div className="font-semibold text-slate-800">{f.candidate_name}</div><div className="text-sm text-blue-600 font-medium">{new Date(f.date).toLocaleDateString()}</div>{f.note && <div className="text-xs text-slate-500 mt-1">{f.note}</div>}</div><div className="flex gap-1"><button onClick={() => toggleFollowUp(f)} className="p-1.5 bg-emerald-100 rounded-lg hover:bg-emerald-200"><Icon name="check" size={12} color="#10b981" /></button><button onClick={() => deleteFollowUp(f.id)} className="p-1.5 bg-red-100 rounded-lg hover:bg-red-200"><Icon name="x" size={12} color="#ef4444" /></button></div></div></div>)}{followUps.filter(f => !f.completed).length === 0 && <p className="text-slate-400 text-sm text-center py-8">No pending follow-ups</p>}</div>
          </div>
        </div>}

        {activeTab === 'templates' && <div>
          <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-slate-800">Email Templates</h2><button onClick={() => { setEditingTemplate(null); openModal('template'); }} className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg"><Icon name="plus" size={18} color="white" />Create</button></div>
          <div className="grid grid-cols-2 gap-5">{emailTemplates.map(t => <div key={t.id} className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6"><div className="flex justify-between items-start mb-4"><div><h3 className="font-bold text-slate-800">{t.name}</h3><p className="text-sm text-slate-500 mt-1">Subject: {t.subject}</p></div><div className="flex gap-2"><button onClick={() => { setEditingTemplate(t); openModal('template'); }} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200"><Icon name="edit" size={14} color="#64748b" /></button><button onClick={() => handleDeleteTemplate(t.id)} className="p-2 bg-red-50 rounded-lg hover:bg-red-100"><Icon name="trash" size={14} color="#ef4444" /></button></div></div><div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 whitespace-pre-wrap max-h-32 overflow-hidden">{t.body}</div></div>)}{emailTemplates.length === 0 && <div className="col-span-2 bg-white rounded-2xl border border-slate-200/50 p-16 text-center"><Icon name="file" size={48} color="#cbd5e1" /><p className="text-slate-500 mt-4">No templates yet</p></div>}</div>
        </div>}

        {activeTab === 'activity' && <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-800">Activity Log</h3></div>
          {activities.length === 0 ? <div className="p-16 text-center"><Icon name="activity" size={48} color="#cbd5e1" /><p className="text-slate-500 mt-4">No activity</p></div> : <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">{activities.map(a => <div key={a.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: a.type === 'email' ? '#10b98120' : a.type === 'search' ? '#3b82f620' : '#8b5cf620' }}><Icon name={a.type === 'email' ? 'mail' : a.type === 'search' ? 'search' : 'users'} size={18} color={a.type === 'email' ? '#10b981' : a.type === 'search' ? '#3b82f6' : '#8b5cf6'} /></div><div><p className="text-sm font-medium text-slate-700">{a.description}</p><p className="text-xs text-slate-400">{new Date(a.timestamp).toLocaleString()}</p></div></div>)}</div>}
        </div>}
      </main>

      <Modal id="addCandidate" wide>
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-slate-800">Add New Candidate</h2><button onClick={() => closeModal('addCandidate')} className="p-2 hover:bg-slate-100 rounded-xl"><Icon name="x" size={20} color="#64748b" /></button></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Name *</label><input className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newCandidate.name} onChange={e => setNewCandidate(p => ({ ...p, name: e.target.value }))} /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Email</label><input type="email" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newCandidate.email} onChange={e => setNewCandidate(p => ({ ...p, email: e.target.value }))} /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Location</label><input className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newCandidate.location} onChange={e => setNewCandidate(p => ({ ...p, location: e.target.value }))} /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Industry</label><select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newCandidate.industry} onChange={e => setNewCandidate(p => ({ ...p, industry: e.target.value }))}>{industries.map(i => <option key={i}>{i}</option>)}</select></div>
          <div className="col-span-2 border-t pt-4 mt-2"><h4 className="font-semibold text-slate-700 mb-3">Previous Position</h4></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Company *</label><input className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newCandidate.previous_company} onChange={e => setNewCandidate(p => ({ ...p, previous_company: e.target.value }))} /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Title *</label><input className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newCandidate.previous_title} onChange={e => setNewCandidate(p => ({ ...p, previous_title: e.target.value }))} /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Level</label><select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newCandidate.previous_role} onChange={e => setNewCandidate(p => ({ ...p, previous_role: e.target.value }))}>{jobLevels.map(l => <option key={l}>{l}</option>)}</select></div>
          <div className="col-span-2 border-t pt-4 mt-2"><h4 className="font-semibold text-slate-700 mb-3">New Position</h4></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Company *</label><input className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newCandidate.new_company} onChange={e => setNewCandidate(p => ({ ...p, new_company: e.target.value }))} /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Title *</label><input className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newCandidate.new_title} onChange={e => setNewCandidate(p => ({ ...p, new_title: e.target.value }))} /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Level</label><select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newCandidate.new_role} onChange={e => setNewCandidate(p => ({ ...p, new_role: e.target.value }))}>{jobLevels.map(l => <option key={l}>{l}</option>)}</select></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Change Type</label><select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newCandidate.change_type} onChange={e => setNewCandidate(p => ({ ...p, change_type: e.target.value }))}><option value="promotion">Promotion</option><option value="lateral">Lateral</option></select></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Change Date</label><input type="date" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newCandidate.job_change_date} onChange={e => setNewCandidate(p => ({ ...p, job_change_date: e.target.value }))} /></div>
        </div>
        <div className="flex gap-3 justify-end mt-6 pt-4 border-t"><button onClick={() => closeModal('addCandidate')} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600">Cancel</button><button onClick={handleAddCandidate} disabled={!newCandidate.name || !newCandidate.previous_company || !newCandidate.new_company || isSaving} className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50">{isSaving ? 'Saving...' : 'Add'}</button></div>
      </Modal>

      <Modal id="viewCandidate">{selectedCandidate && <>
        <div className="flex justify-between items-start mb-6"><div><h2 className="text-xl font-bold text-slate-800">{selectedCandidate.name}</h2><p className="text-slate-500 flex items-center gap-1 mt-1"><Icon name="mapPin" size={14} color="#94a3b8" />{selectedCandidate.location || 'Unknown'}</p></div><button onClick={() => { closeModal('viewCandidate'); setSelectedCandidate(null); }} className="p-2 hover:bg-slate-100 rounded-xl"><Icon name="x" size={20} color="#64748b" /></button></div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4"><div className="text-xs font-bold text-red-600 mb-2">PREVIOUS</div><div className="font-semibold text-red-800">{selectedCandidate.previous_title}</div><div className="text-sm text-red-700">{selectedCandidate.previous_company}</div><div className="text-xs text-red-500 mt-1">{selectedCandidate.previous_role}</div></div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4"><div className="text-xs font-bold text-emerald-600 mb-2">NEW</div><div className="font-semibold text-emerald-800">{selectedCandidate.new_title}</div><div className="text-sm text-emerald-700">{selectedCandidate.new_company}</div><div className="text-xs text-emerald-500 mt-1">{selectedCandidate.new_role}</div></div>
        </div>
        <div className="space-y-2 mb-6">
          {selectedCandidate.email && <div className="flex items-center gap-2 text-sm"><Icon name="mail" size={14} color="#64748b" /><span className="text-slate-600">{selectedCandidate.email}</span></div>}
          {selectedCandidate.industry && <div className="flex items-center gap-2 text-sm"><Icon name="users" size={14} color="#64748b" /><span className="text-slate-600">{selectedCandidate.industry}</span></div>}
          {selectedCandidate.job_change_date && <div className="flex items-center gap-2 text-sm"><Icon name="calendar" size={14} color="#64748b" /><span className="text-slate-600">{new Date(selectedCandidate.job_change_date).toLocaleDateString()} ({timeAgo(selectedCandidate.job_change_date)})</span></div>}
          {selectedCandidate.match_score && <div className="flex items-center gap-2 text-sm"><Icon name="activity" size={14} color="#64748b" /><span className="text-slate-600">Match: {selectedCandidate.match_score}%</span></div>}
        </div>
        <div className="flex gap-3 justify-end pt-4 border-t"><button onClick={() => handleDeleteCandidate(selectedCandidate.id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-red-100"><Icon name="trash" size={14} color="#ef4444" />Delete</button>{selectedCandidate.email && <button onClick={() => { closeModal('viewCandidate'); openModal('sendEmail'); }} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-semibold flex items-center gap-2 hover:shadow-lg"><Icon name="send" size={14} color="white" />Send Email</button>}</div>
      </>}</Modal>

      <Modal id="sendEmail">{selectedCandidate && <>
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-slate-800">Send Email</h2><button onClick={() => { closeModal('sendEmail'); setSelectedCandidate(null); setSelectedTemplate(null); }} className="p-2 hover:bg-slate-100 rounded-xl"><Icon name="x" size={20} color="#64748b" /></button></div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4"><div className="font-semibold text-blue-800">{selectedCandidate.name}</div><div className="text-sm text-blue-600">{selectedCandidate.email}</div></div>
        <div className="mb-4"><label className="block text-xs font-semibold text-slate-500 mb-3">Select Template</label><div className="space-y-2 max-h-48 overflow-y-auto">{emailTemplates.map(t => <div key={t.id} onClick={() => setSelectedTemplate(t)} className={`p-3 rounded-xl cursor-pointer ${selectedTemplate?.id === t.id ? 'bg-blue-100 border-2 border-blue-500' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'}`}><div className="font-semibold text-sm">{t.name}</div><div className="text-xs text-slate-500">{t.subject}</div></div>)}</div></div>
        {selectedTemplate && <div className="mb-4"><label className="block text-xs font-semibold text-slate-500 mb-2">Preview</label><div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm max-h-40 overflow-y-auto whitespace-pre-wrap"><strong>Subject:</strong> {selectedTemplate.subject}<br /><br />{selectedTemplate.body}</div></div>}
        <div className="flex gap-3 justify-end pt-4 border-t"><button onClick={() => { closeModal('sendEmail'); setSelectedCandidate(null); setSelectedTemplate(null); }} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600">Cancel</button><button onClick={() => handleSendEmail(selectedCandidate, selectedTemplate)} disabled={!selectedTemplate || isSaving} className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50">{isSaving ? 'Sending...' : 'Send'}</button></div>
      </>}</Modal>

      <Modal id="template"><TemplateForm template={editingTemplate} onSave={handleSaveTemplate} onClose={() => { closeModal('template'); setEditingTemplate(null); }} isSaving={isSaving} /></Modal>

      <Modal id="followUp">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-slate-800">Add Follow-up</h2><button onClick={() => closeModal('followUp')} className="p-2 hover:bg-slate-100 rounded-xl"><Icon name="x" size={20} color="#64748b" /></button></div>
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Candidate Name *</label><input className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newFollowUp.candidate_name} onChange={e => setNewFollowUp(p => ({ ...p, candidate_name: e.target.value }))} /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Date *</label><input type="date" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newFollowUp.date} onChange={e => setNewFollowUp(p => ({ ...p, date: e.target.value }))} /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Note</label><textarea className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm resize-none" rows={3} value={newFollowUp.note} onChange={e => setNewFollowUp(p => ({ ...p, note: e.target.value }))} /></div>
        </div>
        <div className="flex gap-3 justify-end mt-6 pt-4 border-t"><button onClick={() => closeModal('followUp')} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600">Cancel</button><button onClick={handleAddFollowUp} disabled={!newFollowUp.date || !newFollowUp.candidate_name || isSaving} className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50">{isSaving ? 'Saving...' : 'Add'}</button></div>
      </Modal>

      <Modal id="testEmail">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-slate-800">Add Test Email</h2><button onClick={() => closeModal('testEmail')} className="p-2 hover:bg-slate-100 rounded-xl"><Icon name="x" size={20} color="#64748b" /></button></div>
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Name *</label><input className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newTestEmail.name} onChange={e => setNewTestEmail(p => ({ ...p, name: e.target.value }))} /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Email *</label><input type="email" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newTestEmail.email} onChange={e => setNewTestEmail(p => ({ ...p, email: e.target.value }))} /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Company</label><input className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={newTestEmail.company} onChange={e => setNewTestEmail(p => ({ ...p, company: e.target.value }))} /></div>
        </div>
        <div className="flex gap-3 justify-end mt-6 pt-4 border-t"><button onClick={() => closeModal('testEmail')} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600">Cancel</button><button onClick={handleAddTestEmail} disabled={!newTestEmail.name || !newTestEmail.email || isSaving} className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50">{isSaving ? 'Saving...' : 'Add'}</button></div>
      </Modal>

      <Modal id="sendTest">{selectedTestEmail && <>
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-slate-800">Send Test Email</h2><button onClick={() => { closeModal('sendTest'); setSelectedTestEmail(null); setSelectedTemplate(null); }} className="p-2 hover:bg-slate-100 rounded-xl"><Icon name="x" size={20} color="#64748b" /></button></div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4"><div className="font-semibold text-emerald-800">{selectedTestEmail.name}</div><div className="text-sm text-emerald-600">{selectedTestEmail.email}</div></div>
        <div className="mb-4"><label className="block text-xs font-semibold text-slate-500 mb-3">Select Template</label><div className="space-y-2 max-h-48 overflow-y-auto">{emailTemplates.map(t => <div key={t.id} onClick={() => setSelectedTemplate(t)} className={`p-3 rounded-xl cursor-pointer ${selectedTemplate?.id === t.id ? 'bg-emerald-100 border-2 border-emerald-500' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'}`}><div className="font-semibold text-sm">{t.name}</div></div>)}</div></div>
        <div className="flex gap-3 justify-end pt-4 border-t"><button onClick={() => { closeModal('sendTest'); setSelectedTestEmail(null); setSelectedTemplate(null); }} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600">Cancel</button><button onClick={handleSendTest} disabled={!selectedTemplate} className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50">Send Test</button></div>
      </>}</Modal>

      <Modal id="settings">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-slate-800">Settings</h2><button onClick={() => closeModal('settings')} className="p-2 hover:bg-slate-100 rounded-xl"><Icon name="x" size={20} color="#64748b" /></button></div>
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Your Name</label><input className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={settings.sender_name || ''} onChange={e => setSettings(p => ({ ...p, sender_name: e.target.value }))} /><p className="text-xs text-slate-400 mt-1">Used as {"{{senderName}}"}</p></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-2">Company Name</label><input className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={settings.company_name || ''} onChange={e => setSettings(p => ({ ...p, company_name: e.target.value }))} /><p className="text-xs text-slate-400 mt-1">Used as {"{{company}}"}</p></div>
        </div>
        <div className="flex gap-3 justify-end mt-6 pt-4 border-t"><button onClick={() => closeModal('settings')} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600">Cancel</button><button onClick={saveSettings} disabled={isSaving} className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50">{isSaving ? 'Saving...' : 'Save'}</button></div>
      </Modal>
    </div>
  );
}
