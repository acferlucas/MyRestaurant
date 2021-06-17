import { FormEvent, useState } from "react"
import { api } from "../../services/api"

import styles from './modalform.module.scss'

interface Food {
  id: number
  name: string
  description: string
  image: string
  price: number
  availability: boolean
}

interface ModalFormProps {
  closeModal: () => void
  addFood: (food: Food) => void
  updateFood: (food: Food) => void
  foodData?: Food
}

export function ModalForm({ addFood,updateFood, closeModal, foodData }: ModalFormProps) {
  const [image, setImage] = useState(() => foodData ? foodData.image : '')
  const [name, setName] = useState(() => foodData ? foodData.name : '')
  const [price, setPrice] = useState(() => foodData ? foodData.price : 0)
  const [description, setDescription] = useState(() => foodData ? foodData.description : '')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const response = await api.post('foods', {
      image,
      name,
      price,
      description
    })

    addFood(response.data)
    closeModal()
  }

  async function handleUpdate(event: FormEvent, id:number) {

    event.preventDefault()

    const response = await api.put(`foods/${id}`, {
      image,
      name,
      price,
      description
    })
    updateFood(response.data)
    closeModal()
  }

  return (
    <form className={styles.form} onSubmit={(e) => foodData ? handleUpdate(e,foodData.id) : handleSubmit(e) }>
      <h1>Novo Prato</h1>
      <div>
        <p>Url da Imagem</p>
        <input type="text" placeholder="Cole o link aqui" value={image} onChange={(e) => setImage(e.target.value)}/>
      </div>
      <div>
        <div>
          <p>Nome do prato</p>
          <input type="text" placeholder="Ex:Moda Italiana" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          <p>Preço</p>
          <input type="number" placeholder="R$" value={price} onChange={(e) => setPrice(Number(e.target.value))}/>
        </div>
      </div>
      <div>
        <p>Discrição do Prato</p>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <footer>
       {foodData ? <button type="submit">Atualizar Prato</button> : <button type="submit">Cadastrar Prato</button> }
      </footer>
    </form>
  )
}