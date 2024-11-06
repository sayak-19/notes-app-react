import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";
import { MdNoteAlt } from "react-icons/md";
import ReactQuill from "react-quill";

const CreateNote = () => {
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(content);
  };

  const handleSubmit = async () => {
    if (editorContent.trim().length === 0)
      return toast.error("Note cannot be empty");
    try {
      setLoading(true);
      const noteData = { content: editorContent };
      await api.post("/notes", noteData);
      toast.success("Note created successfully");
      navigate("/notes");
    } catch (err) {
      toast.error("Failed to create note");
      console.log("Failed to create note ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-74px)] p-10">
      <div className="flex item-center gap-1 pb-5">
        <h1 className="font-montserrat  text-slate-800 sm:text-4xl text-2xl font-semibold">
          Create New Note
        </h1>
        {/* <MdNoteAlt className="text-slate-700 text-4xl" /> */}
      </div>
      <div className="h-72 sm:mb-20 lg:mb-14 mb-28">
        <ReactQuill
          className="h-full"
          value={editorContent}
          onChange={handleEditorChange}
          modules={{
            toolbar: [
              [
                {
                  header: [1, 2, 3, 4, 5, 6],
                },
              ],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["clean"],
            ],
          }}
        />
      </div>
      <Button
        disable={loading}
        onClickHandler={handleSubmit}
        className="bg-customRed  text-white px-4 py-2 hover:text-slate-300 rounded-sm"
      >
        {loading ? <span>Loading ...</span> : "Create Note"}
      </Button>
    </div>
  );
};

export default CreateNote;
