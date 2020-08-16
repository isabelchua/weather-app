import React from 'react';
const api = {
	key: '6c9c8105e788e82c964a04297291f9d6',
	base: 'https://api.openweathermap.org/data/2.5'
};

function App() {
	return (
		<div className='App'>
			<main>
				<div className='search-box'>
					<input
						type='text'
						className='search-bar'
						placeholder='Search..'
					/>
				</div>
			</main>
		</div>
	);
}

export default App;
