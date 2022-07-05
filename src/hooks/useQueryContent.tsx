import { supabase } from '@/util/supabase'
import React from 'react'

export const useQueryContent = () => {
  const getQueryContent = () => {
    const {data, error } = await supabase
  }
  return (
    <div>useQueryContent</div>
  )
}
