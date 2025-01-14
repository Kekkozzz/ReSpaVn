import SessionContext from "./SessionContext"
import { useEffect, useState } from "react"
import supabase from "../supabase/client"
import React from "react"

export default function SessionContextProvider({children}) {
  const [session, setSession] = React.useState(null)

  React.useEffect(() => {
    const {data: { subscription }} = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setSession(null)
        } else if (session) {
          setSession(session)
        }
      })

      // const {data: { user }} = supabase.auth.getUser()
      // if (!user)  {
      //   setUser(null)
      // } else {
      //   setUser(user)
      // }

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}
