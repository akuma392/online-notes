import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Plus, Home } from 'lucide-react';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Animated Badge / Icon */}
                <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto shadow-inner animate-bounce">
                        <FileQuestion size={48} strokeWidth={1.5} />
                    </div>
                    <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-rose-500 text-white shadow-sm">
                        404
                    </span>
                </div>

                {/* Messaging */}
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl mb-3">
                    Page not found
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                    The link you followed may be broken, expired, or the shared note never existed.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-sm font-medium transition-colors shadow-sm"
                    >
                        <ArrowLeft size={16} /> Go Back
                    </button>

                    <Link
                        to="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors shadow-sm shadow-blue-500/20"
                    >
                        <Home size={16} /> Home
                    </Link>

                    <Link
                        to="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors shadow-sm shadow-emerald-500/20"
                    >
                        <Plus size={16} /> New Note
                    </Link>
                </div>
            </div>
        </div>
    );
}