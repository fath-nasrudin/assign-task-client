import { useEffect, useState } from "react";

const PERSIST_KEY = 'persist';

const usePersist = () => {
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem(PERSIST_KEY)) || false)

  useEffect(() => {
    localStorage.setItem(PERSIST_KEY, JSON.stringify(persist))
  }, [persist])

  return [persist, setPersist]
}

export default usePersist;