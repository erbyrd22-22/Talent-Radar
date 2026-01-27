import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase setup
const supabaseUrl = 'https://reaqaxufwxcvarypfsdz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlYXFheHVmd3hjdmFyeXBmc2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NzQwMzQsImV4cCI6MjA4NTA1MDAzNH0.8uvcFSRNQQDBH7GtxnaNhdv96iAiComLosBEtxEw818';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Icons as simple SVG components
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
    chevronLeft: <polyline points="15 18 9 12 15 6"/>,
    chevronRight: <polyline points="9 18 15 12 9 6"/>,
    refresh: <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    userPlus: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    cloud: <><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></>,
    cloudOff: <><line x1="1" y1="1" x2="23" y2="23"/><path d="M18 10h-1.26A8 8 0 0 0 4.26 6.26M5 5a8 8 0 0 0 2.05 12.73"/><path d="M18.83 16.83A5 5 0 0 0 18 10"/><path d="M9 20h9"/></>,
    mailOpen: <><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

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
  const [searchParams, setSearchParams] = useState({ industry: '', jobLevel: '', status: '' });
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const [showAddCandidateModal, setShowAddCandidateModal] = useState(false);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [showTestEmailModal, setShowTestEmailModal] = useState(false);
  const [showSendTestModal, setShowSendTestModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  const [newCandidate, setNewCandidate] = useState({
    name: '', email: '', phone: '', linkedin: '', location: '',
    previous_company: '', previous_title: '', previous_role: 'Mid Level',
    new_company: '', new_title: '', new_role: 'Mid Level',
    industry: 'Technology', skills: '', job_change_date: '', notes: '', status: 'new'
  });
  const [newFollowUp, setNewFollowUp] = useState({ candidate_name: '', date: '', note: '' });
  const [newTestEmail, setNewTestEmail] = useState({ name: '', email: '', company: '' });
  const [selectedTestEmail, setSelectedTestEmail] = useState(null);

  const industries = ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail'];
  const jobLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
  const statuses = ['new', 'contacted', 'responded', 'interviewing', 'hired', 'not interested'];

  useEffect(() => { loadAllData(); }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [cRes, tRes, eRes, fRes, teRes, aRes, sRes] = await Promise.all([
        supabase.from('candidates').select('*').order('created_at', { ascending: false }),
        supabase.from('email_templates').select('*').order('created_at', { ascending: false }),
        supabase.from('sent_emails').select('*').order('sent_at', { ascending: false }),
        supabase.from('follow_ups').select('*').order('date', { ascending: true }),
        supabase.from('test_emails').select('*'),
        supabase.from('activities').select('*').order('timestamp', { ascending: false }).limit(50),
        supabase.from('settings').select('*').single()
      ]);
      if (cRes.data) setCandidates(cRes.data);
      if (tRes.data) setEmailTemplates(tRes.data);
      if (eRes.data) setSentEmails(eRes.data);
      if (fRes.data) setFollowUps(fRes.data);
      if (teRes.data) setTestEmails(teRes.data);
      if (aRes.data) setActivities(aRes.data);
      if (sRes.data) setSettings(sRes.data);
      setIsConnected(true);
    } catch (e) {
      console.error(e);
      setIsConnected(false);
    }
    setIsLoading(false);
  };

  const notify = (msg) => { setNotification(msg); setTimeout(() => setNotification(null), 3000); };

  const logActivity = async (type, description) => {
    const { data } = await supabase.from('activities').insert([{ type, description }]).select().single();
    if (data) setActivities(prev => [data, ...prev]);
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      if (searchParams.industry && c.industry !== searchParams.industry) return false;
      if (searchParams.jobLevel && c.new_role !== searchParams.jobLevel) return false;
      if (searchParams.status && c.status !== searchParams.status) return false;
      return true;
    });
  }, [candidates, searchParams]);

  const handleAddCandidate = async () => {
    setIsSaving(true);
    const data = { ...newCandidate, skills: newCandidate.skills ? newCandidate.skills.split(',').map(s => s.trim()) : [], match_score: Math.floor(Math.random() * 20) + 80 };
    const { data: res } = await supabase.from('candidates').insert([data]).select().single();
    if (res) {
      setCandidates(prev => [res, ...prev]);
      await logActivity('candidate', `Added: ${res.name}`);
      notify('Candidate added!');
      setShowAddCandidateModal(false);
      setNewCandidate({ name: '', email: '', phone: '', linkedin: '', location: '', previous_company: '', previous_title: '', previous_role: 'Mid Level', new_company: '', new_title: '', new_role: 'Mid Level', industry: 'Technology', skills: '', job_change_date: '', notes: '', status: 'new' });
    }
    setIsSaving(false);
  };

  const handleDeleteCandidate = async (id) => {
    const c = candidates.find(x => x.id === id);
    await supabase.from('candidates').delete().eq('id', id);
    setCandidates(prev => prev.filter(x => x.id !== id));
    await logActivity('candidate', `Deleted: ${c?.name}`);
    notify('Candidate deleted');
    setShowCandidateModal(false);
    setSelectedCandidate(null);
  };

  const handleSaveTemplate = async (t) => {
    setIsSaving(true);
    if (editingTemplate) {
      const { data } = await supabase.from('email_templates').update({ name: t.name, subject: t.subject, body: t.body }).eq('id', t.id).select().single();
      if (data) setEmailTemplates(prev => prev.map(x => x.id === data.id ? data : x));
    } else {
      const { data } = await supabase.from('email_templates').insert([{ name: t.name, subject: t.subject, body: t.body }]).select().single();
      if (data) setEmailTemplates(prev => [data, ...prev]);
    }
    notify('Template saved!');
    setShowTemplateModal(false);
    setEditingTemplate(null);
    setIsSaving(false);
  };

  const handleDeleteTemplate = async (id) => {
    await supabase.from('email_templates').delete().eq('id', id);
    setEmailTemplates(prev => prev.filter(x => x.id !== id));
    notify('Template deleted');
  };

  const handleSendEmail = async (candidate, template) => {
    setIsSaving(true);
    const emailData = {
      candidate_id: candidate.id, candidate_name: candidate.name, candidate_email: candidate.email,
      template_id: template.id, template_name: template.name,
      subject: template.subject.replace(/\{\{candidateName\}\}/g, candidate.name).replace(/\{\{company\}\}/g, settings.company_name || 'Our Company'),
      status: 'sent'
    };
    const { data } = await supabase.from('sent_emails').insert([emailData]).select().single();
    if (data) {
      setSentEmails(prev => [data, ...prev]);
      await supabase.from('candidates').update({ status: 'contacted' }).eq('id', candidate.id);
      setCandidates(prev => prev.map(c => c.id === candidate.id ? { ...c, status: 'contacted' } : c));
      await logActivity('email', `Sent "${template.name}" to ${candidate.name}`);
      notify(`Email sent to ${candidate.name}!`);
    }
    setShowEmailModal(false);
    setSelectedCandidate(null);
    setSelectedTemplate(null);
    setIsSaving(false);
  };

  const handleAddFollowUp = async () => {
    if (!newFollowUp.date || !newFollowUp.candidate_name) return;
    setIsSaving(true);
    const { data } = await supabase.from('follow_ups').insert([newFollowUp]).select().single();
    if (data) {
      setFollowUps(prev => [...prev, data].sort((a, b) => new Date(a.date) - new Date(b.date)));
      await logActivity('followup', `Scheduled: ${newFollowUp.candidate_name}`);
      notify('Follow-up scheduled!');
    }
    setShowFollowUpModal(false);
    setNewFollowUp({ candidate_name: '', date: '', note: '' });
    setIsSaving(false);
  };

  const toggleFollowUp = async (f) => {
    const { data } = await supabase.from('follow_ups').update({ completed: !f.completed }).eq('id', f.id).select().single();
    if (data) setFollowUps(prev => prev.map(x => x.id === data.id ? data : x));
  };

  const deleteFollowUp = async (id) => {
    await supabase.from('follow_ups').delete().eq('id', id);
    setFollowUps(prev => prev.filter(x => x.id !== id));
    notify('Follow-up removed');
  };

  const handleAddTestEmail = async () => {
    if (!newTestEmail.name || !newTestEmail.email) return;
    setIsSaving(true);
    const { data } = await supabase.from('test_emails').insert([newTestEmail]).select().single();
    if (data) setTestEmails(prev => [...prev, data]);
    notify('Test email added!');
    setShowTestEmailModal(false);
    setNewTestEmail({ name: '', email: '', company: '' });
    setIsSaving(false);
  };

  const deleteTestEmail = async (id) => {
    await supabase.from('test_emails').delete().eq('id', id);
    setTestEmails(prev => prev.filter(x => x.id !== id));
    notify('Test email removed');
  };

  const handleSendTest = async (te, t) => {
    await logActivity('email', `Sent test "${t.name}" to ${te.email}`);
    notify(`Test sent to ${te.email}!`);
    setShowSendTestModal(false);
    setSelectedTestEmail(null);
    setSelectedTemplate(null);
  };

  const saveSettings = async () => {
    setIsSaving(true);
    await supabase.from('settings').update({ sender_name: settings.sender_name, company_name: settings.company_name }).eq('id', 1);
    notify('Settings saved!');
    setShowSettingsModal(false);
    setIsSaving(false);
  };

  const exportData = () => {
    const d = { candidates, emailTemplates, sentEmails, followUps, testEmails, activities, settings };
    const blob = new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `talent-radar-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    notify('Data exported!');
  };

  const getDaysInMonth = (date) => {
    const y = date.getFullYear(), m = date.getMonth();
    const first = new Date(y, m, 1), last = new Date(y, m + 1, 0);
    const days = [];
    for (let i = 0; i < first.getDay(); i++) days.push(null);
    for (let i = 1; i <= last.getDate(); i++) days.push(new Date(y, m, i));
    return days;
  };

  const getFollowUpsForDate = (d) => d ? followUps.filter(f => f.date === d.toISOString().split('T')[0]) : [];

  const stats = useMemo(() => ({
    total: candidates.length,
    newCount: candidates.filter(c => c.status === 'new').length,
    contacted: candidates.filter(c => c.status === 'contacted').length,
    emails: sentEmails.length,
    followUpsCount: followUps.filter(f => !f.completed).length
  }), [candidates, sentEmails, followUps]);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-500">Connecting to database...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 font-sans text-slate-800">
      {notification && (
        <div className="fixed bottom-5 right-5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-3 rounded-xl flex items-center gap-2 z-50 shadow-lg">
          <Icon name="check" size={16} color="white" />{notification}
        </div>
      )}

      {/* Header */}
      <header className="bg-white/95 border-b border-slate-200 px-7 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Icon name="users" size={20} color="white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-indigo-500">TalentRadar</h1>
            <div className="flex items-center gap-1 text-xs" style={{ color: isConnected ? '#10b981' : '#ef4444' }}>
              <Icon name={isConnected ? 'cloud' : 'cloudOff'} size={10} />
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          {[{ l: 'Candidates', v: stats.total, c: '#6366f1' }, { l: 'Contacted', v: stats.contacted, c: '#10b981' }, { l: 'Follow-ups', v: stats.followUpsCount, c: '#f59e0b' }].map((s, i) => (
            <div key={i} className="text-center px-3" style={{ borderRight: i < 2 ? '1px solid #e2e8f0' : 'none' }}>
              <div className="text-base font-bold" style={{ color: s.c }}>{s.v}</div>
              <div className="text-xs text-slate-500">{s.l}</div>
            </div>
          ))}
          <button onClick={loadAllData} className="p-2 bg-white border border-slate-200 rounded-lg hover:border-indigo-400"><Icon name="refresh" size={14} color="#64748b" /></button>
          <button onClick={exportData} className="p-2 bg-white border border-slate-200 rounded-lg hover:border-indigo-400"><Icon name="download" size={14} color="#64748b" /></button>
          <button onClick={() => setShowSettingsModal(true)} className="p-2 bg-white border border-slate-200 rounded-lg hover:border-indigo-400"><Icon name="settings" size={14} color="#64748b" /></button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex gap-2 px-7 py-4 bg-white/50">
        {[{ id: 'dashboard', l: 'Dashboard', i: 'database' }, { id: 'candidates', l: 'Candidates', i: 'users' }, { id: 'emails', l: 'Emails', i: 'mailOpen' }, { id: 'calendar', l: 'Calendar', i: 'calendar' }, { id: 'templates', l: 'Templates', i: 'file' }, { id: 'activity', l: 'Activity', i: 'activity' }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} 
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all ${activeTab === t.id ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:border-indigo-400'}`}>
            <Icon name={t.i} size={14} color={activeTab === t.id ? 'white' : '#64748b'} />{t.l}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="p-7">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            <div className="grid grid-cols-4 gap-4">
              {[{ l: 'Total', v: stats.total, i: 'users', c: '#6366f1' }, { l: 'New', v: stats.newCount, i: 'userPlus', c: '#10b981' }, { l: 'Emails', v: stats.emails, i: 'mail', c: '#8b5cf6' }, { l: 'Follow-ups', v: stats.followUpsCount, i: 'bell', c: '#f59e0b' }].map((s, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${s.c}15` }}>
                    <Icon name={s.i} size={20} color={s.c} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{s.v}</div>
                    <div className="text-xs text-slate-500">{s.l}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button onClick={() => setShowAddCandidateModal(true)} className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg flex items-center justify-center gap-2 font-medium">
                    <Icon name="userPlus" size={16} color="white" />Add Candidate
                  </button>
                  <button onClick={() => { setEditingTemplate(null); setShowTemplateModal(true); }} className="w-full py-2 bg-white border border-slate-200 rounded-lg flex items-center justify-center gap-2 font-medium text-slate-600 hover:border-indigo-400">
                    <Icon name="plus" size={16} color="#64748b" />Create Template
                  </button>
                  <button onClick={() => setShowTestEmailModal(true)} className="w-full py-2 bg-white border border-slate-200 rounded-lg flex items-center justify-center gap-2 font-medium text-slate-600 hover:border-indigo-400">
                    <Icon name="mail" size={16} color="#64748b" />Add Test Email
                  </button>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-2 max-h-44 overflow-y-auto">
                  {activities.slice(0, 5).map(a => (
                    <div key={a.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                      <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: a.type === 'email' ? '#10b98120' : '#6366f120' }}>
                        <Icon name={a.type === 'email' ? 'mail' : 'users'} size={10} color={a.type === 'email' ? '#10b981' : '#6366f1'} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs">{a.description}</div>
                        <div className="text-xs text-slate-400">{new Date(a.timestamp).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                  {activities.length === 0 && <p className="text-slate-400 text-sm text-center py-4">No activity yet</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Candidates */}
        {activeTab === 'candidates' && (
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="flex gap-4 items-end flex-wrap">
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Industry</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={searchParams.industry} onChange={e => setSearchParams(p => ({ ...p, industry: e.target.value }))}>
                    <option value="">All</option>{industries.map(i => <option key={i}>{i}</option>)}
                  </select>
                </div>
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Level</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={searchParams.jobLevel} onChange={e => setSearchParams(p => ({ ...p, jobLevel: e.target.value }))}>
                    <option value="">All</option>{jobLevels.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={searchParams.status} onChange={e => setSearchParams(p => ({ ...p, status: e.target.value }))}>
                    <option value="">All</option>{statuses.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <button onClick={() => setShowAddCandidateModal(true)} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg flex items-center gap-2 font-medium">
                  <Icon name="userPlus" size={14} color="white" />Add
                </button>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200">
                <h3 className="font-semibold">{filteredCandidates.length} Candidates</h3>
              </div>
              {filteredCandidates.length === 0 ? (
                <div className="p-12 text-center">
                  <Icon name="users" size={40} color="#cbd5e1" />
                  <p className="text-slate-500 mt-2">No candidates</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">NAME</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">PREVIOUS</th>
                        <th className="px-2 py-3 w-6"></th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">NEW</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">STATUS</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCandidates.map((c, i) => (
                        <tr key={c.id} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-sm">{c.name}</div>
                            <div className="text-xs text-slate-500">{c.location}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="bg-red-50 border border-red-200 rounded-lg px-2 py-1">
                              <div className="font-semibold text-red-800 text-xs">{c.previous_title}</div>
                              <div className="text-xs text-red-700">{c.previous_company}</div>
                            </div>
                          </td>
                          <td className="px-2 py-3 text-center"><Icon name="arrowRight" size={14} color="#6366f1" /></td>
                          <td className="px-4 py-3">
                            <div className="bg-green-50 border border-green-200 rounded-lg px-2 py-1">
                              <div className="font-semibold text-green-800 text-xs">{c.new_title}</div>
                              <div className="text-xs text-green-700">{c.new_company}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{
                              background: c.status === 'new' ? '#6366f115' : c.status === 'contacted' ? '#f59e0b15' : '#10b98115',
                              color: c.status === 'new' ? '#6366f1' : c.status === 'contacted' ? '#d97706' : '#059669'
                            }}>{c.status}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <button onClick={() => { setSelectedCandidate(c); setShowCandidateModal(true); }} className="p-1.5 bg-slate-100 border border-slate-200 rounded hover:border-indigo-400">
                                <Icon name="eye" size={12} color="#64748b" />
                              </button>
                              {c.email && (
                                <button onClick={() => { setSelectedCandidate(c); setShowEmailModal(true); }} className="p-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded">
                                  <Icon name="send" size={12} color="white" />
                                </button>
                              )}
                              <button onClick={() => handleDeleteCandidate(c.id)} className="p-1.5 bg-red-50 border border-red-200 rounded hover:border-red-400">
                                <Icon name="trash" size={12} color="#dc2626" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Emails */}
        {activeTab === 'emails' && (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h3 className="font-semibold">Sent Emails ({sentEmails.length})</h3>
            </div>
            {sentEmails.length === 0 ? (
              <div className="p-12 text-center">
                <Icon name="mail" size={40} color="#cbd5e1" />
                <p className="text-slate-500 mt-2">No emails sent</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">TO</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">TEMPLATE</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">DATE</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {sentEmails.map((e, i) => (
                    <tr key={e.id} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-sm">{e.candidate_name}</div>
                        <div className="text-xs text-slate-500">{e.candidate_email}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{e.template_name}</td>
                      <td className="px-4 py-3 text-sm text-slate-500">{new Date(e.sent_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{
                          background: e.status === 'opened' ? '#10b98115' : '#6366f115',
                          color: e.status === 'opened' ? '#059669' : '#6366f1'
                        }}>{e.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Calendar */}
        {activeTab === 'calendar' && (
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                <div className="flex gap-2">
                  <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-1.5 bg-white border border-slate-200 rounded-lg hover:border-indigo-400">
                    <Icon name="chevronLeft" size={14} color="#64748b" />
                  </button>
                  <button onClick={() => setCurrentMonth(new Date())} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm hover:border-indigo-400">Today</button>
                  <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-1.5 bg-white border border-slate-200 rounded-lg hover:border-indigo-400">
                    <Icon name="chevronRight" size={14} color="#64748b" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <div key={i} className="text-center text-xs font-semibold text-slate-500 py-2">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentMonth).map((d, i) => {
                  const fups = d ? getFollowUpsForDate(d) : [];
                  const isToday = d && d.toDateString() === new Date().toDateString();
                  return (
                    <div key={i} onClick={() => { if (d) { setNewFollowUp(p => ({ ...p, date: d.toISOString().split('T')[0] })); setShowFollowUpModal(true); } }}
                      className={`min-h-[60px] p-1 rounded-lg cursor-pointer ${isToday ? 'bg-indigo-50 border-2 border-indigo-500' : d ? 'bg-white border border-slate-200 hover:border-indigo-400' : 'bg-slate-50'}`}>
                      {d && (
                        <>
                          <div className={`text-xs ${isToday ? 'font-bold text-indigo-600' : ''}`}>{d.getDate()}</div>
                          {fups.slice(0, 2).map(f => (
                            <div key={f.id} className="text-xs px-1 rounded mt-0.5 truncate" style={{ background: f.completed ? '#10b98120' : '#f59e0b20', color: f.completed ? '#059669' : '#d97706' }}>
                              {f.candidate_name}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Follow-ups</h3>
                <button onClick={() => setShowFollowUpModal(true)} className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-xs font-medium flex items-center gap-1">
                  <Icon name="plus" size={12} color="white" />Add
                </button>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {followUps.filter(f => !f.completed).map(f => (
                  <div key={f.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-semibold text-sm">{f.candidate_name}</div>
                        <div className="text-xs text-indigo-600">{new Date(f.date).toLocaleDateString()}</div>
                        {f.note && <div className="text-xs text-slate-500 mt-1">{f.note}</div>}
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => toggleFollowUp(f)} className="p-1 bg-green-100 rounded hover:bg-green-200">
                          <Icon name="check" size={10} color="#059669" />
                        </button>
                        <button onClick={() => deleteFollowUp(f.id)} className="p-1 bg-red-100 rounded hover:bg-red-200">
                          <Icon name="x" size={10} color="#dc2626" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {followUps.filter(f => !f.completed).length === 0 && <p className="text-slate-400 text-sm text-center py-4">No pending follow-ups</p>}
              </div>
            </div>
          </div>
        )}

        {/* Templates */}
        {activeTab === 'templates' && (
          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">Email Templates</h2>
              <button onClick={() => { setEditingTemplate(null); setShowTemplateModal(true); }} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg flex items-center gap-2 font-medium">
                <Icon name="plus" size={16} color="white" />Create
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {emailTemplates.map(t => (
                <div key={t.id} className="bg-white border border-slate-200 rounded-xl p-4">
                  <div className="flex justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{t.name}</h3>
                      <p className="text-xs text-slate-500">{t.subject}</p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => { setEditingTemplate(t); setShowTemplateModal(true); }} className="p-1.5 bg-slate-100 border border-slate-200 rounded hover:border-indigo-400">
                        <Icon name="edit" size={12} color="#64748b" />
                      </button>
                      <button onClick={() => handleDeleteTemplate(t.id)} className="p-1.5 bg-slate-100 border border-slate-200 rounded hover:border-red-400">
                        <Icon name="trash" size={12} color="#64748b" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 whitespace-pre-wrap max-h-24 overflow-hidden">{t.body}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity */}
        {activeTab === 'activity' && (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h3 className="font-semibold">Activity Log</h3>
            </div>
            {activities.length === 0 ? (
              <div className="p-12 text-center">
                <Icon name="activity" size={40} color="#cbd5e1" />
                <p className="text-slate-500 mt-2">No activity</p>
              </div>
            ) : (
              <div className="max-h-[500px] overflow-y-auto">
                {activities.map((a, i) => (
                  <div key={a.id} className={`px-5 py-3 flex items-center gap-3 ${i < activities.length - 1 ? 'border-b border-slate-100' : ''}`}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: a.type === 'email' ? '#10b98120' : '#6366f120' }}>
                      <Icon name={a.type === 'email' ? 'mail' : 'users'} size={12} color={a.type === 'email' ? '#10b981' : '#6366f1'} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{a.description}</p>
                      <p className="text-xs text-slate-400">{new Date(a.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {showAddCandidateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowAddCandidateModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full mx-4 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-5">
              <h2 className="text-lg font-bold">Add Candidate</h2>
              <button onClick={() => setShowAddCandidateModal(false)} className="p-1 hover:bg-slate-100 rounded"><Icon name="x" size={18} color="#64748b" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Name *</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={newCandidate.name} onChange={e => setNewCandidate(p => ({ ...p, name: e.target.value }))} /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Email</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" type="email" value={newCandidate.email} onChange={e => setNewCandidate(p => ({ ...p, email: e.target.value }))} /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Previous Company *</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={newCandidate.previous_company} onChange={e => setNewCandidate(p => ({ ...p, previous_company: e.target.value }))} /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Previous Title *</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={newCandidate.previous_title} onChange={e => setNewCandidate(p => ({ ...p, previous_title: e.target.value }))} /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">New Company *</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={newCandidate.new_company} onChange={e => setNewCandidate(p => ({ ...p, new_company: e.target.value }))} /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">New Title *</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={newCandidate.new_title} onChange={e => setNewCandidate(p => ({ ...p, new_title: e.target.value }))} /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Level</label><select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={newCandidate.new_role} onChange={e => setNewCandidate(p => ({ ...p, new_role: e.target.value }))}>{jobLevels.map(l => <option key={l}>{l}</option>)}</select></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Industry</label><select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={newCandidate.industry} onChange={e => setNewCandidate(p => ({ ...p, industry: e.target.value }))}>{industries.map(i => <option key={i}>{i}</option>)}</select></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Location</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={newCandidate.location} onChange={e => setNewCandidate(p => ({ ...p, location: e.target.value }))} /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Job Change Date</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" type="date" value={newCandidate.job_change_date} onChange={e => setNewCandidate(p => ({ ...p, job_change_date: e.target.value }))} /></div>
            </div>
            <div className="flex gap-3 justify-end mt-5">
              <button onClick={() => setShowAddCandidateModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
              <button onClick={handleAddCandidate} disabled={!newCandidate.name || !newCandidate.previous_company || !newCandidate.new_company || isSaving} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium disabled:opacity-50">{isSaving ? 'Saving...' : 'Add Candidate'}</button>
            </div>
          </div>
        </div>
      )}

      {showCandidateModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => { setShowCandidateModal(false); setSelectedCandidate(null); }}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold">{selectedCandidate.name}</h2>
                <p className="text-slate-500">{selectedCandidate.location}</p>
              </div>
              <button onClick={() => { setShowCandidateModal(false); setSelectedCandidate(null); }} className="p-1 hover:bg-slate-100 rounded"><Icon name="x" size={18} color="#64748b" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="text-xs font-semibold text-red-800 mb-1">PREVIOUS</div>
                <div className="font-semibold text-red-800">{selectedCandidate.previous_title}</div>
                <div className="text-red-700">{selectedCandidate.previous_company}</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="text-xs font-semibold text-green-800 mb-1">NEW</div>
                <div className="font-semibold text-green-800">{selectedCandidate.new_title}</div>
                <div className="text-green-700">{selectedCandidate.new_company}</div>
              </div>
            </div>
            <div className="mb-4 space-y-1 text-sm">
              {selectedCandidate.email && <p><strong>Email:</strong> {selectedCandidate.email}</p>}
              {selectedCandidate.phone && <p><strong>Phone:</strong> {selectedCandidate.phone}</p>}
              {selectedCandidate.industry && <p><strong>Industry:</strong> {selectedCandidate.industry}</p>}
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => handleDeleteCandidate(selectedCandidate.id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium flex items-center gap-2">
                <Icon name="trash" size={14} color="#dc2626" />Delete
              </button>
              {selectedCandidate.email && (
                <button onClick={() => { setShowCandidateModal(false); setShowEmailModal(true); }} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium flex items-center gap-2">
                  <Icon name="send" size={14} color="white" />Send Email
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showEmailModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => { setShowEmailModal(false); setSelectedCandidate(null); setSelectedTemplate(null); }}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-5">
              <h2 className="text-lg font-bold">Send Email to {selectedCandidate.name}</h2>
              <button onClick={() => { setShowEmailModal(false); setSelectedCandidate(null); setSelectedTemplate(null); }} className="p-1 hover:bg-slate-100 rounded"><Icon name="x" size={18} color="#64748b" /></button>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-500 mb-2">Select Template</label>
              <div className="space-y-2">
                {emailTemplates.map(t => (
                  <div key={t.id} onClick={() => setSelectedTemplate(t)} className={`p-3 rounded-lg cursor-pointer ${selectedTemplate?.id === t.id ? 'bg-indigo-50 border-2 border-indigo-500' : 'bg-slate-50 border border-slate-200 hover:border-indigo-400'}`}>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.subject}</div>
                  </div>
                ))}
              </div>
            </div>
            {selectedTemplate && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 mb-2">Preview</label>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs max-h-40 overflow-y-auto whitespace-pre-wrap">
                  <strong>Subject:</strong> {selectedTemplate.subject.replace(/\{\{candidateName\}\}/g, selectedCandidate.name).replace(/\{\{company\}\}/g, settings.company_name || 'Company')}<br /><br />
                  {selectedTemplate.body.replace(/\{\{candidateName\}\}/g, selectedCandidate.name).replace(/\{\{company\}\}/g, settings.company_name || 'Company').replace(/\{\{senderName\}\}/g, settings.sender_name || 'Your Name').replace(/\{\{newCompany\}\}/g, selectedCandidate.new_company).replace(/\{\{newTitle\}\}/g, selectedCandidate.new_title)}
                </div>
              </div>
            )}
            <div className="flex gap-3 justify-end">
              <button onClick={() => { setShowEmailModal(false); setSelectedCandidate(null); setSelectedTemplate(null); }} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
              <button onClick={() => handleSendEmail(selectedCandidate, selectedTemplate)} disabled={!selectedTemplate || isSaving} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium disabled:opacity-50">{isSaving ? 'Sending...' : 'Send Email'}</button>
            </div>
          </div>
        </div>
      )}

      {showTemplateModal && (
        <TemplateModal template={editingTemplate} onSave={handleSaveTemplate} onClose={() => { setShowTemplateModal(false); setEditingTemplate(null); }} isSaving={isSaving} />
      )}

      {showFollowUpModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowFollowUpModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-5">
              <h2 className="text-lg font-bold">Schedule Follow-up</h2>
              <button onClick={() => setShowFollowUpModal(false)} className="p-1 hover:bg-slate-100 rounded"><Icon name="x" size={18} color="#64748b" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Candidate *</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={newFollowUp.candidate_name} onChange={e => setNewFollowUp(p => ({ ...p, candidate_name: e.target.value }))} /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Date *</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" type="date" value={newFollowUp.date} onChange={e => setNewFollowUp(p => ({ ...p, date: e.target.value }))} /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Note</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none" rows={3} value={newFollowUp.note} onChange={e => setNewFollowUp(p => ({ ...p, note: e.target.value }))} /></div>
            </div>
            <div className="flex gap-3 justify-end mt-5">
              <button onClick={() => setShowFollowUpModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
              <button onClick={handleAddFollowUp} disabled={!newFollowUp.date || !newFollowUp.candidate_name || isSaving} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium disabled:opacity-50">{isSaving ? 'Saving...' : 'Schedule'}</button>
            </div>
          </div>
        </div>
      )}

      {showTestEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowTestEmailModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-5">
              <h2 className="text-lg font-bold">Add Test Email</h2>
              <button onClick={() => setShowTestEmailModal(false)} className="p-1 hover:bg-slate-100 rounded"><Icon name="x" size={18} color="#64748b" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Name *</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={newTestEmail.name} onChange={e => setNewTestEmail(p => ({ ...p, name: e.target.value }))} /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Email *</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" type="email" value={newTestEmail.email} onChange={e => setNewTestEmail(p => ({ ...p, email: e.target.value }))} /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Company</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={newTestEmail.company} onChange={e => setNewTestEmail(p => ({ ...p, company: e.target.value }))} /></div>
            </div>
            <div className="flex gap-3 justify-end mt-5">
              <button onClick={() => setShowTestEmailModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
              <button onClick={handleAddTestEmail} disabled={!newTestEmail.name || !newTestEmail.email || isSaving} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium disabled:opacity-50">{isSaving ? 'Saving...' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}

      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowSettingsModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-5">
              <h2 className="text-lg font-bold">Settings</h2>
              <button onClick={() => setShowSettingsModal(false)} className="p-1 hover:bg-slate-100 rounded"><Icon name="x" size={18} color="#64748b" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Your Name</label>
                <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={settings.sender_name || ''} onChange={e => setSettings(p => ({ ...p, sender_name: e.target.value }))} />
                <p className="text-xs text-slate-400 mt-1">Used as {'{{senderName}}'} in templates</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Company Name</label>
                <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={settings.company_name || ''} onChange={e => setSettings(p => ({ ...p, company_name: e.target.value }))} />
                <p className="text-xs text-slate-400 mt-1">Used as {'{{company}}'} in templates</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-5">
              <button onClick={() => setShowSettingsModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
              <button onClick={saveSettings} disabled={isSaving} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium disabled:opacity-50">{isSaving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TemplateModal({ template, onSave, onClose, isSaving }) {
  const [name, setName] = useState(template?.name || '');
  const [subject, setSubject] = useState(template?.subject || '');
  const [body, setBody] = useState(template?.body || '');
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between mb-5">
          <h2 className="text-lg font-bold">{template ? 'Edit' : 'Create'} Template</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold text-slate-500 mb-1">Name *</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={name} onChange={e => setName(e.target.value)} /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-1">Subject *</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" value={subject} onChange={e => setSubject(e.target.value)} /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-1">Body *</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none" rows={6} value={body} onChange={e => setBody(e.target.value)} /></div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
            <div className="text-xs font-semibold text-indigo-600 mb-1">Variables</div>
            <p className="text-xs text-slate-500">{'{{candidateName}}, {{company}}, {{newCompany}}, {{newTitle}}, {{senderName}}'}</p>
          </div>
        </div>
        <div className="flex gap-3 justify-end mt-5">
          <button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cancel</button>
          <button onClick={() => onSave({ id: template?.id, name, subject, body })} disabled={!name || !subject || !body || isSaving} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium disabled:opacity-50">{isSaving ? 'Saving...' : template ? 'Update' : 'Create'}</button>
        </div>
      </div>
    </div>
  );
}
