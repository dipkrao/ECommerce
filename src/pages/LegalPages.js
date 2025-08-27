import React, { useState, useEffect } from "react";
import { legalPageAPI } from "../utils/api";
import "./LegalPages.css";

const LegalPages = () => {
  const [legalPages, setLegalPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchLegalPages();
  }, []);

  const fetchLegalPages = async () => {
    try {
      setLoading(true);
      const response = await legalPageAPI.getAll();
      setLegalPages(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch legal pages");
      console.error("Error fetching legal pages:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageSelect = async (pageType) => {
    try {
      const response = await legalPageAPI.getByType(pageType);
      setSelectedPage(response.data);
      setIsEditing(false);
      setShowPreview(false);
    } catch (err) {
      setError("Failed to fetch page details");
      console.error("Error fetching page details:", err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowPreview(false);
  };

  const handleSave = async () => {
    try {
      await legalPageAPI.update(selectedPage.pageType, selectedPage);
      setIsEditing(false);
      setError(null);
      // Refresh the list
      fetchLegalPages();
    } catch (err) {
      setError("Failed to save changes");
      console.error("Error saving page:", err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowPreview(false);
    // Reset to original data
    if (selectedPage) {
      handlePageSelect(selectedPage.pageType);
    }
  };

  const handleToggleStatus = async (pageType) => {
    try {
      await legalPageAPI.toggleStatus(pageType);
      fetchLegalPages();
      if (selectedPage && selectedPage.pageType === pageType) {
        setSelectedPage((prev) => ({ ...prev, isActive: !prev.isActive }));
      }
    } catch (err) {
      setError("Failed to toggle page status");
      console.error("Error toggling status:", err);
    }
  };

  const handleContentChange = (
    sectionId,
    field,
    value,
    subsectionId = null
  ) => {
    setSelectedPage((prev) => {
      const updated = { ...prev };
      const section = updated.content.sections.find((s) => s.id === sectionId);

      if (subsectionId) {
        const subsection = section.subsections.find(
          (ss) => ss.id === subsectionId
        );
        if (subsection) {
          subsection[field] = value;
        }
      } else {
        section[field] = value;
      }

      return updated;
    });
  };

  const addSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      title: "New Section",
      content: "Section content...",
      subsections: [],
    };

    setSelectedPage((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        sections: [...prev.content.sections, newSection],
      },
    }));
  };

  const addSubsection = (sectionId) => {
    const newSubsection = {
      id: `subsection-${Date.now()}`,
      title: "New Subsection",
      content: "Subsection content...",
    };

    setSelectedPage((prev) => {
      const updated = { ...prev };
      const section = updated.content.sections.find((s) => s.id === sectionId);
      section.subsections.push(newSubsection);
      return updated;
    });
  };

  const removeSection = (sectionId) => {
    setSelectedPage((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.filter((s) => s.id !== sectionId),
      },
    }));
  };

  const removeSubsection = (sectionId, subsectionId) => {
    setSelectedPage((prev) => {
      const updated = { ...prev };
      const section = updated.content.sections.find((s) => s.id === sectionId);
      section.subsections = section.subsections.filter(
        (ss) => ss.id !== subsectionId
      );
      return updated;
    });
  };

  const renderSectionEditor = (section, index) => (
    <div key={section.id} className="section-editor">
      <div className="section-header">
        <input
          type="text"
          value={section.title}
          onChange={(e) =>
            handleContentChange(section.id, "title", e.target.value)
          }
          className="section-title-input"
          placeholder="Section title"
        />
        <button
          onClick={() => removeSection(section.id)}
          className="remove-btn"
          title="Remove section"
        >
          ×
        </button>
      </div>

      <textarea
        value={section.content}
        onChange={(e) =>
          handleContentChange(section.id, "content", e.target.value)
        }
        className="section-content-input"
        placeholder="Section content"
        rows="3"
      />

      {section.subsections.map((subsection, subIndex) => (
        <div key={subsection.id} className="subsection-editor">
          <div className="subsection-header">
            <input
              type="text"
              value={subsection.title}
              onChange={(e) =>
                handleContentChange(
                  section.id,
                  "title",
                  e.target.value,
                  subsection.id
                )
              }
              className="subsection-title-input"
              placeholder="Subsection title"
            />
            <button
              onClick={() => removeSubsection(section.id, subsection.id)}
              className="remove-btn small"
              title="Remove subsection"
            >
              ×
            </button>
          </div>
          <textarea
            value={subsection.content}
            onChange={(e) =>
              handleContentChange(
                section.id,
                "content",
                e.target.value,
                subsection.id
              )
            }
            className="subsection-content-input"
            placeholder="Subsection content"
            rows="2"
          />
        </div>
      ))}

      <button
        onClick={() => addSubsection(section.id)}
        className="add-subsection-btn"
      >
        + Add Subsection
      </button>
    </div>
  );

  const renderPreview = () => {
    if (!selectedPage) return null;

    return (
      <div className="preview-container">
        <div className="preview-header">
          <h2>{selectedPage.title}</h2>
          <p>
            Last updated:{" "}
            {new Date(selectedPage.lastUpdated).toLocaleDateString()}
          </p>
        </div>

        <div className="preview-content">
          {selectedPage.content.sections.map((section) => (
            <section key={section.id} className="legal-section">
              <h2>{section.title}</h2>
              <p>{section.content}</p>

              {section.subsections.map((subsection) => (
                <div key={subsection.id}>
                  <h3>{subsection.title}</h3>
                  <p>{subsection.content}</p>
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading legal pages...</div>;
  }

  return (
    <div className="legal-pages-container">
      <div className="legal-pages-header">
        <h1>Legal Pages Management</h1>
        <p>
          Manage Privacy Policy, Terms of Service, and Cookie Policy content
        </p>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="legal-pages-content">
        <div className="sidebar">
          <h3>Legal Pages</h3>
          <div className="page-list">
            {legalPages.map((page) => (
              <div
                key={page.pageType}
                className={`page-item ${
                  selectedPage?.pageType === page.pageType ? "active" : ""
                }`}
                onClick={() => handlePageSelect(page.pageType)}
              >
                <div className="page-info">
                  <h4>{page.title}</h4>
                  <span
                    className={`status ${
                      page.isActive ? "active" : "inactive"
                    }`}
                  >
                    {page.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleStatus(page.pageType);
                  }}
                  className={`toggle-btn ${
                    page.isActive ? "deactivate" : "activate"
                  }`}
                >
                  {page.isActive ? "Deactivate" : "Activate"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="main-content">
          {selectedPage ? (
            <div className="page-editor">
              <div className="editor-header">
                <h2>{selectedPage.title}</h2>
                <div className="editor-actions">
                  {!isEditing ? (
                    <>
                      <button onClick={handleEdit} className="edit-btn">
                        Edit Content
                      </button>
                      <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="preview-btn"
                      >
                        {showPreview ? "Hide Preview" : "Show Preview"}
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={handleSave} className="save-btn">
                        Save Changes
                      </button>
                      <button onClick={handleCancel} className="cancel-btn">
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>

              {showPreview ? (
                renderPreview()
              ) : (
                <div className="editor-content">
                  <div className="meta-section">
                    <h3>Page Meta Information</h3>
                    <div className="meta-fields">
                      <div className="field">
                        <label>Title:</label>
                        <input
                          type="text"
                          value={selectedPage.title}
                          onChange={(e) =>
                            setSelectedPage((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="field">
                        <label>Description:</label>
                        <input
                          type="text"
                          value={selectedPage.meta?.description || ""}
                          onChange={(e) =>
                            setSelectedPage((prev) => ({
                              ...prev,
                              meta: {
                                ...prev.meta,
                                description: e.target.value,
                              },
                            }))
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="field">
                        <label>Keywords:</label>
                        <input
                          type="text"
                          value={selectedPage.meta?.keywords || ""}
                          onChange={(e) =>
                            setSelectedPage((prev) => ({
                              ...prev,
                              meta: { ...prev.meta, keywords: e.target.value },
                            }))
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="content-section">
                    <div className="section-header">
                      <h3>Page Content</h3>
                      {isEditing && (
                        <button
                          onClick={addSection}
                          className="add-section-btn"
                        >
                          + Add Section
                        </button>
                      )}
                    </div>

                    {selectedPage.content.sections.map((section, index) =>
                      renderSectionEditor(section, index)
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="no-selection">
              <p>Select a legal page from the sidebar to edit its content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalPages;
