import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';

class ArenaModel {
    static generate(manager) {
        return new Promise((resolve, reject) => {
            const mtlLoader = new ColladaLoader(manager);
            mtlLoader.setPath("/curl-a-rama/models/arena/");

            mtlLoader.load("model.dae", (result) => {
                try {
                    const arena = result.scene.children[0];
                    arena.rotateZ(Math.PI / 2);

                    resolve(arena); 
                } catch (e) {
                    console.log(e);
                }
            });
        });
    }
}

export { ArenaModel };
