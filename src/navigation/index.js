import React from "react";
import { navigationRef } from "./main/MainNavigation";

export const navigateToApp = () => {
  navigationRef.current.resetRoot({
    index: 0,
    routes: [{ name: "App", state: { routes: [{ name: "Cities List" }] } }]
  })
}

export const navigateToAuth = () => {
  navigationRef.current.resetRoot({
    index: 0,
    routes: [{ name: "Authentification" }]
  })
}

export const navigateToWaitEmail = (params) => {



  navigationRef.current.resetRoot({
    index: 1,
    routes: [{ name: "Authentification" }, { name: "Authentification", state: { routes: [{ name: "WaitEmail", params: { updateEmail: false, ...params } }] } }]
  })
}

export const isInAuth = () => {
  if (navigationRef.current?.getState()) {
    return (navigationRef.current?.getState().routes[0].name === "Authentification")
  }
  return false;
}