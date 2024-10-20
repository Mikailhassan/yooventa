import React from 'react';

const ClassStreamSelector = ({ school, selectedClass, setSelectedClass, selectedStream, setSelectedStream }) => {
  return (
    <div className="as-class-stream-selector">
      <select
        className="as-select"
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
      >
        <option value="">Select Class</option>
        {school.classes.map((cls, index) => (
          <option key={index} value={cls.name}>{cls.name}</option>
        ))}
      </select>
      
      {selectedClass && (
        <select
          className="as-select"
          value={selectedStream}
          onChange={(e) => setSelectedStream(e.target.value)}
        >
          <option value="">Select Stream</option>
          {school.classes
            .find(cls => cls.name === selectedClass)
            .streams.map((stream, index) => (
              <option key={index} value={stream}>{stream}</option>
            ))
          }
        </select>
      )}
    </div>
  );
};

export default ClassStreamSelector;