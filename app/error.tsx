"use client";
import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  // * Use Sentry.io to log  errors on site to view later
  console.log(`Error`, error);
  return (
    <>
      <div className="font-sans">An unexpected error has occurred.</div>
      <button className="btn font-sans" onClick={() => reset()}>
        Retry
      </button>
    </>
  );
};

export default ErrorPage;
