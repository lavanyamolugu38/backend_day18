
const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Employees error:", error);
      return res.status(500).json({
        error: error.message,
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: "Failed to fetch employees",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      employee_id,
      name,
      department_id,
      role,
    } = req.body;

    if (!employee_id || !name || !department_id || !role) {
      return res.status(400).json({
        error:
          "employee_id, name, department_id and role are required",
      });
    }

    const { data, error } = await supabase
      .from("employees")
      .insert([
        {
          employee_id: employee_id.trim(),
          name: name.trim(),
          department_id: Number(department_id),
          role: role.trim(),
        },
      ])
      .select("*")
      .single();

    if (error) {
      console.error("Employee create error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: "Failed to create employee",
    });
  }
});

module.exports = router;

