import tecnicaBasica from '../model/tecnica.js'

// obtener todas las técnicas básicas

const getTecnicasBasicas = async (req, res) => {
    try {
        const tecnica = await tecnicaBasica.find()
        const totalTecnicas = tecnica.length;

        res.status(200).json({ tecnica, totalTecnicas })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error al obtener las técnicas básicas')
    }
}


// obtener por ID
const getTecnicaById = async (req, res) => {
    const { id } = req.params;

    try {
        const tecnica = await tecnicaBasica.findById(id)

        if (!tecnica) return res.status(404).send('La técnica no existe')

        res.json(tecnica)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error al obtener la técnica')
    }
}


// crear una nueva técnica básica

const createTecnica = async (req, res) => {
    const { nombre, descripcion, ejemplos_de_uso, video_url } = req.body;

    try {
        const nuevaTecnica = new tecnicaBasica({ nombre, descripcion, ejemplos_de_uso, video_url })

        await nuevaTecnica.save()

        res.status(201).json(nuevaTecnica)
    } catch (error) {
        console.error(error.message)
        res.status(400).send('Error al crear la técnica básica')
    }
}
