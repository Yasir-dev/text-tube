import React, { useState } from "react";
import styles from "./Form.module.css";

const Form = ({ onSuccess, loading }) => {
  const [error, setError] = useState<string>("");
  const [videoURL, setVideoURL] = useState<string>("");

  const isValidURL = () => {
    // Regular expression pattern for validating YouTube URLs
    const pattern = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}$/;

    // Check if the URL matches the pattern
    if (pattern.test(videoURL)) {
      return true;
    }
    return false;
  };

  const exractVideoId = (): string | null => {
    // Extract the video ID from the URL
    var videoId = videoURL.match(
      /(?<=v=|v\/|vi=|vi\/|youtu\.be\/|\/embed\/|\/v\/|\/e\/|\/u\/\w\/|\/embed\/|\/v=|\/e=|\/u=|youtube\.com\/\w+\/|youtube\.com\/user\/\w+\/|youtube\.com\/v\/)[^#\&\?]{11}/
    );

    if (videoId) {
      return videoId[0];
    }
    return null;
  };

  const handleSubmit = async (event) => {
    loading(true);
    event.preventDefault();

    if (!isValidURL()) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    const videoId = exractVideoId();

    const response = await fetch("/api/transcript", {
      method: "POST",
      body: JSON.stringify({
        videoId: videoId,
      }),
    });
    const data = await response.json();
    onSuccess(data.transcript);
  };

  return (
    <>
      <form className={styles.summarizeForm} onSubmit={handleSubmit}>
        <input
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          type="text"
          id="videoUrl"
          placeholder="Enter YouTube Video URL"
          required
        />
        <button type="submit">Summarize</button>
      </form>
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
    </>
  );
};

export default Form;
