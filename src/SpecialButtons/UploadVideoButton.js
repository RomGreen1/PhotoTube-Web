import React from 'react';

function UploadVideoButton({ onUpload }) {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Simulate a video upload process
            onUpload({ title: file.name, url: URL.createObjectURL(file) });
        }
    };

    return (
        <label className="btn btn-primary">
            Upload New Video
            <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </label>
    );
}

export default UploadVideoButton;