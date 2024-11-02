import React from "react";
import { truncateText } from "../utils/Utility";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { MdRemoveRedEye } from "react-icons/md";

const NoteElement = ({ content, id, createdAt }) => {
  return (
    <div className="sm:px-5 px-2 py-5 shadow-md bg-noteColor shadow-white rounded-lg min-h-96 max-h-96 relative overflow-hidden">
      <p
        className="text-black font-customWeight ql-editor"
        dangerouslySetInnerHTML={{ __html: truncateText(content) }}
      ></p>
      <div className="flex justify-between items-center  absolute bottom-5 sm:px-5 px-2 left-0 w-full text-slate-700">
        <span>{"10/10/2024"}</span>
        <Link to={`/note/${id}`}>
          {" "}
          <Tooltip title="View Note">
            <IconButton>
              <MdRemoveRedEye className="text-slate-700" />
            </IconButton>
          </Tooltip>
        </Link>
      </div>
    </div>
  );
};

export default NoteElement;
