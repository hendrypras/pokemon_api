const errorHandler = (
  res,
  status = 500,
  statusMessage = 'Internar server error',
  message = "Something wen't wrong"
) => {
  return res.status(status).json({ status: statusMessage, message })
}
export default errorHandler
