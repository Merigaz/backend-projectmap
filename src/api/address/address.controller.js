const Address = require("./address.model");

const submitForm = async (req, res) => {
  try {
    const { name, id, address, neighborhood, date } = req.body;
    const idExist = await Address.findOne({ id })
    if (idExist) {
      return res.status(400).json({ mensaje: 'El id ya está registrado' })
    }
    const countExist = await Address.findOne({ formCount })
    let formCount = 0
    if (countExist) {
      return formCount = countExist.formCount +1;
    } 
    const data = await Address.create({
      name,
      id,
      address,
      neighborhood,
      date,
      formCount
    });
    res.status(201).json({ message: "Formulario #", data: data.name });
  } catch (error) {
    res.status(400).json({
      message: "Usuario administrado no pudo ser creado",
      data: error,
    });
  }
};

module.exports = { submitForm };
