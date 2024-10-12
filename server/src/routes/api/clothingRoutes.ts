// NEEDS WORK

import express from 'express';
import { Request, Response } from 'express';
import { Clothing, Category } from '../../models/index.js';

const router = express.Router();

// Create a new clothing item
router.post('/', async (req: Request, res: Response) => {
    const { category_id } = req.body;

    try {
        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const { name, description, size, stock_quantity, image_url, price } = req.body;
        const clothing = await Clothing.create({ name, category_id, description, size, stock_quantity, image_url, price, createdAt: new Date(), updatedAt: new Date() });
        return res.status(201).json(clothing);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all clothing items
router.get('/', async (_req: Request, res: Response) => {
    try {
        const clothingItems = await Clothing.findAll({ include: [Category] });
        res.status(200).json(clothingItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single clothing item by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const clothing = await Clothing.findByPk(id, { include: [Category] });
        if (!clothing) {
            return res.status(404).json({ error: 'Clothing item not found' });
        }

        return res.status(200).json(clothing);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a clothing item
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, category_id } = req.body;

    try {
        const clothing = await Clothing.findByPk(id);
        if (!clothing) {
            return res.status(404).json({ error: 'Clothing item not found' });
        }

        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        clothing.name = name;
        clothing.category_id = category_id;
        await clothing.save();

        return res.status(200).json(clothing);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a clothing item
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const clothing = await Clothing.findByPk(id);
        if (!clothing) {
            return res.status(404).json({ error: 'Clothing item not found' });
        }

        await clothing.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export { router as clothingRouter };