const { db } = require("../db/connection");

const addCard = (req, res) => {
  const { question, answer } = req.body;
  const userId = req.user.id;

  const sql =
    "INSERT INTO flashcards (question, answer, user_id) VALUES (?, ?, ?)";
  db.query(sql, [question, answer, userId], (err, result) => {
    if (err) {
      console.error("Error inserting flashcard:", err);
      return res.status(500).json({ message: "Error adding flashcard" });
    }
    res.json({
      id: result.insertId,
      question,
      answer,
      message: "Flashcard added",
    });
  });
};

const fetchCards = (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT * FROM flashcards where user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching flashcards:", err);
      return res.status(500).json({ message: "Error fetching flashcards" });
    }
    res.json(results);
  });
};

const updateCard = (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const userId = req.user.id;

  if (!question || !answer) {
    return res
      .status(400)
      .json({ message: "Question and answer are required" });
  }

  const sql =
    "UPDATE flashcards SET question = ?, answer = ? WHERE id = ? AND user_id = ?";
  db.query(sql, [question, answer, id, userId], (err, result) => {
    if (err) {
      console.error("Error updating flashcard:", err);
      return res.status(500).json({ message: "Error updating flashcard" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    res.json({ id, question, answer, message: "Flashcard updated" });
  });
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const checkSql = "SELECT * FROM flashcards WHERE id = ?";

  db.query(checkSql, [id, userId], (err, result) => {
    if (err) {
      console.error("Error checking flashcard existence:", err);
      return res.status(500).json({ message: "Error checking flashcard" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    const deleteSql = "DELETE FROM flashcards WHERE id = ?";
    db.query(deleteSql, [id], (err, result) => {
      if (err) {
        console.error("Error deleting flashcard:", err);
        return res.status(500).json({ message: "Error deleting flashcard" });
      }
      res.json({ message: "Flashcard deleted" });
    });
  });
};

module.exports = { addCard, fetchCards, updateCard, deleteCard };
