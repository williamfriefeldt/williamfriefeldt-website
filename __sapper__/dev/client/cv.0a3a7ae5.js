import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, o as onMount, e as element, k as create_component, c as claim_element, a as children, l as claim_component, b as detach_dev, A as set_style, h as add_location, j as insert_dev, m as mount_component, p as transition_out, U as check_outros, t as transition_in, q as destroy_component, V as group_outros } from './client.40ff3dcf.js';

/* src\routes\cv.svelte generated by Svelte v3.29.3 */
const file = "src\\routes\\cv.svelte";

function create_fragment(ctx) {
	let div;
	let switch_instance;
	let current;
	var switch_value = /*PdfViewer*/ ctx[0];

	function switch_props(ctx) {
		return {
			props: { url: "./cv-will.pdf" },
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			div = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { style: true });
			var div_nodes = children(div);
			if (switch_instance) claim_component(switch_instance.$$.fragment, div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_style(div, "margin-top", "60px");
			add_location(div, file, 12, 0, 203);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (switch_value !== (switch_value = /*PdfViewer*/ ctx[0])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, null);
				} else {
					switch_instance = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (switch_instance) destroy_component(switch_instance);
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
	validate_slots("Cv", slots, []);
	let PdfViewer;

	onMount(async () => {
		const module = await Promise.all([import('./index.d20532d2.js'), __inject_styles(["client-492ec924.css","index-c5c919d6.css"])]).then(function(x) { return x[0]; });
		$$invalidate(0, PdfViewer = module.default);
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Cv> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ onMount, PdfViewer });

	$$self.$inject_state = $$props => {
		if ("PdfViewer" in $$props) $$invalidate(0, PdfViewer = $$props.PdfViewer);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [PdfViewer];
}

class Cv extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Cv",
			options,
			id: create_fragment.name
		});
	}
}

export default Cv;

import __inject_styles from './inject_styles.5607aec6.js';//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3YuMGEzYTdhZTUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvY3Yuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XHJcblxyXG5cdCAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIjtcclxuXHQgIGxldCBQZGZWaWV3ZXI7XHJcblxyXG5cdCAgb25Nb3VudChhc3luYyAoKSA9PiB7XHJcblx0ICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydChcInN2ZWx0ZS1wZGZcIik7XHJcblx0ICAgIFBkZlZpZXdlciA9IG1vZHVsZS5kZWZhdWx0O1xyXG5cdCAgfSk7XHJcblxyXG48L3NjcmlwdD5cclxuXHJcbjxkaXYgc3R5bGU9XCJtYXJnaW4tdG9wOiA2MHB4XCI+XHJcblx0PHN2ZWx0ZTpjb21wb25lbnQgdGhpcz17UGRmVmlld2VyfSB1cmw9XCIuL2N2LXdpbGwucGRmXCIvPiBcclxuPC9kaXY+XHJcblxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O2tDQWF5QixHQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NEQUFULEdBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQVYzQixTQUFTOztDQUViLE9BQU87UUFDQyxNQUFNLDZCQUFnQixxQkFBWTtrQkFDeEMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
