const express = require("express");
const router = express.Router();
const Question = require("../model/questionModel");

// get all questions
router.get("/", async (req, res) => {
    try {
        const questions = await Question.find({});
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id);
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get easy
router.get("/complexity/easy", async (req, res) => {
    try {
        const question = await Question.find({ complexity: { $eq: "Easy" } });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get medium
router.get("/complexity/medium", async (req, res) => {
    try {
        const question = await Question.find({ complexity: { $eq: "Medium" } });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get hard
router.get("/complexity/hard", async (req, res) => {
    try {
        const question = await Question.find({ complexity: { $eq: "Hard" } });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// create question
router.post("/add", async (req, res) => {
    const newQuestion = new Question(req.body);
    const existingQuestion = await Question.findOne({ title: newQuestion.title }).exec()
    if (existingQuestion) {
        return res.status(400).send(`Question with the title "${newQuestion.title}" already exists.`);
    }

    try {
        await newQuestion.save();
        res.status(200).json(newQuestion);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, categories, complexity, link } = req.body;
  
    try {
      const question = await Question.findById(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
  
      // Manually update the fields
      question.title = title;
      question.description = description;
      question.categories = categories;
      question.complexity = complexity;
      question.link = link;
  
      // Save the updated document
      await question.save();
  
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// delete question
router.delete("/:id", async(req, res) => {
    const{id} = req.params;

    try {
        const deletedQuestion = await Question.findByIdAndDelete(id);
        if(!deletedQuestion) {
            return res.status(404).json({message: "Question not found"});
        }

        res.status(200).json({ message: "Question deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
})

module.exports = router;
