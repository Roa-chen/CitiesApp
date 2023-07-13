import React from "react";
import { navRef } from "./main/MainNavigation";

export const navigateToApp = () => {
  navRef.current.reset({
    routes: [{name: "App"}]
  })
}

export const navigateToAuth = () => {
  navRef.current.reset({
    routes: [{name: "Authentification", params: {fromApp: (navRef.current.getState().routes.find(item => item.name==='App') !== undefined)}}]
  })
}

export const navigateToWaitEmail = (params) => {
  navRef.current.reset({
    index: 1,
    routes: [{ name: "Authentification" }, { name: "Authentification", state: { routes: [{ name: "WaitEmail", params: { updateEmail: false, ...params } }] } }]
  })
}

export const isInAuth = () => {
  if (navRef.current?.getState()) {
    return (navRef.current?.getState().routes[0].name === "Authentification")
  }
  return false;

  // console.log('isInAuth navigation getState() : ', navigation.getState())

  // return true;
}