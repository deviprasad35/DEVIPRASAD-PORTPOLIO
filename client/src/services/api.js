/**
 * api.js — Unified API layer.
 *
 * Controls mock vs. real mode via environment variables:
 *   VITE_USE_MOCK_API=true  → returns local data with artificial delay (default)
 *   VITE_USE_MOCK_API=false → calls the real backend at VITE_API_URL
 *
 * NOTE: The contact form is in mock mode and does NOT send emails or store data
 * until the backend phase is complete and VITE_USE_MOCK_API is set to false.
 */

import localProjects from '../data/projects.js';

const isMock = import.meta.env.VITE_USE_MOCK_API !== 'false';
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

/** Artificial delay to simulate network latency in mock mode (ms). */
const MOCK_DELAY = 600;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ── Error helper ───────────────────────────────────────────────────────────

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const checkResponse = async (res) => {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      message = body?.error ?? body?.message ?? message;
    } catch {
      // ignore JSON parse error
    }
    throw new ApiError(message, res.status);
  }
  return res.json();
};

// ── getProjects ────────────────────────────────────────────────────────────

/**
 * Fetch all projects.
 * Mock: returns local data from src/data/projects.js after a short delay.
 * Real: GET ${VITE_API_URL}/api/projects → array of project objects.
 */
export const getProjects = async () => {
  if (isMock) {
    await delay(MOCK_DELAY);
    return [...localProjects];
  }

  const res = await fetch(`${API_URL}/api/projects`);
  return checkResponse(res);
};

// ── sendContact ────────────────────────────────────────────────────────────

/**
 * Send a contact form submission.
 * Mock: resolves after a short delay; logs to console in development only.
 *       Does NOT email or store anything.
 * Real: POST ${VITE_API_URL}/api/contact with { name, email, message }
 *       Expects { success: true } or { success: false, error: string }.
 *
 * @param {{ name: string, email: string, message: string }} data
 * @returns {Promise<{ success: boolean }>}
 */
export const sendContact = async ({ name, email, message }) => {
  if (isMock) {
    await delay(MOCK_DELAY);
    if (import.meta.env.DEV) {
      console.log('[api.js] Contact form submitted (mock mode):', { name, email, message });
      console.log('[api.js] No email was sent. Set VITE_USE_MOCK_API=false to enable the real backend.');
    }
    return { success: true };
  }

  const res = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  });

  const data = await checkResponse(res);
  if (!data.success) {
    throw new ApiError(data.error ?? 'Contact request failed', res.status);
  }
  return data;
};
