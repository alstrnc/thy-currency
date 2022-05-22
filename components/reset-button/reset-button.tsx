import React from "react";
import { ArrowCounterclockwise } from "react-bootstrap-icons";
import css from './reset-button.module.scss'

export interface IResetButtonProps {
  onClick?: () => void;
}

export const ResetButton: React.FC<IResetButtonProps> = props => {
  return <button type="button" className={css.Button} onClick={() => props.onClick?.()}>
    <ArrowCounterclockwise size={42} className={css.ButtonIcon} />
  </button>
}
