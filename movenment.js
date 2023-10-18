import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

function setupMovement(element, cube) {

    let isDragging = false;
    const previousMousePosition = {
        x: 0,
        y: 0,
    };

    element.addEventListener('mousedown', e => {
        isDragging = true;
    });
    element.addEventListener('mousemove', e => {
        const deltaMove = {
            x: e.offsetX - previousMousePosition.x,
            y: e.offsetY - previousMousePosition.y
        };

        if (isDragging) {
            const deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    toRadians(deltaMove.y * 1),
                    toRadians(deltaMove.x * 1),
                    0,
                    'XYZ'
                ));
            cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
        }

        previousMousePosition.x = e.offsetX;
        previousMousePosition.y = e.offsetY;
    });
    element.addEventListener('mouseup', e => {
        isDragging = false;
    });
    element.addEventListener('touchstart', e => {
        isDragging = true;
        const touch = e.touches[0];
        previousMousePosition.x = touch.clientX;
        previousMousePosition.y = touch.clientY;
    });
    element.addEventListener('touchmove', e => {
        const touch = e.touches[0];
        const deltaMove = {
            x: touch.clientX - previousMousePosition.x,
            y: touch.clientY - previousMousePosition.y
        };

        if (isDragging) {
            const deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    toRadians(deltaMove.y * 1),
                    toRadians(deltaMove.x * 1),
                    0,
                    'XYZ'
                ));
            cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
        }

        previousMousePosition.x = touch.clientX;
        previousMousePosition.y = touch.clientY;
        //e.preventDefault(); // スクロールとズームの動作を防ぐ
    });
    element.addEventListener('touchend', e => {
        isDragging = false;
    });
    // 角度をラジアンに変換する関数
    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }
    element.addEventListener('wheel', function (event) {
        // event.deltaY はホイールのスクロール量を示します。
        // ホイールを上にスクロールすると負の値、下にスクロールすると正の値になります。
        var scaleFactor = 1.1;
        if (event.deltaY < 0) {
            // ホイールを上にスクロールすると拡大
            cube.scale.x *= scaleFactor;
            cube.scale.y *= scaleFactor;
            cube.scale.z *= scaleFactor;
        } else {
            // ホイールを下にスクロールすると縮小
            cube.scale.x /= scaleFactor;
            cube.scale.y /= scaleFactor;
            cube.scale.z /= scaleFactor;
        }

        //event.preventDefault(); // ページのスクロールを防ぐ
    }, false);
    let lastTap = 0;
    element.addEventListener('touchend', function (event) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        const DOUBLE_TAP_THRESHOLD = 500; // ミリ秒単位でダブルタップと認識する閾値（ここでは0.5秒）

        if (tapLength < DOUBLE_TAP_THRESHOLD && tapLength > 0) {
            // ダブルタップと見なされる場合、キューブを拡大
            const scaleFactor = 1.5; // 拡大するスケールの量
            cube.scale.x *= scaleFactor;
            cube.scale.y *= scaleFactor;
            cube.scale.z *= scaleFactor;
        }

        lastTap = currentTime; // タップのタイムスタンプを更新
        //event.preventDefault();
    }, false);
}

export { setupMovement };
