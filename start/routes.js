'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const ok = () => ({ ok: true })
Route.get('', ok)
Route.get('api', ok)

// users
Route.post('api/users', 'UserController.store').validator('User/StoreUser')
Route.get('api/users/:userId', 'UserController.show').middleware(['auth'])
Route.put('api/users', 'UserController.update')
  .middleware(['auth'])
  .validator('User/UpdateUser')

// emails
Route.post('api/emails', 'ConfirmedEmailController.store')
  .validator('ConfirmedEmail/StoreConfirmedEmail')
  .middleware(['auth'])
Route.put('api/emails', 'ConfirmedEmailController.update').validator(
  'ConfirmedEmail/UpdateConfirmedEmail'
)

// sessions
Route.post('api/sessions', 'SessionController.store').validator(
  'Session/StoreSession'
)

// password
Route.post('api/passwords', 'ForgetPasswordController.store').validator(
  'ForgetPassword/StoreForgetPassword'
)
Route.put('api/passwords', 'ForgetPasswordController.update').validator(
  'ForgetPassword/UpdateForgetPassword'
)
// flights
// Route.resource('api/users/flights', 'FlightController')
//   .apiOnly()
//   .middleware(['auth'])
//   .validator(
//     new Map([
//       [['flights.store'], ['Flight/StoreFlight']],
//       [['flights.update'], ['Flight/UpdateFlight']]
//     ])
//   )
// admin
Route.get('api/admin/users', 'AdminController.index').middleware([
  'auth',
  'isAdmin'
])
Route.put('api/admin/users/:userId', 'AdminController.update').middleware([
  'auth',
  'isAdmin'
])
