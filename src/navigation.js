import React from "react"

export const navigationRef = React.createRef()

export const navigateToApp = () => {
  navigationRef.current.resetRoot({
    index: 0,
    routes: [{name: "App", state: {routes: [{name: "Cities List"}]}}]
  })
}

export const navigateToAuth = () => {
  navigationRef.current.resetRoot({
    index: 0,
    routes: [{name: "Authentification"}]
  })
}

export const isOnAuth = () => {
  if (navigationRef.current?.getState()) {
    return (navigationRef.current?.getState().routes[0].name === "Authentification")
  }
  return false;
}