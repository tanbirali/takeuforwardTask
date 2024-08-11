const express = require("express");
const {
  fetchCards,
  addCard,
  updateCard,
  deleteCard,
} = require("../controller/flashcardsController");
const router = express.Router();

router.get("/flashcards", fetchCards);

//Add a flashcard
router.post("/flashcards", addCard);

// Update a flashcard
router.put("/flashcards/:id", updateCard);

// Delete a flashcard
router.delete("/flashcards/:id", deleteCard);

module.exports = router;
