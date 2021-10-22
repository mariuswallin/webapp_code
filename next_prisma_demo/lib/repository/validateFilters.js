/* eslint-disable no-param-reassign */
export const validatedFilters = (validFilters, query) => {
  const filters = Object.keys(query)?.reduce((_filters, key) => {
    if (validFilters.includes(key)) {
      _filters[key] = query[key]
    }

    return _filters
  }, {})

  return {
    hasValidFilters: Object.keys(validFilters)?.length > 0,
    filters,
  }
}
