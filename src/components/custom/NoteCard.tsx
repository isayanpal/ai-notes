"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles,Trash , SquarePen } from "lucide-react";
import type { Note } from "@/lib/types";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ShimmerButton } from "../magicui/shimmer-button";

interface NoteCardProps {
  note: Note;
  isLoading: boolean;
  editingNoteId: string | null;
  summarizingNoteId: string | null;
  summary: string | null;
  isSummaryModalOpen: boolean;
  onEdit: (note: Note) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  onSummarize: (id: string, content: string) => void;
  onOpenSummaryModal: () => void;
  onCloseSummaryModal: () => void;
  editedNote: { title: string; content: string };
  setEditedNote: (note: { title: string; content: string }) => void;
  setIsSummaryModalOpen: (isOpen: boolean) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  isLoading,
  editingNoteId,
  summarizingNoteId,
  summary,
  isSummaryModalOpen,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onSummarize,
  onOpenSummaryModal,
  onCloseSummaryModal,
  editedNote,
  setEditedNote,
  setIsSummaryModalOpen,
}) => {
  // Inline formatDate function
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  return (
    <Card className="border border-gray-800 bg-gradient-to-br from-[#18181B] via-[#1e1e21] to-[#27272a] hover:brightness-105 transition-all overflow-hidden flex flex-col">

      <CardHeader className="pb-2">
        {editingNoteId === note.id ? (
          <Input
            type="text"
            value={editedNote.title}
            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
            className="bg-gray-800 border-gray-700"
          />
        ) : (
          <CardTitle className="text-xl font-semibold">{note.title}</CardTitle>
        )}
        {!editingNoteId && (
          <p className="text-sm text-muted-foreground">
            {formatDate(note.created_at)}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        {editingNoteId === note.id ? (
          <Textarea
            value={editedNote.content}
            onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
            className="min-h-[120px] bg-gray-800 border-gray-700"
          />
        ) : (
          <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
            <p className="text-gray-300">{note.content}</p>
          </div>
        )}

        {summarizingNoteId === note.id && (
          <div className="flex items-center gap-2 text-sm text-purple-300 italic">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>Generating AI summary...</span>
          </div>
        )}

        {summary && summarizingNoteId === note.id && (
          <div className="mt-3 border border-purple-500/30 rounded-md p-3 bg-purple-900/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <p className="text-sm font-semibold text-purple-300">AI Summary</p>
            </div>
            <p className="text-sm text-gray-300">{summary}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2 border-t border-gray-800">
        {editingNoteId === note.id ? (
          <>
            <Button variant="outline" onClick={onCancelEdit} className="border-gray-700 hover:bg-gray-800">
              Cancel
            </Button>
            <Button onClick={onSaveEdit} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </>
        ) : (
          <>
            <Dialog open={isSummaryModalOpen && summarizingNoteId === note.id} onOpenChange={setIsSummaryModalOpen}>
              <DialogTrigger asChild>
                <ShimmerButton
                  onClick={() => {
                    onSummarize(note.id, note.content);
                    setIsSummaryModalOpen(true);
                  }}
                  disabled={summarizingNoteId === note.id}
                  className="text-white px-8"
                >
                  {summarizingNoteId === note.id ? (
                    <>
                      <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 ">
                      <div className="flex flex-row">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Summarizing...
                      </div>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 ">
                      <div className="flex flex-row">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Summarize
                      </div>
                      </span>
                    </>
                  )}
                </ShimmerButton>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border border-gray-800">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span>AI Summary</span>
                  </DialogTitle>
                  <DialogDescription className="pt-4">
                    {summary && summarizingNoteId === note.id ? (
                      <div className="bg-gray-800 p-4 rounded-md text-gray-200">{summary}</div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 p-4 text-gray-400 italic">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Generating summary...</span>
                      </div>
                    )}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button size="sm" onClick={() => onEdit(note)} className="bg-gray-800 hover:bg-gray-700 text-white">
              <SquarePen/> Edit Note
            </Button>
            <Button
              size="sm"
              onClick={() => onDelete(note.id)}
              disabled={isLoading}
              className="bg-[#b91c1c] text-white hover:text-white hover:bg-red-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </>
              )}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
