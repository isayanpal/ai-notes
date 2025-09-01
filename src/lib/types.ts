import { ReactNode } from "react";

export interface Note {
    id: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
  }

  export interface NoteCardProps {
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

  export interface NoteFormProps {
    title: string;
    content: string;
    isLoading: boolean;
    onTitleChange: (value: string) => void;
    onContentChange: (value: string) => void;
    onSubmit: () => void;
    errorMessage?: string;
  }

export interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
}

export interface PricingCardProps {
  title: string
  price: string
  period?: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline"
  highlighted?: boolean
  delay?: number
}

export interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  delay?: number
}