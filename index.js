const express = require('express')
const axios = require('axios')
const app= express()


const port = 3000
app.get('/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name.toLowerCase(); // Nombre del Pokémon desde la URL
  
    try {
      // Hacer la solicitud a la PokéAPI para obtener la información del Pokémon
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      
      // Responder con la información del Pokémon
      res.json({
        name: response.data.name,
        id: response.data.id,
        types: response.data.types.map(type => type.type.name),
        stats: response.data.stats.map(stat => ({
          stat: stat.stat.name,
          base_stat: stat.base_stat
        })),
        abilities: response.data.abilities.map(ability => ability.ability.name),
        height: response.data.height,
        weight: response.data.weight
      });
    } catch (error) {   
      res.status(404).json({ message: `Pokémon '${pokemonName}' no encontrado.` });
    }
  });
  
  app.listen(port, () => {
    console.log(`API REST escuchando en http://localhost:${port}`);
  });