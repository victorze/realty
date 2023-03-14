import { Category } from '../models/Category'
import { dbConfig } from './index'

const categories = ['Casa', 'Departamento', 'Bodega', 'Terreno', 'Cabaña']

dbConfig.dataSource
  .initialize()
  .then(async () => {
    await Category.delete({})

    for (const category of categories) {
      const newCategory = new Category()
      newCategory.name = category
      await newCategory.save()
    }

    process.exit()
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
