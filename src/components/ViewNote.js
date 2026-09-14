import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import 'react-quill-new/dist/quill.snow.css';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { supabase } from '../supabase';
import { Copy, Check, Plus, Loader2, AlertCircle } from 'lucide-react';

export default function ViewNote({ theme }) {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const { data, error } = await supabase
                    .from('notes')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error || !data) throw new Error('Note not found');
                setNote(data);
            } catch (err) {
                setError('This note does not exist or has expired.');
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    const copyContent = () => {
        if (!note) return;
        const textToCopy = note.type === 'text'
            ? new DOMParser().parseFromString(note.content, 'text/html').body.textContent || ''
            : note.content;

        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getLanguageExtension = (lang) => {
        if (lang === 'javascript') return [javascript()];
        if (lang === 'python') return [python()];
        if (lang === 'html') return [html()];
        return [];
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400 gap-3">
                <Loader2 className="animate-spin" size={28} />
                <span className="text-sm font-medium">Fetching note...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center max-w-md mx-auto shadow-sm dark:shadow-xl">
                <AlertCircle className="mx-auto text-rose-500 mb-3" size={36} />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">404 - Not Found</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{error}</p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus size={16} /> Create New Note
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm dark:shadow-xl transition-colors">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium">
                        {note.type === 'text' ? 'RICH TEXT' : 'CODE'}
                    </span>
                    {note.type === 'code' && (
                        <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium">
                            {note.language}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={copyContent}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium transition-colors"
                    >
                        {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                        {copied ? 'Copied' : 'Copy Content'}
                    </button>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <Plus size={16} /> New
                    </Link>
                </div>
            </div>

            {/* Render Area with Word Wrapping */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 min-h-[380px] overflow-hidden">
                {note.type === 'text' ? (
                    <div
                        className="ql-snow ql-editor !p-0 break-words whitespace-pre-wrap text-slate-800 dark:text-slate-100 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.content) }}
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <CodeMirror
                            value={note.content}
                            height="380px"
                            theme={theme === 'dark' ? oneDark : 'light'}
                            editable={false}
                            extensions={getLanguageExtension(note.language)}
                            className="text-sm font-mono"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}