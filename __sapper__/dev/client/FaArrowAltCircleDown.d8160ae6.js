import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, U as assign, V as IconBase, v as validate_slots, W as exclude_internal_props, k as create_component, l as claim_component, m as mount_component, X as get_spread_update, Y as get_spread_object, t as transition_in, p as transition_out, q as destroy_component, Z as svg_element, c as claim_element, a as children, b as detach_dev, f as attr_dev, h as add_location, j as insert_dev } from './client.076cebcc.js';

/* node_modules\svelte-icons\fa\FaArrowAltCircleDown.svelte generated by Svelte v3.29.3 */
const file = "node_modules\\svelte-icons\\fa\\FaArrowAltCircleDown.svelte";

// (4:8) <IconBase viewBox="0 0 512 512" {...$$props}>
function create_default_slot(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_element(nodes, "path", { d: true }, 1);
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM212 140v116h-70.9c-10.7 0-16.1 13-8.5 20.5l114.9 114.3c4.7 4.7 12.2 4.7 16.9 0l114.9-114.3c7.6-7.6 2.2-20.5-8.5-20.5H300V140c0-6.6-5.4-12-12-12h-64c-6.6 0-12 5.4-12 12z");
			add_location(path, file, 4, 10, 153);
		},
		m: function mount(target, anchor) {
			insert_dev(target, path, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(4:8) <IconBase viewBox=\\\"0 0 512 512\\\" {...$$props}>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let iconbase;
	let current;
	const iconbase_spread_levels = [{ viewBox: "0 0 512 512" }, /*$$props*/ ctx[0]];

	let iconbase_props = {
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	};

	for (let i = 0; i < iconbase_spread_levels.length; i += 1) {
		iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
	}

	iconbase = new IconBase({ props: iconbase_props, $$inline: true });

	const block = {
		c: function create() {
			create_component(iconbase.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(iconbase.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(iconbase, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const iconbase_changes = (dirty & /*$$props*/ 1)
			? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(/*$$props*/ ctx[0])])
			: {};

			if (dirty & /*$$scope*/ 2) {
				iconbase_changes.$$scope = { dirty, ctx };
			}

			iconbase.$set(iconbase_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(iconbase.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(iconbase.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(iconbase, detaching);
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
	validate_slots("FaArrowAltCircleDown", slots, []);

	$$self.$$set = $$new_props => {
		$$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
	};

	$$self.$capture_state = () => ({ IconBase });

	$$self.$inject_state = $$new_props => {
		$$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$props = exclude_internal_props($$props);
	return [$$props];
}

class FaArrowAltCircleDown extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "FaArrowAltCircleDown",
			options,
			id: create_fragment.name
		});
	}
}

export { FaArrowAltCircleDown as F };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFBcnJvd0FsdENpcmNsZURvd24uZDgxNjBhZTYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUtaWNvbnMvZmEvRmFBcnJvd0FsdENpcmNsZURvd24uc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gICAgICAgIGltcG9ydCBJY29uQmFzZSBmcm9tICcuLi9jb21wb25lbnRzL0ljb25CYXNlLnN2ZWx0ZSc7XG4gICAgICAgIDwvc2NyaXB0PlxuICAgICAgICA8SWNvbkJhc2Ugdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgey4uLiQkcHJvcHN9PlxuICAgICAgICAgIDxwYXRoIGQ9XCJNNTA0IDI1NmMwIDEzNy0xMTEgMjQ4LTI0OCAyNDhTOCAzOTMgOCAyNTYgMTE5IDggMjU2IDhzMjQ4IDExMSAyNDggMjQ4ek0yMTIgMTQwdjExNmgtNzAuOWMtMTAuNyAwLTE2LjEgMTMtOC41IDIwLjVsMTE0LjkgMTE0LjNjNC43IDQuNyAxMi4yIDQuNyAxNi45IDBsMTE0LjktMTE0LjNjNy42LTcuNiAyLjItMjAuNS04LjUtMjAuNUgzMDBWMTQwYzAtNi42LTUuNC0xMi0xMi0xMmgtNjRjLTYuNiAwLTEyIDUuNC0xMiAxMnpcIiAvPlxuICAgICAgICA8L0ljb25CYXNlPlxuICAgICAgIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5RUFHNEMsR0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUdBQVAsR0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
