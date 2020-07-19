'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('home').as('home');

// Auth
Route.on('/login').render('auth.login').as('login');
Route.on('/register').render('auth.register').as('register');

Route.resource('forum', 'ForumController').middleware('auth')
Route.resource('users', 'UserController').middleware('auth')
