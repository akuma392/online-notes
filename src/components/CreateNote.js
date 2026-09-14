import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { supabase } from '../supabase';
import { saveRecentNote, getRecentNotes } from '../utils/recentNotes';
import {
    Copy, Check, Share2, FileText, Code2, Loader2, History
} from 'lucide-react';
import { generateSlug, quillModules } from '../constants/noteConstants';
import RecentNotesModal from './RecentNotesModal';

export default function CreateNote({ theme }) {
    const [content, setContent] = useState('');
    const [mode, setMode] = useState('text');
    const [language, setLanguage] = useState('javascript');
    const [loading, setLoading] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const [recentNotes, setRecentNotes] = useState([]);
    const [showRecent, setShowRecent] = useState(false);

    useEffect(() => {
        setRecentNotes(getRecentNotes());
    }, []);

    const getLanguageExtension = () => {
        if (language === 'javascript') return [javascript()];
        if (language === 'python') return [python()];
        if (language === 'html') return [html()];
        return [];
    };

    const handleSave = async () => {
        const isBlank = !content || content === '<p><br></p>' || !content.trim();
        if (isBlank) {
            alert('Note cannot be empty!');
            return;
        }
        setLoading(true);

        try {
            const uniqueId = generateSlug();

            const { error } = await supabase
                .from('notes')
                .insert([
                    {
                        id: uniqueId,
                        content,
                        type: mode,
                        language,
                    },
                ]);

            if (error) throw error;

            const updated = saveRecentNote(uniqueId, mode, language);
            setRecentNotes(updated);

            const generatedUrl = `${window.location.origin}/${uniqueId}`;
            setShareUrl(generatedUrl);
        } catch (err) {
            console.error(err);
            alert('Error saving note: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (urlToCopy) => {
        navigator.clipboard.writeText(urlToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm dark:shadow-xl transition-colors">

            {/* Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setMode('text')}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode === 'text'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                    >
                        <FileText size={16} /> Rich Text
                    </button>

                    <button
                        type="button"
                        onClick={() => setMode('code')}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode === 'code'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                    >
                        <Code2 size={16} /> Code
                    </button>

                    {mode === 'code' && (
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="html">HTML</option>
                        </select>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setShowRecent(true)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
                    >
                        <History size={16} /> Recent ({recentNotes.length})
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Share2 size={16} />}
                        {loading ? 'Saving...' : 'Save & Share'}
                    </button>
                </div>
            </div>

            {/* Editor Surface */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950">
                {mode === 'text' ? (
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={quillModules}
                        placeholder="Write your note with custom sizes, colors, and lists..."
                        className="quill-custom-container"
                    />
                ) : (
                    <CodeMirror
                        value={content}
                        height="380px"
                        theme={theme === 'dark' ? oneDark : 'light'}
                        extensions={getLanguageExtension()}
                        onChange={(val) => setContent(val)}
                        className="text-sm font-mono"
                    />
                )}
            </div>

            {/* Share Box Banner */}
            {shareUrl && (
                <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-950 border border-emerald-500/40 rounded-lg flex flex-col sm:flex-row items-center gap-3">
                    <input
                        type="text"
                        readOnly
                        value={shareUrl}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 text-sm px-3 py-2 rounded focus:outline-none font-mono"
                    />
                    <button
                        type="button"
                        onClick={() => copyToClipboard(shareUrl)}
                        className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-sm font-medium transition-colors"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied' : 'Copy Link'}
                    </button>
                </div>
            )}

            <RecentNotesModal
                showRecent={showRecent}
                recentNotes={recentNotes}
                onClose={() => setShowRecent(false)}
                onCopy={copyToClipboard}
            />

        </div>
    );
}