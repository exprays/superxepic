"use client";
import React, { useState } from "react";

export default function ProjectForm({ projectName }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setFormSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="project-form-section">
      <h3>Get updates on {projectName}</h3>
      <p>
        Submit your information below to receive lifecycle updates, private beta invites, or to collaborate with the SuperXEpic team.
      </p>

      {formSubmitted ? (
        <div className="form-success-msg">
          <p>&copy; Thank you! Your request has been logged successfully.</p>
        </div>
      ) : (
        <form className="project-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Satoshi Nakamoto"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@domain.com"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Note / Inquiry (Optional)</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="What are you building or interested in?"
            ></textarea>
          </div>
          <button className="submit-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit Inquiry"}
          </button>
        </form>
      )}
    </section>
  );
}
