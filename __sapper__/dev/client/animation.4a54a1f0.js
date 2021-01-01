import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, o as onMount, e as element, c as claim_element, a as children, b as detach_dev, f as attr_dev, h as add_location, j as insert_dev, n as noop, k as create_component, l as claim_component, m as mount_component, t as transition_in, p as transition_out, q as destroy_component } from './client.1c593286.js';

/* src\components\jsxgraph\JsxGraph.svelte generated by Svelte v3.29.3 */
const file = "src\\components\\jsxgraph\\JsxGraph.svelte";

function create_fragment(ctx) {
	let div;

	const block = {
		c: function create() {
			div = element("div");
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { id: true, class: true });
			children(div).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "id", "box");
			attr_dev(div, "class", "jxgbox svelte-1gxcej6");
			add_location(div, file, 123, 0, 3691);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("JsxGraph", slots, []);
	onMount(() => setJXG(window.JXG));

	//Set JXG Board and objects
	const setJXG = JXG => {
		const board = JXG.JSXGraph.initBoard("box", {
			boundingbox: [-8, 4, 8, -4],
			showNavigation: false,
			showCopyright: false
		});

		const mainNode = board.create("point", [-6, 3], { visible: false });

		const eye = board.create("point", [() => mainNode.X() + 0.2, () => mainNode.Y() + 0.15], {
			fillcolor: "black",
			strokeColor: "black",
			size: 1.5
		});

		eye.setLabel("");

		const mouth = board.create(
			"segment",
			[
				[() => mainNode.X() + 0.1, () => mainNode.Y() - 0.15],
				[() => mainNode.X() + 0.46, () => mainNode.Y() - 0.15]
			],
			{ strokeColor: "black" }
		);

		const head = board.create("circle", [() => [mainNode.X(), mainNode.Y()], 0.5], { strokeColor: "black" });

		const bodyNodes = [
			() => [mainNode.X(), mainNode.Y() - 0.5],
			() => [mainNode.X(), mainNode.Y() - 1.5]
		];

		const body = board.create("segment", bodyNodes, { strokeColor: "black" });

		const moveLegsNode = board.create("point", [0, 0], { visible: false });

		const legs = [
			board.create(
				"segment",
				[
					bodyNodes[1],
					() => [
						Math.cos(Math.PI * 4 / 3 + moveLegsNode.X()) + bodyNodes[1]()[0],
						Math.sin(Math.PI * 4 / 3 + moveLegsNode.X()) + bodyNodes[1]()[1]
					]
				],
				{ strokeColor: "black" }
			),
			board.create(
				"segment",
				[
					bodyNodes[1],
					() => [
						Math.cos(Math.PI * 5 / 3 - moveLegsNode.X()) + bodyNodes[1]()[0],
						Math.sin(Math.PI * 5 / 3 - moveLegsNode.X()) + bodyNodes[1]()[1]
					]
				],
				{ strokeColor: "black" }
			)
		];

		const midBody = () => [mainNode.X(), mainNode.Y() - 1];

		const arms = [
			board.create(
				"segment",
				[
					midBody,
					() => [
						Math.cos(Math.PI * 5 / 4 + moveLegsNode.X()) + midBody()[0],
						Math.sin(Math.PI * 5 / 4 + moveLegsNode.X()) + midBody()[1]
					]
				],
				{ strokeColor: "black" }
			),
			board.create(
				"segment",
				[
					midBody,
					() => [
						Math.cos(Math.PI * 7 / 4 - moveLegsNode.X()) + midBody()[0],
						Math.sin(Math.PI * 7 / 4 - moveLegsNode.X()) + midBody()[1]
					]
				],
				{ strokeColor: "black" }
			)
		];

		const moveLegs = i => {
			let posNeg = i % 2 === 0 ? 1 : -1;
			let movePI = posNeg === 1 ? Math.PI / 3 : Math.PI / 28;

			if (i !== 5) {
				i++;
				moveLegsNode.moveTo([posNeg * movePI, 0], 1000);

				setTimeout(
					() => {
						moveLegs(i);
					},
					1000
				);
			}
		};

		setTimeout(
			() => {
				mainNode.moveTo([0, 3], 5000);
				moveLegs(0);
			},
			1000
		);

		setTimeout(
			() => {
				eye.setAttribute("visible:false");

				const firstEye = board.create("point", [0.2, 3.15], {
					fillcolor: "black",
					strokeColor: "black",
					size: 1.5
				});

				firstEye.setLabel("");
				firstEye.moveTo([-0.2, 3.15], 1000);
				mouth.setAttribute("visible:false");
				const newMouth = board.create("segment", [[0.1, 2.85], [0.46, 2.85]], { strokeColor: "black" });
				newMouth.point1.moveTo([-0.2, 2.85], 1000);
				newMouth.point2.moveTo([0.16, 2.85], 1000);
			},
			6500
		);

		setTimeout(
			() => {
				const secondEye = board.create("point", [0.45, 3.15], {
					fillcolor: "black",
					strokeColor: "black",
					size: 1.5
				});

				secondEye.setLabel("");
				secondEye.moveTo([0.2, 3.15], 500);
			},
			7000
		);

		setTimeout(
			() => {
				arms[0].point1 = [0, 0];
			},
			8500
		);
	};

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JsxGraph> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ onMount, setJXG });
	return [];
}

class JsxGraph extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JsxGraph",
			options,
			id: create_fragment.name
		});
	}
}

/* src\routes\animation.svelte generated by Svelte v3.29.3 */

function create_fragment$1(ctx) {
	let jsxgraph;
	let current;
	jsxgraph = new JsxGraph({ $$inline: true });

	const block = {
		c: function create() {
			create_component(jsxgraph.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(jsxgraph.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(jsxgraph, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(jsxgraph.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsxgraph.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsxgraph, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Animation", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Animation> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ JsxGraph });
	return [];
}

class Animation extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Animation",
			options,
			id: create_fragment$1.name
		});
	}
}

export default Animation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLjRhNTRhMWYwLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9qc3hncmFwaC9Kc3hHcmFwaC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cclxuXHJcblx0Ly9JbXBvcnQgbW91bnQgdG8gbG9hZCB3aW5kb3cgb2JqZWN0XHJcblx0aW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSc7XHJcblxyXG5cdC8vR2V0IEpYRyBmcm9tIHdpbmRvd1xyXG5cdG9uTW91bnQoICgpID0+IHNldEpYRyggd2luZG93LkpYRyApICk7XHJcblx0XHJcblx0Ly9TZXQgSlhHIEJvYXJkIGFuZCBvYmplY3RzXHJcblx0Y29uc3Qgc2V0SlhHID0gKCBKWEcgKSA9PiB7XHJcblxyXG5cdFx0Y29uc3QgYm9hcmQgPSBKWEcuSlNYR3JhcGguaW5pdEJvYXJkKCAnYm94JywgeyBcclxuXHRcdFx0Ym91bmRpbmdib3g6IFstOCwgNCwgOCwtNF0sXHJcblx0XHRcdHNob3dOYXZpZ2F0aW9uOiBmYWxzZSxcclxuXHRcdFx0c2hvd0NvcHlyaWdodDogZmFsc2VcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnN0IG1haW5Ob2RlID0gYm9hcmQuY3JlYXRlKCAncG9pbnQnLCBbIC02LCAzIF0sIHsgdmlzaWJsZTogZmFsc2UgfSk7XHJcblxyXG5cdFx0Y29uc3QgZXllID0gYm9hcmQuY3JlYXRlKCAncG9pbnQnLCBbICgpID0+IG1haW5Ob2RlLlgoKSArIDAuMiwgKCkgPT4gbWFpbk5vZGUuWSgpICsgMC4xNV0sIHtcclxuXHRcdFx0ZmlsbGNvbG9yOiAnYmxhY2snLCBzdHJva2VDb2xvcjogJ2JsYWNrJywgc2l6ZTogMS41XHJcblx0XHR9KTtcclxuXHRcdGV5ZS5zZXRMYWJlbCgnJyk7XHJcblxyXG5cdFx0Y29uc3QgbW91dGggPSBib2FyZC5jcmVhdGUoICdzZWdtZW50JywgWyBcclxuXHRcdFx0WygpID0+IG1haW5Ob2RlLlgoKSswLjEsICgpID0+IG1haW5Ob2RlLlkoKS0wLjE1XSxcclxuXHRcdFx0WygpID0+IG1haW5Ob2RlLlgoKSswLjQ2LCAoKSA9PiBtYWluTm9kZS5ZKCktMC4xNV1cclxuXHRcdF0sIHsgc3Ryb2tlQ29sb3I6ICdibGFjaycgfSk7XHJcblxyXG5cdFx0Y29uc3QgaGVhZCA9IGJvYXJkLmNyZWF0ZSggJ2NpcmNsZScsIFsgKCkgPT4gWyBtYWluTm9kZS5YKCksIG1haW5Ob2RlLlkoKSBdICwgMC41IF0sIHsgc3Ryb2tlQ29sb3I6ICdibGFjaycgfSk7XHJcblxyXG5cdFx0Y29uc3QgYm9keU5vZGVzID0gWyBcclxuXHRcdFx0KCkgPT4gWyBtYWluTm9kZS5YKCksIG1haW5Ob2RlLlkoKSAtIDAuNSBdLCBcclxuXHRcdFx0KCkgPT4gWyBtYWluTm9kZS5YKCksIG1haW5Ob2RlLlkoKSAtIDEuNSBdXHJcblx0XHRdO1xyXG5cdFx0Y29uc3QgYm9keSA9IGJvYXJkLmNyZWF0ZSggJ3NlZ21lbnQnLCBib2R5Tm9kZXMsIHsgc3Ryb2tlQ29sb3I6ICdibGFjaycgfSk7XHJcblxyXG5cdFx0Y29uc3QgbGVnTm9kZXMgPSBbXHJcblx0XHRcdCgpID0+IFsgYm9keU5vZGVzWzFdKClbMF0tMC41LCBib2R5Tm9kZXNbMV0oKVsxXS0xXSwgXHJcblx0XHRcdCgpID0+IFsgYm9keU5vZGVzWzFdKClbMF0rMC41LCBib2R5Tm9kZXNbMV0oKVsxXS0xXVxyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdCBtb3ZlTGVnc05vZGUgPSBib2FyZC5jcmVhdGUoICdwb2ludCcsIFswLDBdLCB7IHZpc2libGU6IGZhbHNlIH0pO1xyXG5cclxuXHRcdGNvbnN0IGxlZ3MgPSBbXHJcblx0XHRcdGJvYXJkLmNyZWF0ZSggJ3NlZ21lbnQnLCBbIGJvZHlOb2Rlc1sxXSwgKCkgPT4gW1xyXG5cdFx0XHRcdE1hdGguY29zKE1hdGguUEkqNC8zICsgbW92ZUxlZ3NOb2RlLlgoKSApICsgYm9keU5vZGVzWzFdKClbMF0sXHJcblx0XHRcdFx0TWF0aC5zaW4oTWF0aC5QSSo0LzMgKyBtb3ZlTGVnc05vZGUuWCgpICkgKyBib2R5Tm9kZXNbMV0oKVsxXVxyXG5cdFx0XHRdXSwgeyBzdHJva2VDb2xvcjogJ2JsYWNrJyB9KSxcclxuXHRcdFx0Ym9hcmQuY3JlYXRlKCAnc2VnbWVudCcsIFsgYm9keU5vZGVzWzFdLCAoKSA9PiBbXHJcblx0XHRcdFx0TWF0aC5jb3MoTWF0aC5QSSo1LzMgLSBtb3ZlTGVnc05vZGUuWCgpICkgKyBib2R5Tm9kZXNbMV0oKVswXSxcclxuXHRcdFx0XHRNYXRoLnNpbihNYXRoLlBJKjUvMyAtIG1vdmVMZWdzTm9kZS5YKCkgKSArIGJvZHlOb2Rlc1sxXSgpWzFdXHJcblx0XHRcdF1dLCB7IHN0cm9rZUNvbG9yOiAnYmxhY2snIH0pXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0IG1pZEJvZHkgPSAoKSA9PiBbIG1haW5Ob2RlLlgoKSwgbWFpbk5vZGUuWSgpLTFdO1xyXG5cclxuXHRcdGNvbnN0IGFybXMgPSBbXHJcblx0XHRcdGJvYXJkLmNyZWF0ZSggJ3NlZ21lbnQnLCBbIG1pZEJvZHksICgpID0+IFtcclxuXHRcdFx0XHRNYXRoLmNvcyggTWF0aC5QSSo1LzQgKyBtb3ZlTGVnc05vZGUuWCgpICkgKyBtaWRCb2R5KClbMF0sXHJcblx0XHRcdFx0TWF0aC5zaW4oIE1hdGguUEkqNS80ICsgbW92ZUxlZ3NOb2RlLlgoKSApICsgbWlkQm9keSgpWzFdXHJcblx0XHRcdF1dLCB7IHN0cm9rZUNvbG9yOiAnYmxhY2snIH0pLFxyXG5cdFx0XHRib2FyZC5jcmVhdGUoICdzZWdtZW50JywgWyBtaWRCb2R5LCAoKSA9PiBbXHJcblx0XHRcdFx0TWF0aC5jb3MoIE1hdGguUEkqNy80IC0gbW92ZUxlZ3NOb2RlLlgoKSApICsgbWlkQm9keSgpWzBdLFxyXG5cdFx0XHRcdE1hdGguc2luKCBNYXRoLlBJKjcvNCAtIG1vdmVMZWdzTm9kZS5YKCkgKSArIG1pZEJvZHkoKVsxXVxyXG5cdFx0XHRdXSwgeyBzdHJva2VDb2xvcjogJ2JsYWNrJyB9KVxyXG5cdFx0XVxyXG5cclxuXHRcdGNvbnN0IG1vdmVMZWdzID0gKGkpID0+IHtcclxuXHRcdFx0bGV0IHBvc05lZyA9IGkgJSAyID09PSAwID8gMSA6IC0xO1xyXG5cdFx0XHRsZXQgbW92ZVBJID0gcG9zTmVnID09PSAxID8gTWF0aC5QSS8zIDogTWF0aC5QSS8yODtcclxuXHRcdFx0aWYoIGkgIT09IDUgKSB7XHJcblx0XHRcdFx0aSsrO1xyXG5cdFx0XHRcdG1vdmVMZWdzTm9kZS5tb3ZlVG8oW3Bvc05lZyptb3ZlUEksMF0sIDEwMDApO1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcclxuXHRcdFx0XHRcdG1vdmVMZWdzKGkpO1x0XHRcdFx0XHJcblx0XHRcdFx0fSwgMTAwMCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0bWFpbk5vZGUubW92ZVRvKFswLDNdLCA1MDAwKTtcclxuXHRcdFx0bW92ZUxlZ3MoMCk7XHJcblx0XHR9LCAxMDAwKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0ZXllLnNldEF0dHJpYnV0ZShcInZpc2libGU6ZmFsc2VcIik7XHJcblx0XHRcdGNvbnN0IGZpcnN0RXllID0gYm9hcmQuY3JlYXRlKCAncG9pbnQnLCBbMC4yLDMuMTVdLCB7XHJcblx0XHRcdFx0ZmlsbGNvbG9yOiAnYmxhY2snLCBzdHJva2VDb2xvcjogJ2JsYWNrJywgc2l6ZTogMS41XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRmaXJzdEV5ZS5zZXRMYWJlbCgnJyk7XHJcblx0XHRcdGZpcnN0RXllLm1vdmVUbyhbLTAuMiwzLjE1XSwgMTAwMCk7XHJcblx0XHRcdG1vdXRoLnNldEF0dHJpYnV0ZShcInZpc2libGU6ZmFsc2VcIik7XHJcblx0XHRcdGNvbnN0IG5ld01vdXRoID0gYm9hcmQuY3JlYXRlKCAnc2VnbWVudCcsIFsgWzAuMSwgMi44NV0sIFswLjQ2LDIuODVdXSwgeyBzdHJva2VDb2xvcjogJ2JsYWNrJyB9KTtcclxuXHRcdFx0bmV3TW91dGgucG9pbnQxLm1vdmVUbyhbLTAuMiwyLjg1XSwgMTAwMCk7XHJcblx0XHRcdG5ld01vdXRoLnBvaW50Mi5tb3ZlVG8oWzAuMTYsMi44NV0sIDEwMDApO1xyXG5cclxuXHRcdH0sIDY1MDApO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRjb25zdCBzZWNvbmRFeWUgPSBib2FyZC5jcmVhdGUoICdwb2ludCcsIFswLjQ1LDMuMTVdLCB7XHJcblx0XHRcdFx0ZmlsbGNvbG9yOiAnYmxhY2snLCBzdHJva2VDb2xvcjogJ2JsYWNrJywgc2l6ZTogMS41XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRzZWNvbmRFeWUuc2V0TGFiZWwoJycpO1xyXG5cdFx0XHRzZWNvbmRFeWUubW92ZVRvKFswLjIsMy4xNV0sIDUwMCk7XHJcblx0XHR9LCA3MDAwKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0YXJtc1swXS5wb2ludDEgPSBbMCwwXTtcclxuXHRcdH0sIDg1MDApO1xyXG5cclxuXHR9XHJcblxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZT5cclxuXHQuanhnYm94IHtcclxuXHRcdG1heC13aWR0aDogNTZyZW07IFxyXG5cdFx0aGVpZ2h0OiAyM3JlbTtcclxuXHRcdGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xyXG5cdH1cclxuPC9zdHlsZT5cclxuXHJcbjxkaXYgaWQ9XCJib3hcIiBjbGFzcz1cImp4Z2JveFwiPjwvZGl2PiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FNQyxPQUFPLE9BQVEsTUFBTSxDQUFFLE1BQU0sQ0FBQyxHQUFHOzs7T0FHM0IsTUFBTSxHQUFLLEdBQUc7UUFFYixLQUFLLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUUsS0FBSztHQUMxQyxXQUFXLElBQUksQ0FB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
