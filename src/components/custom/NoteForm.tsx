import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface NoteFormProps {
  title: string;
  content: string;
  isLoading: boolean;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: () => void;
  errorMessage?: string;
}

const NoteForm: React.FC<NoteFormProps> = ({
  title,
  content,
  isLoading,
  onTitleChange,
  onContentChange,
  onSubmit,
  errorMessage,
}) => {
  return (
    <div className="space-y-2">
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <Textarea
        placeholder="Content"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
      <Button onClick={onSubmit} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          "Create Note"
        )}
      </Button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default NoteForm;