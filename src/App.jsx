import { useState, useCallback, useEffect, useRef } from "react"


function App() {

	const [password, setPassword] = useState("");
	const [length, setLength] = useState(6);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [charAllowed, setCharAllowed] = useState(false);

	const passwordRef = useRef(null)

	const passwordGenerator = useCallback(() => {
		let pass = ''
		let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

		if(numberAllowed) {
			str += '0123456789'
		}

		if(charAllowed) {
			str += '!@#$%^&*()_+=[]{}~'
		}

		for(let i = 1; i <= length; i++) {
			let char = Math.floor(Math.random() * str.length + 1)
			pass += str.charAt(char)
		}

		setPassword(pass)

	}, [length, numberAllowed, charAllowed, setPassword]);

	const copyToClipboard = ()=> {
		passwordRef.current?.select()
		window.navigator.clipboard.writeText(password)
	}

	useEffect(() => {
		passwordGenerator()
	},[length, numberAllowed, charAllowed, passwordGenerator])

  return (
		<>
			<div className='w-full max-w-md mx-auto rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
				<h1 className='text-white text-center my-4'>Password Generator</h1>
				<div className='flex rounded-lg overflow-hidden mb-4'>
					<input
						type='text'
						value={password}
						className='outline-none w-full py-2 px-3'
						placeholder='Password'
						readOnly
						ref={passwordRef}
					/>
					<button onClick={copyToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
						Copy
					</button>
				</div>
				<div className='flex text-sm gap-x-2'>
					<div className='flex items-center gap-x-1'>
						<input
							type='range'
							min={6}
							max={50}
							value={length}
							onChange={e => setLength(e.target.value)}
							className='coursor-pointer w-24 h-1'
						/>
						<label>Length: {length}</label>
					</div>
					<div className='flex items-center gap-x-1'>
						<input
							type='checkbox'
							defaultChecked={numberAllowed}
							onChange={() => setNumberAllowed(prev => !prev)}
						/>
						<label htmlFor="numberInput">Numbers</label>
					</div>
					<div className='flex items-center gap-x-1'>
						<input
							type='checkbox'
							defaultChecked={numberAllowed}
							onChange={() => setCharAllowed(prev => !prev)}
						/>
						<label htmlFor="charInput">Characters</label>
					</div>
				</div>
			</div>
		</>
	)
}

export default App

