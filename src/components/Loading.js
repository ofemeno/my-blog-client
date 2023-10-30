import { useState, CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";


export function Loading() {

  return (
    <div className="loading">
      <BeatLoader color="#36d7b7" />
    </div>
  );
}
