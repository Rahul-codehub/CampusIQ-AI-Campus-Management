import AppLayout from "@/components/layout/AppLayout";

import FileUpload from "@/components/FileUpload";

const FileUploadPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* =========================================
            HEADER
        ========================================= */}
        <div>
          <h1 className="text-3xl font-bold">
            File Upload
          </h1>

          <p className="text-muted-foreground">
            Upload images and PDF files
          </p>
        </div>

        {/* =========================================
            UPLOAD COMPONENT
        ========================================= */}
        <div className="max-w-xl">
          <FileUpload />
        </div>
      </div>
    </AppLayout>
  );
};

export default FileUploadPage;