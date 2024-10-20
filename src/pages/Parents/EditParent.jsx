import React, { useState, useEffect } from 'react';

const EditParent = ({ parentId, onUpdate }) => {
  const [parent, setParent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/parents/${parentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch school data');
        }
        const data = await response.json();
        const parentData = data.parents.find(p => p.id === parentId);
        if (!parentData) {
          throw new Error('Parent not found');
        }
        setParent(parentData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParentData();
  }, [parentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParent(prevParent => ({
      ...prevParent,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await fetch(`http://localhost:4000/parents/${parentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parent),
      });

      if (!response.ok) {
        throw new Error('Failed to update parent data');
      }

      const updatedParent = await response.json();
      setSuccessMessage('Parent details updated successfully!');
      if (onUpdate) {
        onUpdate(updatedParent);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!parent) return <div>Parent not found</div>;

  return (
    <div className="edit-parent">
      <h2>Edit Parent Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={parent.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={parent.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={parent.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="relationship">Relationship:</label>
          <input
            type="text"
            id="relationship"
            name="relationship"
            value={parent.relationship}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Parent'}
        </button>
      </form>
      {successMessage && <div className="success">{successMessage}</div>}
    </div>
  );
};

export default EditParent;