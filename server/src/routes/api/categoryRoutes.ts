import express from "express";
import type { Request, Response } from "express";
import { Category } from "../../models/index.js";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const category = await Category.findAll();
    res.json(category);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);

    if (!category) {
      res.status(404).json({ message: "No category found with that id" });
    } else {
      res.json(category);
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    res.json(category);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByPk(id);

    if (category) {
      category.name = name;
      await category.save();
    } else {
        res.status(404).json({ message: "No category found with that id" })
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const category = await Category.findByPk(id);

        if (category) {
            await category.destroy();
            res.json({ message: 'Category deleted' })
        } else {
            res.status(404).json({ message: 'No category found with that id' })
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

export { router as categoryRouter };
