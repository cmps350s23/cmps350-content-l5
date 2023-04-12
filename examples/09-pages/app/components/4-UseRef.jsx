import { useRef, useEffect } from 'react'

export default function FocusInput() {
	const inputRef = useRef()
	useEffect(() => {
        alert(inputRef.current.value)
		inputRef.current.focus()
	}, [])

	return (
		<div>
			<input ref={inputRef} type="text" value={20} />
		</div>
	)
}