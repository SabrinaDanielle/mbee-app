import { UserAuthWrapper } from 'redux-auth-wrapper'
import { browserHistory } from 'react-router'
import { LIST_PATH } from 'constants'
import { pathToJS } from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'
import { get } from 'lodash'
import CircularProgress from 'material-ui/CircularProgress'

const AUTHED_REDIRECT = 'AUTHED_REDIRECT'
const UNAUTHED_REDIRECT = 'UNAUTHED_REDIRECT'

/**
 * @description Higher Order Component that redirects to `/login` instead
 * rendering if user is not authenticated (default of redux-auth-wrapper).
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsAuthenticated = UserAuthWrapper({
  // eslint-disable-line new-cap
  wrapperDisplayName: 'UserIsAuthenticated',
  LoadingComponent: LoadingSpinner,
  authSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
  authenticatingSelector: ({ firebase }) =>
    pathToJS(firebase, 'auth') === undefined ||
    pathToJS(firebase, 'isInitializing') === true,
  predicate: auth => auth !== null,
  redirectAction: newLoc => dispatch => {
    browserHistory.replace(newLoc)
    dispatch({
      type: UNAUTHED_REDIRECT,
      payload: { message: 'User is not authenticated.' }
    })
  }
})

/**
 * @description Higher Order Component that redirects to listings page or most
 * recent route instead rendering if user is not authenticated. This is useful
 * routes that should not be displayed if a user is logged in, such as the
 * login route.
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsNotAuthenticated = UserAuthWrapper({
  // eslint-disable-line new-cap
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
  LoadingComponent: LoadingSpinner,
  failureRedirectPath: (state, props) =>
    // redirect to page user was on or to list path
    props.location.query.redirect || LIST_PATH,
  authSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
  authenticatingSelector: ({ firebase }) =>
    pathToJS(firebase, 'auth') === undefined ||
    pathToJS(firebase, 'isInitializing') === true,
  predicate: auth => auth === null,
  redirectAction: newLoc => dispatch => {
    browserHistory.replace(newLoc)
    dispatch({ type: AUTHED_REDIRECT })
  }
})

/**
 * @description Higher Order Component that redirects to the homepage if
 * the user does not have the required permission. This HOC requires that the user
 * profile be loaded and the role property populated
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserHasPermission = permission =>
  UserAuthWrapper({
    wrapperDisplayName: 'UserHasPermission',
    LoadingComponent: CircularProgress,
    allowRedirectBack: false,
    failureRedirectPath: '/login',
    authSelector: ({ firebase: { profile, auth } }) => ({ auth, profile }),
    authenticatingSelector: ({ firebase: { profile, auth, isInitializing } }) =>
      auth === undefined || profile === undefined || isInitializing === true,
    predicate: auth => get(auth, `profile.role.${permission}`, false),
    redirectAction: newLoc => dispatch => {
      browserHistory.replace(newLoc)
      dispatch({ type: UNAUTHED_REDIRECT })
    }
  })

export default {
  UserIsAuthenticated,
  UserIsNotAuthenticated
}
