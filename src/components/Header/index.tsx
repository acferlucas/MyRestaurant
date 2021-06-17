import {FiPlusSquare} from 'react-icons/fi'
import logoImg from '../../assets/Logo.svg'
import styles from './header.module.scss'

interface HeaderProp {
  onModalOpen: () => void
}
export function Header({ onModalOpen }: HeaderProp){
  return (
    <header className={styles.container}>
      <div>
        <img src={logoImg} alt="Logo icon" />
        <button onClick={onModalOpen}>Novo prato <div><FiPlusSquare size={25}/></div></button>
      </div>
    </header>
);
}