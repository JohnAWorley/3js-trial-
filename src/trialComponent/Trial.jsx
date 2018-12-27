import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as THREE from 'three';

const mapStoreToProps = reduxState => { // making our redux store accessible 
    return {
        reduxState
    }
}


class MoveToReact extends Component {
    

    state = {
        color: `#AARRGGBB`

    }
    handleChange = (event) => {
        console.log('event was here')
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value

        });
        console.log(this.state.color);
        
    }

    dispatchState = () => {
        console.log('dispatching state');
        console.log(this.state.color);
        this.props.dispatch({ type: 'GET_COLOR' });
       
        
        


    }  // dispatching our local state

    componentDidMount() {
        
        for (let i = 0; i < this.props.reduxState.boxColor.length; i++) {
            const element = this.props.reduxState.boxColor[i];
            console.log(element.color);
            
        
        
        let width = this.mount.clientWidth;  // used in our render size
        let height = this.mount.clientHeight; // used in our render size

        this.scene = new THREE.Scene() // new scene 

        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        ) // gives us a camera & other stuff 
        this.camera.position.z = 2; // distance of where camera is in relative to objects


        //renderers
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);

        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshBasicMaterial({ color: element.color });

        this.cube = new THREE.Mesh(geometry, material)

        this.scene.add(this.cube);
        this.start()


        }
    }

    // componentWillUnmount() {
    //     this.stop()
    //     this.mount.removeChild(this.renderer.domElement)
    // }

    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    // stop() {
    //     cancelAnimationFrame(this.frameId)
    // }


    animate = () => {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate) // sets up an animation time 
    }


    renderScene = () => {
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
            <div>
                <div
                    style={{ width: '400px', height: '400px' }}
                    ref={(mount) => { this.mount = mount }}
                />
                
                
                <br></br>
                <input name="color" value={this.state.color} onChange={this.handleChange}></input>
                <button onClick={this.dispatchState}>add hex value</button>
                <button> create new box</button>
                
            </div>
        );
    }
}

export default connect(mapStoreToProps)(MoveToReact);