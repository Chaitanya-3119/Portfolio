"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  FolderKanban,
  Layers,
  Briefcase,
  GraduationCap,
  PenLine,
  MessageSquareQuote,
  User,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Loader2,
  Mail,
  Bell,
  Check,
} from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

type CollectionName =
  | "projects"
  | "skills"
  | "experiences"
  | "education"
  | "blogs"
  | "testimonials"
  | "profile"
  | "messages";

interface NavItem {
  name: string;
  key: CollectionName;
  icon: React.ReactNode;
}

// Shape shared by every collection the dashboard edits. Values are loosely typed
// because each collection has its own fields, but the fields we render are known.
type FormValue = string | number | boolean;

type AdminItem = {
  _id?: string;
  title?: string;
  name?: string;
  company?: string;
  institution?: string;
  description?: string;
  position?: string;
  degree?: string;
  excerpt?: string;
  content?: string;
  tagline?: string;
  email?: string;
  subject?: string;
  message?: string;
  read?: boolean;
  createdAt?: string;
  socialLinks?: Record<string, string>;
  stats?: Record<string, number>;
  [key: string]: unknown;
};

type FormState = Record<string, FormValue>;

function toFormValue(value: unknown): FormValue {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  if (Array.isArray(value)) return value.join(", ");
  return value == null ? "" : String(value);
}

const navItems: NavItem[] = [
  { name: "Profile", key: "profile", icon: <User size={18} /> },
  { name: "Projects", key: "projects", icon: <FolderKanban size={18} /> },
  { name: "Skills", key: "skills", icon: <Layers size={18} /> },
  { name: "Experience", key: "experiences", icon: <Briefcase size={18} /> },
  { name: "Education", key: "education", icon: <GraduationCap size={18} /> },
  { name: "Blog", key: "blogs", icon: <PenLine size={18} /> },
  { name: "Testimonials", key: "testimonials", icon: <MessageSquareQuote size={18} /> },
  { name: "Messages", key: "messages", icon: <Mail size={18} /> },
];

const fieldConfigs: Record<string, { label: string; type: string; required?: boolean }[]> = {
  projects: [
    { label: "Title", type: "text", required: true },
    { label: "Slug", type: "text", required: true },
    { label: "Description", type: "textarea", required: true },
    { label: "Long Description", type: "textarea" },
    { label: "Image URL", type: "text", required: true },
    { label: "Screenshots (comma separated)", type: "text" },
    { label: "Tags (comma separated)", type: "text" },
    { label: "Live URL", type: "text" },
    { label: "GitHub URL", type: "text" },
    { label: "Year", type: "text" },
    { label: "Role", type: "text" },
    { label: "Status", type: "text" },
    { label: "Highlights (comma separated)", type: "text" },
    { label: "Featured", type: "checkbox" },
    { label: "Order", type: "number" },
  ],
  skills: [
    { label: "Name", type: "text", required: true },
    { label: "Category", type: "text", required: true },
    { label: "Proficiency", type: "number", required: true },
    { label: "Icon (emoji)", type: "text", required: true },
    { label: "Order", type: "number" },
  ],
  experiences: [
    { label: "Company", type: "text", required: true },
    { label: "Position", type: "text", required: true },
    { label: "Description", type: "textarea", required: true },
    { label: "Start Date", type: "text", required: true },
    { label: "End Date", type: "text" },
    { label: "Current", type: "checkbox" },
    { label: "Technologies (comma separated)", type: "text" },
    { label: "Order", type: "number" },
  ],
  education: [
    { label: "Institution", type: "text", required: true },
    { label: "Degree", type: "text", required: true },
    { label: "Field", type: "text", required: true },
    { label: "Start Year", type: "text", required: true },
    { label: "End Year", type: "text" },
    { label: "Current", type: "checkbox" },
    { label: "Grade", type: "text" },
    { label: "Description", type: "textarea" },
    { label: "Order", type: "number" },
  ],
  blogs: [
    { label: "Title", type: "text", required: true },
    { label: "Slug", type: "text", required: true },
    { label: "Excerpt", type: "textarea", required: true },
    { label: "Content", type: "textarea", required: true },
    { label: "Cover Image URL", type: "text", required: true },
    { label: "Tags (comma separated)", type: "text" },
    { label: "Published", type: "checkbox" },
    { label: "Read Time (min)", type: "number" },
  ],
  testimonials: [
    { label: "Name", type: "text", required: true },
    { label: "Position", type: "text", required: true },
    { label: "Company", type: "text", required: true },
    { label: "Content", type: "textarea", required: true },
    { label: "Rating", type: "number" },
    { label: "Order", type: "number" },
  ],
  profile: [
    { label: "Name", type: "text", required: true },
    { label: "Title", type: "text", required: true },
    { label: "Tagline", type: "text", required: true },
    { label: "Bio", type: "textarea", required: true },
    { label: "Avatar URL", type: "text", required: true },
    { label: "Email", type: "text", required: true },
    { label: "Phone", type: "text" },
    { label: "Location", type: "text" },
    { label: "Resume URL", type: "text" },
    { label: "GitHub URL", type: "text" },
    { label: "LinkedIn URL", type: "text" },
    { label: "Twitter URL", type: "text" },
    { label: "Years Experience", type: "number" },
    { label: "Projects Completed", type: "number" },
    { label: "Happy Clients", type: "number" },
    { label: "GitHub Stars", type: "number" },
  ],
  messages: [],
};

function labelToKey(label: string): string {
  const map: Record<string, string> = {
    "Title": "title",
    "Slug": "slug",
    "Description": "description",
    "Long Description": "longDescription",
    "Image URL": "image",
    "Screenshots (comma separated)": "screenshots",
    "Tags (comma separated)": "tags",
    "Live URL": "liveUrl",
    "GitHub URL": "githubUrl",
    "Year": "year",
    "Role": "role",
    "Status": "status",
    "Highlights (comma separated)": "highlights",
    "Featured": "featured",
    "Order": "order",
    "Name": "name",
    "Category": "category",
    "Proficiency": "proficiency",
    "Icon (emoji)": "icon",
    "Company": "company",
    "Position": "position",
    "Start Date": "startDate",
    "End Date": "endDate",
    "Current": "current",
    "Technologies (comma separated)": "technologies",
    "Institution": "institution",
    "Degree": "degree",
    "Field": "field",
    "Start Year": "startYear",
    "End Year": "endYear",
    "Grade": "grade",
    "Excerpt": "excerpt",
    "Content": "content",
    "Cover Image URL": "coverImage",
    "Published": "published",
    "Read Time (min)": "readTime",
    "Rating": "rating",
    "Tagline": "tagline",
    "Bio": "bio",
    "Avatar URL": "avatar",
    "Email": "email",
    "Phone": "phone",
    "Location": "location",
    "Resume URL": "resumeUrl",
    "LinkedIn URL": "linkedin",
    "Twitter URL": "twitter",
    "Years Experience": "yearsExperience",
    "Projects Completed": "projectsCompleted",
    "Happy Clients": "happyClients",
    "GitHub Stars": "githubStars",
  };
  return map[label] || label.toLowerCase().replace(/\s+/g, "");
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<CollectionName>("projects");
  const [items, setItems] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<FormState>({});
  const [sidebarOpen] = useState(true);
  const [testingNotification, setTestingNotification] = useState(false);
  const [notificationFeedback, setNotificationFeedback] = useState<string | null>(null);

  const handleTestNotifications = async () => {
    setTestingNotification(true);
    setNotificationFeedback(null);
    try {
      const res = await fetch("/api/admin/notifications", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setNotificationFeedback(data.message || data.error || "Failed to send test notification");
      } else {
        const channels = Object.keys(data.results || {}).join(", ");
        setNotificationFeedback(
          channels ? `Test notification sent via: ${channels}!` : "Notification test sent!"
        );
      }
    } catch {
      setNotificationFeedback("Failed to trigger test notification.");
    } finally {
      setTestingNotification(false);
      setTimeout(() => setNotificationFeedback(null), 6000);
    }
  };

  const loadItems = useCallback(async (): Promise<AdminItem[]> => {
    const res = await fetch(`/api/admin/${activeTab}`);
    if (!res.ok) return [];
    const data: unknown = await res.json();
    return Array.isArray(data) ? data : data ? [data as AdminItem] : [];
  }, [activeTab]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await loadItems());
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  }, [loadItems]);

  // Load on mount and whenever the collection changes. The fetch is awaited
  // before touching state so the effect never triggers a cascading render.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const next = await loadItems();
        if (active) setItems(next);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [loadItems]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Transform form data
      const payload: Record<string, unknown> & {
        socialLinks?: Record<string, unknown>;
        stats?: Record<string, unknown>;
      } = {};
      const fields = fieldConfigs[activeTab];

      for (const field of fields) {
        const key = labelToKey(field.label);
        let value: unknown = formData[key];

        if (field.label.includes("comma separated") && typeof value === "string") {
          value = value.split(",").map((s: string) => s.trim()).filter(Boolean);
        }
        if (field.type === "number") {
          value = Number(value) || 0;
        }

        // Handle profile social links and stats
        if (activeTab === "profile") {
          if (["github", "linkedin", "twitter"].includes(key)) {
            if (!payload.socialLinks) payload.socialLinks = {};
            payload.socialLinks[key === "githubUrl" ? "github" : key] = value;
            continue;
          }
          if (["yearsExperience", "projectsCompleted", "happyClients", "githubStars"].includes(key)) {
            if (!payload.stats) payload.stats = {};
            payload.stats[key] = value;
            continue;
          }
        }

        payload[key] = value;
      }

      if (editingItem?._id) {
        payload._id = editingItem._id;
        await fetch(`/api/admin/${activeTab}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`/api/admin/${activeTab}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setEditingItem(null);
      setIsCreating(false);
      setFormData({});
      fetchItems();
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await fetch(`/api/admin/${activeTab}?id=${id}`, { method: "DELETE" });
      fetchItems();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const startEditing = (item: AdminItem) => {
    setEditingItem(item);
    setIsCreating(false);
    const data: FormState = {};
    const fields = fieldConfigs[activeTab];

    for (const field of fields) {
      const key = labelToKey(field.label);
      if (activeTab === "profile") {
        if (["github", "linkedin", "twitter"].includes(key)) {
          data[key] = item.socialLinks?.[key] || "";
          continue;
        }
        if (["yearsExperience", "projectsCompleted", "happyClients", "githubStars"].includes(key)) {
          data[key] = item.stats?.[key] || 0;
          continue;
        }
      }
      data[key] = toFormValue(item[key]);
    }
    setFormData(data);
  };

  const startCreating = () => {
    setIsCreating(true);
    setEditingItem(null);
    setFormData({});
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setIsCreating(false);
    setFormData({});
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.03)",
    color: "#f0f0f5",
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "inherit",
    transition: "all 0.3s ease",
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--color-bg-primary)",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? "260px" : "0px",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: sidebarOpen ? "24px 16px" : "0",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          background: "var(--color-bg-secondary)",
          transition: "all 0.3s ease",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "32px",
            padding: "0 8px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              fontWeight: 900,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            C
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1rem" }}>Admin Panel</div>
            <div style={{ fontSize: "0.7rem", color: "#6b6b80" }}>
              Portfolio Manager
            </div>
          </div>
        </div>

        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setActiveTab(item.key);
              setLoading(true);
              cancelEdit();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "none",
              background:
                activeTab === item.key
                  ? "rgba(108,99,255,0.15)"
                  : "transparent",
              color:
                activeTab === item.key ? "#6c63ff" : "#a0a0b8",
              fontSize: "0.9rem",
              fontWeight: activeTab === item.key ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.2s",
              textAlign: "left",
              width: "100%",
              fontFamily: "inherit",
            }}
          >
            {item.icon}
            {item.name}
          </button>
        ))}

        <div style={{ marginTop: "auto", padding: "0 8px" }}>
          <button
            onClick={() => {
              document.cookie = "admin-token=; path=/; max-age=0";
              router.push("/admin");
              router.refresh();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "none",
              background: "rgba(255,107,107,0.1)",
              color: "#ff6b6b",
              fontSize: "0.85rem",
              cursor: "pointer",
              width: "100%",
              fontFamily: "inherit",
            }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "32px", overflow: "auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                marginBottom: "4px",
                textTransform: "capitalize",
              }}
            >
              {activeTab === "profile" ? "Profile Settings" : `Manage ${activeTab}`}
            </h1>
            <p style={{ color: "#6b6b80", fontSize: "0.85rem" }}>
              {activeTab === "profile"
                ? "Update your personal information"
                : `Add, edit, and manage your ${activeTab}`}
            </p>
          </div>

          {activeTab === "messages" && (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {notificationFeedback && (
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#818cf8",
                    background: "rgba(99, 102, 241, 0.1)",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid rgba(99, 102, 241, 0.2)",
                  }}
                >
                  {notificationFeedback}
                </span>
              )}
              <button
                type="button"
                onClick={handleTestNotifications}
                disabled={testingNotification}
                className="btn-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  fontSize: "0.85rem",
                }}
              >
                {testingNotification ? (
                  <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                ) : (
                  <Bell size={16} />
                )}
                <span>Test Notifications</span>
              </button>
            </div>
          )}

          {activeTab !== "profile" && activeTab !== "messages" && !isCreating && !editingItem && (
            <button onClick={startCreating} className="btn-primary">
              <Plus size={18} />
              Add New
            </button>
          )}
        </div>

        {/* Form */}
        {(isCreating || editingItem) && (
          <div
            className="glass-card"
            style={{ padding: "32px", marginBottom: "32px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                {editingItem ? "Edit Item" : "Create New"}
              </h2>
              <button
                onClick={cancelEdit}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "transparent",
                  color: "#a0a0b8",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              {fieldConfigs[activeTab].map((field) => {
                const key = labelToKey(field.label);
                if (field.type === "checkbox") {
                  return (
                    <div
                      key={field.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        gridColumn: "1 / -1",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={!!formData[key]}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.checked })
                        }
                        style={{ width: "18px", height: "18px", accentColor: "#6c63ff" }}
                      />
                      <label style={{ fontSize: "0.9rem", color: "#a0a0b8" }}>
                        {field.label}
                      </label>
                    </div>
                  );
                }
                if (field.type === "textarea") {
                  return (
                    <div
                      key={field.label}
                      style={{ gridColumn: "1 / -1" }}
                    >
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.75rem",
                          color: "#6b6b80",
                          marginBottom: "6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {field.label}{" "}
                        {field.required && (
                          <span style={{ color: "#ff6b6b" }}>*</span>
                        )}
                      </label>
                      <textarea
                        rows={4}
                        value={String(formData[key] ?? "")}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        style={{
                          ...inputStyle,
                          resize: "vertical",
                          minHeight: "100px",
                        }}
                      />
                    </div>
                  );
                }
                const isImageField =
                  key === "image" ||
                  key === "coverImage" ||
                  key === "avatar" ||
                  key === "companyLogo" ||
                  field.label.toLowerCase().includes("image url") ||
                  field.label.toLowerCase().includes("avatar url");

                if (isImageField) {
                  return (
                    <div key={field.label} style={{ gridColumn: "1 / -1" }}>
                      <ImageUpload
                        label={field.label}
                        value={String(formData[key] ?? "")}
                        onChange={(url) => setFormData({ ...formData, [key]: url })}
                        required={field.required}
                        folder={`portfolio/${activeTab}`}
                      />
                    </div>
                  );
                }

                if (key === "screenshots") {
                  return (
                    <div key={field.label} style={{ gridColumn: "1 / -1" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.75rem",
                          color: "#6b6b80",
                          marginBottom: "6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={String(formData[key] ?? "")}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        placeholder="https://res.cloudinary.com/... , https://res.cloudinary.com/..."
                        style={inputStyle}
                      />
                      <div style={{ marginTop: "8px" }}>
                        <ImageUpload
                          label="Upload screenshot to Cloudinary"
                          value=""
                          onChange={(newUrl) => {
                            if (!newUrl) return;
                            const existing = String(formData[key] ?? "").trim();
                            const updated = existing ? `${existing}, ${newUrl}` : newUrl;
                            setFormData({ ...formData, [key]: updated });
                          }}
                          folder="portfolio/screenshots"
                          placeholder="Upload an image to append its Cloudinary URL above"
                        />
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={field.label}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: "#6b6b80",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {field.label}{" "}
                      {field.required && (
                        <span style={{ color: "#ff6b6b" }}>*</span>
                      )}
                    </label>
                    <input
                      type={field.type}
                      value={String(formData[key] ?? "")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [key]:
                            field.type === "number"
                              ? e.target.value
                              : e.target.value,
                        })
                      }
                      style={inputStyle}
                    />
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "24px",
                justifyContent: "flex-end",
              }}
            >
              <button onClick={cancelEdit} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary" disabled={loading}>
                {loading ? (
                  <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                ) : (
                  <Save size={16} />
                )}
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}

        {/* Items list */}
        {loading && !isCreating && !editingItem ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "#6b6b80",
            }}
          >
            <Loader2
              size={32}
              style={{ animation: "spin 1s linear infinite", margin: "0 auto 16px" }}
            />
            <p>Loading...</p>
          </div>
        ) : items.length === 0 && !isCreating ? (
          <div
            className="glass-card"
            style={{
              textAlign: "center",
              padding: "60px 32px",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📭</div>
            <h3 style={{ marginBottom: "8px", fontWeight: 700 }}>
              No {activeTab} yet
            </h3>
            <p style={{ color: "#6b6b80", marginBottom: "24px" }}>
              Start by adding your first {activeTab.slice(0, -1) || activeTab}
            </p>
            {activeTab !== "profile" && (
              <button onClick={startCreating} className="btn-primary">
                <Plus size={18} />
                Add First {activeTab === "education" ? "Education" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)}
              </button>
            )}
          </div>
        ) : (
          !isCreating &&
          !editingItem && (
            activeTab === "messages" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="glass-card"
                    style={{
                      padding: "20px 24px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "16px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                          <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "#fff" }}>
                            {item.name || "Anonymous"}
                          </span>
                          {item.email && (
                            <a
                              href={`mailto:${item.email}`}
                              style={{
                                fontSize: "0.85rem",
                                color: "#818cf8",
                                textDecoration: "underline",
                              }}
                            >
                              {item.email}
                            </a>
                          )}
                        </div>
                        <div
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "#cbd5e1",
                            marginTop: "4px",
                          }}
                        >
                          Subject: {item.subject || "(No subject)"}
                        </div>
                        {item.createdAt && (
                          <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>
                            Received: {new Date(item.createdAt).toLocaleString()}
                          </div>
                        )}
                      </div>

                      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                        {item.email && (
                          <a
                            href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject || "Your message on my portfolio")}`}
                            className="btn-secondary"
                            style={{
                              padding: "6px 12px",
                              fontSize: "0.8rem",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              textDecoration: "none",
                            }}
                          >
                            <Mail size={14} />
                            Reply
                          </a>
                        )}
                        <button
                          onClick={() => item._id && handleDelete(item._id)}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "8px",
                            border: "1px solid rgba(255,107,107,0.2)",
                            background: "rgba(255,107,107,0.08)",
                            color: "#ff6b6b",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          title="Delete message"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "14px 18px",
                        background: "rgba(0, 0, 0, 0.3)",
                        borderRadius: "8px",
                        fontSize: "0.9rem",
                        color: "#e2e8f0",
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.6,
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      {item.message || "(Empty message)"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="glass-card"
                    style={{
                      padding: "20px 24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          marginBottom: "4px",
                        }}
                      >
                        {item.title || item.name || item.company || item.institution || "Untitled"}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#6b6b80" }}>
                        {item.description?.substring(0, 100) ||
                          item.position ||
                          item.degree ||
                          item.excerpt?.substring(0, 100) ||
                          item.content?.substring(0, 100) ||
                          item.tagline ||
                          ""}
                        {((item.description?.length ?? 0) > 100 ||
                          (item.excerpt?.length ?? 0) > 100 ||
                          (item.content?.length ?? 0) > 100) &&
                          "..."}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                      <button
                        onClick={() => startEditing(item)}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          border: "1px solid rgba(108,99,255,0.2)",
                          background: "rgba(108,99,255,0.08)",
                          color: "#6c63ff",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Edit3 size={14} />
                      </button>
                      {activeTab !== "profile" && (
                        <button
                          onClick={() => item._id && handleDelete(item._id)}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "8px",
                            border: "1px solid rgba(255,107,107,0.2)",
                            background: "rgba(255,107,107,0.08)",
                            color: "#ff6b6b",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )
        )}
      </main>
    </div>
  );
}
