
const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

/*
  GET ALL PROJECTS
*/
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        id,
        project_name,
        department_id,
        start_date,
        expected_hours,
        status,
        created_at,
        updated_at,
        departments (
          id,
          name
        )
      `)
      .order("id", { ascending: true });

    if (error) {
      console.error("Projects error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: "Failed to fetch projects",
    });
  }
});

/*
  GET ACTIVE PROJECTS
*/
router.get("/active", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        id,
        project_name,
        department_id,
        start_date,
        expected_hours,
        status,
        created_at,
        updated_at,
        departments (
          id,
          name
        )
      `)
      .eq("status", "Active")
      .order("id", { ascending: true });

    if (error) {
      console.error("Active projects error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: "Failed to fetch active projects",
    });
  }
});

/*
  CREATE PROJECT
*/
router.post("/", async (req, res) => {
  try {
    const {
      project_name,
      department_id,
      start_date,
      expected_hours,
    } = req.body;

    if (!project_name || !project_name.trim()) {
      return res.status(400).json({
        error: "Project name is required",
      });
    }

    if (!department_id) {
      return res.status(400).json({
        error: "Department is required",
      });
    }

    if (!start_date) {
      return res.status(400).json({
        error: "Start date is required",
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

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          project_name: project_name.trim(),
          department_id: Number(department_id),
          start_date,
          expected_hours: Number(expected_hours),
          status: "Active",
        },
      ])
      .select(`
        id,
        project_name,
        department_id,
        start_date,
        expected_hours,
        status,
        created_at,
        updated_at,
        departments (
          id,
          name
        )
      `)
      .single();

    if (error) {
      console.error("Project create error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: "Failed to create project",
    });
  }
});

/*
  UPDATE PROJECT
*/
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      project_name,
      department_id,
      start_date,
      expected_hours,
      status,
    } = req.body;

    const updateData = {};

    if (project_name !== undefined) {
      updateData.project_name = project_name.trim();
    }

    if (department_id !== undefined) {
      updateData.department_id = Number(department_id);
    }

    if (start_date !== undefined) {
      updateData.start_date = start_date;
    }

    if (expected_hours !== undefined) {
      updateData.expected_hours = Number(expected_hours);
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("projects")
      .update(updateData)
      .eq("id", id)
      .select(`
        id,
        project_name,
        department_id,
        start_date,
        expected_hours,
        status,
        created_at,
        updated_at,
        departments (
          id,
          name
        )
      `)
      .single();

    if (error) {
      console.error("Project update error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: "Failed to update project",
    });
  }
});

/*
  DELETE PROJECT
*/
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Project delete error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: "Failed to delete project",
    });
  }
});

module.exports = router;

