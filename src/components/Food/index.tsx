import {FiEdit3,FiTrash} from 'react-icons/fi'
import Toggle from 'react-switch'
import styles from'./food.module.scss'
import {useState} from 'react'
import { api } from '../../services/api';


interface Food {
  id: number
  name: string
  description: string
  image: string
  price: number
  availability: boolean
}

interface FoodProps {
  food: Food
  handleDelete: (id:number) => void
  updateModalOpen: () => void
}

const moneyFormatter = new Intl.NumberFormat('pt-bt', {
  currency: 'BRL',
  style: 'currency'
})


export function Food({food, handleDelete, updateModalOpen}:FoodProps){
  
  const [isAvailable, setIsAvailable] = useState(food.availability)

  async function handleToggle(){
    try {
      await api.patch(`foods/availability/${food.id}`)

      setIsAvailable(!isAvailable)
    } catch (err) {

    }
  }
  
  return (
    <div className={styles['food-container']}>
      <img
        src={food.image}
        alt={food.name}
        className={!isAvailable ? styles.unavailable : undefined} 
      />
      <div className={styles['text-container']}>
        <h1>{food.name}</h1>
        <p>{food.description}</p>
        <span>{moneyFormatter.format(food.price)}</span>
      </div>
      <footer className={styles.foodFoter}>
        <div>
          <button onClick={updateModalOpen}><FiEdit3 size={25} /></button>
          <button onClick={()=> handleDelete(food.id)}><FiTrash size={25}/></button>
        </div>
        {isAvailable ? <p>Disponivel</p>:<p>Indisponivel</p>}
        <Toggle 
          checked={isAvailable} 
          onChange={handleToggle}
          checkedIcon={false}
          uncheckedIcon={false}
          offColor="#C72828" 
        />
      </footer>
    </div>
  );
}