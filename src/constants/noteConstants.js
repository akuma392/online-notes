import { customAlphabet } from 'nanoid';

export const generateSlug = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8);

export const quillModules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'clean'],
    ],
};
