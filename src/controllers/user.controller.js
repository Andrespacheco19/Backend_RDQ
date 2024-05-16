const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendError, MESSAGE } = require("../others/errors");

const getAllPackagings = async (req, res) => {
  try {
    const packagings = await prisma.packaging.findMany();
    res.status(200).json({
      success: true,
      data: packagings,
    });
  } catch (error) {
    return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
  }
};

const createPackaging = async (req, res) => {
  try {
    const packagingData = req.body;
    const newPackaging = await prisma.packaging.create({
      data: packagingData,
    });
    res.status(201).json({
      success: true,
      data: newPackaging,
      message: "Packaging creado exitosamente",
    });
  } catch (error) {
    return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
  }
};

const updatePackaging = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedPackaging = await prisma.packaging.update({
      where: { id_packaging: id },
      data: updatedData,
    });
    res.status(200).json({
      success: true,
      data: updatedPackaging,
      message: "Packaging actualizado exitosamente",
    });
  } catch (error) {
    return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
  }
};

const deletePackaging = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.packaging.delete({
      where: { id_packaging: id },
    });
    res.status(200).json({
      success: true,
      message: "Packaging eliminado exitosamente",
    });
  } catch (error) {
    return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
  }
};

module.exports = {
  getAllPackagings,
  createPackaging,
  updatePackaging,
  deletePackaging,
};
