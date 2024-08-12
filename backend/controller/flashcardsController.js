const { db } = require("../db/connection");

const addCard = (req, res) => {
  const { question, answer } = req.body;
  const sql = "INSERT INTO flashcards (question, answer) VALUES (?, ?)";
  db.query(sql, [question, answer], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, question, answer });
  });
};

const fetchCards = (req, res) => {
  const sql = "SELECT * FROM flashcards";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const updateCard = (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const sql = "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?";
  db.query(sql, [question, answer, id], (err, result) => {
    if (err) throw err;
    res.json({ id, question, answer });
  });
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  const checkSql = "SELECT * FROM flashcards WHERE id = ?";

  db.query(checkSql, [id], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      // If no flashcard with the given id exists
      return res.status(404).json({ message: "Flashcard not found" });
    }

    // If flashcard exists, proceed to delete
    const deleteSql = "DELETE FROM flashcards WHERE id = ?";
    db.query(deleteSql, [id], (err, result) => {
      if (err) throw err;
      res.json({ message: "Flashcard deleted" });
    });
  });
};

module.exports = { addCard, fetchCards, updateCard, deleteCard };
