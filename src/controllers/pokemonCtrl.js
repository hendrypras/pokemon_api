import axios from 'axios'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import joi from 'joi'

import handleResponseSuccess from '../helpers/responseSuccess.js'
import { loadData, storeData } from '../helpers/databaseHelper.js'
import checkPrime from '../helpers/checkPrime.js'
import errorHandler from '../helpers/errorHandler.js'
import fibonacci from '../helpers/generateFibonaci.js'

dotenv.config()

const BASE_URL_POKEMON = process.env.BASE_URL_POKEMON

// get all pokemon
export const getAllPokemon = async (req, res) => {
  try {
    const { pageNumber = 1, pageSize = 20 } = req.query
    const skip = Number(pageSize) * (Number(pageNumber) - 1)
    const response = await axios.get(
      `${BASE_URL_POKEMON}/pokemon?offset=${skip.toString()}&limit=${pageSize.toString()}`
    )
    const pokemonList = response.data
    return handleResponseSuccess(res, 200, 'Ok', pokemonList)
  } catch (error) {
    return errorHandler(res)
  }
}
// get detail pokemon
export const getDetailPokemon = async (req, res) => {
  try {
    const { pokemonId } = req.params
    const response = await axios.get(`${BASE_URL_POKEMON}/pokemon/${pokemonId}`)
    const detailPokemon = response.data
    return handleResponseSuccess(res, 200, 'Ok', detailPokemon)
  } catch (error) {
    return errorHandler(
      res,
      error?.response?.status,
      error?.response?.statusText,
      error?.response?.data === 'Not Found' && 'Pokemon Not Found'
    )
  }
}
// catch pokemon
export const catchPokemon = async (req, res) => {
  try {
    const { pokemonName } = req.params
    const data = loadData()

    await axios.get(`${BASE_URL_POKEMON}/pokemon/${pokemonName.toLowerCase()}`)

    const isSuccess = Math.random() < 0.5
    if (!isSuccess) {
      return errorHandler(res, 200, 'No Content', 'Failed to catch the Pokemon')
    }
    const newData = {
      id: uuidv4(),
      name: pokemonName.toLowerCase(),
      version: 0,
    }

    data.myPokemon.push(newData)
    storeData(data)

    return handleResponseSuccess(res, 201, 'Created', data.myPokemon)
  } catch (error) {
    return errorHandler(
      res,
      error?.response?.status,
      error?.response?.statusText,
      error?.response?.data === 'Not Found' && 'Pokemon Not Found'
    )
  }
}

// get my pokemon
export const getMyPokemon = async (req, res) => {
  try {
    const data = loadData()
    return handleResponseSuccess(res, 200, 'Ok', data.myPokemon)
  } catch (error) {
    return errorHandler(res)
  }
}

// release pokemon
export const releasePokemon = async (req, res) => {
  try {
    const { pokemonId } = req.params
    const data = loadData()
    const findPokemon = data.myPokemon.find(el => el.id === pokemonId)

    if (!findPokemon) {
      return errorHandler(
        res,
        404,
        'Not found',
        'Pokemon not found in your list'
      )
    }
    const randomNumber = Math.floor(Math.random() * 10) + 1

    const isPrime = checkPrime(randomNumber)

    if (!isPrime) {
      return errorHandler(
        res,
        200,
        'Release failed',
        'Pokemon number is not a prime number'
      )
    }
    const filtered = data.myPokemon.filter(el => el.id !== pokemonId)
    data.myPokemon = filtered
    storeData(data)

    return handleResponseSuccess(res, 200, 'Release', data.myPokemon)
  } catch (error) {
    return errorHandler(res)
  }
}

// rename pokemon
export const renamePokemon = async (req, res) => {
  try {
    const { pokemonId } = req.params
    const newName = req.body.name
    const data = loadData()
    const scheme = joi.object({
      name: joi.string().min(3).required(),
    })

    const { error } = scheme.validate({ name: newName })
    if (error) {
      return errorHandler(
        res,
        400,
        'Validation Failed',
        error.details[0].message
      )
    }

    const findPokemon = data.myPokemon.filter(el => el.id === pokemonId)

    if (findPokemon.length === 0) {
      return errorHandler(
        res,
        404,
        'Not found',
        'Pokemon not found in your list'
      )
    }

    const filtered = data.myPokemon.filter(el => el.id !== pokemonId)

    const fibonacciNumber = fibonacci(findPokemon[0]?.version)
    filtered.push({
      id: findPokemon[0]?.id,
      name: `${newName}-${fibonacciNumber}`,
      version: Number(findPokemon[0]?.version) + 1,
    })
    data.myPokemon = filtered
    storeData(data)

    return handleResponseSuccess(res, 200, 'Updated', data.myPokemon)
  } catch (error) {
    return errorHandler(res)
  }
}
