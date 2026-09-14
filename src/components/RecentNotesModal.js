import React from 'react';
import { Link } from 'react-router-dom';
import { Copy, ExternalLink, History, X } from 'lucide-react';

export default function RecentNotesModal({ showRecent, recentNotes, onClose, onCopy }) {
    if (!showRecent) return null;

    return (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md w-full p-5 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <History size={18} /> Last 5 Created Notes
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="mt-3 space-y-2">
                    {recentNotes.length === 0 ? (
                        <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
                            No notes saved in this browser yet.
                        </p>
                    ) : (
                        recentNotes.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-sm font-medium text-blue-600 dark:text-blue-400">
                                            /{item.id}
                                        </span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 uppercase">
                                            {item.type}
                                        </span>
                                    </div>
                                    <span className="text-[11px] text-slate-400">Saved at {item.createdAt}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => onCopy(`${window.location.origin}/${item.id}`)}
                                        className="p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white rounded"
                                        title="Copy link"
                                    >
                                        <Copy size={15} />
                                    </button>
                                    <Link
                                        to={`/${item.id}`}
                                        target="_blank"
                                        className="p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white rounded"
                                        title="Open in new tab"
                                    >
                                        <ExternalLink size={15} />
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
