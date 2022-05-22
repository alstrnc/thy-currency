import { PlusSquare } from "react-bootstrap-icons"
import css from './add-button.module.scss';

export interface IAddButtonProps {
  onClick?: () => void;
}

export const AddButton: React.FC<IAddButtonProps> = props => {
  return <button type="button" className={css.Button} onClick={() => props.onClick?.()}>
    <PlusSquare size={42} className={css.ButtonIcon} />
  </button>
}
