import { ArrowCounterclockwise } from "react-bootstrap-icons";

/**
 * @typedef ResetButtonProps
 * @prop {() => void} onClick
 *
 * @param {ResetButtonProps} props
 */
export const ResetButton = props => {
	return <button type="button" className="appearance-none bg-none hover:bg-gray-800 dark:hover:bg-gray-50 border-0 size-10 md:size-auto md:min-w-14 md:h-14 text-inherit block rounded-md transition-all" onClick={() => props.onClick?.()}>
		<ArrowCounterclockwise size={42} className="inline-block align-middle size-6 md:size-auto" />
	</button>
}
