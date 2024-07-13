import { PlusSquare } from "react-bootstrap-icons"

/**
 * TODO: Refactor AddButton and ResetButton so that they share a common icon button component
 *
 * @typedef AddButtonProps
 * @prop {() => void} [onClick]
 */

/**
 * @param {AddButtonProps} props
 */
export const AddButton = props => {
	return <button type="button" className="appearance-none bg-none hover:bg-gray-800 dark:hover:bg-gray-50 border-0 size-10 md:size-auto md:min-w-14 md:h-14 text-inherit block rounded-md transition-all" onClick={() => props.onClick?.()}>
		<PlusSquare size={42} className="inline-block align-middle size-6 md:size-auto" />
	</button>
}
