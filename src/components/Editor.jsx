import PropTypes from "prop-types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({ content, setContent, placeholder }) => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={content} // Pastikan `content` adalah string
        onChange={(event, editor) => setContent(editor.getData() || "")} // Selalu simpan data sebagai string
        config={{
          placeholder: placeholder || "Enter content here...",
        }}
      />
    </div>
  );
};

Editor.propTypes = {
  content: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Editor;
