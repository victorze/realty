import { Category, Price } from '../models'
import { typeorm } from '../config'

const categories = ['Casa', 'Departamento', 'Bodega', 'Terreno', 'Cabaña']
const prices = [
  '0 - $10,000 USD',
  '$10,000 - $30,000 USD',
  '$30,000 - $50,000 USD',
  '$50,000 - $75,000 USD',
  '$75,000 - $100,000 USD',
  '$100,000 - $150,000 USD',
  '$150,000 - $200,000 USD',
  '$200,000 - $300,000 USD',
  '$300,000 - $500,000 USD',
  '+ $500,000 USD',
]

typeorm.dataSource
  .initialize()
  .then(async () => {
    // seed categories
    await Category.delete({})
    for (const category of categories) {
      const newCategory = new Category()
      newCategory.name = category
      await newCategory.save()
    }

    //seed prices
    await Price.delete({})
    for (const price of prices) {
      const newPrice = new Price()
      newPrice.range = price
      await newPrice.save()
    }

    process.exit()
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
