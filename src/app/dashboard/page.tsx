"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import NoteForm from "@/components/custom/NoteForm";
import NoteCard from "@/components/custom/NoteCard";

import { Note } from "@/lib/types"

const Dashboard = () => {
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedNote, setEditedNote] = useState<{
    title: string;
    content: string;
  }>({
    title: "",
    content: "",
  });
  const [summary, setSummary] = useState<string | null>(null);
  const [summarizingNoteId, setSummarizingNoteId] = useState<string | null>(
    null
  );
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false); // State to toggle the form
  const queryClient = useQueryClient();

  // Fetch notes using TanStack Query, now fetching from our API route
  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useQuery<Note[], Error>({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await fetch("/api/notes");
      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.status}`);
      }
      return await response.json();
    },
  });

  // Mutations using TanStack Query, now using our API routes
  const createNoteMutation = useMutation({
    mutationFn: async (note: { title: string; content: string }) => {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create note");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setNewNote({ title: "", content: "" });
      setIsAddingNote(false); // Close the form after successful creation
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: async ({
      id,
      title,
      content,
    }: {
      id: string;
      title: string;
      content: string;
    }) => {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update note");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setEditingNoteId(null);
      setEditedNote({ title: "", content: "" });
      setSummary(null);
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete note");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  // Summarize mutation (remains separate as it calls an API route)
  const summarizeNoteMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to summarize note");
      }
      const { summary } = await response.json();
      console.log("Received summary:", summary); // Log the received summary
      return summary as string;
    },
    onSuccess: (data, variables) => {
      setSummary(data);
      setSummarizingNoteId(variables);
    },
    onError: (err) => {
      console.error("Error summarizing note:", err);
    },
    onSettled: () => {
      setSummarizingNoteId(null);
    },
  });

  const handleCreateNote = async () => {
    await createNoteMutation.mutateAsync(newNote);
  };

  const handleEdit = (note: Note) => {
    setEditingNoteId(note.id);
    setEditedNote({ title: note.title, content: note.content });
    setSummary(null);
  };

  const handleSaveEdit = async () => {
    if (editingNoteId) {
      await updateNoteMutation.mutateAsync({
        id: editingNoteId,
        title: editedNote.title,
        content: editedNote.content,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditedNote({ title: "", content: "" });
    setSummary(null);
  };

  const handleDelete = async (id: string) => {
    await deleteNoteMutation.mutateAsync(id);
  };

  const handleSummarize = async (id: string, content: string) => {
    setSummary(null);
    setSummarizingNoteId(id); // Use the note's ID
    try {
      const summary = await summarizeNoteMutation.mutateAsync(content);
      setSummary(summary); // Update the summary state
    } catch (error) {
      console.error("Error summarizing note:", error);
    } finally {
      setSummarizingNoteId(null); // Clear the summarizing state
    }
  };

  const handleOpenSummaryModal = () => {
    setIsSummaryModalOpen(true);
  };

  const handleCloseSummaryModal = () => {
    setIsSummaryModalOpen(false);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-4xl text-gray-500" />
      </div>
    );
  if (isError) return <div>Error fetching notes: {error?.message}</div>;

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Your Notes</h1>
      <Button
        variant="outline"
        onClick={() => setIsAddingNote((prev) => !prev)}
        className="mb-4"
      >
        {isAddingNote ? "Cancel" : "Add Note"}
      </Button>
      {isAddingNote && (
        <NoteForm
          title={newNote.title}
          content={newNote.content}
          isLoading={isLoading}
          onTitleChange={(value) => setNewNote({ ...newNote, title: value })}
          onContentChange={(value) =>
            setNewNote({ ...newNote, content: value })
          }
          onSubmit={handleCreateNote}
          errorMessage={
            createNoteMutation.isError
              ? createNoteMutation.error?.message
              : undefined
          }
        />
      )}
      {notes && notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isLoading={isLoading}
              editingNoteId={editingNoteId}
              summarizingNoteId={summarizingNoteId}
              summary={summary}
              isSummaryModalOpen={isSummaryModalOpen}
              onEdit={handleEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              onDelete={handleDelete}
              onSummarize={handleSummarize}
              onOpenSummaryModal={handleOpenSummaryModal}
              onCloseSummaryModal={handleCloseSummaryModal}
              editedNote={editedNote}
              setEditedNote={setEditedNote}
              setIsSummaryModalOpen={setIsSummaryModalOpen}
            />
          ))}
        </div>
      ) : (
        <p>No notes yet. Create one!</p>
      )}
    </div>
  );
};

export default Dashboard;
