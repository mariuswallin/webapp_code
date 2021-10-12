import { useEffect, useState } from 'react'

export const useOptions = (initialList, property) => {
  const [options, setOptions] = useState()

  useEffect(() => {
    if (initialList) {
      const allOptions = initialList?.map((item) => item[property])
      const uniqueOptions = [...new Set(allOptions)]
      setOptions(uniqueOptions)
    }
  }, [initialList, property])

  return { options }
}
