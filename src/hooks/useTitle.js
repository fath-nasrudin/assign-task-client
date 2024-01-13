import { useEffect } from "react"

const WEBSITE_NAME = 'DanD Repairshop'
const useTitle = (title = null) => {
  useEffect(() => {
    let docTitle = WEBSITE_NAME
    if (title) docTitle = `${title} | ${WEBSITE_NAME}`

    const prevTitle = document.title;
    document.title = docTitle;

    return () => document.title = prevTitle;
  }, [title])
}

export default useTitle