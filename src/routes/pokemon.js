const express = require('express');
const axios   = require('axios');
const router  = express.Router();

router.get('/pokemon', async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.POKE_API_URL}/pokemon?limit=20&offset=0`
    );
    res.json(data.results);
  } catch {
    res.status(500).json({ error: 'Error al conectar con PokeAPI' });
  }
});

router.get('/pokemon/:name', async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.POKE_API_URL}/pokemon/${req.params.name}`
    );
    res.json({
      id:          data.id,
      name:        data.name,
      types:       data.types.map(t => t.type.name),
      stats:       data.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
      sprite:      data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
      height:      data.height,
      weight:      data.weight,
      abilities:   data.abilities.map(a => a.ability.name),
      speciesUrl:  data.species.url,
    });
  } catch {
    res.status(404).json({ error: 'Pokémon no encontrado' });
  }
});

module.exports = router;
