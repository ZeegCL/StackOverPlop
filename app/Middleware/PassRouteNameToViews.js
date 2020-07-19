'use strict'

const Env = use('Env');
const Route = use('Route');
const View = use('View');

class PassRouteNameToViews
{

  /**
   * Middleware that adds a function that returns the _name_ of the
   * route from the request.
   *
   * @param {*} { request, _, _ }
   * @param {*} next
   * @memberof PassRouteNameToViews
   */
  async handle({ request, response, view }, next) {
    View.global('routeName', () => {
      return Route.match(request.url(), request.method(), Env.get('HOST')).route.name;
    });

    await next();
  }
}

module.exports = PassRouteNameToViews
