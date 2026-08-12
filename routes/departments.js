
const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("departments")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Departments error:", error);
      return res.status(500).json({
        error: error.message,
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: "Failed to fetch departments",
    });
  }
});

module.exports = router;

