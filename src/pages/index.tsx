import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Form from "@/components/Form/Form";
import Summary from "@/components/Summary/Summary";
import { useState } from "react";
import LoadingIcons from "react-loading-icons";

export default function Home() {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const summerize = async (transcript: string) => {
    const response = await fetch("/api/summary", {
      method: "POST",
      headers: {
        "Content-Type": "appliction/json",
      },
      body: JSON.stringify({
        message: transcript,
      }),
    });

    const data = await response.json();
    setSummary(data.message.content);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Text Tube</title>
        <meta
          name="description"
          content="Text Tube - TLDW (Too long did not watch) for YouTube"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header>
          <h1>YouText - TLDW (Too Long did not watch) for YouTube Videos</h1>
          <p>
            Enter the URL of a YouTube video below and click "Summarize" to get
            the text summary.
          </p>
        </header>
        <Form onSuccess={summerize} loading={setLoading} />
        {loading ? (
          <LoadingIcons.TailSpin
            stroke="#000000"
            style={{ marginTop: "100px" }}
          />
        ) : (
          <Summary summary={summary} />
        )}
      </main>
      <footer>
        <p>
          &copy; {new Date().getFullYear()} YouText Video Summarizer. All rights
          reserved.
        </p>
      </footer>
    </>
  );
}
