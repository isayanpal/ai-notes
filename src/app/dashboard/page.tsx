"use client"

import { useEffect, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, FileText, Menu, X } from "lucide-react"
import NoteForm from "@/components/custom/NoteForm"
import NoteCard from "@/components/custom/NoteCard"
import type { Note } from "@/lib/types"
import { toast } from "sonner"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShimmerButton } from "@/components/magicui/shimmer-button"

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const [newNote, setNewNote] = useState({ title: "", content: "" })
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [editedNote, setEditedNote] = useState<{
    title: string
    content: string
  }>({
    title: "",
    content: "",
  })
  const [summary, setSummary] = useState<string | null>(null)
  const [summarizingNoteId, setSummarizingNoteId] = useState<string | null>(null)
  const [isAddingNoteDialogOpen, setIsAddingNoteDialogOpen] = useState(false)
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  // Fetch notes using TanStack Query
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery<Note[], Error>({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await fetch("/api/notes")
      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.status}`)
      }
      return await response.json()
    },
  })

  // Mutations using TanStack Query
  const createNoteMutation = useMutation({
    mutationFn: async (note: { title: string; content: string }) => {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create note")
      }
      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      setNewNote({ title: "", content: "" })
      setIsAddingNoteDialogOpen(false)
      toast("Note created successfully!")
    },
    onError: (error: Error) => {
      toast(`Failed to create note: ${error.message}`)
    },
  })

  const updateNoteMutation = useMutation({
    mutationFn: async ({
      id,
      title,
      content,
    }: {
      id: string
      title: string
      content: string
    }) => {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update note")
      }
      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      setEditingNoteId(null)
      setEditedNote({ title: "", content: "" })
      setSummary(null)
      toast("Note updated successfully!")
    },
    onError: (error: Error) => {
      toast(`Failed to update note: ${error.message}`)
    },
  })

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete note")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      setSelectedNoteId(null)
      toast("Note deleted successfully!")
    },
    onError: (error: Error) => {
      toast(`Failed to delete note: ${error.message}`)
    },
  })

  // Summarize mutation
  const summarizeNoteMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.error || "Failed to summarize note")
      }
      const { summary } = await response.json()
      return summary as string
    },
    onSuccess: (data, variables) => {
      setSummary(data)
      setSummarizingNoteId(variables)
      toast("AI summary generated successfully!")
    },
    onError: (err: Error) => {
      console.error("Error summarizing note:", err)
      toast(`Failed to summarize note: ${err.message}`)
    },
    onSettled: () => {
      setSummarizingNoteId(null)
    },
  })

  const handleCreateNote = async () => {
    await createNoteMutation.mutateAsync(newNote)
  }

  const handleEdit = (note: Note) => {
    setEditingNoteId(note.id)
    setEditedNote({ title: note.title, content: note.content })
    setSummary(null)
  }

  const handleSaveEdit = async () => {
    if (editingNoteId) {
      await updateNoteMutation.mutateAsync({
        id: editingNoteId,
        title: editedNote.title,
        content: editedNote.content,
      })
    }
  }

  const handleCancelEdit = () => {
    setEditingNoteId(null)
    setEditedNote({ title: "", content: "" })
    setSummary(null)
  }

  const handleDelete = async (id: string) => {
    await deleteNoteMutation.mutateAsync(id)
  }

  const handleSummarize = async (id: string, content: string) => {
    setSummary(null)
    setSummarizingNoteId(id)
    try {
      const summary = await summarizeNoteMutation.mutateAsync(content)
      setSummary(summary)
    } catch (error) {
      console.error("Error summarizing note:", error)
    } finally {
      setSummarizingNoteId(null)
    }
  }

  const handleNoteSelect = (note: Note) => {
    setSelectedNoteId(note.id)
    setEditingNoteId(null)
    setSummary(null)
    if (isMobile) {
      setIsMobileMenuOpen(false)
    }
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] bg-black">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-4xl text-purple-500" />
          <p className="text-gray-400">Loading your notes...</p>
        </div>
      </div>
    )

  if (isError)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] bg-black">
        <div className="bg-red-900/20 border border-red-900/30 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error</h2>
          <p className="text-gray-300">Failed to fetch notes. Please try again later.</p>
        </div>
      </div>
    )

  // Sidebar content
  const renderSidebar = () => (
    <div className="w-full h-full bg-gradient-to-br from-[#18181B] via-[#1e1e21] to-[#27272a] border-r border-gray-800 flex flex-col">
      <div className="p-4 md:p-6">
        <h2 className="text-lg font-semibold text-purple-400 mb-4">Your All Notes</h2>
        {isLoading && <Loader2 className="animate-spin text-purple-500" />}
        {isError && <p className="text-red-500">Failed to load notes</p>}
      </div>
      <nav className="flex-grow overflow-y-auto p-4 md:p-6 pt-0 md:pt-0">
        <ul className="space-y-2">
          {notes?.map((note) => (
            <li key={note.id}>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gray-800/50 text-sm md:text-base"
                onClick={() => handleNoteSelect(note)}
              >
                <span className="truncate">{note.title}</span>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black text-white font-sans">
      {/* Mobile Menu Button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-[72px] left-4 z-50 bg-gray-900/50 hover:bg-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <div
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ top: "64px" }}
        >
          <div
            className="fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out"
            style={{
              transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
              top: "64px",
            }}
          >
            {renderSidebar()}
          </div>
          {/* Backdrop to close sidebar when clicked */}
          <div
            className="fixed inset-0 z-30 bg-black/50"
            style={{ top: "64px" }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
        {/* Desktop Sidebar */}
        {!isMobile && <aside className="w-64 h-full overflow-hidden">{renderSidebar()}</aside>}

        {/* Main Content */}
        <main className={`flex-1 p-4 md:p-6 ${isMobile ? "pt-16" : ""} overflow-y-auto`}>
          <div className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
            <h1 className="text-xl md:text-2xl font-bold">{selectedNoteId ? "Note Details" : "View Note"}</h1>
            <Dialog open={isAddingNoteDialogOpen} onOpenChange={setIsAddingNoteDialogOpen}>
              <DialogTrigger asChild>
                <ShimmerButton className="flex items-center gap-2 border-purple-500/30 hover:bg-purple-900/20 hover:text-purple-300 w-full md:w-auto">
                  <span className="flex flex-row items-center gap-2 justify-center text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
                    <Plus className="h-4 w-4" />
                    <span>Add New Note</span>
                  </span>
                </ShimmerButton>
              </DialogTrigger>
              <DialogContent className="w-[95%] md:w-full mx-auto">
                <DialogHeader>
                  <DialogTitle>Add New Note</DialogTitle>
                  <NoteForm
                    title={newNote.title}
                    content={newNote.content}
                    isLoading={createNoteMutation.isPending}
                    onTitleChange={(value) => setNewNote({ ...newNote, title: value })}
                    onContentChange={(value) => setNewNote({ ...newNote, content: value })}
                    onSubmit={handleCreateNote}
                    errorMessage={createNoteMutation.isError ? createNoteMutation.error?.message : undefined}
                  />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          {/* Display selected note or all notes */}
          {selectedNoteId ? (
            <>
              {notes
                ?.filter((note) => note.id === selectedNoteId)
                .map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    isLoading={updateNoteMutation.isPending || deleteNoteMutation.isPending}
                    editingNoteId={editingNoteId}
                    summarizingNoteId={summarizingNoteId}
                    summary={summary}
                    isSummaryModalOpen={false}
                    onEdit={handleEdit}
                    onSaveEdit={handleSaveEdit}
                    onCancelEdit={handleCancelEdit}
                    onDelete={handleDelete}
                    onSummarize={handleSummarize}
                    onOpenSummaryModal={() => {}}
                    onCloseSummaryModal={() => {}}
                    editedNote={editedNote}
                    setEditedNote={setEditedNote}
                    setIsSummaryModalOpen={() => {}}
                  />
                ))}
              {/* AI Summary Section */}
              <div className="bg-purple-900/30 rounded-md p-4 border border-purple-800 mt-6">
                <h2 className="text-lg font-semibold text-purple-400 mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                  AI Summary
                </h2>
                {summary ? (
                  <p className="text-gray-300">{summary}</p>
                ) : (
                  <p className="text-gray-500">No summary available for the currently selected/edited note.</p>
                )}
              </div>
            </>
          ) : // Display all notes
          notes && notes.length > 0 ? (
            <div className="flex items-center justify-center h-[calc(100vh-200px)] md:h-[calc(100vh-180px)]">
              <div className="max-w-xl px-4">
                <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                  Select a Note <br /> to View Details and Summarize.
                </h2>
                <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
                  Choose a note from the list to see its details or generate an AI-powered summary.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 md:p-12 border border-gray-800 rounded-lg bg-gray-900/30 mb-6">
              <FileText className="h-12 w-12 md:h-16 md:w-16 text-gray-700 mb-4" />
              <p className="text-gray-400 text-base md:text-lg mb-4 text-center">No notes yet</p>
              <Button onClick={() => setIsAddingNoteDialogOpen(true)} className="bg-purple-600 hover:bg-purple-700">
                Create Your First Note
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
