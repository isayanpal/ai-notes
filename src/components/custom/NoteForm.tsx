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
import { Loader2, FileText } from "lucide-react";
import { ShimmerButton } from "../magicui/shimmer-button";

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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <FileText className="h-5 w-5 text-purple-500" />
          <span>Create New Note</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-300">
            Title
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Enter note title"
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="content"
            className="text-sm font-medium text-gray-300"
          >
            Content
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Enter note content"
            className="min-h-[150px] bg-gray-800 border-gray-700"
          />
        </div>
        {errorMessage && (
          <div className="text-[#b91c1c] text-sm p-2 bg-red-900/20 border border-red-900/30 rounded">
            {errorMessage}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end border-t border-gray-800 pt-4">
        <ShimmerButton
          onClick={onSubmit}
          disabled={isLoading || !title || !content}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {isLoading ? (
            <>
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </span>
            </>
          ) : (
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
              Create Note
            </span>
          )}
        </ShimmerButton>
      </CardFooter>
    </Card>
  );
};

export default NoteForm;
