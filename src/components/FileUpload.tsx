import {
  useState,
} from "react";

import {
  toast,
} from "sonner";

const FileUpload = () => {
  const [
    file,
    setFile,
  ] = useState<File | null>(
    null
  );

  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    uploadedUrl,
    setUploadedUrl,
  ] = useState("");

  /* =========================================
     HANDLE UPLOAD
  ========================================= */
  const handleUpload =
    async () => {

      if (!file) {
        toast.error(
          "Please select a file."
        );

        return;
      }

      try {

        setUploading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const response =
          await fetch(
            "http://127.0.0.1:4000/api/upload",
            {
              method: "POST",
              body: formData,
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Upload failed."
          );
        }

        setUploadedUrl(
          data.fileUrl
        );

        toast.success(
          "File uploaded successfully."
        );

      } catch (error: any) {

        toast.error(
          error.message
        );

      } finally {

        setUploading(false);
      }
    };

  return (
    <div className="space-y-4">
      <input
        type="file"
        onChange={(e) =>
          setFile(
            e.target.files?.[0] ||
              null
          )
        }
      />

      <button
        onClick={
          handleUpload
        }
        disabled={
          uploading
        }
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {uploading
          ? "Uploading..."
          : "Upload File"}
      </button>

      {uploadedUrl && (
        <div className="space-y-2">
          <p className="font-medium">
            Uploaded File:
          </p>

          <a
            href={uploadedUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            View Uploaded File
          </a>
        </div>
      )}
    </div>
  );
};

export default FileUpload;