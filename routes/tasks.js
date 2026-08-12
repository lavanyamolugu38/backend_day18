const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

// =========================
// GET ALL TASKS
// =========================
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: true });

    console.log("TASKS DATA:", data);
    console.log("TASKS ERROR:", error);

    if (error) {
      return res.status(500).json({
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
    }

    return res.status(200).json(data || []);
  } catch (error) {
    console.error("GET /tasks server error:", error);

    return res.status(500).json({
      error: error.message || "Failed to fetch tasks",
    });
  }
});

// =========================
// GET TASKS BY PROJECT
// =========================
router.get("/project/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", Number(projectId))
      .order("id", { ascending: true });

    if (error) {
      console.error("GET project tasks error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    return res.status(200).json(data || []);
  } catch (error) {
    console.error("GET project tasks server error:", error);

    return res.status(500).json({
      error: error.message || "Failed to fetch project tasks",
    });
  }
});

// =========================
// CREATE TASK
// =========================
router.post("/", async (req, res) => {
  try {
    const {
      task_name,
      project_id,
      expected_hours,
    } = req.body;

    if (!task_name || !task_name.trim()) {
      return res.status(400).json({
        error: "Task name is required",
      });
    }

    if (!project_id) {
      return res.status(400).json({
        error: "Project ID is required",
      });
    }

    if (
      expected_hours === undefined ||
      expected_hours === null ||
      Number(expected_hours) <= 0
    ) {
      return res.status(400).json({
        error: "Expected hours must be greater than 0",
      });
    }

    // Check project exists
    const {
      data: project,
      error: projectError,
    } = await supabase
      .from("projects")
      .select("id")
      .eq("id", Number(project_id))
      .maybeSingle();

    if (projectError) {
      console.error("Project check error:", projectError);

      return res.status(500).json({
        error: projectError.message,
      });
    }

    if (!project) {
      return res.status(400).json({
        error: "Project does not exist",
      });
    }

    // Create task
    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          task_name: task_name.trim(),
          project_id: Number(project_id),
          expected_hours: Number(expected_hours),
        },
      ])
      .select("*")
      .single();

    if (error) {
      console.error("POST /tasks Supabase error:", error);

      return res.status(500).json({
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
    }

    return res.status(201).json(data);
  } catch (error) {
    console.error("POST /tasks server error:", error);

    return res.status(500).json({
      error: error.message || "Failed to create task",
    });
  }
});

// =========================
// UPDATE TASK
// =========================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      task_name,
      project_id,
      expected_hours,
      status,
    } = req.body;

    const updateData = {};

    if (task_name !== undefined) {
      updateData.task_name = task_name.trim();
    }

    if (project_id !== undefined) {
      updateData.project_id = Number(project_id);
    }

    if (expected_hours !== undefined) {
      updateData.expected_hours = Number(expected_hours);
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    const { data, error } = await supabase
      .from("tasks")
      .update(updateData)
      .eq("id", Number(id))
      .select("*")
      .single();

    if (error) {
      console.error("PUT /tasks error:", error);

      return res.status(500).json({
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("PUT /tasks server error:", error);

    return res.status(500).json({
      error: error.message || "Failed to update task",
    });
  }
});

// =========================
// DELETE TASK
// =========================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", Number(id));

    if (error) {
      console.error("DELETE /tasks error:", error);

      return res.status(500).json({
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /tasks server error:", error);

    return res.status(500).json({
      error: error.message || "Failed to delete task",
    });
  }
});

module.exports = router;