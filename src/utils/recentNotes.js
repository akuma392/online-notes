const RECENT_KEY = 'quickbin_recent_notes';

export function getRecentNotes() {
    try {
        const raw = localStorage.getItem(RECENT_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error('Error reading recent notes:', err);
        return [];
    }
}

export function saveRecentNote(id, type, language) {
    const existing = getRecentNotes();
    const filtered = existing.filter((item) => item.id !== id);

    filtered.unshift({
        id,
        type,
        language: type === 'code' ? language : 'plain',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    const limited = filtered.slice(0, 5);
    localStorage.setItem(RECENT_KEY, JSON.stringify(limited));
    return limited;
}