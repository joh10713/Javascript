render () {
	var MyComponent = React.createClass({
		return <div>
			<h1>{this.props.text}</h1>
			<p>This is my first React component!</p>
		</div>
		}
	})

ReactDOM.render(<MyComponent text="Hello World"/>,
	document.getElementById('react-container')
);