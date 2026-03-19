
"use client";

import { useState } from "react";

type RequestSubmission = {
  name: string;
  email: string;
  reason: string;
  requestedVolume: number;
  priority: "low" | "medium" | "high";
  signature: string;
};

export default function Home() {
  const [formData, setFormData] = useState<Omit<RequestSubmission, "signature">>({
    name: "",
    email: "",
    reason: "",
    requestedVolume: 50,
    priority: "medium",
  });

  const [signature, setSignature] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<RequestSubmission | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "requestedVolume" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!signature.trim()) {
      alert("Please sign the form before submitting");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    // Create submission object
    const submission: RequestSubmission = {
      ...formData,
      signature,
    };

    // Send email
    sendEmail(submission);
  };

  const sendEmail = async (submission: RequestSubmission) => {
    try {
      setLoading(true);
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      if (response.ok) {
        // Save and show success
        setSubmittedData(submission);
        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({ name: "", email: "", reason: "", requestedVolume: 50, priority: "medium" });
          setSignature("");
          setSubmitted(false);
        }, 5000);
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      alert("Error submitting form. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-none border-2 border-gray-800 p-12">
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">VOLUME ADJUSTMENT REQUEST FORM</h1>
          <p className="text-sm uppercase text-gray-700 tracking-wider">Formal Request for Audio System Modification</p>
        </div>

        {submitted && submittedData ? (
          <div className="bg-gray-50 border-2 border-gray-800 p-8 text-center">
            <p className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">REQUEST SUBMITTED</p>
            <div className="border-t-2 border-b-2 border-gray-800 py-4 mb-6">
              <p className="text-gray-800 font-semibold mb-3">Your volume adjustment request has been formally received and filed.</p>
              <p className="text-sm text-gray-700 font-semibold uppercase tracking-wide">You'll get a reply in 2-3 business days</p>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Requested Volume Level:</strong> {submittedData.requestedVolume}%
            </p>
            <p className="text-sm text-gray-700">
              <strong>Submitted By:</strong> {submittedData.name}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm uppercase font-bold text-gray-900 mb-3 tracking-wide">Full Legal Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border-2 border-gray-400 focus:border-gray-900 focus:outline-none bg-white text-gray-900"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm uppercase font-bold text-gray-900 mb-3 tracking-wide">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-2 border-gray-400 focus:border-gray-900 focus:outline-none bg-white text-gray-900"
                required
              />
            </div>

            {/* Reason Field */}
            <div>
              <label className="block text-sm uppercase font-bold text-gray-900 mb-3 tracking-wide">Justification for Adjustment</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Provide detailed justification for this volume change"
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-400 focus:border-gray-900 focus:outline-none bg-white text-gray-900"
              />
            </div>

            {/* Volume Level Selector */}
            <div className="border-2 border-gray-400 p-6 bg-gray-50">
              <label className="block text-sm uppercase font-bold text-gray-900 mb-4 tracking-wide">
                Requested Volume Level: <span className="text-gray-900 font-bold text-lg">{formData.requestedVolume}%</span>
              </label>
              <input
                type="range"
                name="requestedVolume"
                min="0"
                max="100"
                value={formData.requestedVolume}
                onChange={handleInputChange}
                className="w-full h-3 bg-gray-300 appearance-none cursor-pointer accent-gray-900"
              />
              <div className="flex justify-between text-xs text-gray-700 mt-3 font-semibold">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Priority Level */}
            <div>
              <label className="block text-sm uppercase font-bold text-gray-900 mb-3 tracking-wide">Priority Classification</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-400 focus:border-gray-900 focus:outline-none bg-white text-gray-900"
              >
                <option value="low">LOW - Routine request</option>
                <option value="medium">MEDIUM - Standard request</option>
                <option value="high">HIGH - Urgent request</option>
              </select>
            </div>

            {/* Signature Field */}
            <div className="border-t-2 border-b-2 border-gray-800 py-6">
              <label className="block text-sm uppercase font-bold text-gray-900 mb-3 tracking-wide">Authorized Signature *</label>
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Sign your full name"
                className="w-full px-4 py-3 border-2 border-gray-400 focus:border-gray-900 focus:outline-none bg-white text-gray-900 font-semibold"
                required
              />
              <p className="text-xs text-gray-700 mt-2 uppercase tracking-wider">By signing, you authorize this volume adjustment request and accept all terms and conditions.</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-4 font-bold uppercase tracking-widest hover:bg-black transition duration-200 border-2 border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Request for Review"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}