<script>

	//Import mount to load window object
	import { onMount } from 'svelte';

	//Get JXG from window
	onMount( () => setJXG( window.JXG ) );
	
	//Set JXG Board and objects
	const setJXG = ( JXG ) => {

		const board = JXG.JSXGraph.initBoard( 'box', { 
			boundingbox: [-8, 4, 8,-4],
			showNavigation: false,
			showCopyright: false
		});

		const mainNode = board.create( 'point', [ -6, 3 ], { visible: false });

		const eye = board.create( 'point', [ () => mainNode.X() + 0.2, () => mainNode.Y() + 0.15], {
			fillcolor: 'black', strokeColor: 'black', size: 1.5
		});
		eye.setLabel('');

		const mouth = board.create( 'segment', [ 
			[() => mainNode.X()+0.1, () => mainNode.Y()-0.15],
			[() => mainNode.X()+0.46, () => mainNode.Y()-0.15]
		], { strokeColor: 'black' });

		const head = board.create( 'circle', [ () => [ mainNode.X(), mainNode.Y() ] , 0.5 ], { strokeColor: 'black' });

		const bodyNodes = [ 
			() => [ mainNode.X(), mainNode.Y() - 0.5 ], 
			() => [ mainNode.X(), mainNode.Y() - 1.5 ]
		];
		const body = board.create( 'segment', bodyNodes, { strokeColor: 'black' });

		const legNodes = [
			() => [ bodyNodes[1]()[0]-0.5, bodyNodes[1]()[1]-1], 
			() => [ bodyNodes[1]()[0]+0.5, bodyNodes[1]()[1]-1]
		];

		const moveLegsNode = board.create( 'point', [0,0], { visible: false });

		const legs = [
			board.create( 'segment', [ bodyNodes[1], () => [
				Math.cos(Math.PI*4/3 + moveLegsNode.X() ) + bodyNodes[1]()[0],
				Math.sin(Math.PI*4/3 + moveLegsNode.X() ) + bodyNodes[1]()[1]
			]], { strokeColor: 'black' }),
			board.create( 'segment', [ bodyNodes[1], () => [
				Math.cos(Math.PI*5/3 - moveLegsNode.X() ) + bodyNodes[1]()[0],
				Math.sin(Math.PI*5/3 - moveLegsNode.X() ) + bodyNodes[1]()[1]
			]], { strokeColor: 'black' })
		];

		const midBody = () => [ mainNode.X(), mainNode.Y()-1];

		const arms = [
			board.create( 'segment', [ midBody, () => [
				Math.cos( Math.PI*5/4 + moveLegsNode.X() ) + midBody()[0],
				Math.sin( Math.PI*5/4 + moveLegsNode.X() ) + midBody()[1]
			]], { strokeColor: 'black' }),
			board.create( 'segment', [ midBody, () => [
				Math.cos( Math.PI*7/4 - moveLegsNode.X() ) + midBody()[0],
				Math.sin( Math.PI*7/4 - moveLegsNode.X() ) + midBody()[1]
			]], { strokeColor: 'black' })
		]

		const moveLegs = (i) => {
			let posNeg = i % 2 === 0 ? 1 : -1;
			let movePI = posNeg === 1 ? Math.PI/3 : Math.PI/28;
			if( i !== 5 ) {
				i++;
				moveLegsNode.moveTo([posNeg*movePI,0], 1000);
				setTimeout( () => {
					moveLegs(i);				
				}, 1000);
			}
		}

		setTimeout(() => {
			mainNode.moveTo([0,3], 5000);
			moveLegs(0);
		}, 1000);

		setTimeout(() => {
			eye.setAttribute("visible:false");
			const firstEye = board.create( 'point', [0.2,3.15], {
				fillcolor: 'black', strokeColor: 'black', size: 1.5
			});
			firstEye.setLabel('');
			firstEye.moveTo([-0.2,3.15], 1000);
			mouth.setAttribute("visible:false");
			const newMouth = board.create( 'segment', [ [0.1, 2.85], [0.46,2.85]], { strokeColor: 'black' });
			newMouth.point1.moveTo([-0.2,2.85], 1000);
			newMouth.point2.moveTo([0.16,2.85], 1000);

		}, 6500);

		setTimeout(() => {
			const secondEye = board.create( 'point', [0.45,3.15], {
				fillcolor: 'black', strokeColor: 'black', size: 1.5
			});
			secondEye.setLabel('');
			secondEye.moveTo([0.2,3.15], 500);
		}, 7000);

		setTimeout(() => {
			arms[0].point1 = [0,0];
		}, 8500);

	}

</script>

<style>
	.jxgbox {
		max-width: 56rem; 
		height: 23rem;
		border: 2px solid black;
	}
</style>

<div id="box" class="jxgbox"></div>