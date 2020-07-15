import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <video src={`${window.origin}/api/video/testvideo.mp4`} controls></video>
      </header>
    </div>
  );
}

export default App;
