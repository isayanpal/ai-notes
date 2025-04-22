import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Note } from "@/lib/types";

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
  return (
    <Card key={note.id}>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {editingNoteId === note.id ? (
          <div className="space-y-2">
            <Input
              type="text"
              value={editedNote.title}
              onChange={(e) =>
                setEditedNote({ ...editedNote, title: e.target.value })
              }
            />
            <Textarea
              value={editedNote.content}
              onChange={(e) =>
                setEditedNote({ ...editedNote, content: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onCancelEdit}>
                Cancel
              </Button>
              <Button onClick={onSaveEdit} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        ) : (
          <p>
            {note.content.length > 100
              ? `${note.content.substring(0, 100)}...`
              : note.content}
          </p>
        )}

        {summarizingNoteId === note.id && (
          <p className="text-sm italic text-gray-500">Summarizing...</p>
        )}
        {summary && summarizingNoteId === note.id && (
          <div className="mt-2 border rounded-md p-2 bg-gray-50">
            <p className="text-sm font-semibold">Summary:</p>
            <p className="text-sm">{summary}</p>
          </div>
        )}

        {editingNoteId !== note.id && (
          <div className="flex justify-end gap-2 mt-2">
            <Dialog
              open={isSummaryModalOpen}
              onOpenChange={setIsSummaryModalOpen}
            >
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    onSummarize(note.id, note.content);
                    onOpenSummaryModal();
                  }}
                  disabled={summarizingNoteId === note.id}
                >
                  {summarizingNoteId === note.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Summarizing...
                    </>
                  ) : (
                    "Summarize"
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="fixed inset-70 flex items-center justify-center">
                <DialogHeader>
                  <DialogTitle>Note Summary</DialogTitle>
                  <DialogDescription>
                    {summary ? (
                      <p className="text-sm">{summary}</p>
                    ) : (
                      <p className="text-sm italic text-gray-500">
                        No summary available.
                      </p>
                    )}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button size="sm" onClick={() => onEdit(note)}>
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(note.id)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NoteCard;
