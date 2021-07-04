import React from "react";

import CharacterEditor from "./components/CharacterEditor";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="stacking">
        <CharacterEditor />
        <div className="wrapper">
          <div className="top"></div>
          <div className="bottom"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
