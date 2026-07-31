import { useState, useEffect } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setNotes([
      { id: '1', title: 'Exam Syllabus', content: 'Chapters 1-5 for next week.', created_at: new Date().toISOString() }
    ]);
  }, []);

  const handleAddNote = async () => {
    if (!title.trim() || !content.trim()) return;
    
    const newNote: Note = {
      id: Math.random().toString(),
      title,
      content,
      created_at: new Date().toISOString()
    };
    
    setNotes([newNote, ...notes]);
    setTitle('');
    setContent('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          My Notes
        </h3>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="text-sm px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white rounded-lg transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2 font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            New Note
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-slate-800/80 border border-violet-500/30 rounded-xl p-5 flex flex-col gap-4 shadow-xl shadow-black/20 animate-in fade-in slide-in-from-top-4 duration-300">
          <input 
            type="text" 
            placeholder="Note Title" 
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="bg-slate-900/50 border border-white/10 rounded-lg focus:border-violet-400 focus:ring-1 focus:ring-violet-400/50 px-4 py-2 text-slate-100 placeholder:text-slate-500 transition-all outline-none"
          />
          <textarea 
            placeholder="Write your note here..." 
            value={content}
            onChange={e => setContent(e.target.value)}
            className="bg-slate-900/50 border border-white/10 rounded-lg focus:border-violet-400 focus:ring-1 focus:ring-violet-400/50 p-4 min-h-[100px] text-slate-100 placeholder:text-slate-500 resize-none transition-all outline-none"
          />
          <div className="flex justify-end gap-3 mt-2">
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddNote}
              className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white rounded-lg transition-all shadow-lg shadow-indigo-500/25"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 overflow-y-auto max-h-[450px] pr-2 custom-scrollbar">
        {notes.length === 0 && !isAdding && (
          <div className="text-center py-12 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.02]">
            <svg className="w-12 h-12 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-slate-400 font-medium">No notes yet</p>
            <p className="text-slate-500 text-sm mt-1">Capture your thoughts and tasks here.</p>
          </div>
        )}
        {notes.map(note => (
          <div key={note.id} className="bg-slate-800/40 border border-white/5 rounded-xl p-5 group hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-900/20 hover:border-violet-500/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-slate-100 text-lg">{note.title}</h4>
              <button 
                onClick={() => handleDelete(note.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-all"
                title="Delete note"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{note.content}</p>
            <span className="text-xs font-medium text-slate-500 mt-4 block">
              {new Date(note.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
