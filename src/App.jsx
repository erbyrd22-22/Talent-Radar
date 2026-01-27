 *</label><textarea className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm resize-none" rows={6} value={body} onChange={e => setBody(e.target.value)} placeholder="Hi {{candidateName}},&#10;&#10;I noticed your recent move..." /></div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4"><div className="text-xs font-bold text-blue-600 mb-1">Available Variables</div><p className="text-xs text-slate-600">{'{{candidateName}}, {{company}}, {{senderName}}, {{newCompany}}, {{newTitle}}'}</p></div>
      </div>
      <div className="flex gap-3 justify-end mt-6 pt-4 border-t"><button onClick={onClose} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button><button onClick={() => onSave({ id: template?.id, name, subject, body })} disabled={!name || !subject || !body || isSaving} className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50 hover:shadow-lg">{isSaving ? 'Saving...' : template ? 'Update' : 'Create'}</button></div>
    </>
  );
}
