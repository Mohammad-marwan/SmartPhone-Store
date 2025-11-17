import slugify from 'slugify';
import phoneModel from '../../../DB/models/phone.model.js';

export const create = async (req, res) => {
    try {
        const { name } = req.body;
        const slug = slugify(name);
        const userId = req.id;

        const phone = await phoneModel.create({
            name,
            slug,
            createdBy: userId
        });

        return res.status(200).json({ message: "success", phone });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};

export const get = async (req, res) => {
    try {
        const phone = await phoneModel.find({});
        return res.status(200).json({ message: "success", phone });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};

export const getActive = async (req, res) => {
    try {
        const phone = await phoneModel.find({ status: "active" });
        return res.status(200).json({ message: "success", phone });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};

export const deleted = async (req, res) => {
    try {
        const { id } = req.params;

        const phone = await phoneModel.findByIdAndDelete(id);
        if (!phone) {
            return res.status(400).json({ message: "phone not found" });
        }

        return res.status(200).json({ message: "success" });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        const userId = req.id;
        const phone = await phoneModel.findById(id);

        if (!phone) {
            return res.status(400).json({ message: "phone not found" });
        }

        phone.name = name;
        phone.slug = slugify(name);
        phone.status = status;
        phone.updatedBy = userId;

        await phone.save();

        return res.status(200).json({ message: "success", phone });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};

export const getDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const phone = await phoneModel.findById(id);

        if (!phone) {
            return res.status(400).json({ message: "phone not found" });
        }

        return res.status(200).json({ message: "success", phone });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};
