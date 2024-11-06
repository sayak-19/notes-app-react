import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Blocks } from "react-loader-spinner";
import api from "../services/api";
import Button from "../utils/Button";
import Errors from "../utils/Errors";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const [editorContent, setEditorContent] = useState(null);
  const [editLoader, setEditLoader] = useState(false);
  const [editEnabled, setEditEnabled] = useState(false);

  const fetchNote = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await api.get(`/notes/${id}`);
      const note = resp.data;
      note.parsedContent = JSON.parse(note.content).content;
      setNote(note);
      //setEditorContent(note.content);
    } catch (error) {
      setError(error.resp?.data?.message);
      console.log("Error fetching note details", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const deleteHandler = async () => {
    setLoading(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note is deleted successfully");
      navigate("/notes");
    } catch (error) {
      toast.error("Failed to delete note");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchNote();
  }, [id, fetchNote]);

  useEffect(() => {
    if (note?.parsedContent) setEditorContent(note.parsedContent);
  }, [note?.parsedContent]);

  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(content);
  };

  const noteEditHandler = async () => {
    if (editorContent.trim().length < 1)
      return toast.error("Note cannot be empty");

    setEditLoader(true);
    try {
      await api.put(`/notes/${id}`, { content: editorContent });
      toast.success("Note updated successfully!!");
      setEditEnabled(false);
      fetchNote();
    } catch (err) {
      toast.error("Failed to update note");
      console.log("Failed to update note ", err);
    } finally {
      setEditLoader(false);
    }
  };

  const onBlackHandler = () => {
    navigate(-1);
  };

  if (error) {
    return <Errors message={error}></Errors>;
  }

  return (
    <div className="min-h-[calc(100vh-74px)] md:px-10 md:py-8 sm:px-6 py-4 px-4">
      <Button
        onClickHandler={onBlackHandler}
        className="bg-btnColor px-4 py-2 rounded-md text-white hover:text-slate-200 mb-3"
      >
        Go Back
      </Button>
      <div className="py-6 px-8 min-h-customHeight shadow-lg shadow-grey-300 rounded-md">
        {!loading && (
          <div className="flex justify-end py-2 gap-2">
            {!editEnabled ? (
              <Button
                onClickHandler={() => setEditEnabled(!editEnabled)}
                className="bg-btnColor text-white px-3 py-1 rounded-md"
              >
                Edit
              </Button>
            ) : (
              <Button
                onClickHandler={() => setEditEnabled(!editEnabled)}
                className="bg-btnColor text-white px-3 py-1 rounded-md"
              >
                Cancel
              </Button>
            )}
            {!editEnabled && (
              <Button
                onClickHandler={deleteHandler}
                className="bg-customRed text-white px-3 py-1 rounded-md"
              >
                Delete
              </Button>
            )}
          </div>
        )}
        <>
          {loading ? (
            <div className="flex flex-col justifycenter items-center h-96">
              <span>
                <Blocks
                  height="70"
                  width="70"
                  color="#4fa94d"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="block-wrapper"
                  visible={true}
                ></Blocks>
              </span>
              <span>Please wait...</span>
            </div>
          ) : (
            <>
              {editEnabled ? (
                <>
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
                          [
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote",
                          ],
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
                    <Button
                      disable={editLoader}
                      onClickHandler={noteEditHandler}
                      className="bg-customRed md:mt-16 mt:28 text-white px-4 py-2 hover:text-slate-300 rounded-sm"
                    >
                      {editLoader ? <span>Loading ...</span> : "Update Note"}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p
                    className="text-slate-900 ql-editor"
                    dangerouslySetInnerHTML={{ __html: note?.parsedContent }}
                  ></p>
                </>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default NoteDetails;
