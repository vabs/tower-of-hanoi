import { useState } from "react";
import "./App.css";

function App() {
	const NUM_DICS = 3;

	const [towers, setTowers] = useState([[3, 2, 1], [], []]);
	const [selectedTowerIndex, setSelectedTowerIndex] = useState(undefined);

	function onTowerSelected(clickedTowerIndex) {
		console.log(selectedTowerIndex, clickedTowerIndex);
		if(selectedTowerIndex !== undefined) {
			const selectedTower = towers[selectedTowerIndex];
			const clickedTower = towers[clickedTowerIndex];
			if(selectedTower[0] > (clickedTower[0] ?? 999)) {
				setSelectedTowerIndex(undefined);
				return;
			} else {
				let newTowers = towers;
				const poppedDisc = newTowers[selectedTowerIndex].shift();
				newTowers[clickedTowerIndex].unshift(poppedDisc);
				setTowers(newTowers);
				if(newTowers[2].length === NUM_DICS) {
					alert('you win!');
				}
			}
			setSelectedTowerIndex(undefined);
		} else {
			setSelectedTowerIndex(clickedTowerIndex);
		}
	}

	return (
		<div className="App">
			<h1>Tower of Hanoi</h1>
			<div className="towers">
				{towers.map((tower, towerIndex) => {
					return (
						<div className="tower" key={towerIndex} onClick={() => onTowerSelected(towerIndex)}>
							<div className={"line " + (selectedTowerIndex === towerIndex ? "selected" : "")  } />
								<div className="disks">
									{tower.reverse().map((disk, diskIndex) => {
										return (
											<div
												className="disk"
												style={{
													width: `${disk * 10 + 10}px`,
												}}
												key={diskIndex}
											>
												{disk}
											</div>
										);
									})}
								</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
