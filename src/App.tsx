import { useEffect, useState } from 'react';
import './styles/global.scss';
import styles from './styles/main.module.scss'
import {Header} from './components/Header'
import {Food} from './components/Food'
import { api } from './services/api';
import Modal from 'react-modal'
import { ModalForm } from './components/ModalForm';


interface Food {
  id: number
  name: string
  description: string
  image: string
  price: number
  availability: boolean
}

function App() {

  const [foods, setFoods] = useState<Food[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const [selectedFood, setSelectedFood] = useState<Food>({} as Food)

  useEffect(() => {
    async function loadFoods() {
      const { data } = await api.get<Food[]>('foods')

      setFoods(data)
    }
    loadFoods()
  }, [])

  function onModalOpen() {
    setIsOpen(true)
  }
  
  function handleDelete(id:number){

    try {
       api.delete(`foods/${id}`)
       setFoods(foods.filter(food => food.id !== id))
    } catch (err) {
        console.log(err)
    }
  }

  function updateModalOpen(food: Food) {
    setSelectedFood(food)
    setIsOpen(true)
  }

  function updateFood(updateFood: Food) {
    setFoods(foods.map(food => food.id === updateFood.id ? updateFood : food))
  }
  
  return (
    <>
      <Header onModalOpen={onModalOpen} />
      <main className={styles.main}>
      {foods.map(food =>(
        <Food food={food} handleDelete={handleDelete} updateModalOpen={() => updateModalOpen(food)} />
      ))}
      </main>
      <Modal 
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false)
          setSelectedFood({} as Food)
        }}
        style={{
          content: {
            width: '50%',
            height: '80%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            paddingLeft: 40,
            paddingRight: 40,
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#F0F0F5',
            border: 0,
            borderRadius:8,
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }
        }}
      >
        <ModalForm
          addFood={food => setFoods([...foods, food])}
          updateFood={updateFood}
          closeModal={() => setIsOpen(false)}
          foodData={selectedFood.id ? selectedFood : undefined}
        />
      </Modal>
    </>
  );
}

export default App;
