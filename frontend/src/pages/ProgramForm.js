import React, { useState } from "react";

const ProgramForm = () => {
  const [name, setName] = useState("Malaria"); // defaulting to Malaria
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const program = { name, description };

    // Send this to the backend later
    console.log("Program created:", program);
    alert("Program created (check console)!");
  };

  return (
    <div>
      <h2>Create Health Program</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Program Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Create Program</button>
      </form>
    </div>
  );
};

export default ProgramForm;
