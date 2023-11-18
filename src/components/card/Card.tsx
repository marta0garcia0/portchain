import { useState } from 'react'

import './Card.scss'

export const Card = ({title, children}: {title: string, children: JSX.Element}) => {
	const [open, setOpen] = useState<boolean>(false)
	return (
		<div className='Card'>
			<div>
				<h2>{title}{open ? <span onClick={() => setOpen(false)}>&#x25B2;</span> :
					<span onClick={() => setOpen(true)}>&#x25BC;</span>}</h2>
			</div>
			{open ? children : null}
		</div>
	)
}
