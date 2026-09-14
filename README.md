# QuickBin

QuickBin is a React-powered anonymous note sharing app for creating rich-text notes and source-code notes, then sharing them through a unique public URL.

The current project uses Create React App, React Router, Tailwind CSS, React Quill, CodeMirror, Supabase, and Lucide icons.

## Project goal

QuickBin allows a user to:

- write a rich-text note or a code note,
- switch between rich-text and code editors,
- choose a language for code notes,
- save the note to Supabase,
- copy the generated share link,
- open a saved note from the unique URL,
- browse a recent list of the last five notes created in the browser.

## Features

- Rich text writer with React Quill.
- Code editor using CodeMirror with JavaScript, Python, and HTML support.
- Light and dark visual theme toggle driven by Tailwind class mode.
- Recent note modal for the last five saved note URLs.
- Shareable note route using a unique note ID in the URL path.
- Supabase database insertion and query workflow.
- Browser local storage history via `recentNotes.js`.

## Tech stack

- React 19
- Create React App
- React Router DOM
- Supabase JavaScript client
- React Quill
- CodeMirror
- Tailwind CSS
- Lucide React
- nanoid

## Repository structure

```text
src/
  App.js                  Main app layout and theme toggle
  index.js                React entry point
  index.css               Global Tailwind and Quill editor styling
  supabase.js             Supabase client configuration
  components/
    CreateNote.js         Create and share a note UI
    ViewNote.js           Fetch and display a stored note
    RecentNotesModal.js   Recent note modal component
  constants/
    noteConstants.js      Reusable Quill config and slug helper
  utils/
    recentNotes.js        Local history APIs for recent notes
```

## Environment variables

Create a local `.env` file from the example profile:

```sh
cp .env.example .env
```

Use values such as:

```env
REACT_APP_SUPABASE_URL=https://your-project-url.supabase.co
REACT_APP_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

The frontend app reads the Supabase client from `src/supabase.js`.

## Local development

Install dependencies:

```sh
npm install
```

Start the local development server:

```sh
npm start
```

Open the project locally at:

```text
http://localhost:3000
```

## Production build

Create a production build:

```sh
npm run build
```

## Available project scripts

```sh
npm start
npm test
npm run build
```

- `npm start` launches the CRA development server.
- `npm test` runs the unit test suite.
- `npm run build` creates the production build folder.

## Supabase data model

The app expects a Supabase table named `notes` with these fields:

- `id` primary key or unique identifier
- `content` rich text or code text
- `type` either `text` or `code`
- `language` such as `javascript`, `python`, or `html`

The app writes new records using `supabase.from('notes').insert(...)` and reads one record with `supabase.from('notes').select('*').eq('id', id).single()`.

## Implementation notes

- Theme state is stored in `localStorage` using the key `app-theme`.
- The recent-note list is stored in browser local storage with the key `quickbin_recent_notes`.
- The project uses Tailwind dark mode with class-based toggling from the HTML root.

## License

This project is intended for learning and local development use.
