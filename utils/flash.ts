export const filterError = (flashes: any) => {
  return (name: string) => flashes[`err.${name}`] && flashes[`err.${name}`]
}

export const filterOld = (flashes: any) => {
  return (name: string) =>
    flashes[`old.${name}`] ? flashes[`old.${name}`][0] : ''
}
