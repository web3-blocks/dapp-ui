"use client"

import { useSyncExternalStore } from "react"

import { store } from "@/registry/new-york/web3/hooks/store"

export const useSyncProviders = () =>
  useSyncExternalStore(store.subscribe, store.value, store.value)
