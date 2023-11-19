import { useState } from 'react'

import './Card.scss'

export const Card = ({title, children, preOpen}:
		{title: string, children: JSX.Element, preOpen?: boolean}) => {
	const [open, setOpen] = useState<boolean>(preOpen ? true: false)
	return (
		<div className='Card'>
			<div onClick={() => setOpen(!open)}>
				<h2>{title}{open ? <span>&#x25B2;</span> :
					<span>&#x25BC;</span>}</h2>
			</div>
			{open ? children : null}
		</div>
	)
}
