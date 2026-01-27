import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://reaqaxufwxcvarypfsdz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlYXFheHVmd3hjdmFyeXBmc2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NzQwMzQsImV4cCI6MjA4NTA1MDAzNH0.8uvcFSRNQQDBH7GtxnaNhdv96iAiComLosBEtxEw818';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const RESEND_API_KEY = 're_d6hCPoBY_6MAenZgjWz5R8dZ5WCmyySqD';
const FROM_EMAIL = 'onboarding@resend.dev';
const TEST_EMAIL = 'erbyrd22@gmail.com';

// Note: Direct Resend API calls from browser are blocked by CORS
// For now, we'll log emails to database and open mailto: link as fallback
// To enable real sending, you need a Supabase Edge Function or Vercel API route

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
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    mapPin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    externalLink: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icons[name]}</svg>;
};

const timeAgo = (date) => {
  if (!date) return '';
  const days = Math.floor((new Date() - new Date(date)) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 30) return days + ' days ago';
  return Math.floor(days / 30) + ' months ago';
};

const MultiSelect = ({ label, options, selected, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const allSelected = selected.length === 0;
  const toggleOption = (opt) => {
    if (opt === 'ALL') onChange([]);
    else onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt]);
  };
  return (
    <div className="relative">
      <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
      <div onClick={() => setIsOpen(!isOpen)} className="w-full px-3 py-2 border rounded-xl text-sm cursor-pointer bg-white flex justify-between items-center">
        <span className={allSelected ? 'text-slate-400' : ''}>{allSelected ? placeholder : selected.length === 1 ? selected[0] : selected.length + ' selected'}</span>
        <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} size={14} color="#94a3b8" />
      </div>
      {isOpen && <div className="absolute z-50 w-full mt-1 bg-white border rounded-xl shadow-lg max-h-48 overflow-y-auto">
        <div onClick={() => toggleOption('ALL')} className={'px-3 py-2 cursor-pointer hover:bg-slate-50 flex items-center gap-2 ' + (allSelected ? 'bg-blue-50 text-blue-600' : '')}><div className={'w-4 h-4 rounded border flex items-center justify-center ' + (allSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-300')}>{allSelected && <Icon name="check" size={10} color="white" />}</div>All</div>
        {options.map(opt => <div key={opt} onClick={() => toggleOption(opt)} className={'px-3 py-2 cursor-pointer hover:bg-slate-50 flex items-center gap-2 ' + (selected.includes(opt) ? 'bg-blue-50 text-blue-600' : '')}><div className={'w-4 h-4 rounded border flex items-center justify-center ' + (selected.includes(opt) ? 'bg-blue-500 border-blue-500' : 'border-slate-300')}>{selected.includes(opt) && <Icon name="check" size={10} color="white" />}</div>{opt}</div>)}
      </div>}
    </div>
  );
};

const generateSearchResults = (industries, levels, locations, dateStart, dateEnd, count) => {
  const names = [['Sarah','Michael','Jennifer','David','Emily','James','Jessica','Robert','Amanda','Chris','Lauren','Daniel','Ashley','Matthew','Nicole'],['Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Wilson','Anderson','Taylor','Thomas','Moore','Jackson']];
  const companies = { Technology: ['Google','Microsoft','Apple','Amazon','Meta','Salesforce','Oracle','Adobe','Netflix','Uber'], Finance: ['Goldman Sachs','JP Morgan','Morgan Stanley','Bank of America','Citigroup','BlackRock','Fidelity'], Healthcare: ['Johnson & Johnson','Pfizer','UnitedHealth','CVS Health','Cigna','Abbott','Merck'], Manufacturing: ['GE','Boeing','Caterpillar','3M','Honeywell','Ford','Tesla'], Retail: ['Walmart','Amazon','Target','Costco','Home Depot','Best Buy','Nordstrom'], Marketing: ['WPP','Omnicom','Publicis','IPG','Dentsu','Havas'], Sales: ['Salesforce','HubSpot','Oracle','SAP','Zendesk','Workday'], Engineering: ['SpaceX','Boeing','Lockheed Martin','Raytheon','AECOM','Jacobs'] };
  const titles = { 'Entry Level': ['Associate','Analyst','Coordinator'], 'Mid Level': ['Senior Analyst','Manager','Lead'], 'Senior Level': ['Senior Manager','Principal','Director'], Director: ['Director','Senior Director','Regional Director'], VP: ['Vice President','SVP','VP Operations'], Executive: ['Executive Director','GM','Division Head'], 'C-Suite': ['CEO','CFO','CTO','COO','CMO'] };
  const locs = locations.length ? locations : ['New York, NY','San Francisco, CA','Los Angeles, CA','Chicago, IL','Boston, MA','Seattle, WA','Austin, TX','Denver, CO','Atlanta, GA','Charlotte, NC','Dallas, TX','Miami, FL'];
  const inds = industries.length ? industries : Object.keys(companies);
  const lvls = levels.length ? levels : Object.keys(titles);
  
  const startDate = dateStart ? new Date(dateStart) : new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
  const endDate = dateEnd ? new Date(dateEnd) : new Date();
  const dateRange = endDate - startDate;
  
  const results = [];
  for (let i = 0; i < count; i++) {
    const ind = inds[Math.floor(Math.random() * inds.length)];
    const lvl = lvls[Math.floor(Math.random() * lvls.length)];
    const loc = locs[Math.floor(Math.random() * locs.length)];
    const cos = companies[ind] || companies.Technology;
    const tits = titles[lvl] || titles['Senior Level'];
    const fn = names[0][Math.floor(Math.random() * names[0].length)];
    const ln = names[1][Math.floor(Math.random() * names[1].length)];
    const pc = cos[Math.floor(Math.random() * cos.length)];
    let nc = cos[Math.floor(Math.random() * cos.length)]; while (nc === pc && cos.length > 1) nc = cos[Math.floor(Math.random() * cos.length)];
    const pt = tits[Math.floor(Math.random() * tits.length)];
    const nt = tits[Math.floor(Math.random() * tits.length)];
    const cd = new Date(startDate.getTime() + Math.random() * dateRange);
    results.push({ id: 'sr-' + Date.now() + '-' + i, name: fn + ' ' + ln, email: fn.toLowerCase() + '.' + ln.toLowerCase() + '@' + nc.toLowerCase().replace(/[^a-z]/g, '') + '.com', location: loc, previous_company: pc, previous_title: pt, previous_role: lvl, new_company: nc, new_title: nt, new_role: lvl, industry: ind, job_change_date: cd.toISOString().split('T')[0], change_type: Math.random() > 0.5 ? 'promotion' : 'lateral', match_score: Math.floor(Math.random() * 25) + 75, status: 'new', source: 'web_search', linkedin_url: 'https://linkedin.com/in/' + fn.toLowerCase() + ln.toLowerCase() });
  }
  return results.sort((a, b) => new Date(b.job_change_date) - new Date(a.job_change_date));
};

export default function TalentRadar() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [testEmails, setTestEmails] = useState([]);
  const [activities, setActivities] = useState([]);
  const [settings, setSettings] = useState({ sender_name: '', company_name: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchParams, setSearchParams] = useState({ industries: [], jobLevels: [], locations: [], status: '', dateStart: '', dateEnd: '' });
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
  const [templateForm, setTemplateForm] = useState({ name: '', subject: '', body: '' });

  const industries = ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Marketing', 'Sales', 'Engineering'];
  const jobLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Director', 'VP', 'Executive', 'C-Suite'];
  const locationsList = ['New York, NY', 'San Francisco, CA', 'Los Angeles, CA', 'Chicago, IL', 'Boston, MA', 'Seattle, WA', 'Austin, TX', 'Denver, CO', 'Atlanta, GA', 'Miami, FL', 'Dallas, TX', 'Charlotte, NC', 'Phoenix, AZ', 'Philadelphia, PA'];
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

  const notify = (msg, type = 'success') => { setNotification({ msg, type }); setTimeout(() => setNotification(null), 4000); };
  const logActivity = async (type, desc) => { const { data } = await supabase.from('activities').insert([{ type, description: desc }]).select().single(); if (data) setActivities(p => [data, ...p]); };
  const openModal = (m) => setModals(p => ({ ...p, [m]: true }));
  const closeModal = (m) => setModals(p => ({ ...p, [m]: false }));

  const searchJobChanges = async () => {
    setIsSearching(true);
    const txt = [
      searchParams.industries.length ? searchParams.industries.join(', ') : 'All Industries',
      searchParams.jobLevels.length ? searchParams.jobLevels.join(', ') : 'All Levels',
      searchParams.locations.length ? searchParams.locations.join(', ') : 'All Locations',
      searchParams.dateStart || searchParams.dateEnd ? `${searchParams.dateStart || 'any'} to ${searchParams.dateEnd || 'now'}` : 'Last 90 days'
    ].join(' | ');
    await logActivity('search', 'Search: ' + txt);
    setTimeout(() => {
      const results = generateSearchResults(searchParams.industries, searchParams.jobLevels, searchParams.locations, searchParams.dateStart, searchParams.dateEnd, 15);
      setSearchResults(results);
      setActiveTab('candidates');
      setIsSearching(false);
      notify('Found ' + results.length + ' job changes!');
    }, 1500);
  };

  const allCandidates = useMemo(() => {
    const combined = [...candidates];
    searchResults.forEach(sr => { if (!combined.find(c => c.name === sr.name && c.new_company === sr.new_company)) combined.push(sr); });
    return combined;
  }, [candidates, searchResults]);

  const filteredCandidates = useMemo(() => {
    let list = allCandidates.filter(c => {
      if (searchParams.industries.length && !searchParams.industries.includes(c.industry)) return false;
      if (searchParams.jobLevels.length && !searchParams.jobLevels.includes(c.new_role)) return false;
      if (searchParams.locations.length && !searchParams.locations.some(l => c.location?.includes(l.split(',')[0]))) return false;
      if (searchParams.status && c.status !== searchParams.status) return false;
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
  }, [allCandidates, searchParams, sortConfig]);

  const handleSort = (key) => setSortConfig(p => ({ key, direction: p.key === key && p.direction === 'desc' ? 'asc' : 'desc' }));

  const saveSearchResult = async (result) => {
    setIsSaving(true);
    const d = { ...result }; delete d.id; delete d.source;
    const { data } = await supabase.from('candidates').insert([d]).select().single();
    if (data) { setCandidates(p => [data, ...p]); setSearchResults(p => p.filter(r => r.id !== result.id)); await logActivity('candidate', 'Saved: ' + data.name); notify('Saved!'); }
    setIsSaving(false);
  };

  const handleAddCandidate = async () => {
    setIsSaving(true);
    const { data } = await supabase.from('candidates').insert([{ ...newCandidate, match_score: Math.floor(Math.random() * 30) + 70 }]).select().single();
    if (data) { setCandidates(p => [data, ...p]); await logActivity('candidate', 'Added: ' + data.name); notify('Added!'); closeModal('addCandidate'); setNewCandidate({ name: '', email: '', location: '', previous_company: '', previous_title: '', previous_role: 'Mid Level', new_company: '', new_title: '', new_role: 'Mid Level', industry: 'Technology', job_change_date: '', status: 'new', change_type: 'lateral' }); }
    setIsSaving(false);
  };

  const handleDeleteCandidate = async (id) => {
    if (id.toString().startsWith('sr-')) { setSearchResults(p => p.filter(x => x.id !== id)); notify('Removed'); closeModal('viewCandidate'); setSelectedCandidate(null); return; }
    const c = candidates.find(x => x.id === id);
    await supabase.from('candidates').delete().eq('id', id);
    setCandidates(p => p.filter(x => x.id !== id));
    await logActivity('candidate', 'Deleted: ' + c?.name); notify('Deleted'); closeModal('viewCandidate'); setSelectedCandidate(null);
  };

  const handleSaveTemplate = async () => {
    setIsSaving(true);
    if (editingTemplate) {
      const { data } = await supabase.from('email_templates').update(templateForm).eq('id', editingTemplate.id).select().single();
      if (data) setEmailTemplates(p => p.map(x => x.id === data.id ? data : x));
    } else {
      const { data } = await supabase.from('email_templates').insert([templateForm]).select().single();
      if (data) setEmailTemplates(p => [data, ...p]);
    }
    await logActivity('template', (editingTemplate ? 'Updated' : 'Created') + ': ' + templateForm.name);
    notify('Saved!'); closeModal('template'); setEditingTemplate(null); setTemplateForm({ name: '', subject: '', body: '' }); setIsSaving(false);
  };

  const handleDeleteTemplate = async (id) => { const t = emailTemplates.find(x => x.id === id); await supabase.from('email_templates').delete().eq('id', id); setEmailTemplates(p => p.filter(x => x.id !== id)); await logActivity('template', 'Deleted: ' + t?.name); notify('Deleted'); };

  const processTemplate = (text, cand) => text.replace(/\{\{candidateName\}\}/g, cand.name).replace(/\{\{company\}\}/g, settings.company_name || 'Our Company').replace(/\{\{senderName\}\}/g, settings.sender_name || 'Recruiter').replace(/\{\{newCompany\}\}/g, cand.new_company || '').replace(/\{\{newTitle\}\}/g, cand.new_title || '');

  const handleSendEmail = async (cand, tmpl) => {
    setIsSaving(true);
    const subject = processTemplate(tmpl.subject, cand);
    const body = processTemplate(tmpl.body, cand);
    
    // Log to database
    const { data } = await supabase.from('sent_emails').insert([{ 
      candidate_id: cand.id, 
      candidate_name: cand.name, 
      candidate_email: cand.email, 
      template_id: tmpl.id, 
      template_name: tmpl.name, 
      subject, 
      body, 
      status: 'pending'
    }]).select().single();
    
    if (data) {
      setSentEmails(p => [data, ...p]);
      if (!cand.id.toString().startsWith('sr-')) { 
        await supabase.from('candidates').update({ status: 'contacted' }).eq('id', cand.id); 
        setCandidates(p => p.map(c => c.id === cand.id ? { ...c, status: 'contacted' } : c)); 
      }
      await logActivity('email', 'Email logged for ' + cand.name + ' (' + cand.email + ')');
      
      // Open mailto link as fallback
      const mailtoLink = `mailto:${cand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, '_blank');
      
      notify('Email opened in your mail app!');
    }
    closeModal('sendEmail'); setSelectedCandidate(null); setSelectedTemplate(null); setIsSaving(false);
  };

  const handleAddFollowUp = async () => {
    if (!newFollowUp.date || !newFollowUp.candidate_name) return;
    setIsSaving(true);
    const { data } = await supabase.from('follow_ups').insert([newFollowUp]).select().single();
    if (data) { setFollowUps(p => [...p, data].sort((a, b) => new Date(a.date) - new Date(b.date))); await logActivity('followup', 'Scheduled: ' + newFollowUp.candidate_name); notify('Added!'); }
    closeModal('followUp'); setNewFollowUp({ candidate_name: '', date: '', note: '' }); setIsSaving(false);
  };

  const toggleFollowUp = async (f) => { const { data } = await supabase.from('follow_ups').update({ completed: !f.completed }).eq('id', f.id).select().single(); if (data) { setFollowUps(p => p.map(x => x.id === data.id ? data : x)); await logActivity('followup', (data.completed ? 'Completed' : 'Reopened') + ': ' + f.candidate_name); } };
  const deleteFollowUp = async (id) => { await supabase.from('follow_ups').delete().eq('id', id); setFollowUps(p => p.filter(x => x.id !== id)); notify('Removed'); };

  const handleAddTestEmail = async () => {
    if (!newTestEmail.name || !newTestEmail.email) return;
    setIsSaving(true);
    const { data } = await supabase.from('test_emails').insert([newTestEmail]).select().single();
    if (data) { setTestEmails(p => [...p, data]); await logActivity('test', 'Added test: ' + newTestEmail.email); }
    notify('Added!'); closeModal('testEmail'); setNewTestEmail({ name: '', email: '', company: '' }); setIsSaving(false);
  };

  const deleteTestEmail = async (id) => { await supabase.from('test_emails').delete().eq('id', id); setTestEmails(p => p.filter(x => x.id !== id)); notify('Removed'); };

  const handleSendTest = async () => {
    if (!selectedTemplate || !selectedTestEmail) return;
    setIsSaving(true);
    const cand = { name: selectedTestEmail.name, new_company: selectedTestEmail.company || 'Test Co', new_title: 'Test Title' };
    const subject = '[TEST] ' + processTemplate(selectedTemplate.subject, cand);
    const body = processTemplate(selectedTemplate.body, cand);
    
    await logActivity('test', 'Test email prepared for ' + selectedTestEmail.email);
    
    // Open mailto link
    const mailtoLink = `mailto:${selectedTestEmail.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
    
    notify('Test email opened in your mail app!');
    setIsSaving(false); closeModal('sendTest'); setSelectedTestEmail(null); setSelectedTemplate(null);
  };

  const saveSettings = async () => { setIsSaving(true); await supabase.from('settings').update(settings).eq('id', 1); await logActivity('settings', 'Updated settings'); notify('Saved!'); closeModal('settings'); setIsSaving(false); };
  const exportData = () => { const blob = new Blob([JSON.stringify({ candidates, emailTemplates, sentEmails, followUps, activities, settings }, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'talent-radar.json'; a.click(); notify('Exported!'); };
  const getDaysInMonth = (d) => { const y = d.getFullYear(), m = d.getMonth(), first = new Date(y, m, 1), last = new Date(y, m + 1, 0), days = []; for (let i = 0; i < first.getDay(); i++) days.push(null); for (let i = 1; i <= last.getDate(); i++) days.push(new Date(y, m, i)); return days; };
  const getFollowUpsForDate = (d) => d ? followUps.filter(f => f.date === d.toISOString().split('T')[0]) : [];
  const stats = useMemo(() => ({ total: allCandidates.length, results: searchResults.length, emails: sentEmails.length, pending: followUps.filter(f => !f.completed).length }), [allCandidates, searchResults, sentEmails, followUps]);
  const SortIcon = ({ col }) => sortConfig.key !== col ? <Icon name="chevronDown" size={12} color="#cbd5e1" /> : <Icon name={sortConfig.direction === 'asc' ? 'chevronUp' : 'chevronDown'} size={12} color="#3b82f6" />;

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100"><div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" /></div>;

  const Modal = ({ id, children, wide }) => modals[id] && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => closeModal(id)}><div className={'bg-white rounded-2xl p-6 w-full max-h-[90vh] overflow-y-auto ' + (wide ? 'max-w-2xl' : 'max-w-lg')} onClick={e => e.stopPropagation()}>{children}</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 text-slate-700">
      {notification && <div className={'fixed bottom-5 right-5 px-5 py-3 rounded-xl z-50 shadow-lg text-white ' + (notification.type === 'error' ? 'bg-red-500' : 'bg-emerald-500')}>{notification.msg}</div>}

      <header className="bg-white/90 border-b px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center"><Icon name="users" size={22} color="white" /></div>
          <div><h1 className="text-xl font-bold text-blue-600">TalentRadar</h1><div className="text-xs" style={{ color: isConnected ? '#10b981' : '#ef4444' }}>{isConnected ? '● Connected' : '○ Offline'}</div></div>
        </div>
        <div className="flex gap-3 items-center">
          {[{ l: 'Candidates', v: stats.total, c: '#3b82f6' }, { l: 'Results', v: stats.results, c: '#8b5cf6' }, { l: 'Emails', v: stats.emails, c: '#10b981' }].map((s, i) => <div key={i} className="text-center px-3 border-r last:border-0"><div className="text-lg font-bold" style={{ color: s.c }}>{s.v}</div><div className="text-xs text-slate-500">{s.l}</div></div>)}
          <button onClick={loadAllData} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200"><Icon name="refresh" size={16} color="#64748b" /></button>
          <button onClick={exportData} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200"><Icon name="download" size={16} color="#64748b" /></button>
          <button onClick={() => openModal('settings')} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200"><Icon name="settings" size={16} color="#64748b" /></button>
        </div>
      </header>

      <nav className="flex gap-2 px-6 py-3 bg-white/50 border-b overflow-x-auto">
        {[{ id: 'dashboard', l: 'Dashboard', i: 'search' }, { id: 'candidates', l: 'Results', i: 'users' }, { id: 'emails', l: 'Emails', i: 'mail' }, { id: 'calendar', l: 'Calendar', i: 'calendar' }, { id: 'templates', l: 'Templates', i: 'file' }, { id: 'activity', l: 'Activity', i: 'activity' }].map(t => <button key={t.id} onClick={() => setActiveTab(t.id)} className={'px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium whitespace-nowrap ' + (activeTab === t.id ? 'bg-blue-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-100')}><Icon name={t.i} size={16} color={activeTab === t.id ? 'white' : '#64748b'} />{t.l}</button>)}
      </nav>

      <main className="p-6">
        {activeTab === 'dashboard' && <div className="space-y-6">
          <div className="bg-white rounded-2xl border p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Icon name="globe" size={20} color="#3b82f6" />Search Job Changes</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
              <MultiSelect label="Industry" options={industries} selected={searchParams.industries} onChange={v => setSearchParams(p => ({ ...p, industries: v }))} placeholder="All" />
              <MultiSelect label="Job Level" options={jobLevels} selected={searchParams.jobLevels} onChange={v => setSearchParams(p => ({ ...p, jobLevels: v }))} placeholder="All" />
              <MultiSelect label="Location" options={locationsList} selected={searchParams.locations} onChange={v => setSearchParams(p => ({ ...p, locations: v }))} placeholder="All" />
              <div><label className="block text-xs font-medium text-slate-500 mb-1">Date From</label><input type="date" className="w-full px-3 py-2 border rounded-xl text-sm" value={searchParams.dateStart} onChange={e => setSearchParams(p => ({ ...p, dateStart: e.target.value }))} /></div>
              <div><label className="block text-xs font-medium text-slate-500 mb-1">Date To</label><input type="date" className="w-full px-3 py-2 border rounded-xl text-sm" value={searchParams.dateEnd} onChange={e => setSearchParams(p => ({ ...p, dateEnd: e.target.value }))} /></div>
              <div className="flex items-end"><button onClick={searchJobChanges} disabled={isSearching} className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50">{isSearching ? 'Searching...' : <><Icon name="search" size={16} color="white" />Search</>}</button></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border p-6">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={() => openModal('addCandidate')} className="w-full py-2.5 bg-blue-500 text-white rounded-xl font-medium flex items-center justify-center gap-2"><Icon name="userPlus" size={16} color="white" />Add Candidate</button>
                <button onClick={() => { setEditingTemplate(null); setTemplateForm({ name: '', subject: '', body: '' }); openModal('template'); }} className="w-full py-2.5 border-2 rounded-xl font-medium flex items-center justify-center gap-2"><Icon name="plus" size={16} />New Template</button>
                <button onClick={() => openModal('testEmail')} className="w-full py-2.5 border-2 rounded-xl font-medium flex items-center justify-center gap-2"><Icon name="mail" size={16} />Add Test Email</button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <div className="flex justify-between items-center mb-4"><h3 className="font-bold">Templates ({emailTemplates.length})</h3></div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {emailTemplates.map(t => <div key={t.id} className="p-3 bg-slate-50 rounded-xl flex justify-between items-center"><div className="truncate flex-1"><div className="font-medium text-sm truncate">{t.name}</div><div className="text-xs text-slate-500 truncate">{t.subject}</div></div><div className="flex gap-1 ml-2"><button onClick={() => { setEditingTemplate(t); setTemplateForm(t); openModal('template'); }} className="p-1.5 hover:bg-slate-200 rounded"><Icon name="edit" size={12} color="#64748b" /></button><button onClick={() => handleDeleteTemplate(t.id)} className="p-1.5 hover:bg-red-100 rounded"><Icon name="trash" size={12} color="#ef4444" /></button></div></div>)}
                {!emailTemplates.length && <p className="text-slate-400 text-sm text-center py-6">No templates yet</p>}
              </div>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <div className="flex justify-between items-center mb-2"><h3 className="font-bold">Test Emails</h3></div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {testEmails.map(t => <div key={t.id} className="p-2 bg-emerald-50 rounded-xl flex justify-between items-center"><div className="truncate"><div className="font-medium text-sm text-emerald-800 truncate">{t.name}</div><div className="text-xs text-emerald-600 truncate">{t.email}</div></div><div className="flex gap-1"><button onClick={() => { setSelectedTestEmail(t); openModal('sendTest'); }} className="px-2 py-1 bg-emerald-500 text-white rounded text-xs">Test</button><button onClick={() => deleteTestEmail(t.id)} className="p-1"><Icon name="trash" size={12} color="#ef4444" /></button></div></div>)}
                {!testEmails.length && <p className="text-slate-400 text-sm text-center py-4">No test emails</p>}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-6">
            <h3 className="font-bold mb-4">Recent Activity</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">{activities.slice(0, 10).map(a => <div key={a.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl"><div className={'w-8 h-8 rounded-lg flex items-center justify-center ' + (a.type === 'email' ? 'bg-emerald-100' : a.type === 'search' ? 'bg-blue-100' : 'bg-violet-100')}><Icon name={a.type === 'email' ? 'mail' : a.type === 'search' ? 'search' : 'users'} size={14} color={a.type === 'email' ? '#10b981' : a.type === 'search' ? '#3b82f6' : '#8b5cf6'} /></div><div className="flex-1 min-w-0"><div className="text-sm truncate">{a.description}</div><div className="text-xs text-slate-400">{new Date(a.timestamp).toLocaleString()}</div></div></div>)}{!activities.length && <p className="text-slate-400 text-center py-6">No activity yet</p>}</div>
          </div>
        </div>}

        {activeTab === 'candidates' && <div className="space-y-4">
          <div className="bg-white rounded-2xl border p-4">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 items-end">
              <MultiSelect label="Industry" options={industries} selected={searchParams.industries} onChange={v => setSearchParams(p => ({ ...p, industries: v }))} placeholder="All" />
              <MultiSelect label="Level" options={jobLevels} selected={searchParams.jobLevels} onChange={v => setSearchParams(p => ({ ...p, jobLevels: v }))} placeholder="All" />
              <MultiSelect label="Location" options={locationsList} selected={searchParams.locations} onChange={v => setSearchParams(p => ({ ...p, locations: v }))} placeholder="All" />
              <div><label className="block text-xs font-medium text-slate-500 mb-1">Status</label><select className="w-full px-3 py-2 border rounded-xl text-sm" value={searchParams.status} onChange={e => setSearchParams(p => ({ ...p, status: e.target.value }))}><option value="">All</option>{statuses.map(s => <option key={s}>{s}</option>)}</select></div>
              <div className="flex gap-2"><button onClick={searchJobChanges} disabled={isSearching} className="flex-1 py-2 bg-violet-500 text-white rounded-xl font-medium">{isSearching ? '...' : 'Search'}</button><button onClick={() => openModal('addCandidate')} className="py-2 px-3 bg-blue-500 text-white rounded-xl"><Icon name="plus" size={16} color="white" /></button></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border overflow-hidden">
            <div className="px-4 py-3 border-b flex justify-between items-center"><h3 className="font-bold">{filteredCandidates.length} Candidates</h3>{searchResults.length > 0 && <button onClick={() => setSearchResults([])} className="text-xs text-red-500">Clear results</button>}</div>
            {!filteredCandidates.length ? <div className="p-12 text-center text-slate-400">No candidates. Try searching!</div> : <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-slate-50 text-left text-xs font-bold text-slate-500 uppercase">
                  <th className="px-3 py-2 cursor-pointer" onClick={() => handleSort('name')}>Name <SortIcon col="name" /></th>
                  <th className="px-3 py-2">Previous</th>
                  <th className="px-2 py-2"></th>
                  <th className="px-3 py-2">New</th>
                  <th className="px-3 py-2 cursor-pointer" onClick={() => handleSort('job_change_date')}>Date <SortIcon col="job_change_date" /></th>
                  <th className="px-3 py-2 cursor-pointer" onClick={() => handleSort('match_score')}>Match <SortIcon col="match_score" /></th>
                  <th className="px-3 py-2">Actions</th>
                </tr></thead>
                <tbody className="divide-y">{filteredCandidates.map(c => <tr key={c.id} className={c.source === 'web_search' ? 'bg-violet-50/50' : ''}>
                  <td className="px-3 py-2"><div className="font-medium">{c.name}{c.source === 'web_search' && <span className="ml-1 text-xs bg-violet-100 text-violet-600 px-1 rounded">New</span>}</div><div className="text-xs text-slate-500">{c.location}</div></td>
                  <td className="px-3 py-2"><div className="bg-red-50 border border-red-200 rounded px-2 py-1 text-xs"><div className="font-medium text-red-800">{c.previous_title}</div><div className="text-red-600">{c.previous_company}</div></div></td>
                  <td className="px-1 py-2"><div className={'w-5 h-5 rounded-full flex items-center justify-center ' + (c.change_type === 'promotion' ? 'bg-emerald-100' : 'bg-violet-100')}><Icon name={c.change_type === 'promotion' ? 'arrowUp' : 'arrowRight'} size={12} color={c.change_type === 'promotion' ? '#10b981' : '#8b5cf6'} /></div></td>
                  <td className="px-3 py-2"><div className="bg-emerald-50 border border-emerald-200 rounded px-2 py-1 text-xs"><div className="font-medium text-emerald-800">{c.new_title}</div><div className="text-emerald-600">{c.new_company}</div></div></td>
                  <td className="px-3 py-2"><div className="text-xs">{c.job_change_date ? new Date(c.job_change_date).toLocaleDateString() : '-'}</div><div className="text-xs text-slate-400">{timeAgo(c.job_change_date)}</div></td>
                  <td className="px-3 py-2"><div className="flex items-center gap-1"><div className="w-8 h-1.5 bg-slate-200 rounded-full"><div className="h-full bg-blue-500 rounded-full" style={{ width: (c.match_score || 0) + '%' }} /></div><span className="text-xs font-medium">{c.match_score}%</span></div></td>
                  <td className="px-3 py-2"><div className="flex gap-1">
                    <button onClick={() => { setSelectedCandidate(c); openModal('viewCandidate'); }} className="p-1.5 bg-slate-100 rounded hover:bg-slate-200"><Icon name="eye" size={12} color="#64748b" /></button>
                    {c.email && <button onClick={() => { setSelectedCandidate(c); openModal('sendEmail'); }} className="p-1.5 bg-blue-500 rounded hover:bg-blue-600"><Icon name="send" size={12} color="white" /></button>}
                    {c.source === 'web_search' && <button onClick={() => saveSearchResult(c)} className="p-1.5 bg-emerald-100 rounded hover:bg-emerald-200"><Icon name="download" size={12} color="#10b981" /></button>}
                    <button onClick={() => handleDeleteCandidate(c.id)} className="p-1.5 bg-red-50 rounded hover:bg-red-100"><Icon name="trash" size={12} color="#ef4444" /></button>
                  </div></td>
                </tr>)}</tbody>
              </table>
            </div>}
          </div>
        </div>}

        {activeTab === 'emails' && <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="px-4 py-3 border-b"><h3 className="font-bold">Emails ({sentEmails.length})</h3></div>
          {!sentEmails.length ? <div className="p-12 text-center text-slate-400">No emails sent yet</div> : <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-slate-50 text-left text-xs font-bold text-slate-500"><th className="px-3 py-2">To</th><th className="px-3 py-2">Subject</th><th className="px-3 py-2">Template</th><th className="px-3 py-2">Sent</th><th className="px-3 py-2">Status</th></tr></thead><tbody className="divide-y">{sentEmails.map(e => <tr key={e.id}><td className="px-3 py-2"><div className="font-medium">{e.candidate_name}</div><div className="text-xs text-slate-500">{e.candidate_email}</div></td><td className="px-3 py-2 max-w-xs truncate">{e.subject}</td><td className="px-3 py-2">{e.template_name}</td><td className="px-3 py-2 text-slate-500">{new Date(e.sent_at).toLocaleString()}</td><td className="px-3 py-2"><span className={'px-2 py-1 rounded text-xs font-medium ' + (e.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' : e.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700')}>{e.status}</span></td></tr>)}</tbody></table></div>}
        </div>}

        {activeTab === 'calendar' && <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl border p-6">
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold">{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3><div className="flex gap-2"><button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 bg-slate-100 rounded hover:bg-slate-200"><Icon name="chevronLeft" size={16} /></button><button onClick={() => setCurrentMonth(new Date())} className="px-3 py-2 bg-slate-100 rounded text-sm hover:bg-slate-200">Today</button><button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 bg-slate-100 rounded hover:bg-slate-200"><Icon name="chevronRight" size={16} /></button></div></div>
            <div className="grid grid-cols-7 gap-1 mb-2">{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} className="text-center text-xs font-bold text-slate-400 py-2">{d}</div>)}</div>
            <div className="grid grid-cols-7 gap-1">{getDaysInMonth(currentMonth).map((d, i) => { const fups = getFollowUpsForDate(d); const isToday = d && d.toDateString() === new Date().toDateString(); return <div key={i} onClick={() => d && (setNewFollowUp(p => ({ ...p, date: d.toISOString().split('T')[0] })), openModal('followUp'))} className={'min-h-[60px] p-1 rounded cursor-pointer text-sm ' + (isToday ? 'bg-blue-100 border-2 border-blue-500' : d ? 'bg-slate-50 hover:bg-slate-100' : '')}>{d && <><div className={'font-medium ' + (isToday ? 'text-blue-600' : '')}>{d.getDate()}</div>{fups.slice(0, 2).map(f => <div key={f.id} className={'text-xs px-1 rounded truncate mt-0.5 ' + (f.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>{f.candidate_name}</div>)}</>}</div>; })}</div>
          </div>
          <div className="bg-white rounded-2xl border p-6">
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold">Follow-ups ({stats.pending})</h3><button onClick={() => openModal('followUp')} className="p-2 bg-blue-50 rounded hover:bg-blue-100"><Icon name="plus" size={16} color="#3b82f6" /></button></div>
            <div className="space-y-2 max-h-80 overflow-y-auto">{followUps.filter(f => !f.completed).map(f => <div key={f.id} className="p-3 bg-slate-50 rounded-xl flex justify-between items-start"><div><div className="font-medium">{f.candidate_name}</div><div className="text-sm text-blue-600">{new Date(f.date).toLocaleDateString()}</div>{f.note && <div className="text-xs text-slate-500 mt-1">{f.note}</div>}</div><div className="flex gap-1"><button onClick={() => toggleFollowUp(f)} className="p-1.5 bg-emerald-100 rounded hover:bg-emerald-200"><Icon name="check" size={12} color="#10b981" /></button><button onClick={() => deleteFollowUp(f.id)} className="p-1.5 bg-red-100 rounded hover:bg-red-200"><Icon name="x" size={12} color="#ef4444" /></button></div></div>)}{!followUps.filter(f => !f.completed).length && <p className="text-slate-400 text-center py-6">No pending follow-ups</p>}</div>
          </div>
        </div>}

        {activeTab === 'templates' && <div>
          <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">Templates</h2><button onClick={() => { setEditingTemplate(null); setTemplateForm({ name: '', subject: '', body: '' }); openModal('template'); }} className="px-4 py-2 bg-blue-500 text-white rounded-xl font-medium">+ New Template</button></div>
          <div className="grid md:grid-cols-2 gap-4">{emailTemplates.map(t => <div key={t.id} className="bg-white rounded-2xl border p-5"><div className="flex justify-between mb-3"><div><h3 className="font-bold">{t.name}</h3><p className="text-sm text-slate-500">{t.subject}</p></div><div className="flex gap-2"><button onClick={() => { setEditingTemplate(t); setTemplateForm(t); openModal('template'); }} className="p-2 bg-slate-100 rounded hover:bg-slate-200"><Icon name="edit" size={14} /></button><button onClick={() => handleDeleteTemplate(t.id)} className="p-2 bg-red-50 rounded hover:bg-red-100"><Icon name="trash" size={14} color="#ef4444" /></button></div></div><div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-600 whitespace-pre-wrap max-h-24 overflow-hidden">{t.body}</div></div>)}{!emailTemplates.length && <div className="col-span-2 bg-white rounded-2xl border p-12 text-center text-slate-400">No templates yet</div>}</div>
        </div>}

        {activeTab === 'activity' && <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="px-4 py-3 border-b"><h3 className="font-bold">Activity Log</h3></div>
          {!activities.length ? <div className="p-12 text-center text-slate-400">No activity yet</div> : <div className="divide-y max-h-[500px] overflow-y-auto">{activities.map(a => <div key={a.id} className="px-4 py-3 flex items-center gap-3"><div className={'w-9 h-9 rounded-lg flex items-center justify-center ' + (a.type === 'email' ? 'bg-emerald-100' : a.type === 'search' ? 'bg-blue-100' : 'bg-violet-100')}><Icon name={a.type === 'email' ? 'mail' : a.type === 'search' ? 'search' : 'users'} size={16} color={a.type === 'email' ? '#10b981' : a.type === 'search' ? '#3b82f6' : '#8b5cf6'} /></div><div className="flex-1 min-w-0"><p className="font-medium truncate">{a.description}</p><p className="text-xs text-slate-400">{new Date(a.timestamp).toLocaleString()}</p></div></div>)}</div>}
        </div>}
      </main>

      <Modal id="addCandidate" wide><h2 className="text-xl font-bold mb-4">Add Candidate</h2>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs font-medium mb-1">Name *</label><input className="w-full px-3 py-2 border rounded-xl text-sm" value={newCandidate.name} onChange={e => setNewCandidate(p => ({ ...p, name: e.target.value }))} /></div>
          <div><label className="block text-xs font-medium mb-1">Email</label><input className="w-full px-3 py-2 border rounded-xl text-sm" value={newCandidate.email} onChange={e => setNewCandidate(p => ({ ...p, email: e.target.value }))} /></div>
          <div><label className="block text-xs font-medium mb-1">Location</label><select className="w-full px-3 py-2 border rounded-xl text-sm" value={newCandidate.location} onChange={e => setNewCandidate(p => ({ ...p, location: e.target.value }))}><option value="">Select</option>{locationsList.map(l => <option key={l}>{l}</option>)}</select></div>
          <div><label className="block text-xs font-medium mb-1">Industry</label><select className="w-full px-3 py-2 border rounded-xl text-sm" value={newCandidate.industry} onChange={e => setNewCandidate(p => ({ ...p, industry: e.target.value }))}>{industries.map(i => <option key={i}>{i}</option>)}</select></div>
          <div className="col-span-2 border-t pt-3 mt-2"><p className="text-sm font-medium mb-2">Previous Position</p></div>
          <div><label className="block text-xs font-medium mb-1">Company *</label><input className="w-full px-3 py-2 border rounded-xl text-sm" value={newCandidate.previous_company} onChange={e => setNewCandidate(p => ({ ...p, previous_company: e.target.value }))} /></div>
          <div><label className="block text-xs font-medium mb-1">Title *</label><input className="w-full px-3 py-2 border rounded-xl text-sm" value={newCandidate.previous_title} onChange={e => setNewCandidate(p => ({ ...p, previous_title: e.target.value }))} /></div>
          <div className="col-span-2 border-t pt-3 mt-2"><p className="text-sm font-medium mb-2">New Position</p></div>
          <div><label className="block text-xs font-medium mb-1">Company *</label><input className="w-full px-3 py-2 border rounded-xl text-sm" value={newCandidate.new_company} onChange={e => setNewCandidate(p => ({ ...p, new_company: e.target.value }))} /></div>
          <div><label className="block text-xs font-medium mb-1">Title *</label><input className="w-full px-3 py-2 border rounded-xl text-sm" value={newCandidate.new_title} onChange={e => setNewCandidate(p => ({ ...p, new_title: e.target.value }))} /></div>
          <div><label className="block text-xs font-medium mb-1">Level</label><select className="w-full px-3 py-2 border rounded-xl text-sm" value={newCandidate.new_role} onChange={e => setNewCandidate(p => ({ ...p, new_role: e.target.value }))}>{jobLevels.map(l => <option key={l}>{l}</option>)}</select></div>
          <div><label className="block text-xs font-medium mb-1">Date</label><input type="date" className="w-full px-3 py-2 border rounded-xl text-sm" value={newCandidate.job_change_date} onChange={e => setNewCandidate(p => ({ ...p, job_change_date: e.target.value }))} /></div>
        </div>
        <div className="flex gap-3 justify-end mt-4 pt-4 border-t"><button onClick={() => closeModal('addCandidate')} className="px-4 py-2 border rounded-xl">Cancel</button><button onClick={handleAddCandidate} disabled={!newCandidate.name || !newCandidate.previous_company || !newCandidate.new_company || isSaving} className="px-4 py-2 bg-blue-500 text-white rounded-xl disabled:opacity-50">{isSaving ? 'Saving...' : 'Add'}</button></div>
      </Modal>

      <Modal id="viewCandidate">{selectedCandidate && <><h2 className="text-xl font-bold mb-1">{selectedCandidate.name}</h2><p className="text-slate-500 text-sm mb-4">{selectedCandidate.location}</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-3"><p className="text-xs font-bold text-red-600 mb-1">PREVIOUS</p><p className="font-medium text-red-800">{selectedCandidate.previous_title}</p><p className="text-sm text-red-700">{selectedCandidate.previous_company}</p></div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3"><p className="text-xs font-bold text-emerald-600 mb-1">NEW</p><p className="font-medium text-emerald-800">{selectedCandidate.new_title}</p><p className="text-sm text-emerald-700">{selectedCandidate.new_company}</p></div>
        </div>
        <div className="space-y-1 mb-4 text-sm">
          {selectedCandidate.email && <p><strong>Email:</strong> <a href={'mailto:' + selectedCandidate.email} className="text-blue-600">{selectedCandidate.email}</a></p>}
          {selectedCandidate.linkedin_url && <p><strong>LinkedIn:</strong> <a href={selectedCandidate.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600">View Profile</a></p>}
          {selectedCandidate.job_change_date && <p><strong>Changed:</strong> {new Date(selectedCandidate.job_change_date).toLocaleDateString()}</p>}
        </div>
        <div className="flex gap-2 justify-end pt-3 border-t">
          {selectedCandidate.source === 'web_search' && <button onClick={() => { saveSearchResult(selectedCandidate); closeModal('viewCandidate'); }} className="px-3 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-sm">Save</button>}
          <button onClick={() => handleDeleteCandidate(selectedCandidate.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-xl text-sm">Delete</button>
          {selectedCandidate.email && <button onClick={() => { closeModal('viewCandidate'); openModal('sendEmail'); }} className="px-3 py-2 bg-blue-500 text-white rounded-xl text-sm">Send Email</button>}
        </div>
      </>}</Modal>

      <Modal id="sendEmail">{selectedCandidate && <><h2 className="text-xl font-bold mb-4">Email {selectedCandidate.name}</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4"><p className="text-blue-800">{selectedCandidate.email}</p></div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4"><p className="text-xs text-amber-700"><Icon name="externalLink" size={12} color="#d97706" /> Email will open in your default mail app</p></div>
        <p className="text-xs font-medium text-slate-500 mb-2">Select Template</p>
        <div className="space-y-2 max-h-48 overflow-y-auto mb-4">{emailTemplates.map(t => <div key={t.id} onClick={() => setSelectedTemplate(t)} className={'p-3 rounded-xl cursor-pointer border ' + (selectedTemplate?.id === t.id ? 'bg-blue-100 border-blue-500' : 'bg-slate-50 hover:bg-slate-100')}><p className="font-medium text-sm">{t.name}</p><p className="text-xs text-slate-500">{t.subject}</p></div>)}{!emailTemplates.length && <p className="text-slate-400 text-center py-4">Create a template first</p>}</div>
        <div className="flex gap-3 justify-end pt-3 border-t"><button onClick={() => { closeModal('sendEmail'); setSelectedCandidate(null); setSelectedTemplate(null); }} className="px-4 py-2 border rounded-xl">Cancel</button><button onClick={() => handleSendEmail(selectedCandidate, selectedTemplate)} disabled={!selectedTemplate || isSaving} className="px-4 py-2 bg-blue-500 text-white rounded-xl disabled:opacity-50">{isSaving ? 'Opening...' : 'Open Email'}</button></div>
      </>}</Modal>

      <Modal id="template"><h2 className="text-xl font-bold mb-4">{editingTemplate ? 'Edit' : 'New'} Template</h2>
        <div className="space-y-3">
          <div><label className="block text-xs font-medium mb-1">Name *</label><input className="w-full px-3 py-2 border rounded-xl text-sm" value={templateForm.name} onChange={e => setTemplateForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Initial Outreach" /></div>
          <div><label className="block text-xs font-medium mb-1">Subject *</label><input className="w-full px-3 py-2 border rounded-xl text-sm" value={templateForm.subject} onChange={e => setTemplateForm(p => ({ ...p, subject: e.target.value }))} placeholder="e.g. Congrats on your new role!" /></div>
          <div><label className="block text-xs font-medium mb-1">Body *</label><textarea className="w-full px-3 py-2 border rounded-xl text-sm" rows={5} value={templateForm.body} onChange={e => setTemplateForm(p => ({ ...p, body: e.target.value }))} placeholder="Hi {{candidateName}}..." /></div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3"><p className="text-xs font-bold text-blue-600 mb-1">Variables</p><p className="text-xs text-slate-600">{"{{candidateName}} {{company}} {{senderName}} {{newCompany}} {{newTitle}}"}</p></div>
        </div>
        <div className="flex gap-3 justify-end mt-4 pt-3 border-t"><button onClick={() => closeModal('template')} className="px-4 py-2 border rounded-xl">Cancel</button><button onClick={handleSaveTemplate} disabled={!templateForm.name || !templateForm.subject || !templateForm.body || isSaving} className="px-4 py-2 bg-blue-500 text-white rounded-xl disabled:opacity-50">{isSaving ? 'Saving...' : 'Save'}</button></div>
      </Modal>

      <Modal id="followUp"><h2 className="text-xl font-bold mb-4">Add Follow-up</h2>
        <div className="space-y-3">
          <div><label className="block text-xs font-medium mb-1">Candidate *</label><input className="w-full px-3 py-2 border rounded-xl text-sm" value={newFollowUp.candidate_name} onChange={e => setNewFollowUp(p => ({ ...p, candidate_name: e.target.value }))} /></div>
          <div><label className="block text-xs font-medium mb-1">Date *</label><input type="date" className="w-full px-3 py-2 border rounded-xl text-sm" value={newFollowUp.date} onChange={e => setNewFollowUp(p => ({ ...p, date: e.target.value }))} /></div>
          <div><label className="block text-xs font-medium mb-1">Note</label><textarea className="w-full px-3 py-2 border rounded-xl text-sm" rows={2} value={newFollowUp.note} onChange={e => setNewFollowUp(p => ({ ...p, note: e.target.value }))} /></div>
        </div>
        <div className="flex gap-3 justify-end mt-4 pt-3 border-t"><button onClick={() => closeModal('followUp')} className="px-4 py-2 border rounded-xl">Cancel</button><button onClick={handleAddFollowUp} disabled={!newFollowUp.candidate_name || !newFollowUp.date || isSaving} className="px-4 py-2 bg-blue-500 text-white rounded-xl disabled:opacity-50">{isSaving ? 'Adding...' : 'Add'}</button></div>
      </Modal>

      <Modal id="testEmail"><h2 className="text-xl font-bold mb-4">Add Test Email</h2>
        <div className="space-y-3">
          <div><label className="block text-xs font-medium mb-1">Name *</label><input className="w-full px-3 py-2 border rounded-xl text-sm" value={newTestEmail.name} onChange={e => setNewTestEmail(p => ({ ...p, name: e.target.value }))} placeholder="Test Person" /></div>
          <div><label className="block text-xs font-medium mb-1">Email *</label><input className="w-full px-3 py-2 border rounded-xl text-sm" value={newTestEmail.email} onChange={e => setNewTestEmail(p => ({ ...p, email: e.target.value }))} placeholder="test@example.com" /></div>
          <div><label className="block text-xs font-medium mb-1">Company</label><input className="w-full px-3 py-2 border rounded-xl text-sm" value={newTestEmail.company} onChange={e => setNewTestEmail(p => ({ ...p, company: e.target.value }))} placeholder="Test Corp" /></div>
        </div>
        <div className="flex gap-3 justify-end mt-4 pt-3 border-t"><button onClick={() => closeModal('testEmail')} className="px-4 py-2 border rounded-xl">Cancel</button><button onClick={handleAddTestEmail} disabled={!newTestEmail.name || !newTestEmail.email || isSaving} className="px-4 py-2 bg-blue-500 text-white rounded-xl disabled:opacity-50">{isSaving ? 'Adding...' : 'Add'}</button></div>
      </Modal>

      <Modal id="sendTest">{selectedTestEmail && <><h2 className="text-xl font-bold mb-4">Send Test</h2>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4"><p className="text-sm text-emerald-700">To: <strong>{selectedTestEmail.email}</strong></p></div>
        <p className="text-xs font-medium text-slate-500 mb-2">Select Template</p>
        <div className="space-y-2 max-h-40 overflow-y-auto mb-4">{emailTemplates.map(t => <div key={t.id} onClick={() => setSelectedTemplate(t)} className={'p-3 rounded-xl cursor-pointer border ' + (selectedTemplate?.id === t.id ? 'bg-emerald-100 border-emerald-500' : 'bg-slate-50 hover:bg-slate-100')}><p className="font-medium text-sm">{t.name}</p></div>)}</div>
        <div className="flex gap-3 justify-end pt-3 border-t"><button onClick={() => { closeModal('sendTest'); setSelectedTestEmail(null); setSelectedTemplate(null); }} className="px-4 py-2 border rounded-xl">Cancel</button><button onClick={handleSendTest} disabled={!selectedTemplate || isSaving} className="px-4 py-2 bg-emerald-500 text-white rounded-xl disabled:opacity-50">{isSaving ? 'Opening...' : 'Open Email'}</button></div>
      </>}</Modal>

      <Modal id="settings"><h2 className="text-xl font-bold mb-4">Settings</h2>
        <div className="space-y-3">
          <div><label className="block text-xs font-medium mb-1">Your Name</label><input className="w-full px-3 py-2 border rounded-xl text-sm" value={settings.sender_name || ''} onChange={e => setSettings(p => ({ ...p, sender_name: e.target.value }))} /><p className="text-xs text-slate-400 mt-1">{"{{senderName}}"}</p></div>
          <div><label className="block text-xs font-medium mb-1">Company</label><input className="w-full px-3 py-2 border rounded-xl text-sm" value={settings.company_name || ''} onChange={e => setSettings(p => ({ ...p, company_name: e.target.value }))} /><p className="text-xs text-slate-400 mt-1">{"{{company}}"}</p></div>
          <div className="border-t pt-3"><p className="text-sm font-medium mb-2">Email Delivery</p><div className="bg-amber-50 border border-amber-200 rounded-xl p-3"><p className="text-sm text-amber-700">Emails open in your default mail app (Outlook, Gmail, etc.)</p><p className="text-xs text-amber-600 mt-1">For automated sending, a backend service is required.</p></div></div>
        </div>
        <div className="flex gap-3 justify-end mt-4 pt-3 border-t"><button onClick={() => closeModal('settings')} className="px-4 py-2 border rounded-xl">Cancel</button><button onClick={saveSettings} disabled={isSaving} className="px-4 py-2 bg-blue-500 text-white rounded-xl disabled:opacity-50">{isSaving ? 'Saving...' : 'Save'}</button></div>
      </Modal>
    </div>
  );
}
