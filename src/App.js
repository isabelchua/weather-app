import React, { useState } from 'react';
const api = {
	key: '6c9c8105e788e82c964a04297291f9d6',
	base: 'https://api.openweathermap.org/data/2.5/'
};

function App() {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});
	const [msg, setMsg] = useState('');

	const search = e => {
		if (e.key === 'Enter') {
			fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
				.then(res => {
					if (!res.ok) {
						setMsg("can't find city");
					} else {
						setMsg('');
					}
					//console.log('cant find city');

					return res.json();
				})
				.then(result => {
					setWeather(result);
					setQuery('');
				})
				.catch(err => {
					console.log(err);
				});
		}
	};

	const getDate = d => {
		let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

		let date = String(new window.Date());
		date = date.slice(3, 15);
		let day = days[d.getDay()];

		return `${day}, ${date}`;
	};

	return (
		<div
			className={
				typeof weather.main != 'undefined'
					? weather.main.temp > 70
						? 'app warm'
						: 'app'
					: 'app'
			}
		>
			<main>
				<div className='search-box'>
					<input
						type='text'
						className='search-bar'
						placeholder='Search City..'
						onChange={e => setQuery(e.target.value)}
						onKeyPress={search}
						spellCheck='false'
					/>
					<div className='details'>{msg}</div>
				</div>

				{typeof weather.main != 'undefined' ? (
					<div>
						<div className='location-box'>
							<div className='location details'>
								{weather.name}, {weather.sys.country}
							</div>
							<div className='date'>{getDate(new Date())}</div>
						</div>
						<div className='weather-box'>
							<div className='wrap'>
								<div className='temp'>
									{Math.round(weather.main.temp)}
									<div className='deg'>°</div>
								</div>

								<div className='humidity details'>
									{weather.main.humidity}%
								</div>
							</div>
							<div className='location-box'>
								<div className='feels-like details'>
									feels like {Math.round(weather.main.feels_like)}°
								</div>

								{/* <div className='location details'>
									Wind Speed: {Math.round(weather.wind.speed)}mph
								</div> */}
							</div>

							<div className='weather'>
								{weather.weather[0].description}
							</div>
							<div className='weather'>
								<img
									src={
										'http://openweathermap.org/img/wn/' +
										weather.weather[0].icon +
										'@2x.png'
									}
									alt='weather'
								/>
							</div>
						</div>
					</div>
				) : (
					''
				)}
			</main>
		</div>
	);
}

export default App;
