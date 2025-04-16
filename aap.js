// Basic React app structure for a no-code dynamic form builder

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const fieldTypes = ["text", "dropdown", "checkbox", "radio"];

function FormBuilder() {
  const [fields, setFields] = useState([]);

  const addField = (type) => {
    const newField = {
      id: uuidv4(),
      type,
      label: `${type} field`,
      options: type === "dropdown" || type === "radio" ? ["Option 1"] : [],
    };
    setFields([...fields, newField]);
  };

  const updateLabel = (id, label) => {
    setFields(fields.map(f => f.id === id ? { ...f, label } : f));
  };

  const addOption = (id) => {
    setFields(fields.map(f =>
      f.id === id ? { ...f, options: [...f.options, `Option ${f.options.length + 1}`] } : f
    ));
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return <input type="text" placeholder={field.label} disabled />;
      case "dropdown":
        return (
          <select disabled>
            {field.options.map((opt, idx) => <option key={idx}>{opt}</option>)}
          </select>
        );
      case "checkbox":
        return <input type="checkbox" disabled />;
      case "radio":
        return field.options.map((opt, idx) => (
          <label key={idx}><input type="radio" disabled /> {opt}</label>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Form Builder</h1>
      <div className="flex gap-4 mb-4">
        {fieldTypes.map(type => (
          <button key={type} className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => addField(type)}>
            Add {type}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.id} className="border p-4 rounded bg-white">
            <input
              type="text"
              className="mb-2 p-1 border rounded"
              value={field.label}
              onChange={e => updateLabel(field.id, e.target.value)}
            />
            <div className="mb-2">
              {renderField(field)}
            </div>
            {(field.type === "dropdown" || field.type === "radio") && (
              <button
                className="text-sm bg-gray-200 px-2 py-1 rounded"
                onClick={() => addOption(field.id)}
              >
                Add Option
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormBuilder;
