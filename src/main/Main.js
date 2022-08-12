import React from 'react';
import './main.css';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			setArray: Array(9).fill(null),
			count: 0,
			item: ''
		}
	}

	blockClick = e => {
		let data = e.target.getAttribute('data-item');
		this.setState(state => {
			return { item: state.item = data }
		});
		if (this.state.setArray[data] == null) {
			let arr = this.state.setArray;
			this.setState(state => {
				return { count: state.count + 1 }
			});
			(this.state.count % 2 == 0) ? arr[data] = 'X' : arr[data] = 'O';
			this.setState(state => {
				return { setArray: state.setArray = arr }
			});
			e.target.textContent = this.state.setArray[data];

			let arrWin = [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
				[0, 4, 8],
				[2, 4, 6],
			]; // выйгрышные комбинации

			for (let i = 0; i < arrWin.length; i++) {
				if (this.state.setArray[data] == this.state.setArray[arrWin[i][0]]
					&& this.state.setArray[data] == this.state.setArray[arrWin[i][1]]
					&& this.state.setArray[data] == this.state.setArray[arrWin[i][2]]) {

					for (let k = 0; k < 3; k++) {
						let elem = document.querySelector(`[data-item="${arrWin[i][k]}"]`);
						elem.classList.add('active'); // класс active для красного цвета
					}
					setTimeout(() => {
						alert('Вы выйграли!');
						this.setState({ setArray: Array(9).fill(null), count: 0 }); // обнуляем state
						for (let k = 0; k < 3; k++) {
							let elem = document.querySelector(`[data-item="${arrWin[i][k]}"]`);
							elem.classList.remove('active'); // удаляем красный цвет
						}
					}, 10); // setTimeout выполняется в последний момент. Чтобы успели создаться красные квадраты
					break; // останавливаем цикл
				} else if (i == 7) {
					if (this.state.setArray.indexOf(null) == -1) {
						setTimeout(() => {
							alert('Ничья!');
							this.setState({ setArray: Array(9).fill(null), count: 0 });
						}, 0); // ничья в том случае, если не сработал блок if (т.е. не было выйгрышной комбинации) и при этом в setState присвоены все переменные (нету ни одного null)
						break;
					}
				}
			}
			// console.log('Click')
		} else {
			alert('Дважды нельзя нажать!')
		}
	}

	render() {
		console.log('render')
		return (
			<div className="wrapper_block">
				{this.state.setArray.map((elem, index) => {
					return (
						<div key={index} className="block" onClick={this.blockClick} data-item={index}>{this.state.setArray[index]}</div>
					)
				})}
			</div>
		)
	}
}

export default Main;