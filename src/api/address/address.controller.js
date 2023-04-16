const Address = require("./address.model");

const submitForm = async (req, res) => {
  try {
    const { name, id, address, neighborhood, date } = req.body;
    const idExist = await Address.findOne({ id })
    if (idExist) {
      return res.status(400).json({ mensaje: 'El id ya está registrado' })
    }
      
    const data = await Address.create({
      name,
      id,
      address,
      neighborhood,
      date
    });
    res.status(201).json({ message: "Formulario #"});
  } catch (error) {
    res.status(400).json({
      message: "Usuario administrado no pudo ser creado",
      data: error,
    });
  }
};

module.exports = { submitForm };
