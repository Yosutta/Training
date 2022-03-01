const asyncF = async () => {}
asyncF((resolve, reject) => {
  resolve(true)
})

console.log(asyncF())
