'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const ok = () => ({ ok: true })
Route.get('', ok)
Route.get('api', ok)

Route.group(() => {
  Route.post('', 'UserController.store').validator('User/StoreUser')
  Route.put('', 'UserController.update')
    .middleware(['auth'])
    .validator('User/UpdateUser')
}).prefix('api/users')

Route.group(() => {
  Route.put('', 'ConfirmedEmailController.update').validator(
    'ConfirmedEmail/UpdateConfirmedEmail'
  )
}).prefix('api/emails')

Route.group(() => {
  Route.post('', 'SessionController.store').validator('Session/StoreSession')
}).prefix('api/sessions')

Route.group(() => {
  Route.post('', 'ForgetPasswordController.store').validator(
    'ForgetPassword/StoreForgetPassword'
  )

  Route.put('', 'ForgetPasswordController.update').validator(
    'ForgetPassword/UpdateForgetPassword'
  )
}).prefix('api/passwords')
