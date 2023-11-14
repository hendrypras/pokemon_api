import { Router } from 'express'
import {
  catchPokemon,
  getAllPokemon,
  getDetailPokemon,
  getMyPokemon,
  releasePokemon,
  renamePokemon,
} from '../controllers/pokemonCtrl.js'

const router = Router()

// METHOD GET
router.get('/pokemon', getAllPokemon)
router.get('/my-pokemon', getMyPokemon)
router.get('/pokemon/:pokemonId', getDetailPokemon)

// METHOD POST
router.post('/pokemon/catch/:pokemonName', catchPokemon)

// METHOD PUT
router.put('/pokemon/rename/:pokemonId', renamePokemon)

// METHOD DELETE
router.delete('/pokemon/release/:pokemonId', releasePokemon)

export default router
