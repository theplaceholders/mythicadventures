import Phaser from 'phaser';

class CameraManager {
    constructor(scene, target) {
        this.scene = scene;
        this.target = target;
        this.camera = this.scene.cameras.main;
    }

    initializeCamera(bounds) {
        // Set the camera bounds if provided
        if (bounds) {
            this.camera.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
        }
    }

    setZoom(zoomLevel) {
        // Set the zoom level for the camera
        this.camera.setZoom(zoomLevel);
    }

    startFollowing() {
        // Start following the target sprite
        this.camera.startFollow(this.target);
    }

    // Optionally add more camera behaviors and configurations as needed
    adjustViewport(width, height) {
        // Adjust the viewport to new dimensions if required
        this.camera.setViewport(0, 0, width, height);
    }
}

export default CameraManager;
