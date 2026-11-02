import React, { useState, useEffect } from "react";
import NotebookSidebar from "../components/NotebookSidebar";
import SearchBar from "../components/SearchBar";
import ViewToggle from "../components/ViewToggle";
import NoteCard from "../components/NoteCard";
import NoteEditor from "../components/NoteEditor";

const INITIAL_DATA = [
  {
    id: "1",
    title: "Get Started with Smart Notes 🚀",
    content:
      "This is an <b>auto-saving</b> rich-text environment. Modify titles or write using lists.",
    notebook: "General",
    tags: ["Work"],
    color: "#eff6ff",
    isPinned: true,
    isArchived: false,
    updatedAt: new Date().toLocaleTimeString(),
  },
];

export default function Home({ user }) {
  const [notes, setNotes] = useState(() => {
    const data = localStorage.getItem(`notes_${user.email}`);
    return data ? JSON.parse(data) : INITIAL_DATA;
  });

  const [currentNotebook, setCurrentNotebook] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("notes");
  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => {
    localStorage.setItem(`notes_${user.email}`, JSON.stringify(notes));
  }, [notes, user.email]);

  const handleCreateNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "Untitled Entry",
      content: "Begin document tracking details here...",
      notebook: currentNotebook === "All" ? "General" : currentNotebook,
      tags: [],
      color: "#ffffff",
      isPinned: false,
      isArchived: activeTab === "archive",
      updatedAt: new Date().toLocaleTimeString(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
  };

  const handleUpdateField = (field, value) => {
    if (!activeNote) return;
    const updated = {
      ...activeNote,
      [field]: value,
      updatedAt: new Date().toLocaleTimeString(),
    };
    setActiveNote(updated);
    setNotes((prev) => prev.map((n) => (n.id === activeNote.id ? updated : n)));
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (activeNote?.id === id) setActiveNote(null);
  };

  const handleToggleArchive = (id) => {
    setNotes(
      notes.map((n) => (n.id === id ? { ...n, isArchived: !n.isArchived } : n)),
    );
    if (activeNote?.id === id) setActiveNote(null);
  };

  const handleTogglePin = (id) => {
    setNotes(
      notes.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n)),
    );
    if (activeNote?.id === id)
      setActiveNote((prev) => ({ ...prev, isPinned: !prev.isPinned }));
  };

  const listNotebooks = ["All", ...new Set(notes.map((n) => n.notebook))];
  const listTags = ["All", ...new Set(notes.flatMap((n) => n.tags))];

  const processedNotes = notes
    .filter((n) => {
      const matchesNotebook =
        currentNotebook === "All" || n.notebook === currentNotebook;
      const matchesTag = selectedTag === "All" || n.tags.includes(selectedTag);
      const matchesTab = activeTab === "archive" ? n.isArchived : !n.isArchived;
      const matchesSearch =
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesNotebook && matchesTag && matchesTab && matchesSearch;
    })
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  return (
    <div style={styles.workspace}>
      <NotebookSidebar
        notebooks={listNotebooks}
        currentNotebook={currentNotebook}
        onSelectNotebook={setCurrentNotebook}
        tags={listTags}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onCreateNote={handleCreateNote}
      />
      <div style={styles.feedWrapper}>
        <div style={styles.utilityBar}>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <ViewToggle currentMode={viewMode} onToggle={setViewMode} />
        </div>
        <div style={styles.contentSplitter}>
          <div style={styles.scrollContainer}>
            <div style={viewMode === "grid" ? styles.grid : styles.list}>
              {processedNotes.map((n) => (
                <NoteCard
                  key={n.id}
                  note={n}
                  isActive={activeNote?.id === n.id}
                  onClick={() => setActiveNote(n)}
                  onTogglePin={handleTogglePin}
                />
              ))}
            </div>
          </div>
          {activeNote ? (
            <NoteEditor
              note={activeNote}
              onUpdateField={handleUpdateField}
              onDelete={handleDelete}
              onToggleArchive={handleToggleArchive}
            />
          ) : (
            <div style={styles.placeholder}>
              Select or create a node to activate the editor terminal interface.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  workspace: { display: "flex", flex: 1, overflow: "hidden" },
  feedWrapper: {
    flex: 1,
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    overflow: "hidden",
  },
  utilityBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
  },
  contentSplitter: {
    display: "flex",
    gap: "1.25rem",
    flex: 1,
    overflow: "hidden",
  },
  scrollContainer: { flex: 1, overflowY: "auto", paddingRight: "0.25rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "1rem",
  },
  list: { display: "flex", flexDirection: "column", gap: "0.75rem" },
  placeholder: {
    width: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #cbd5e1",
    borderRadius: "8px",
    padding: "2rem",
    textAlign: "center",
    color: "#64748b",
    fontSize: "0.9rem",
  },
};
