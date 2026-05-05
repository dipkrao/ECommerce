import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { legalAPI } from "../../utils/api";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const [content, setContent] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchPolicy = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await legalAPI.getPrivacyPolicy();
        console.log("🚀 ~ PrivacyPolicy.js:19 ~ fetchPolicy ~ data:", data);
        if (cancelled) return;
        // Support common API response shapes: content, body, html, or raw string
        const text =
          data?.content ??
          data?.body ??
          data?.html ??
          (typeof data === "string" ? data : null);
        if (text != null && String(text).trim() !== "") {
          setContent(String(text));
          setUpdatedAt(data?.updatedAt ?? data?.updated_at ?? null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load privacy policy");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchPolicy();
    return () => {
      cancelled = true;
    };
  }, []);

  const lastUpdated = updatedAt
    ? typeof updatedAt === "string"
      ? new Date(updatedAt).toLocaleDateString()
      : updatedAt
    : new Date().toLocaleDateString();

  if (loading) {
    return (
      <div className="legal-page">
        <div className="legal-container">
          <div className="legal-header">
            <h1>Privacy Policy</h1>
          </div>
          <div className="legal-content legal-content-loading">
            <p>Loading privacy policy…</p>
          </div>
        </div>
      </div>
    );
  }

  if (content) {
    const isHtml = /<[a-z][\s\S]*>/i.test(content);
    return (
      <div className="legal-page">
        <div className="legal-container">
          <div className="legal-header">
            <h1>Privacy Policy</h1>
            <p>Last updated: {lastUpdated}</p>
          </div>
          <div className="legal-content">
            {isHtml ? (
              <div
                className="legal-content-body legal-content-html"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <div className="legal-content-body legal-content-text">
                {content.split(/\n\n+/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </div>
          <div className="legal-footer">
            <Link to="/" className="back-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Privacy Policy</h1>
        </div>
        <div className="legal-content legal-content-loading">
          <p>{error || "Privacy policy is not available."}</p>
        </div>
        <div className="legal-footer">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
