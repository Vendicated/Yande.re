import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

export default class CenterView extends Component {
	static propTypes = {
		children: PropTypes.node
	};

	render() {
		return (
			<Container>
				<Row className="justify-content-md-center">
					<Col xs lg="2" />
					<Col md="auto">{this.props.children}</Col>
					<Col xs lg="2" />
				</Row>
			</Container>
		);
	}
}
