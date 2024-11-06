import React, { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FiFilePlus } from "react-icons/fi";
import api from "../services/api";
import NoteElement from "./NoteElement";
import Errors from "../utils/Errors";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const resp = await api.get("/notes");
      const parsedNotes = resp.data.map((note) => ({
        ...note,
        parsedContent: JSON.parse(note.content).content,
      }));
      setNotes(parsedNotes);
    } catch (e) {
      setError(e.resp.data.message);
      console.log("Error fetching notes", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (error) {
    return <Errors message={error} />;
  }

  return (
    <div className="min-h-[calc(100vh-74px)] sm:py-10 sm:px-5 px-0 py-4">
      <div className="w-[92%] mx-auto">
        {!loading && notes?.length > 0 && (
          <h1 className="font-montserrat text-slate-800 sm:text-4xl text-2xl font-semibold">
            My Notes
          </h1>
        )}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-72">
            <span>
              <Blocks
                height="70"
                width="70"
                color="#4fa94d"
                ariaLabel="block-loading"
                wrapperClass="blocks-wrapper"
                visible={true}
              />
            </span>
            <span>Please wait...</span>
          </div>
        ) : (
          <>
            {notes && notes?.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-96 p-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-grey-800 mb-4">
                    You didn't create any notes yet
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Start by creating a new note to keep track of your thoughts.
                  </p>
                  <div className="w-full flex justify-center">
                    <Link to="/create-note">
                      <button className="flex item-center px-4 py-2 bg-btnColor text-white rounded  focus:outline-none focus:ring-2 focus:ring-blue-300">
                        <FiFilePlus className="mr-2" size={24} />
                        Create a New Note
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="pt-10 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-10 gap-x-5 justify-center">
                  {notes.map((item) => (
                    <NoteElement key={item.id} {...item} id={item.id} />
                    //<p>{item.content}</p>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notes;
