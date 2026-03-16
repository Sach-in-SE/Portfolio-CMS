"use client";

import { useEffect, useState } from "react";

type ProjectItem = {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveDemo: string;
  image: string;
  isVisible: boolean;
};

type ContactItem = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
};

type VisitorStats = {
  totalViews: number;
  todayViews: number;
};

export default function AdminPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [visitorStats, setVisitorStats] = useState<VisitorStats>({
    totalViews: 0,
    todayViews: 0,
  });
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [visitorLoading, setVisitorLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");
  const [contactsError, setContactsError] = useState("");
  const [visitorError, setVisitorError] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [createProjectLoading, setCreateProjectLoading] = useState(false);
  const [editProjectLoading, setEditProjectLoading] = useState(false);
  const [createProjectError, setCreateProjectError] = useState("");
  const [editProjectError, setEditProjectError] = useState("");
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [editUploadImageLoading, setEditUploadImageLoading] = useState(false);
  const [uploadImageError, setUploadImageError] = useState("");
  const [editUploadImageError, setEditUploadImageError] = useState("");
  const [editProjectId, setEditProjectId] = useState("");
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveDemo: "",
    image: "",
  });
  const [editProject, setEditProject] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveDemo: "",
    image: "",
  });

  async function loadProjects() {
    setProjectsLoading(true);
    setProjectsError("");

    try {
      const response = await fetch("/api/admin/projects");
      const result = (await response.json()) as {
        success?: boolean;
        data?: ProjectItem[];
      };

      if (!response.ok || !result.success) {
        throw new Error("Failed to fetch projects");
      }

      setProjects(result.data ?? []);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch projects";
      setProjectsError(message);
    } finally {
      setProjectsLoading(false);
    }
  }

  async function loadContacts() {
    setContactsLoading(true);
    setContactsError("");

    try {
      const response = await fetch("/api/admin/contacts");
      const result = (await response.json()) as {
        success?: boolean;
        data?: ContactItem[];
      };

      if (!response.ok || !result.success) {
        throw new Error("Failed to fetch contacts");
      }

      setContacts(result.data ?? []);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch contacts";
      setContactsError(message);
    } finally {
      setContactsLoading(false);
    }
  }

  async function loadVisitorStats() {
    setVisitorLoading(true);
    setVisitorError("");

    try {
      const response = await fetch("/api/visitor");
      const result = (await response.json()) as {
        success?: boolean;
        data?: VisitorStats;
      };

      if (!response.ok || !result.success || !result.data) {
        throw new Error("Failed to fetch visitor analytics");
      }

      setVisitorStats(result.data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch visitor analytics";
      setVisitorError(message);
    } finally {
      setVisitorLoading(false);
    }
  }

  useEffect(() => {
    void loadProjects();
    void loadContacts();
    void loadVisitorStats();
  }, []);

  async function toggleVisibility(id: string, isVisible: boolean) {
    try {
      const response = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, isVisible: !isVisible }),
      });

      if (!response.ok) {
        throw new Error("Failed to update project visibility");
      }

      await loadProjects();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update project visibility";
      setProjectsError(message);
    }
  }

  async function deleteProject(id: string) {
    try {
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      await loadProjects();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete project";
      setProjectsError(message);
    }
  }

  async function deleteContact(id: string) {
    try {
      const response = await fetch(`/api/admin/contacts?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      await loadContacts();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete contact";
      setContactsError(message);
    }
  }

  async function createProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreateProjectError("");
    setCreateProjectLoading(true);

    try {
      const parsedTechStack = newProject.techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newProject.title,
          description: newProject.description,
          techStack: parsedTechStack,
          githubLink: newProject.githubLink,
          liveDemo: newProject.liveDemo,
          image: newProject.image,
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
      };

      if (!response.ok || !result.success) {
        throw new Error("Failed to create project");
      }

      setIsCreateModalOpen(false);
      setNewProject({
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        liveDemo: "",
        image: "",
      });
      await loadProjects();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create project";
      setCreateProjectError(message);
    } finally {
      setCreateProjectLoading(false);
    }
  }

  function openEditModal(project: ProjectItem) {
    setEditProjectError("");
    setEditUploadImageError("");
    setEditProjectId(project._id);
    setEditProject({
      title: project.title ?? "",
      description: project.description ?? "",
      techStack: project.techStack?.join(", ") ?? "",
      githubLink: project.githubLink ?? "",
      liveDemo: project.liveDemo ?? "",
      image: project.image ?? "",
    });
    setIsEditModalOpen(true);
  }

  function closeEditModal() {
    setIsEditModalOpen(false);
    setEditProjectId("");
    setEditProjectError("");
    setEditUploadImageError("");
  }

  async function updateProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editProjectId) {
      setEditProjectError("Project id is missing");
      return;
    }

    setEditProjectError("");
    setEditProjectLoading(true);

    try {
      const parsedTechStack = editProject.techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const response = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editProjectId,
          title: editProject.title,
          description: editProject.description,
          techStack: parsedTechStack,
          githubLink: editProject.githubLink,
          liveDemo: editProject.liveDemo,
          image: editProject.image,
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
      };

      if (!response.ok || !result.success) {
        throw new Error("Failed to update project");
      }

      closeEditModal();
      await loadProjects();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update project";
      setEditProjectError(message);
    } finally {
      setEditProjectLoading(false);
    }
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploadImageError("");
    setUploadImageLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as {
        success?: boolean;
        imageUrl?: string;
      };

      if (!response.ok || !result.success || !result.imageUrl) {
        throw new Error("Failed to upload image");
      }

      setNewProject((prev) => ({ ...prev, image: result.imageUrl ?? "" }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to upload image";
      setUploadImageError(message);
    } finally {
      setUploadImageLoading(false);
      event.target.value = "";
    }
  }

  async function handleEditImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setEditUploadImageError("");
    setEditUploadImageLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as {
        success?: boolean;
        imageUrl?: string;
      };

      if (!response.ok || !result.success || !result.imageUrl) {
        throw new Error("Failed to upload image");
      }

      setEditProject((prev) => ({ ...prev, image: result.imageUrl ?? "" }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to upload image";
      setEditUploadImageError(message);
    } finally {
      setEditUploadImageLoading(false);
      event.target.value = "";
    }
  }

  return (
    <main className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">Portfolio Analytics</h2>

        {visitorError ? (
          <p className="text-sm text-rose-300">{visitorError}</p>
        ) : null}

        {visitorLoading ? (
          <p className="text-sm text-slate-300">Loading analytics...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/70 p-5">
              <p className="text-sm text-slate-300">Total Portfolio Views</p>
              <p className="mt-2 text-3xl font-bold text-slate-100">
                {visitorStats.totalViews}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/70 p-5">
              <p className="text-sm text-slate-300">Today&apos;s Views</p>
              <p className="mt-2 text-3xl font-bold text-slate-100">
                {visitorStats.todayViews}
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-slate-100">Projects Management</h1>
          <button
            type="button"
            onClick={() => {
              setCreateProjectError("");
              setIsCreateModalOpen(true);
            }}
            className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900"
          >
            Add Project
          </button>
        </div>

        {projectsError ? (
          <p className="text-sm text-rose-300">{projectsError}</p>
        ) : null}

        {projectsLoading ? (
          <p className="text-sm text-slate-300">Loading projects...</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/70">
            <table className="min-w-full divide-y divide-white/10 text-sm text-slate-200">
              <thead className="bg-slate-800/60 text-left text-xs uppercase tracking-wide text-slate-300">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Tech Stack</th>
                  <th className="px-4 py-3">Visibility</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td className="px-4 py-3">{project.title}</td>
                    <td className="px-4 py-3">{project.techStack.join(", ")}</td>
                    <td className="px-4 py-3">
                      {project.isVisible ? "Visible" : "Hidden"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(project)}
                          className="rounded-md bg-amber-300 px-3 py-1.5 font-medium text-slate-900"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            void toggleVisibility(project._id, project.isVisible)
                          }
                          className="rounded-md bg-cyan-300 px-3 py-1.5 font-medium text-slate-900"
                        >
                          {project.isVisible ? "Hide" : "Show"}
                        </button>
                        <button
                          type="button"
                          onClick={() => void deleteProject(project._id)}
                          className="rounded-md bg-rose-400 px-3 py-1.5 font-medium text-slate-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {isCreateModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-100">Add Project</h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="rounded-md bg-slate-800 px-3 py-1.5 text-sm text-slate-200"
              >
                Close
              </button>
            </div>

            <form onSubmit={createProject} className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm text-slate-200">
                  Title
                </label>
                <input
                  id="title"
                  value={newProject.title}
                  onChange={(event) =>
                    setNewProject((prev) => ({ ...prev, title: event.target.value }))
                  }
                  className="rounded-lg border border-white/15 bg-slate-950 px-4 py-2 text-sm text-white outline-none"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm text-slate-200">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={newProject.description}
                  onChange={(event) =>
                    setNewProject((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                  className="rounded-lg border border-white/15 bg-slate-950 px-4 py-2 text-sm text-white outline-none"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="techStack" className="text-sm text-slate-200">
                  Tech Stack (comma separated)
                </label>
                <input
                  id="techStack"
                  value={newProject.techStack}
                  onChange={(event) =>
                    setNewProject((prev) => ({
                      ...prev,
                      techStack: event.target.value,
                    }))
                  }
                  className="rounded-lg border border-white/15 bg-slate-950 px-4 py-2 text-sm text-white outline-none"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="githubLink" className="text-sm text-slate-200">
                  GitHub Link
                </label>
                <input
                  id="githubLink"
                  value={newProject.githubLink}
                  onChange={(event) =>
                    setNewProject((prev) => ({
                      ...prev,
                      githubLink: event.target.value,
                    }))
                  }
                  className="rounded-lg border border-white/15 bg-slate-950 px-4 py-2 text-sm text-white outline-none"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="liveDemo" className="text-sm text-slate-200">
                  Live Demo
                </label>
                <input
                  id="liveDemo"
                  value={newProject.liveDemo}
                  onChange={(event) =>
                    setNewProject((prev) => ({
                      ...prev,
                      liveDemo: event.target.value,
                    }))
                  }
                  className="rounded-lg border border-white/15 bg-slate-950 px-4 py-2 text-sm text-white outline-none"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="image" className="text-sm text-slate-200">
                  Image
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={(event) => void handleImageUpload(event)}
                  className="rounded-lg border border-white/15 bg-slate-950 px-4 py-2 text-sm text-white outline-none"
                />
                <p className="text-xs text-slate-400">
                  {uploadImageLoading
                    ? "Uploading image..."
                    : "Select an image to upload and auto-fill the URL."}
                </p>
                <input
                  id="image"
                  value={newProject.image}
                  onChange={(event) =>
                    setNewProject((prev) => ({ ...prev, image: event.target.value }))
                  }
                  className="rounded-lg border border-white/15 bg-slate-950 px-4 py-2 text-sm text-white outline-none"
                  required
                />
                {uploadImageError ? (
                  <p className="text-sm text-rose-300">{uploadImageError}</p>
                ) : null}
              </div>

              {createProjectError ? (
                <p className="text-sm text-rose-300">{createProjectError}</p>
              ) : null}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-md bg-slate-700 px-4 py-2 text-sm text-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createProjectLoading}
                  className="rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900"
                >
                  {createProjectLoading ? "Creating..." : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {isEditModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-100">Edit Project</h3>
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-md bg-slate-800 px-3 py-1.5 text-sm text-slate-200"
              >
                Close
              </button>
            </div>

            <form onSubmit={updateProject} className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="editTitle" className="text-sm text-slate-200">
                  Title
                </label>
                <input
                  id="editTitle"
                  value={editProject.title}
                  onChange={(event) =>
                    setEditProject((prev) => ({ ...prev, title: event.target.value }))
                  }
                  className="rounded-lg border border-white/15 bg-slate-950 px-4 py-2 text-sm text-white outline-none"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="editDescription" className="text-sm text-slate-200">
                  Description
                </label>
                <textarea
                  id="editDescription"
                  rows={4}
                  value={editProject.description}
                  onChange={(event) =>
                    setEditProject((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                  className="rounded-lg border border-white/15 bg-slate-950 px-4 py-2 text-sm text-white outline-none"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="editTechStack" className="text-sm text-slate-200">
                  Tech Stack (comma separated)
                </label>
                <input
                  id="editTechStack"
                  value={editProject.techStack}
                  onChange={(event) =>
                    setEditProject((prev) => ({
                      ...prev,
                      techStack: event.target.value,
                    }))
                  }
                  className="rounded-lg border border-white/15 bg-slate-950 px-4 py-2 text-sm text-white outline-none"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="editGithubLink" className="text-sm text-slate-200">
                  GitHub Link
                </label>
                <input
                  id="editGithubLink"
                  value={editProject.githubLink}
                  onChange={(event) =>
                    setEditProject((prev) => ({
                      ...prev,
                      githubLink: event.target.value,
                    }))
                  }
                  className="rounded-lg border border-white/15 bg-slate-950 px-4 py-2 text-sm text-white outline-none"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="editLiveDemo" className="text-sm text-slate-200">
                  Live Demo
                </label>
                <input
                  id="editLiveDemo"
                  value={editProject.liveDemo}
                  onChange={(event) =>
                    setEditProject((prev) => ({
                      ...prev,
                      liveDemo: event.target.value,
                    }))
                  }
                  className="rounded-lg border border-white/15 bg-slate-950 px-4 py-2 text-sm text-white outline-none"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="editImage" className="text-sm text-slate-200">
                  Image
                </label>
                <input
                  id="editImageUpload"
                  type="file"
                  accept="image/*"
                  onChange={(event) => void handleEditImageUpload(event)}
                  className="rounded-lg border border-white/15 bg-slate-950 px-4 py-2 text-sm text-white outline-none"
                />
                <p className="text-xs text-slate-400">
                  {editUploadImageLoading
                    ? "Uploading image..."
                    : "Select an image to upload and auto-fill the URL."}
                </p>
                <input
                  id="editImage"
                  value={editProject.image}
                  onChange={(event) =>
                    setEditProject((prev) => ({ ...prev, image: event.target.value }))
                  }
                  className="rounded-lg border border-white/15 bg-slate-950 px-4 py-2 text-sm text-white outline-none"
                  required
                />
                {editUploadImageError ? (
                  <p className="text-sm text-rose-300">{editUploadImageError}</p>
                ) : null}
              </div>

              {editProjectError ? (
                <p className="text-sm text-rose-300">{editProjectError}</p>
              ) : null}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-md bg-slate-700 px-4 py-2 text-sm text-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editProjectLoading}
                  className="rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900"
                >
                  {editProjectLoading ? "Updating..." : "Update Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">Contact Queries</h2>

        {contactsError ? (
          <p className="text-sm text-rose-300">{contactsError}</p>
        ) : null}

        {contactsLoading ? (
          <p className="text-sm text-slate-300">Loading contact queries...</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/70">
            <table className="min-w-full divide-y divide-white/10 text-sm text-slate-200">
              <thead className="bg-slate-800/60 text-left text-xs uppercase tracking-wide text-slate-300">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {contacts.map((contact) => (
                  <tr key={contact._id}>
                    <td className="px-4 py-3">{contact.name}</td>
                    <td className="px-4 py-3">{contact.email}</td>
                    <td className="max-w-md px-4 py-3">{contact.message}</td>
                    <td className="px-4 py-3">
                      {contact.createdAt
                        ? new Date(contact.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => void deleteContact(contact._id)}
                        className="rounded-md bg-rose-400 px-3 py-1.5 font-medium text-slate-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
