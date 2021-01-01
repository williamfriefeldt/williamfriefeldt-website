import { r as cubicInOut, n as noop, u as now, w as loop, S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, x as validate_each_argument, v as validate_slots, e as element, y as space, c as claim_element, a as children, z as claim_space, b as detach_dev, A as set_style, h as add_location, j as insert_dev, B as append_dev, C as destroy_each, f as attr_dev, D as is_function, E as cubicOut, F as validate_each_keys, G as text, H as claim_text, I as listen_dev, J as fix_position, K as create_animation, L as update_keyed_each, M as fix_and_destroy_block, o as onMount, N as fade, O as fly, k as create_component, l as claim_component, m as mount_component, t as transition_in, P as add_render_callback, Q as create_bidirectional_transition, R as create_in_transition, p as transition_out, q as destroy_component, T as check_outros, U as group_outros } from './client.fba727cc.js';

var _ = {
  $(selector) {
    if (typeof selector === "string") {
      return document.querySelector(selector);
    }
    return selector;
  },
  extend(...args) {
    return Object.assign(...args);
  },
  cumulativeOffset(element) {
    let top = 0;
    let left = 0;

    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return {
      top: top,
      left: left
    };
  },
  directScroll(element) {
    return element && element !== document && element !== document.body;
  },
  scrollTop(element, value) {
    let inSetter = value !== undefined;
    if (this.directScroll(element)) {
      return inSetter ? (element.scrollTop = value) : element.scrollTop;
    } else {
      return inSetter
        ? (document.documentElement.scrollTop = document.body.scrollTop = value)
        : window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
    }
  },
  scrollLeft(element, value) {
    let inSetter = value !== undefined;
    if (this.directScroll(element)) {
      return inSetter ? (element.scrollLeft = value) : element.scrollLeft;
    } else {
      return inSetter
        ? (document.documentElement.scrollLeft = document.body.scrollLeft = value)
        : window.pageXOffset ||
            document.documentElement.scrollLeft ||
            document.body.scrollLeft ||
            0;
    }
  }
};

const defaultOptions = {
  container: "body",
  duration: 500,
  delay: 0,
  offset: 0,
  easing: cubicInOut,
  onStart: noop,
  onDone: noop,
  onAborting: noop,
  scrollX: false,
  scrollY: true
};

const _scrollTo = options => {
  let {
    offset,
    duration,
    delay,
    easing,
    x=0,
    y=0,
    scrollX,
    scrollY,
    onStart,
    onDone,
    container,
    onAborting,
    element
  } = options;

  if (typeof offset === "function") {
    offset = offset();
  }

  var cumulativeOffsetContainer = _.cumulativeOffset(container);
  var cumulativeOffsetTarget = element
    ? _.cumulativeOffset(element)
    : { top: y, left: x };

  var initialX = _.scrollLeft(container);
  var initialY = _.scrollTop(container);

  var targetX =
    cumulativeOffsetTarget.left - cumulativeOffsetContainer.left + offset;
  var targetY =
    cumulativeOffsetTarget.top - cumulativeOffsetContainer.top + offset;

  var diffX = targetX - initialX;
	var diffY = targetY - initialY;

  let scrolling = true;
  let started = false;
  let start_time = now() + delay;
  let end_time = start_time + duration;

  function scrollToTopLeft(element, top, left) {
    if (scrollX) _.scrollLeft(element, left);
    if (scrollY) _.scrollTop(element, top);
  }

  function start(delayStart) {
    if (!delayStart) {
      started = true;
      onStart(element, {x, y});
    }
  }

  function tick(progress) {
    scrollToTopLeft(
      container,
      initialY + diffY * progress,
      initialX + diffX * progress
    );
  }

  function stop() {
    scrolling = false;
  }

  loop(now => {
    if (!started && now >= start_time) {
      start(false);
    }

    if (started && now >= end_time) {
      tick(1);
      stop();
      onDone(element, {x, y});
    }

    if (!scrolling) {
      onAborting(element, {x, y});
      return false;
    }
    if (started) {
      const p = now - start_time;
      const t = 0 + 1 * easing(p / duration);
      tick(t);
    }

    return true;
  });

  start(delay);

  tick(0);

  return stop;
};

const proceedOptions = options => {
	let opts = _.extend({}, defaultOptions, options);
  opts.container = _.$(opts.container);
  opts.element = _.$(opts.element);
  return opts;
};

const scrollContainerHeight = containerElement => {
  if (
    containerElement &&
    containerElement !== document &&
    containerElement !== document.body
  ) {
    return containerElement.scrollHeight - containerElement.offsetHeight;
  } else {
    let body = document.body;
    let html = document.documentElement;

    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  }
};

const setGlobalOptions = options => {
	_.extend(defaultOptions, options || {});
};

const scrollTo = options => {
  return _scrollTo(proceedOptions(options));
};

const scrollToBottom = options => {
  options = proceedOptions(options);

  return _scrollTo(
    _.extend(options, {
      element: null,
      y: scrollContainerHeight(options.container)
    })
  );
};

const scrollToTop = options => {
  options = proceedOptions(options);

  return _scrollTo(
    _.extend(options, {
      element: null,
      y: 0
    })
  );
};

const makeScrollToAction = scrollToFunc => {
  return (node, options) => {
    let current = options;
    const handle = e => {
      e.preventDefault();
      scrollToFunc(
        typeof current === "string" ? { element: current } : current
      );
    };
    node.addEventListener("click", handle);
    node.addEventListener("touchstart", handle);
    return {
      update(options) {
        current = options;
      },
      destroy() {
        node.removeEventListener("click", handle);
        node.removeEventListener("touchstart", handle);
      }
    };
  };
};

const scrollto = makeScrollToAction(scrollTo);
const scrolltotop = makeScrollToAction(scrollToTop);
const scrolltobottom = makeScrollToAction(scrollToBottom);

var animateScroll = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setGlobalOptions: setGlobalOptions,
  scrollTo: scrollTo,
  scrollToBottom: scrollToBottom,
  scrollToTop: scrollToTop,
  makeScrollToAction: makeScrollToAction,
  scrollto: scrollto,
  scrolltotop: scrolltotop,
  scrolltobottom: scrolltobottom
});

/* src\components\Computer.svelte generated by Svelte v3.29.3 */

const file = "src\\components\\Computer.svelte";

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	child_ctx[5] = i;
	return child_ctx;
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	child_ctx[3] = i;
	return child_ctx;
}

// (142:5) {#each Array(25) as _, i}
function create_each_block_1(ctx) {
	let div;

	const block = {
		c: function create() {
			div = element("div");
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			children(div).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "laptop-key svelte-v8wt6z");
			add_location(div, file, 142, 6, 3049);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(142:5) {#each Array(25) as _, i}",
		ctx
	});

	return block;
}

// (140:3) {#each Array(6) as _, j}
function create_each_block(ctx) {
	let div;
	let t;
	let each_value_1 = Array(25);
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const block = {
		c: function create() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { style: true });
			var div_nodes = children(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div_nodes);
			}

			t = claim_space(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_style(div, "display", "flex");
			add_location(div, file, 140, 4, 2982);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			append_dev(div, t);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(140:3) {#each Array(6) as _, j}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div5;
	let div1;
	let div0;
	let img;
	let img_src_value;
	let t0;
	let div4;
	let div2;
	let t1;
	let div3;
	let each_value = Array(6);
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			div5 = element("div");
			div1 = element("div");
			div0 = element("div");
			img = element("img");
			t0 = space();
			div4 = element("div");
			div2 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = space();
			div3 = element("div");
			this.h();
		},
		l: function claim(nodes) {
			div5 = claim_element(nodes, "DIV", { class: true });
			var div5_nodes = children(div5);
			div1 = claim_element(div5_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			img = claim_element(div0_nodes, "IMG", { src: true, alt: true, class: true });
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t0 = claim_space(div5_nodes);
			div4 = claim_element(div5_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			div2 = claim_element(div4_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div2_nodes);
			}

			div2_nodes.forEach(detach_dev);
			t1 = claim_space(div4_nodes);
			div3 = claim_element(div4_nodes, "DIV", { class: true });
			children(div3).forEach(detach_dev);
			div4_nodes.forEach(detach_dev);
			div5_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			if (img.src !== (img_src_value = /*src*/ ctx[0])) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Computer");
			attr_dev(img, "class", "svelte-v8wt6z");
			add_location(img, file, 134, 3, 2838);
			attr_dev(div0, "class", "laptop-innerscreen svelte-v8wt6z");
			add_location(div0, file, 133, 2, 2801);
			attr_dev(div1, "class", "laptop-screen svelte-v8wt6z");
			add_location(div1, file, 132, 1, 2770);
			attr_dev(div2, "class", "laptop-keys svelte-v8wt6z");
			add_location(div2, file, 138, 2, 2922);
			attr_dev(div3, "class", "laptop-keypad svelte-v8wt6z");
			add_location(div3, file, 147, 2, 3131);
			attr_dev(div4, "class", "laptop-keyboard svelte-v8wt6z");
			add_location(div4, file, 137, 1, 2889);
			attr_dev(div5, "class", "laptop-container svelte-v8wt6z");
			add_location(div5, file, 131, 0, 2737);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div5, anchor);
			append_dev(div5, div1);
			append_dev(div1, div0);
			append_dev(div0, img);
			append_dev(div5, t0);
			append_dev(div5, div4);
			append_dev(div4, div2);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div2, null);
			}

			append_dev(div4, t1);
			append_dev(div4, div3);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*Array*/ 0) {
				each_value = Array(6);
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div2, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div5);
			destroy_each(each_blocks, detaching);
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
	validate_slots("Computer", slots, []);
	let src = "af-screenshot.png";
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Computer> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ src });

	$$self.$inject_state = $$props => {
		if ("src" in $$props) $$invalidate(0, src = $$props.src);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [src];
}

class Computer extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Computer",
			options,
			id: create_fragment.name
		});
	}
}

/* src\components\Phone.svelte generated by Svelte v3.29.3 */

const file$1 = "src\\components\\Phone.svelte";

function create_fragment$1(ctx) {
	let div1;
	let img;
	let img_src_value;
	let t;
	let div0;

	const block = {
		c: function create() {
			div1 = element("div");
			img = element("img");
			t = space();
			div0 = element("div");
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true, style: true });
			var div1_nodes = children(div1);
			img = claim_element(div1_nodes, "IMG", { src: true, alt: true, class: true });
			t = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			children(div0).forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			if (img.src !== (img_src_value = /*src*/ ctx[1])) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "mobil");
			attr_dev(img, "class", "svelte-13rkukb");
			add_location(img, file$1, 54, 1, 1065);
			attr_dev(div0, "class", "phone-button svelte-13rkukb");
			add_location(div0, file$1, 55, 1, 1093);
			attr_dev(div1, "class", "phone-container svelte-13rkukb");
			set_style(div1, "--left", /*leftPos*/ ctx[0]);
			add_location(div1, file$1, 53, 0, 1007);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, img);
			append_dev(div1, t);
			append_dev(div1, div0);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*leftPos*/ 1) {
				set_style(div1, "--left", /*leftPos*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
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
	validate_slots("Phone", slots, []);
	let src = "poddsok-phone.jpg";
	let { leftPos } = $$props;
	const writable_props = ["leftPos"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Phone> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("leftPos" in $$props) $$invalidate(0, leftPos = $$props.leftPos);
	};

	$$self.$capture_state = () => ({ src, leftPos });

	$$self.$inject_state = $$props => {
		if ("src" in $$props) $$invalidate(1, src = $$props.src);
		if ("leftPos" in $$props) $$invalidate(0, leftPos = $$props.leftPos);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [leftPos, src];
}

class Phone extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { leftPos: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Phone",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*leftPos*/ ctx[0] === undefined && !("leftPos" in props)) {
			console.warn("<Phone> was created without expected prop 'leftPos'");
		}
	}

	get leftPos() {
		throw new Error("<Phone>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set leftPos(value) {
		throw new Error("<Phone>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src\components\iPad.svelte generated by Svelte v3.29.3 */

const file$2 = "src\\components\\iPad.svelte";

function create_fragment$2(ctx) {
	let div1;
	let img;
	let img_src_value;
	let t;
	let div0;

	const block = {
		c: function create() {
			div1 = element("div");
			img = element("img");
			t = space();
			div0 = element("div");
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			img = claim_element(div1_nodes, "IMG", { src: true, class: true });
			t = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			children(div0).forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			if (img.src !== (img_src_value = /*src*/ ctx[0])) attr_dev(img, "src", img_src_value);
			attr_dev(img, "class", "svelte-b8zm4");
			add_location(img, file$2, 35, 1, 618);
			attr_dev(div0, "class", "ipad-button svelte-b8zm4");
			add_location(div0, file$2, 36, 1, 634);
			attr_dev(div1, "class", "ipad-container svelte-b8zm4");
			add_location(div1, file$2, 34, 0, 587);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, img);
			append_dev(div1, t);
			append_dev(div1, div0);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("IPad", slots, []);
	let src = "plump-ipad.png";
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<IPad> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ src });

	$$self.$inject_state = $$props => {
		if ("src" in $$props) $$invalidate(0, src = $$props.src);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [src];
}

class IPad extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "IPad",
			options,
			id: create_fragment$2.name
		});
	}
}

function flip(node, animation, params) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;
    const scaleX = animation.from.width / node.clientWidth;
    const scaleY = animation.from.height / node.clientHeight;
    const dx = (animation.from.left - animation.to.left) / scaleX;
    const dy = (animation.from.top - animation.to.top) / scaleY;
    const d = Math.sqrt(dx * dx + dy * dy);
    const { delay = 0, duration = (d) => Math.sqrt(d) * 120, easing = cubicOut } = params;
    return {
        delay,
        duration: is_function(duration) ? duration(d) : duration,
        easing,
        css: (_t, u) => `transform: ${transform} translate(${u * dx}px, ${u * dy}px);`
    };
}

/* src\components\Poddsok.svelte generated by Svelte v3.29.3 */
const file$3 = "src\\components\\Poddsok.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (90:2) {#each projects as project (project)}
function create_each_block$1(key_1, ctx) {
	let div;
	let t0_value = /*project*/ ctx[2] + "";
	let t0;
	let t1;
	let rect;
	let stop_animation = noop;
	let mounted;
	let dispose;

	function click_handler(...args) {
		return /*click_handler*/ ctx[1](/*project*/ ctx[2], ...args);
	}

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			div = element("div");
			t0 = text(t0_value);
			t1 = space();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			t0 = claim_text(div_nodes, t0_value);
			t1 = claim_space(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "poddsok-project svelte-199xhs7");
			add_location(div, file$3, 90, 3, 2872);
			this.first = div;
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, t0);
			append_dev(div, t1);

			if (!mounted) {
				dispose = listen_dev(div, "click", click_handler, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		r: function measure() {
			rect = div.getBoundingClientRect();
		},
		f: function fix() {
			fix_position(div);
			stop_animation();
		},
		a: function animate() {
			stop_animation();
			stop_animation = create_animation(div, rect, flip, { duration: 5000, delay: 1000 });
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(90:2) {#each projects as project (project)}",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let div1;
	let h1;
	let t0;
	let t1;
	let p;
	let t2;
	let a;
	let t3;
	let t4;
	let br0;
	let t5;
	let br1;
	let t6;
	let br2;
	let t7;
	let br3;
	let t8;
	let t9;
	let div0;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_value = /*projects*/ ctx[0];
	validate_each_argument(each_value);
	const get_key = ctx => /*project*/ ctx[2];
	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$1(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
	}

	const block = {
		c: function create() {
			div1 = element("div");
			h1 = element("h1");
			t0 = text("Poddsök.nu");
			t1 = space();
			p = element("p");
			t2 = text("One of my first software projects was ");
			a = element("a");
			t3 = text("Poddsök.nu");
			t4 = text(" . The idea came to me after listening to 300 episodes of Alex and Sigges podcast. How to find a segment you heard in a previous episode? I could not google it since it's not text. What if there was an app where you could search for words or sentences to find out where in the podcast they were mentioned?\r\n\t\t");
			br0 = element("br");
			t5 = space();
			br1 = element("br");
			t6 = text("\r\n\t\tIt started with a single-page application built with AngularJS, the first framework I learned. Then I had to populate the site with podcasts and episodes. Luckliy, Spotify has an API for that. For this part I used Angular for the frontend and Node.js as a backend to authenticate to the API. Next, it was time to launch an iOS app. For this I used Apache Cordova to be able to reuse my codebase from the SPA.\r\n\t\t");
			br2 = element("br");
			t7 = space();
			br3 = element("br");
			t8 = text("\r\n\t\tYou must now wonder, where do the searchable segments come from? In the beginning, users could add sentences mentioned on specific episodes in podcasts. Now, an AI project I choose to called Plysslingen is transcribing episodes. Using Google's speech-to-texy library with Python and the framework Flask the most relevants part are saved to files and later stored in the database.");
			t9 = space();
			div0 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			h1 = claim_element(div1_nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t0 = claim_text(h1_nodes, "Poddsök.nu");
			h1_nodes.forEach(detach_dev);
			t1 = claim_space(div1_nodes);
			p = claim_element(div1_nodes, "P", { class: true });
			var p_nodes = children(p);
			t2 = claim_text(p_nodes, "One of my first software projects was ");
			a = claim_element(p_nodes, "A", { href: true, target: true, class: true });
			var a_nodes = children(a);
			t3 = claim_text(a_nodes, "Poddsök.nu");
			a_nodes.forEach(detach_dev);
			t4 = claim_text(p_nodes, " . The idea came to me after listening to 300 episodes of Alex and Sigges podcast. How to find a segment you heard in a previous episode? I could not google it since it's not text. What if there was an app where you could search for words or sentences to find out where in the podcast they were mentioned?\r\n\t\t");
			br0 = claim_element(p_nodes, "BR", {});
			t5 = claim_space(p_nodes);
			br1 = claim_element(p_nodes, "BR", {});
			t6 = claim_text(p_nodes, "\r\n\t\tIt started with a single-page application built with AngularJS, the first framework I learned. Then I had to populate the site with podcasts and episodes. Luckliy, Spotify has an API for that. For this part I used Angular for the frontend and Node.js as a backend to authenticate to the API. Next, it was time to launch an iOS app. For this I used Apache Cordova to be able to reuse my codebase from the SPA.\r\n\t\t");
			br2 = claim_element(p_nodes, "BR", {});
			t7 = claim_space(p_nodes);
			br3 = claim_element(p_nodes, "BR", {});
			t8 = claim_text(p_nodes, "\r\n\t\tYou must now wonder, where do the searchable segments come from? In the beginning, users could add sentences mentioned on specific episodes in podcasts. Now, an AI project I choose to called Plysslingen is transcribing episodes. Using Google's speech-to-texy library with Python and the framework Flask the most relevants part are saved to files and later stored in the database.");
			p_nodes.forEach(detach_dev);
			t9 = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div0_nodes);
			}

			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h1, "class", "svelte-199xhs7");
			add_location(h1, file$3, 78, 1, 1520);
			attr_dev(a, "href", "https://poddsok.nu");
			attr_dev(a, "target", "_blank");
			attr_dev(a, "class", "svelte-199xhs7");
			add_location(a, file$3, 81, 40, 1591);
			add_location(br0, file$3, 82, 2, 1959);
			add_location(br1, file$3, 82, 9, 1966);
			add_location(br2, file$3, 84, 2, 2388);
			add_location(br3, file$3, 84, 9, 2395);
			attr_dev(p, "class", "svelte-199xhs7");
			add_location(p, file$3, 80, 1, 1546);
			attr_dev(div0, "class", "poddsok-projects svelte-199xhs7");
			add_location(div0, file$3, 88, 1, 2796);
			attr_dev(div1, "class", "poddsok-description svelte-199xhs7");
			add_location(div1, file$3, 77, 0, 1484);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, h1);
			append_dev(h1, t0);
			append_dev(div1, t1);
			append_dev(div1, p);
			append_dev(p, t2);
			append_dev(p, a);
			append_dev(a, t3);
			append_dev(p, t4);
			append_dev(p, br0);
			append_dev(p, t5);
			append_dev(p, br1);
			append_dev(p, t6);
			append_dev(p, br2);
			append_dev(p, t7);
			append_dev(p, br3);
			append_dev(p, t8);
			append_dev(div1, t9);
			append_dev(div1, div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*remove, projects*/ 1) {
				const each_value = /*projects*/ ctx[0];
				validate_each_argument(each_value);
				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].r();
				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div0, fix_and_destroy_block, create_each_block$1, null, get_each_context$1);
				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].a();
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Poddsok", slots, []);
	let projects = ["Website", "App", "Admin", "AI"];
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Poddsok> was created with unknown prop '${key}'`);
	});

	const click_handler = project => remove(project);
	$$self.$capture_state = () => ({ flip, projects });

	$$self.$inject_state = $$props => {
		if ("projects" in $$props) $$invalidate(0, projects = $$props.projects);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [projects, click_handler];
}

class Poddsok extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Poddsok",
			options,
			id: create_fragment$3.name
		});
	}
}

/* src\routes\projects.svelte generated by Svelte v3.29.3 */
const file$4 = "src\\routes\\projects.svelte";

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[5] = list[i];
	child_ctx[7] = i;
	return child_ctx;
}

// (152:2) {#if showItems}
function create_if_block(ctx) {
	let div0;
	let phone;
	let div0_transition;
	let t0;
	let div2;
	let div1;
	let p;
	let t1;
	let div2_transition;
	let t2;
	let div3;
	let ipad;
	let div3_transition;
	let t3;
	let ul;
	let h3;
	let t4;
	let h3_intro;
	let t5;
	let t6;
	let div4;
	let computer;
	let div4_transition;
	let current;

	phone = new Phone({
			props: { leftPos: /*leftPos*/ ctx[0] },
			$$inline: true
		});

	ipad = new IPad({ $$inline: true });
	let each_value = /*projects*/ ctx[3];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	computer = new Computer({ $$inline: true });

	const block = {
		c: function create() {
			div0 = element("div");
			create_component(phone.$$.fragment);
			t0 = space();
			div2 = element("div");
			div1 = element("div");
			p = element("p");
			t1 = text("I've been developing web applications for busniess, for government, for startup\r\n\t\t\t\t\t\tand of course for fun. Using different technologies, a creative mind and talented \r\n\t\t\t\t\t\tcolleagues I've manage to create smooth and responsive applications for both desktop \r\n\t\t\t\t\t\tand mobile. I will now share some of my most successful projects!");
			t2 = space();
			div3 = element("div");
			create_component(ipad.$$.fragment);
			t3 = space();
			ul = element("ul");
			h3 = element("h3");
			t4 = text("A potporri");
			t5 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t6 = space();
			div4 = element("div");
			create_component(computer.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div0 = claim_element(nodes, "DIV", {});
			var div0_nodes = children(div0);
			claim_component(phone.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			div2 = claim_element(nodes, "DIV", { class: true, style: true });
			var div2_nodes = children(div2);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			p = claim_element(div1_nodes, "P", { class: true });
			var p_nodes = children(p);
			t1 = claim_text(p_nodes, "I've been developing web applications for busniess, for government, for startup\r\n\t\t\t\t\t\tand of course for fun. Using different technologies, a creative mind and talented \r\n\t\t\t\t\t\tcolleagues I've manage to create smooth and responsive applications for both desktop \r\n\t\t\t\t\t\tand mobile. I will now share some of my most successful projects!");
			p_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			div3 = claim_element(nodes, "DIV", { class: true, style: true });
			var div3_nodes = children(div3);
			claim_component(ipad.$$.fragment, div3_nodes);
			div3_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			ul = claim_element(nodes, "UL", { class: true, style: true });
			var ul_nodes = children(ul);
			h3 = claim_element(ul_nodes, "H3", { class: true });
			var h3_nodes = children(h3);
			t4 = claim_text(h3_nodes, "A potporri");
			h3_nodes.forEach(detach_dev);
			t5 = claim_space(ul_nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			ul_nodes.forEach(detach_dev);
			t6 = claim_space(nodes);
			div4 = claim_element(nodes, "DIV", { class: true, style: true });
			var div4_nodes = children(div4);
			claim_component(computer.$$.fragment, div4_nodes);
			div4_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(div0, file$4, 152, 3, 3110);
			attr_dev(p, "class", "svelte-bdlekh");
			add_location(p, file$4, 160, 5, 3408);
			attr_dev(div1, "class", "projects-info svelte-bdlekh");
			add_location(div1, file$4, 159, 4, 3374);
			attr_dev(div2, "class", "projects-info-container svelte-bdlekh");
			set_style(div2, "--opacity", /*opacityContainers*/ ctx[2].first);
			add_location(div2, file$4, 156, 3, 3216);
			attr_dev(div3, "class", "hide-ipad scrollX-opacity svelte-bdlekh");
			set_style(div3, "--opacity", /*opacityContainers*/ ctx[2].second);
			add_location(div3, file$4, 169, 3, 3795);
			attr_dev(h3, "class", "svelte-bdlekh");
			add_location(h3, file$4, 178, 4, 4070);
			attr_dev(ul, "class", "scrollX-opacity svelte-bdlekh");
			set_style(ul, "--opacity", /*opacityContainers*/ ctx[2].second);
			add_location(ul, file$4, 176, 3, 3985);
			attr_dev(div4, "class", "hide-mobile scrollX-opacity svelte-bdlekh");
			set_style(div4, "--opacity", /*opacityContainers*/ ctx[2].first);
			add_location(div4, file$4, 198, 3, 4534);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div0, anchor);
			mount_component(phone, div0, null);
			insert_dev(target, t0, anchor);
			insert_dev(target, div2, anchor);
			append_dev(div2, div1);
			append_dev(div1, p);
			append_dev(p, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, div3, anchor);
			mount_component(ipad, div3, null);
			insert_dev(target, t3, anchor);
			insert_dev(target, ul, anchor);
			append_dev(ul, h3);
			append_dev(h3, t4);
			append_dev(ul, t5);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			insert_dev(target, t6, anchor);
			insert_dev(target, div4, anchor);
			mount_component(computer, div4, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const phone_changes = {};
			if (dirty & /*leftPos*/ 1) phone_changes.leftPos = /*leftPos*/ ctx[0];
			phone.$set(phone_changes);

			if (!current || dirty & /*opacityContainers*/ 4) {
				set_style(div2, "--opacity", /*opacityContainers*/ ctx[2].first);
			}

			if (!current || dirty & /*opacityContainers*/ 4) {
				set_style(div3, "--opacity", /*opacityContainers*/ ctx[2].second);
			}

			if (dirty & /*animateScroll, projects*/ 8) {
				each_value = /*projects*/ ctx[3];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (!current || dirty & /*opacityContainers*/ 4) {
				set_style(ul, "--opacity", /*opacityContainers*/ ctx[2].second);
			}

			if (!current || dirty & /*opacityContainers*/ 4) {
				set_style(div4, "--opacity", /*opacityContainers*/ ctx[2].first);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(phone.$$.fragment, local);

			if (local) {
				add_render_callback(() => {
					if (!div0_transition) div0_transition = create_bidirectional_transition(div0, fade, { duration: 1000, delay: 2000 }, true);
					div0_transition.run(1);
				});
			}

			if (local) {
				add_render_callback(() => {
					if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fade, { duration: 1000, delay: 1000 }, true);
					div2_transition.run(1);
				});
			}

			transition_in(ipad.$$.fragment, local);

			if (local) {
				add_render_callback(() => {
					if (!div3_transition) div3_transition = create_bidirectional_transition(div3, fade, { duration: 1000, delay: 4000 }, true);
					div3_transition.run(1);
				});
			}

			if (local) {
				if (!h3_intro) {
					add_render_callback(() => {
						h3_intro = create_in_transition(h3, fly, { y: -50, duration: 2000, delay: 3500 });
						h3_intro.start();
					});
				}
			}

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(computer.$$.fragment, local);

			if (local) {
				add_render_callback(() => {
					if (!div4_transition) div4_transition = create_bidirectional_transition(div4, fade, { duration: 1000, delay: 3000 }, true);
					div4_transition.run(1);
				});
			}

			current = true;
		},
		o: function outro(local) {
			transition_out(phone.$$.fragment, local);

			if (local) {
				if (!div0_transition) div0_transition = create_bidirectional_transition(div0, fade, { duration: 1000, delay: 2000 }, false);
				div0_transition.run(0);
			}

			if (local) {
				if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fade, { duration: 1000, delay: 1000 }, false);
				div2_transition.run(0);
			}

			transition_out(ipad.$$.fragment, local);

			if (local) {
				if (!div3_transition) div3_transition = create_bidirectional_transition(div3, fade, { duration: 1000, delay: 4000 }, false);
				div3_transition.run(0);
			}

			transition_out(computer.$$.fragment, local);

			if (local) {
				if (!div4_transition) div4_transition = create_bidirectional_transition(div4, fade, { duration: 1000, delay: 3000 }, false);
				div4_transition.run(0);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			destroy_component(phone);
			if (detaching && div0_transition) div0_transition.end();
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div2);
			if (detaching && div2_transition) div2_transition.end();
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(div3);
			destroy_component(ipad);
			if (detaching && div3_transition) div3_transition.end();
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(ul);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t6);
			if (detaching) detach_dev(div4);
			destroy_component(computer);
			if (detaching && div4_transition) div4_transition.end();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(152:2) {#if showItems}",
		ctx
	});

	return block;
}

// (182:4) {#each projects as project, i}
function create_each_block$2(ctx) {
	let li;
	let t0_value = /*project*/ ctx[5].name + "";
	let t0;
	let t1;
	let li_intro;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			li = element("li");
			t0 = text(t0_value);
			t1 = space();
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", { class: true });
			var li_nodes = children(li);
			t0 = claim_text(li_nodes, t0_value);
			t1 = claim_space(li_nodes);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(li, "class", "svelte-bdlekh");
			add_location(li, file$4, 182, 5, 4204);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, t0);
			append_dev(li, t1);

			if (!mounted) {
				dispose = listen_dev(li, "click", /*click_handler*/ ctx[4], false, false, false);
				mounted = true;
			}
		},
		p: noop,
		i: function intro(local) {
			if (!li_intro) {
				add_render_callback(() => {
					li_intro = create_in_transition(li, fly, {
						y: -50,
						duration: 2000,
						delay: 3500 + (/*i*/ ctx[7] + 1) * 1000
					});

					li_intro.start();
				});
			}
		},
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$2.name,
		type: "each",
		source: "(182:4) {#each projects as project, i}",
		ctx
	});

	return block;
}

function create_fragment$4(ctx) {
	let div2;
	let div0;
	let h2;
	let t0;
	let t1;
	let t2;
	let div1;
	let poddsok;
	let current;
	let if_block = /*showItems*/ ctx[1] && create_if_block(ctx);
	poddsok = new Poddsok({ $$inline: true });

	const block = {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			h2 = element("h2");
			t0 = text("My portfolio");
			t1 = space();
			if (if_block) if_block.c();
			t2 = space();
			div1 = element("div");
			create_component(poddsok.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			h2 = claim_element(div0_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t0 = claim_text(h2_nodes, "My portfolio");
			h2_nodes.forEach(detach_dev);
			t1 = claim_space(div0_nodes);
			if (if_block) if_block.l(div0_nodes);
			div0_nodes.forEach(detach_dev);
			t2 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			claim_component(poddsok.$$.fragment, div1_nodes);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "svelte-bdlekh");
			add_location(h2, file$4, 149, 2, 3063);
			attr_dev(div0, "class", "projects-container svelte-bdlekh");
			add_location(div0, file$4, 147, 1, 3025);
			attr_dev(div1, "class", "poddsok-container svelte-bdlekh");
			add_location(div1, file$4, 206, 1, 4743);
			attr_dev(div2, "class", "scrollXwindow svelte-bdlekh");
			add_location(div2, file$4, 146, 0, 2995);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			append_dev(div0, h2);
			append_dev(h2, t0);
			append_dev(div0, t1);
			if (if_block) if_block.m(div0, null);
			append_dev(div2, t2);
			append_dev(div2, div1);
			mount_component(poddsok, div1, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*showItems*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*showItems*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div0, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(poddsok.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			transition_out(poddsok.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			if (if_block) if_block.d();
			destroy_component(poddsok);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Projects", slots, []);
	let showItems = false;

	let projects = [
		{ name: "Poddsök.nu" },
		{ name: "Hitta yrken" },
		{ name: "Plump" },
		{ name: "Mathleaks" }
	];

	let { leftPos = "50px" } = $$props;
	let opacityContainers = { first: 1, second: 1 };

	onMount(() => {
		$$invalidate(1, showItems = true);

		window.onscroll = () => {
			$$invalidate(0, leftPos = 50 + window.scrollX + "px");
			$$invalidate(2, opacityContainers.first = 1 - 4 * (window.scrollX / window.innerWidth), opacityContainers);
			$$invalidate(2, opacityContainers.second = 1 - 1.5 * (window.scrollX / window.innerWidth), opacityContainers);
		};
	});

	const writable_props = ["leftPos"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Projects> was created with unknown prop '${key}'`);
	});

	const click_handler = () => {
		scrollTo({
			element: ".poddsok-container",
			scrollX: true,
			scrollY: false,
			duration: 1250
		});
	};

	$$self.$$set = $$props => {
		if ("leftPos" in $$props) $$invalidate(0, leftPos = $$props.leftPos);
	};

	$$self.$capture_state = () => ({
		fade,
		fly,
		onMount,
		animateScroll,
		Computer,
		Phone,
		IPad,
		Poddsok,
		showItems,
		projects,
		leftPos,
		opacityContainers
	});

	$$self.$inject_state = $$props => {
		if ("showItems" in $$props) $$invalidate(1, showItems = $$props.showItems);
		if ("projects" in $$props) $$invalidate(3, projects = $$props.projects);
		if ("leftPos" in $$props) $$invalidate(0, leftPos = $$props.leftPos);
		if ("opacityContainers" in $$props) $$invalidate(2, opacityContainers = $$props.opacityContainers);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [leftPos, showItems, opacityContainers, projects, click_handler];
}

class Projects extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4, create_fragment$4, safe_not_equal, { leftPos: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Projects",
			options,
			id: create_fragment$4.name
		});
	}

	get leftPos() {
		throw new Error("<Projects>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set leftPos(value) {
		throw new Error("<Projects>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Projects;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMuMDY5YWE2YTYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUtc2Nyb2xsdG8vc3JjL2hlbHBlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUtc2Nyb2xsdG8vc3JjL2luZGV4LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQ29tcHV0ZXIuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvUGhvbmUuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvaVBhZC5zdmVsdGUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlL2FuaW1hdGUvaW5kZXgubWpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvUG9kZHNvay5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvcm91dGVzL3Byb2plY3RzLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gICQoc2VsZWN0b3IpIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfSxcbiAgZXh0ZW5kKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbiguLi5hcmdzKTtcbiAgfSxcbiAgY3VtdWxhdGl2ZU9mZnNldChlbGVtZW50KSB7XG4gICAgbGV0IHRvcCA9IDA7XG4gICAgbGV0IGxlZnQgPSAwO1xuXG4gICAgZG8ge1xuICAgICAgdG9wICs9IGVsZW1lbnQub2Zmc2V0VG9wIHx8IDA7XG4gICAgICBsZWZ0ICs9IGVsZW1lbnQub2Zmc2V0TGVmdCB8fCAwO1xuICAgICAgZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICAgIH0gd2hpbGUgKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogdG9wLFxuICAgICAgbGVmdDogbGVmdFxuICAgIH07XG4gIH0sXG4gIGRpcmVjdFNjcm9sbChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudCAhPT0gZG9jdW1lbnQgJiYgZWxlbWVudCAhPT0gZG9jdW1lbnQuYm9keTtcbiAgfSxcbiAgc2Nyb2xsVG9wKGVsZW1lbnQsIHZhbHVlKSB7XG4gICAgbGV0IGluU2V0dGVyID0gdmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5kaXJlY3RTY3JvbGwoZWxlbWVudCkpIHtcbiAgICAgIHJldHVybiBpblNldHRlciA/IChlbGVtZW50LnNjcm9sbFRvcCA9IHZhbHVlKSA6IGVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaW5TZXR0ZXJcbiAgICAgICAgPyAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gdmFsdWUpXG4gICAgICAgIDogd2luZG93LnBhZ2VZT2Zmc2V0IHx8XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fFxuICAgICAgICAgICAgMDtcbiAgICB9XG4gIH0sXG4gIHNjcm9sbExlZnQoZWxlbWVudCwgdmFsdWUpIHtcbiAgICBsZXQgaW5TZXR0ZXIgPSB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmICh0aGlzLmRpcmVjdFNjcm9sbChlbGVtZW50KSkge1xuICAgICAgcmV0dXJuIGluU2V0dGVyID8gKGVsZW1lbnQuc2Nyb2xsTGVmdCA9IHZhbHVlKSA6IGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGluU2V0dGVyXG4gICAgICAgID8gKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0ID0gdmFsdWUpXG4gICAgICAgIDogd2luZG93LnBhZ2VYT2Zmc2V0IHx8XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8XG4gICAgICAgICAgICAwO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCB7IGN1YmljSW5PdXQgfSBmcm9tIFwic3ZlbHRlL2Vhc2luZ1wiO1xuaW1wb3J0IHsgbm9vcCwgbG9vcCwgbm93IH0gZnJvbSBcInN2ZWx0ZS9pbnRlcm5hbFwiO1xuaW1wb3J0IF8gZnJvbSBcIi4vaGVscGVyXCI7XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICBjb250YWluZXI6IFwiYm9keVwiLFxuICBkdXJhdGlvbjogNTAwLFxuICBkZWxheTogMCxcbiAgb2Zmc2V0OiAwLFxuICBlYXNpbmc6IGN1YmljSW5PdXQsXG4gIG9uU3RhcnQ6IG5vb3AsXG4gIG9uRG9uZTogbm9vcCxcbiAgb25BYm9ydGluZzogbm9vcCxcbiAgc2Nyb2xsWDogZmFsc2UsXG4gIHNjcm9sbFk6IHRydWVcbn07XG5cbmNvbnN0IF9zY3JvbGxUbyA9IG9wdGlvbnMgPT4ge1xuICBsZXQge1xuICAgIG9mZnNldCxcbiAgICBkdXJhdGlvbixcbiAgICBkZWxheSxcbiAgICBlYXNpbmcsXG4gICAgeD0wLFxuICAgIHk9MCxcbiAgICBzY3JvbGxYLFxuICAgIHNjcm9sbFksXG4gICAgb25TdGFydCxcbiAgICBvbkRvbmUsXG4gICAgY29udGFpbmVyLFxuICAgIG9uQWJvcnRpbmcsXG4gICAgZWxlbWVudFxuICB9ID0gb3B0aW9ucztcblxuICBpZiAodHlwZW9mIG9mZnNldCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0KCk7XG4gIH1cblxuICB2YXIgY3VtdWxhdGl2ZU9mZnNldENvbnRhaW5lciA9IF8uY3VtdWxhdGl2ZU9mZnNldChjb250YWluZXIpO1xuICB2YXIgY3VtdWxhdGl2ZU9mZnNldFRhcmdldCA9IGVsZW1lbnRcbiAgICA/IF8uY3VtdWxhdGl2ZU9mZnNldChlbGVtZW50KVxuICAgIDogeyB0b3A6IHksIGxlZnQ6IHggfTtcblxuICB2YXIgaW5pdGlhbFggPSBfLnNjcm9sbExlZnQoY29udGFpbmVyKTtcbiAgdmFyIGluaXRpYWxZID0gXy5zY3JvbGxUb3AoY29udGFpbmVyKTtcblxuICB2YXIgdGFyZ2V0WCA9XG4gICAgY3VtdWxhdGl2ZU9mZnNldFRhcmdldC5sZWZ0IC0gY3VtdWxhdGl2ZU9mZnNldENvbnRhaW5lci5sZWZ0ICsgb2Zmc2V0O1xuICB2YXIgdGFyZ2V0WSA9XG4gICAgY3VtdWxhdGl2ZU9mZnNldFRhcmdldC50b3AgLSBjdW11bGF0aXZlT2Zmc2V0Q29udGFpbmVyLnRvcCArIG9mZnNldDtcblxuICB2YXIgZGlmZlggPSB0YXJnZXRYIC0gaW5pdGlhbFg7XG5cdHZhciBkaWZmWSA9IHRhcmdldFkgLSBpbml0aWFsWTtcblxuICBsZXQgc2Nyb2xsaW5nID0gdHJ1ZTtcbiAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcbiAgbGV0IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5O1xuICBsZXQgZW5kX3RpbWUgPSBzdGFydF90aW1lICsgZHVyYXRpb247XG5cbiAgZnVuY3Rpb24gc2Nyb2xsVG9Ub3BMZWZ0KGVsZW1lbnQsIHRvcCwgbGVmdCkge1xuICAgIGlmIChzY3JvbGxYKSBfLnNjcm9sbExlZnQoZWxlbWVudCwgbGVmdCk7XG4gICAgaWYgKHNjcm9sbFkpIF8uc2Nyb2xsVG9wKGVsZW1lbnQsIHRvcCk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydChkZWxheVN0YXJ0KSB7XG4gICAgaWYgKCFkZWxheVN0YXJ0KSB7XG4gICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgIG9uU3RhcnQoZWxlbWVudCwge3gsIHl9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0aWNrKHByb2dyZXNzKSB7XG4gICAgc2Nyb2xsVG9Ub3BMZWZ0KFxuICAgICAgY29udGFpbmVyLFxuICAgICAgaW5pdGlhbFkgKyBkaWZmWSAqIHByb2dyZXNzLFxuICAgICAgaW5pdGlhbFggKyBkaWZmWCAqIHByb2dyZXNzXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgc2Nyb2xsaW5nID0gZmFsc2U7XG4gIH1cblxuICBsb29wKG5vdyA9PiB7XG4gICAgaWYgKCFzdGFydGVkICYmIG5vdyA+PSBzdGFydF90aW1lKSB7XG4gICAgICBzdGFydChmYWxzZSlcbiAgICB9XG5cbiAgICBpZiAoc3RhcnRlZCAmJiBub3cgPj0gZW5kX3RpbWUpIHtcbiAgICAgIHRpY2soMSk7XG4gICAgICBzdG9wKCk7XG4gICAgICBvbkRvbmUoZWxlbWVudCwge3gsIHl9KTtcbiAgICB9XG5cbiAgICBpZiAoIXNjcm9sbGluZykge1xuICAgICAgb25BYm9ydGluZyhlbGVtZW50LCB7eCwgeX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc3RhcnRlZCkge1xuICAgICAgY29uc3QgcCA9IG5vdyAtIHN0YXJ0X3RpbWU7XG4gICAgICBjb25zdCB0ID0gMCArIDEgKiBlYXNpbmcocCAvIGR1cmF0aW9uKTtcbiAgICAgIHRpY2sodCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xuXG4gIHN0YXJ0KGRlbGF5KTtcblxuICB0aWNrKDApO1xuXG4gIHJldHVybiBzdG9wO1xufTtcblxuY29uc3QgcHJvY2VlZE9wdGlvbnMgPSBvcHRpb25zID0+IHtcblx0bGV0IG9wdHMgPSBfLmV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICBvcHRzLmNvbnRhaW5lciA9IF8uJChvcHRzLmNvbnRhaW5lcik7XG4gIG9wdHMuZWxlbWVudCA9IF8uJChvcHRzLmVsZW1lbnQpO1xuICByZXR1cm4gb3B0cztcbn07XG5cbmNvbnN0IHNjcm9sbENvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lckVsZW1lbnQgPT4ge1xuICBpZiAoXG4gICAgY29udGFpbmVyRWxlbWVudCAmJlxuICAgIGNvbnRhaW5lckVsZW1lbnQgIT09IGRvY3VtZW50ICYmXG4gICAgY29udGFpbmVyRWxlbWVudCAhPT0gZG9jdW1lbnQuYm9keVxuICApIHtcbiAgICByZXR1cm4gY29udGFpbmVyRWxlbWVudC5zY3JvbGxIZWlnaHQgLSBjb250YWluZXJFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgfSBlbHNlIHtcbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgbGV0IGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICBib2R5LnNjcm9sbEhlaWdodCxcbiAgICAgIGJvZHkub2Zmc2V0SGVpZ2h0LFxuICAgICAgaHRtbC5jbGllbnRIZWlnaHQsXG4gICAgICBodG1sLnNjcm9sbEhlaWdodCxcbiAgICAgIGh0bWwub2Zmc2V0SGVpZ2h0XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHNldEdsb2JhbE9wdGlvbnMgPSBvcHRpb25zID0+IHtcblx0Xy5leHRlbmQoZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMgfHwge30pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNjcm9sbFRvID0gb3B0aW9ucyA9PiB7XG4gIHJldHVybiBfc2Nyb2xsVG8ocHJvY2VlZE9wdGlvbnMob3B0aW9ucykpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNjcm9sbFRvQm90dG9tID0gb3B0aW9ucyA9PiB7XG4gIG9wdGlvbnMgPSBwcm9jZWVkT3B0aW9ucyhvcHRpb25zKTtcblxuICByZXR1cm4gX3Njcm9sbFRvKFxuICAgIF8uZXh0ZW5kKG9wdGlvbnMsIHtcbiAgICAgIGVsZW1lbnQ6IG51bGwsXG4gICAgICB5OiBzY3JvbGxDb250YWluZXJIZWlnaHQob3B0aW9ucy5jb250YWluZXIpXG4gICAgfSlcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzY3JvbGxUb1RvcCA9IG9wdGlvbnMgPT4ge1xuICBvcHRpb25zID0gcHJvY2VlZE9wdGlvbnMob3B0aW9ucyk7XG5cbiAgcmV0dXJuIF9zY3JvbGxUbyhcbiAgICBfLmV4dGVuZChvcHRpb25zLCB7XG4gICAgICBlbGVtZW50OiBudWxsLFxuICAgICAgeTogMFxuICAgIH0pXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgbWFrZVNjcm9sbFRvQWN0aW9uID0gc2Nyb2xsVG9GdW5jID0+IHtcbiAgcmV0dXJuIChub2RlLCBvcHRpb25zKSA9PiB7XG4gICAgbGV0IGN1cnJlbnQgPSBvcHRpb25zO1xuICAgIGNvbnN0IGhhbmRsZSA9IGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2Nyb2xsVG9GdW5jKFxuICAgICAgICB0eXBlb2YgY3VycmVudCA9PT0gXCJzdHJpbmdcIiA/IHsgZWxlbWVudDogY3VycmVudCB9IDogY3VycmVudFxuICAgICAgKTtcbiAgICB9O1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZSk7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGUpO1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGUob3B0aW9ucykge1xuICAgICAgICBjdXJyZW50ID0gb3B0aW9ucztcbiAgICAgIH0sXG4gICAgICBkZXN0cm95KCkge1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGUpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBzY3JvbGx0byA9IG1ha2VTY3JvbGxUb0FjdGlvbihzY3JvbGxUbyk7XG5leHBvcnQgY29uc3Qgc2Nyb2xsdG90b3AgPSBtYWtlU2Nyb2xsVG9BY3Rpb24oc2Nyb2xsVG9Ub3ApO1xuZXhwb3J0IGNvbnN0IHNjcm9sbHRvYm90dG9tID0gbWFrZVNjcm9sbFRvQWN0aW9uKHNjcm9sbFRvQm90dG9tKTtcbiIsIjxzY3JpcHQ+XHJcblx0XHJcblx0XHRsZXQgc3JjID1cImFmLXNjcmVlbnNob3QucG5nXCI7XHJcblxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxyXG5cclxuXHRAaW1wb3J0ICcuLi8uLi9zdGF0aWMvX3ZhcmlhYmxlcy5zY3NzJztcclxuXHJcblx0LmxhcHRvcC1jb250YWluZXIge1xyXG5cdCAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0ICAgIG1hcmdpbi1sZWZ0OiAyOSU7XHJcblx0ICAgIHotaW5kZXg6IC0xO1xyXG5cdCAgICBjdXJzb3I6IHBvaW50ZXI7XHJcblx0fVxyXG5cclxuXHQubGFwdG9wLXNjcmVlbiB7XHJcblx0XHR3aWR0aDogMzUycHg7XHJcblx0XHRoZWlnaHQ6IDIzNXB4O1xyXG5cdFx0YmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmV5O1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMjVweCAyNXB4IDBweCAwcHg7XHJcblx0XHRib3JkZXItcmlnaHQ6IDEwcHggc29saWQgZ3JheTtcclxuXHR9XHJcblxyXG5cdC5sYXB0b3AtaW5uZXJzY3JlZW4ge1xyXG5cdFx0d2lkdGg6IDMwMHB4O1xyXG5cdFx0aGVpZ2h0OiAyNTBweDtcclxuXHRcdG1hcmdpbi1sZWZ0OiAyNXB4O1xyXG5cdFx0bWFyZ2luLXRvcDogMjVweDtcclxuXHRcdGltZyB7IFxyXG5cdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0bWFyZ2luLXRvcDogMjBweDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC5sYXB0b3Ata2V5Ym9hcmQge1xyXG5cdFx0Ym9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xyXG5cdFx0bWFyZ2luLWxlZnQ6IC00M3B4O1xyXG5cdFx0dHJhbnNmb3JtOiBza2V3WCgtMzBkZWcpO1xyXG5cdFx0d2lkdGg6IDM1MnB4O1xyXG5cdFx0aGVpZ2h0OiAxNTBweDtcclxuXHRcdGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JleTtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDBweCAwcHggMjVweCAyNXB4O1xyXG5cdFx0Ym9yZGVyLXJpZ2h0OiAxMHB4IHNvbGlkIGdyYXk7XHJcblx0fVxyXG5cclxuXHQubGFwdG9wLWtleXBhZCB7XHJcblx0XHR3aWR0aDogMTAwcHg7XHJcblx0ICAgIGhlaWdodDogNDBweDtcclxuXHQgICAgYm9yZGVyOiAwLjVweCBzb2xpZCBibGFjaztcclxuXHQgICAgYm90dG9tOiAxMHB4O1xyXG5cdCAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0ICAgIGxlZnQ6IDEzMHB4O1xyXG5cdCAgICBib3JkZXItcmFkaXVzOiAxNSU7XHRcclxuXHR9XHJcblx0LmxhcHRvcC1rZXlzIHtcclxuXHRcdHdpZHRoOiAzMjBweDtcclxuXHQgICAgaGVpZ2h0OiA4MHB4O1xyXG5cdCAgICBib3JkZXI6IDAuNXB4IHNvbGlkIGJsYWNrO1xyXG5cdCAgICB0b3A6IDEwcHg7XHJcblx0ICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHQgICAgbGVmdDogMTVweDtcclxuXHR9XHJcblx0LmxhcHRvcC1rZXkge1xyXG5cdFx0d2lkdGg6IDEwcHg7XHJcblx0XHRoZWlnaHQ6IDEwcHg7XHJcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxuXHRcdG1hcmdpbjogMS41cHg7XHJcblx0fVxyXG5cclxuXHRAbWVkaWEoIG1heC13aWR0aDogJGRlc2t0b3Atd2lkdGggKSB7XHJcblx0XHQubGFwdG9wLWNvbnRhaW5lciB7XHJcblx0XHRcdGJvdHRvbTogMTBweDtcclxuXHRcdCAgICBsZWZ0OiA0MiU7XHJcblx0XHQgICAgbWFyZ2luLWxlZnQ6IDA7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRAbWVkaWEoIG1heC13aWR0aDogJHRhYmxldC13aWR0aCApIHtcclxuXHRcdC5sYXB0b3AtY29udGFpbmVyIHtcclxuXHRcdCAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHQgICAgYm90dG9tOiA2MHB4O1xyXG5cdFx0ICAgIHJpZ2h0OiAzMHB4O1xyXG5cdFx0ICAgIGxlZnQ6IGF1dG87XHJcblx0XHQgICAgei1pbmRleDogLTE7XHJcblx0XHQgICAgY3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0fVxyXG5cclxuXHRcdC5sYXB0b3Atc2NyZWVuIHtcclxuXHRcdFx0d2lkdGg6IDE3NnB4O1xyXG5cdFx0XHRoZWlnaHQ6IDExNy41cHg7XHJcblx0XHRcdGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JleTtcclxuXHRcdFx0Ym9yZGVyLXJhZGl1czogMTIuNXB4IDEyLjVweCAwcHggMHB4O1xyXG5cdFx0XHRib3JkZXItcmlnaHQ6IDZweCBzb2xpZCBncmF5O1xyXG5cdFx0fVxyXG5cclxuXHRcdC5sYXB0b3AtaW5uZXJzY3JlZW4ge1xyXG5cdFx0XHR3aWR0aDogMTUwcHg7XHJcblx0XHRcdGhlaWdodDogMTI1cHg7XHJcblx0XHRcdG1hcmdpbi1sZWZ0OiAyNXB4O1xyXG5cdFx0XHRtYXJnaW4tdG9wOiAyNXB4O1xyXG5cdFx0XHRpbWcgeyBcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAxMHB4O1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAtMTBweDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC5sYXB0b3Ata2V5Ym9hcmQge1xyXG5cdFx0XHRib3JkZXItdG9wOiAxcHggc29saWQgYmxhY2s7XHJcblx0XHRcdG1hcmdpbi1sZWZ0OiAtMjEuNXB4O1xyXG5cdFx0XHR0cmFuc2Zvcm06IHNrZXdYKC0zMGRlZyk7XHJcblx0XHRcdHdpZHRoOiAxNzZweDtcclxuXHRcdFx0aGVpZ2h0OiA3NXB4O1xyXG5cdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZXk7XHJcblx0XHRcdGJvcmRlci1yYWRpdXM6IDBweCAwcHggMTIuNXB4IDEyLjVweDtcclxuXHRcdFx0Ym9yZGVyLXJpZ2h0OiA2cHggc29saWQgZ3JheTtcclxuXHRcdH1cclxuXHJcblx0XHQubGFwdG9wLWtleXBhZCB7XHJcblx0XHRcdHdpZHRoOiA1MHB4O1xyXG5cdFx0ICAgIGhlaWdodDogMTVweDtcclxuXHRcdCAgICBib3JkZXI6IDAuNXB4IHNvbGlkIGJsYWNrO1xyXG5cdFx0ICAgIGJvdHRvbTogNXB4O1xyXG5cdFx0ICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdCAgICBsZWZ0OiA2NXB4O1xyXG5cdFx0ICAgIGJvcmRlci1yYWRpdXM6IDE1JTtcdFxyXG5cdFx0fVxyXG5cdFx0LmxhcHRvcC1rZXlzIHtcclxuXHRcdFx0d2lkdGg6IDE1MnB4O1xyXG5cdFx0ICAgIGhlaWdodDogMzdweDtcclxuXHRcdCAgICBib3JkZXI6IDAuNXB4IHNvbGlkIGJsYWNrO1xyXG5cdFx0ICAgIHRvcDogMTBweDtcclxuXHRcdCAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHQgICAgbGVmdDogMTVweDtcclxuXHRcdH1cclxuXHRcdC5sYXB0b3Ata2V5IHtcclxuXHRcdFx0d2lkdGg6IDQuNXB4O1xyXG5cdFx0XHRoZWlnaHQ6IDQuNXB4O1xyXG5cdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxuXHRcdFx0bWFyZ2luOiAwLjc1cHg7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRAbWVkaWEoIG1heC13aWR0aDogJGxhcmdlLXBob25lICkge1xyXG5cdFx0LmxhcHRvcC1jb250YWluZXIge1xyXG5cdFx0XHRyaWdodDogMTAwcHg7XHJcblx0XHRcdGJvdHRvbTogMjBweDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG48L3N0eWxlPlxyXG5cclxuPGRpdiBjbGFzcz1cImxhcHRvcC1jb250YWluZXJcIj5cclxuXHQ8ZGl2IGNsYXNzPVwibGFwdG9wLXNjcmVlblwiPlxyXG5cdFx0PGRpdiBjbGFzcz1cImxhcHRvcC1pbm5lcnNjcmVlblwiPlxyXG5cdFx0XHQ8aW1nIHtzcmN9ICBhbHQ9XCJDb21wdXRlclwiIC8+XHJcblx0XHQ8L2Rpdj5cclxuXHQ8L2Rpdj5cclxuXHQ8ZGl2IGNsYXNzPVwibGFwdG9wLWtleWJvYXJkXCI+XHJcblx0XHQ8ZGl2IGNsYXNzPVwibGFwdG9wLWtleXNcIj5cclxuXHRcdFx0eyNlYWNoIEFycmF5KDYpIGFzIF8sIGp9XHJcblx0XHRcdFx0PGRpdiBzdHlsZT1cImRpc3BsYXk6ZmxleDtcIj5cclxuXHRcdFx0XHRcdHsjZWFjaCBBcnJheSgyNSkgYXMgXywgaX1cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImxhcHRvcC1rZXlcIj48L2Rpdj5cclxuXHRcdFx0XHRcdHsvZWFjaH1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0ey9lYWNofVxyXG5cdFx0PC9kaXY+XHJcblx0XHQ8ZGl2IGNsYXNzPVwibGFwdG9wLWtleXBhZFwiPjwvZGl2PlxyXG5cdDwvZGl2PlxyXG48L2Rpdj4iLCI8c2NyaXB0PlxyXG5cclxuXHRsZXQgc3JjID0gXCJwb2Rkc29rLXBob25lLmpwZ1wiO1xyXG5cclxuXHRleHBvcnQgbGV0IGxlZnRQb3M7XHJcblxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxyXG5cclxuIFx0QGltcG9ydCAnLi4vLi4vc3RhdGljL192YXJpYWJsZXMuc2Nzcyc7XHJcblxyXG5cdC5waG9uZS1jb250YWluZXIge1xyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0dG9wOiA2MHB4O1xyXG5cdFx0bGVmdDogdmFyKC0tbGVmdCk7XHJcblx0fVxyXG5cdGltZyB7XHJcblx0XHR3aWR0aDogMjAwcHg7XHJcblx0XHRib3JkZXI6IDI1cHggc29saWQgYmxhY2s7XHJcblx0XHRib3JkZXItcmFkaXVzOiAyNXB4O1xyXG5cdFx0Ym9yZGVyLWxlZnQtd2lkdGg6IDE1cHg7XHJcbiAgICBcdGJvcmRlci1yaWdodC13aWR0aDogMTVweDtcclxuICAgIFx0Ym9yZGVyLWJvdHRvbS13aWR0aDogMzVweDtcclxuICAgIFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdH1cclxuXHQucGhvbmUtYnV0dG9uIHtcclxuXHQgICAgd2lkdGg6IDIycHg7XHJcblx0ICAgIGhlaWdodDogMjJweDtcclxuXHQgICAgYm9yZGVyLXJhZGl1czogMjVweDtcclxuXHQgICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcblx0ICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHQgICAgYm90dG9tOiA3cHg7XHJcblx0ICAgIGxlZnQ6IDEwNXB4O1xyXG5cdCAgICBib3JkZXI6IDJweCBzb2xpZCAjMzAzMDMwO1xyXG5cdH1cclxuXHJcblx0QG1lZGlhKCBtYXgtd2lkdGg6ICR0YWJsZXQtd2lkdGggKSB7XHJcblx0XHQucGhvbmUtY29udGFpbmVyIHtcclxuXHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHR0b3A6IDY1cHg7XHJcblx0XHR9XHJcblx0XHRpbWcge1xyXG5cdFx0XHR3aWR0aDogMTAwcHg7XHJcblx0XHRcdGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcblx0XHRcdGJvcmRlci10b3Atd2lkdGg6IDEycHg7XHJcblx0XHRcdGJvcmRlci1sZWZ0LXdpZHRoOiA4cHg7XHJcblx0XHRcdGJvcmRlci1yaWdodC13aWR0aDogOHB4O1xyXG5cdFx0XHRib3JkZXItYm90dG9tLXdpZHRoOiAxOHB4O1xyXG5cdFx0fVxyXG5cdFx0LnBob25lLWJ1dHRvbiB7XHJcblx0XHQgICAgd2lkdGg6IDEwcHg7XHJcblx0XHQgICAgaGVpZ2h0OiAxMHB4O1xyXG5cdFx0ICAgIGxlZnQ6IDUzcHg7XHJcblx0XHQgICAgYm90dG9tOiA2cHg7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuPC9zdHlsZT5cclxuXHJcbjxkaXYgY2xhc3M9XCJwaG9uZS1jb250YWluZXJcIiBzdHlsZT1cIi0tbGVmdDoge2xlZnRQb3N9XCI+XHJcblx0PGltZyB7c3JjfSBhbHQ9XCJtb2JpbFwiIC8+XHJcblx0PGRpdiBjbGFzcz1cInBob25lLWJ1dHRvblwiPjwvZGl2PlxyXG48L2Rpdj4iLCI8c2NyaXB0PlxyXG5cclxuXHRsZXQgc3JjID0gXCJwbHVtcC1pcGFkLnBuZ1wiO1xyXG5cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGU+XHJcblxyXG4gLmlwYWQtY29udGFpbmVyIHtcclxuXHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0dG9wOiA2MHB4O1xyXG5cdHJpZ2h0OiAxOHB4O1xyXG4gfVxyXG5pbWcge1xyXG5cdHdpZHRoOiAzMDBweDtcclxuXHRoZWlnaHQ6IDIwMHB4O1xyXG4gXHRib3JkZXI6IDE1cHggc29saWQgYmxhY2s7XHJcbiBcdGJvcmRlci1sZWZ0LXdpZHRoOiAzMHB4O1xyXG4gXHRib3JkZXItcmlnaHQtd2lkdGg6IDMwcHg7XHJcbiBcdGJvcmRlci1yYWRpdXM6IDI1cHg7XHJcblx0Y3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbi5pcGFkLWJ1dHRvbiB7XHJcbiAgICB3aWR0aDogMTVweDtcclxuICAgIGhlaWdodDogMTVweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvdHRvbTogMTA2cHg7XHJcbiAgICBsZWZ0OiAzMzRweDtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkICMzMDMwMzA7XHJcbn1cclxuXHJcbjwvc3R5bGU+XHJcblxyXG48ZGl2IGNsYXNzPVwiaXBhZC1jb250YWluZXJcIj5cclxuXHQ8aW1nIHtzcmN9IC8+XHJcblx0PGRpdiBjbGFzcz1cImlwYWQtYnV0dG9uXCI+PC9kaXY+XHJcbjwvZGl2PiIsImltcG9ydCB7IGN1YmljT3V0IH0gZnJvbSAnLi4vZWFzaW5nJztcbmltcG9ydCB7IGlzX2Z1bmN0aW9uIH0gZnJvbSAnLi4vaW50ZXJuYWwnO1xuXG5mdW5jdGlvbiBmbGlwKG5vZGUsIGFuaW1hdGlvbiwgcGFyYW1zKSB7XG4gICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSA9PT0gJ25vbmUnID8gJycgOiBzdHlsZS50cmFuc2Zvcm07XG4gICAgY29uc3Qgc2NhbGVYID0gYW5pbWF0aW9uLmZyb20ud2lkdGggLyBub2RlLmNsaWVudFdpZHRoO1xuICAgIGNvbnN0IHNjYWxlWSA9IGFuaW1hdGlvbi5mcm9tLmhlaWdodCAvIG5vZGUuY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IGR4ID0gKGFuaW1hdGlvbi5mcm9tLmxlZnQgLSBhbmltYXRpb24udG8ubGVmdCkgLyBzY2FsZVg7XG4gICAgY29uc3QgZHkgPSAoYW5pbWF0aW9uLmZyb20udG9wIC0gYW5pbWF0aW9uLnRvLnRvcCkgLyBzY2FsZVk7XG4gICAgY29uc3QgZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gKGQpID0+IE1hdGguc3FydChkKSAqIDEyMCwgZWFzaW5nID0gY3ViaWNPdXQgfSA9IHBhcmFtcztcbiAgICByZXR1cm4ge1xuICAgICAgICBkZWxheSxcbiAgICAgICAgZHVyYXRpb246IGlzX2Z1bmN0aW9uKGR1cmF0aW9uKSA/IGR1cmF0aW9uKGQpIDogZHVyYXRpb24sXG4gICAgICAgIGVhc2luZyxcbiAgICAgICAgY3NzOiAoX3QsIHUpID0+IGB0cmFuc2Zvcm06ICR7dHJhbnNmb3JtfSB0cmFuc2xhdGUoJHt1ICogZHh9cHgsICR7dSAqIGR5fXB4KTtgXG4gICAgfTtcbn1cblxuZXhwb3J0IHsgZmxpcCB9O1xuIiwiPHNjcmlwdD5cclxuXHJcblx0aW1wb3J0IHsgZmxpcCB9IGZyb20gJ3N2ZWx0ZS9hbmltYXRlJztcclxuXHJcblx0bGV0IHByb2plY3RzID0gW1xyXG5cdFx0J1dlYnNpdGUnLCAnQXBwJywgJ0FkbWluJywgJ0FJJ1xyXG5cdF07XHJcblxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxyXG5cclxuXHRAaW1wb3J0ICcuLi8uLi9zdGF0aWMvZ2xvYmFsLnNjc3MnO1xyXG5cclxuXHQucG9kZHNvay1kZXNjcmlwdGlvbiB7XHJcblx0XHRtYXJnaW4tbGVmdDogMzIwcHg7XHJcblx0XHRtYXJnaW4tcmlnaHQ6IDQwcHg7XHJcblx0XHRtYXJnaW4tdG9wOiA2MHB4O1xyXG5cdH1cclxuXHJcblx0LnBvZGRzb2stcHJvamVjdHMge1xyXG5cdFx0ZGlzcGxheTogZmxleDtcclxuXHRcdG1hcmdpbi10b3A6IDEwMHB4O1xyXG5cdH1cclxuXHJcblx0LnBvZGRzb2stcHJvamVjdCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzAxOTM0O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgIHdpZHRoOiAyMCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IDIuNSU7XHJcbiAgICBib3gtc2hhZG93OiAtNHB4IC0xcHggNnB4IDRweCBsaWdodHNsYXRlZ3JleTtcclxuICAgIHBhZGRpbmc6IDMwcHggNTBweCAwcHggNTBweDtcclxuICAgIGhlaWdodDogMTAwcHg7XHJcbiAgICBmb250LXNpemU6IDMwcHg7XHJcblx0fVxyXG5cclxuICAucG9kZHNvay1wcm9qZWN0OmhvdmVyIHtcclxuICBcdGZvbnQtc2l6ZTogNDBweDtcclxuICBcdGhlaWdodDogMTIwcHg7XHJcbiAgfVxyXG5cclxuXHRoMSB7XHJcblx0XHRjb2xvcjogJHBvZGRzb2stY29sb3I7XHJcbiAgICBcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHR9XHJcblxyXG5cdGEge1xyXG5cdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG5cdCAgICBjb2xvcjogd2hpdGU7XHJcblx0ICAgIGJhY2tncm91bmQtY29sb3I6ICRwb2Rkc29rLWNvbG9yO1xyXG5cdCAgICBwYWRkaW5nOiAzcHg7XHJcblx0ICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuXHR9XHJcblxyXG5cdGE6aG92ZXIge1xyXG5cdFx0Zm9udC1zaXplOiAxOHB4O1xyXG5cdH1cclxuXHJcblx0cCB7XHJcblx0XHRsaW5lLWhlaWdodDogMjNweDtcclxuXHR9XHJcblxyXG48L3N0eWxlPlxyXG5cclxuPGRpdiBjbGFzcz1cInBvZGRzb2stZGVzY3JpcHRpb25cIj5cclxuXHQ8aDE+IFBvZGRzw7ZrLm51IDwvaDE+XHJcblxyXG5cdDxwPlxyXG5cdFx0T25lIG9mIG15IGZpcnN0IHNvZnR3YXJlIHByb2plY3RzIHdhcyA8YSBocmVmPVwiaHR0cHM6Ly9wb2Rkc29rLm51XCIgdGFyZ2V0PVwiX2JsYW5rXCI+UG9kZHPDtmsubnU8L2E+IC4gVGhlIGlkZWEgY2FtZSB0byBtZSBhZnRlciBsaXN0ZW5pbmcgdG8gMzAwIGVwaXNvZGVzIG9mIEFsZXggYW5kIFNpZ2dlcyBwb2RjYXN0LiBIb3cgdG8gZmluZCBhIHNlZ21lbnQgeW91IGhlYXJkIGluIGEgcHJldmlvdXMgZXBpc29kZT8gSSBjb3VsZCBub3QgZ29vZ2xlIGl0IHNpbmNlIGl0J3Mgbm90IHRleHQuIFdoYXQgaWYgdGhlcmUgd2FzIGFuIGFwcCB3aGVyZSB5b3UgY291bGQgc2VhcmNoIGZvciB3b3JkcyBvciBzZW50ZW5jZXMgdG8gZmluZCBvdXQgd2hlcmUgaW4gdGhlIHBvZGNhc3QgdGhleSB3ZXJlIG1lbnRpb25lZD9cclxuXHRcdDxiciAvPiA8YnIgLz5cclxuXHRcdEl0IHN0YXJ0ZWQgd2l0aCBhIHNpbmdsZS1wYWdlIGFwcGxpY2F0aW9uIGJ1aWx0IHdpdGggQW5ndWxhckpTLCB0aGUgZmlyc3QgZnJhbWV3b3JrIEkgbGVhcm5lZC4gVGhlbiBJIGhhZCB0byBwb3B1bGF0ZSB0aGUgc2l0ZSB3aXRoIHBvZGNhc3RzIGFuZCBlcGlzb2Rlcy4gTHVja2xpeSwgU3BvdGlmeSBoYXMgYW4gQVBJIGZvciB0aGF0LiBGb3IgdGhpcyBwYXJ0IEkgdXNlZCBBbmd1bGFyIGZvciB0aGUgZnJvbnRlbmQgYW5kIE5vZGUuanMgYXMgYSBiYWNrZW5kIHRvIGF1dGhlbnRpY2F0ZSB0byB0aGUgQVBJLiBOZXh0LCBpdCB3YXMgdGltZSB0byBsYXVuY2ggYW4gaU9TIGFwcC4gRm9yIHRoaXMgSSB1c2VkIEFwYWNoZSBDb3Jkb3ZhIHRvIGJlIGFibGUgdG8gcmV1c2UgbXkgY29kZWJhc2UgZnJvbSB0aGUgU1BBLlxyXG5cdFx0PGJyIC8+IDxiciAvPlxyXG5cdFx0WW91IG11c3Qgbm93IHdvbmRlciwgd2hlcmUgZG8gdGhlIHNlYXJjaGFibGUgc2VnbWVudHMgY29tZSBmcm9tPyBJbiB0aGUgYmVnaW5uaW5nLCB1c2VycyBjb3VsZCBhZGQgc2VudGVuY2VzIG1lbnRpb25lZCBvbiBzcGVjaWZpYyBlcGlzb2RlcyBpbiBwb2RjYXN0cy4gTm93LCBhbiBBSSBwcm9qZWN0IEkgY2hvb3NlIHRvIGNhbGxlZCBQbHlzc2xpbmdlbiBpcyB0cmFuc2NyaWJpbmcgZXBpc29kZXMuIFVzaW5nIEdvb2dsZSdzIHNwZWVjaC10by10ZXh5IGxpYnJhcnkgd2l0aCBQeXRob24gYW5kIHRoZSBmcmFtZXdvcmsgRmxhc2sgdGhlIG1vc3QgcmVsZXZhbnRzIHBhcnQgYXJlIHNhdmVkIHRvIGZpbGVzIGFuZCBsYXRlciBzdG9yZWQgaW4gdGhlIGRhdGFiYXNlLlxyXG5cdDwvcD5cclxuXHJcblx0PGRpdiBjbGFzcz1cInBvZGRzb2stcHJvamVjdHNcIj5cclxuXHRcdHsjZWFjaCBwcm9qZWN0cyBhcyBwcm9qZWN0IChwcm9qZWN0KX1cclxuXHRcdFx0PGRpdiBjbGFzcz1cInBvZGRzb2stcHJvamVjdFwiXHJcblx0XHRcdFx0XHQgYW5pbWF0ZTpmbGlwPVwie3sgZHVyYXRpb246IDUwMDAsIGRlbGF5OiAxMDAwIH19XCJcclxuXHRcdFx0XHRcdCBvbjpjbGljaz17ICgpID0+IHJlbW92ZShwcm9qZWN0KSB9PlxyXG5cdFx0XHRcdHtwcm9qZWN0fSAgXHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0ey9lYWNofVxyXG5cdDwvZGl2PlxyXG48L2Rpdj4iLCI8c2NyaXB0PlxyXG5cclxuXHRpbXBvcnQgeyBmYWRlLCBmbHkgfSBmcm9tICdzdmVsdGUvdHJhbnNpdGlvbic7XHJcblx0aW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSc7XHJcblx0aW1wb3J0ICogYXMgYW5pbWF0ZVNjcm9sbCBmcm9tIFwic3ZlbHRlLXNjcm9sbHRvXCI7XHJcblxyXG5cdGltcG9ydCBDb21wdXRlciBmcm9tIFwiLi4vY29tcG9uZW50cy9Db21wdXRlci5zdmVsdGVcIjtcclxuXHRpbXBvcnQgUGhvbmUgZnJvbSBcIi4uL2NvbXBvbmVudHMvUGhvbmUuc3ZlbHRlXCI7XHJcblx0aW1wb3J0IElQYWQgZnJvbSBcIi4uL2NvbXBvbmVudHMvaVBhZC5zdmVsdGVcIjtcclxuXHRpbXBvcnQgUG9kZHNvayBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb2Rkc29rLnN2ZWx0ZVwiO1xyXG5cclxuXHRsZXQgc2hvd0l0ZW1zID0gZmFsc2U7XHJcblxyXG5cdGxldCBwcm9qZWN0cyA9IFtcclxuXHRcdHsgbmFtZTogXCJQb2Rkc8O2ay5udVwiIH0sXHJcblx0XHR7IG5hbWU6IFwiSGl0dGEgeXJrZW5cIiB9LFxyXG5cdFx0eyBuYW1lOiBcIlBsdW1wXCIgfSxcclxuXHRcdHsgbmFtZTogXCJNYXRobGVha3NcIiB9XHJcblx0XTtcclxuXHJcblx0ZXhwb3J0IGxldCBsZWZ0UG9zID0gJzUwcHgnO1xyXG5cdGxldCBvcGFjaXR5Q29udGFpbmVycyA9IHtcclxuXHRcdGZpcnN0OiAxLFxyXG5cdFx0c2Vjb25kOiAxXHJcblx0fTtcclxuXHJcblx0b25Nb3VudCggKCkgPT4ge1xyXG5cdFx0c2hvd0l0ZW1zID0gdHJ1ZTtcclxuXHRcdHdpbmRvdy5vbnNjcm9sbCA9ICgpID0+IHsgXHJcblx0XHRcdGxlZnRQb3MgPSA1MCArIHdpbmRvdy5zY3JvbGxYICsgJ3B4JztcclxuXHRcdFx0b3BhY2l0eUNvbnRhaW5lcnMuZmlyc3QgPSAxIC0gNCAqICh3aW5kb3cuc2Nyb2xsWCAvIHdpbmRvdy5pbm5lcldpZHRoKTtcclxuXHRcdFx0b3BhY2l0eUNvbnRhaW5lcnMuc2Vjb25kID0gMSAtIDEuNSAqICh3aW5kb3cuc2Nyb2xsWCAvIHdpbmRvdy5pbm5lcldpZHRoKTtcclxuIFx0XHR9XHJcblx0fSk7XHJcblxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxyXG5cclxuXHRAaW1wb3J0ICcuLi8uLi9zdGF0aWMvX3ZhcmlhYmxlcy5zY3NzJztcclxuXHJcblx0LnNjcm9sbFh3aW5kb3cge1xyXG5cdFx0d2lkdGg6IDIwMCU7XHJcblx0XHRkaXNwbGF5OiBmbGV4O1xyXG5cdH1cclxuXHQuc2Nyb2xsWHdpbmRvdyA+IGRpdiB7XHJcblx0XHR3aWR0aDogNTAlO1xyXG5cdH1cclxuXHJcblx0LnByb2plY3RzLWluZm8tY29udGFpbmVyIHtcclxuXHRcdG9wYWNpdHk6IHZhcigtLW9wYWNpdHkpO1xyXG5cdFx0ZGlzcGxheTogZmxleDtcclxuIFx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gXHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cdH1cclxuXHQucHJvamVjdHMtaW5mbyB7XHJcblx0XHRwYWRkaW5nOiAyMHB4O1xyXG5cdFx0bWFyZ2luLXJpZ2h0OiA0MDBweDtcclxuXHRcdG1hcmdpbi1sZWZ0OiAyODBweDtcclxuICBcdFx0cCB7XHJcbiAgXHRcdFx0bWFyZ2luLWJsb2NrLXN0YXJ0OiAwO1xyXG4gIFx0XHR9XHJcblx0fVxyXG5cdC5zY3JvbGxYLW9wYWNpdHkge1xyXG5cdFx0b3BhY2l0eTogdmFyKC0tb3BhY2l0eSk7XHJcblx0fVxyXG5cdGgyLCBoMyB7XHJcblx0XHRjb2xvcjogY2FkZXRibHVlO1xyXG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdH1cclxuXHRoMyB7XHJcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0fVxyXG5cdHVsIHtcclxuXHRcdHdpZHRoOiAzMCU7XHJcbiAgICBcdG1hcmdpbi1yaWdodDogMyU7XHJcbiAgICBcdG1hcmdpbi10b3A6IDgwcHg7XHJcbiAgICBcdGZsb2F0OiByaWdodDtcclxuICAgIFx0bGlzdC1zdHlsZTogbm9uZTtcclxuICAgIFx0bGkge1xyXG4gICAgXHRcdHBhZGRpbmc6IDEwcHg7XHJcbiAgICBcdFx0YmFja2dyb3VuZC1jb2xvcjogY2FkZXRibHVlO1xyXG5cdFx0ICAgIGNvbG9yOiB3aGl0ZTtcclxuXHRcdCAgICBjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHQgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgIFx0fVxyXG4gICAgXHRsaTpob3ZlciB7XHJcbiAgICBcdFx0bWFyZ2luLWxlZnQ6IDIlO1xyXG4gICAgXHRcdGhlaWdodDogMjJweDtcclxuICAgIFx0XHRmb250LXNpemU6IDIwcHg7XHJcbiAgICBcdH1cclxuXHR9XHJcblxyXG5cdEBtZWRpYSggbWluLXdpZHRoOiAkbGFyZ2UtZGVza3RvcCApIHtcclxuXHRcdHVsIHtcclxuXHRcdFx0bWFyZ2luLXJpZ2h0OiAxMzBweDtcclxuXHRcdFx0bWFyZ2luLXRvcDogMjAwcHg7XHJcblx0XHR9XHJcblx0XHQuaGlkZS1tb2JpbGUge1xyXG5cdFx0XHRtYXJnaW4tdG9wOiAyMDVweDtcclxuXHRcdH1cclxuXHRcdC5wcm9qZWN0cy1pbmZvLWNvbnRhaW5lciB7XHJcblx0XHRcdGZvbnQtc2l6ZTogMjBweDtcclxuXHRcdFx0cGFkZGluZy1sZWZ0OiA1JTtcclxuXHRcdFx0cGFkZGluZy1yaWdodDogMyVcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdEBtZWRpYSggbWF4LXdpZHRoOiAkZGVza3RvcC13aWR0aCApIHtcclxuXHRcdHVsIHtcclxuXHRcdFx0d2lkdGg6IGF1dG87XHJcblx0XHRcdG1hcmdpbi1sZWZ0OiAyNjBweDtcclxuXHRcdFx0bWFyZ2luLXJpZ2h0OiAyNXB4O1xyXG5cdFx0XHRmbG9hdDogbm9uZTtcclxuXHRcdFx0bWFyZ2luLXRvcDogMDtcclxuXHRcdH1cclxuXHRcdGgyIHtcclxuXHRcdFx0dGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICBcdFx0bWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG5cdFx0fVxyXG5cdFx0LmhpZGUtaXBhZCwgLnByb2plY3RzLWluZm8tY29udGFpbmVyIHtcclxuXHRcdFx0ZGlzcGxheTogbm9uZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdEBtZWRpYSggbWF4LXdpZHRoOiAkdGFibGV0LXdpZHRoICkge1xyXG5cdFx0LnByb2plY3RzLWluZm8tY29udGFpbmVyIHtcclxuXHRcdFx0ZGlzcGxheTogYmxvY2s7XHJcblx0XHR9XHJcblx0XHR1bCB7XHJcblx0XHRcdG1hcmdpbi10b3A6IDEwMHB4O1xyXG5cdFx0XHRtYXJnaW4tbGVmdDogMHB4O1xyXG5cdFx0XHRoMyB7XHJcblx0XHRcdFx0d2lkdGg6IDQwJTtcclxuXHRcdFx0fVxyXG5cdFx0XHRsaSB7XHJcblx0XHRcdFx0d2lkdGg6IDQwJTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aDIge1xyXG5cdFx0XHR0ZXh0LWFsaWduOmNlbnRlcjtcclxuXHRcdFx0bWFyZ2luLXJpZ2h0OiAwO1xyXG5cdFx0fVxyXG5cdFx0LnByb2plY3RzLWluZm8ge1xyXG5cdFx0ICAgIHdpZHRoOiBhdXRvO1xyXG5cdFx0ICAgIG1hcmdpbi10b3A6IC0yMHB4O1xyXG5cdFx0ICAgIG1hcmdpbi1sZWZ0OiAxNjVweDtcclxuXHRcdCAgICBib3gtc2hhZG93OiBub25lO1xyXG5cdFx0ICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG5cdFx0ICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxuXHRcdCAgICBmb250LXNpemU6IDMuNXZ3O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0QG1lZGlhKCBtYXgtd2lkdGg6ICRsYXJnZS1waG9uZSApIHtcclxuXHRcdHVsIHtcclxuXHRcdFx0d2lkdGg6IGF1dG87XHJcblx0XHRcdG1hcmdpbi1yaWdodDogMzVweDtcclxuXHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRtYXJnaW4tdG9wOiAtMjVweDtcclxuXHRcdFx0aDMsIGxpIHtcclxuXHRcdFx0XHR3aWR0aDogYXV0bztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0LmhpZGUtbW9iaWxlIHtcclxuXHRcdFx0ZGlzcGxheTogbm9uZTtcclxuXHRcdH1cclxuXHR9XHJcbjwvc3R5bGU+XHJcblxyXG48ZGl2IGNsYXNzPVwic2Nyb2xsWHdpbmRvd1wiPlxyXG5cdDxkaXYgY2xhc3M9XCJwcm9qZWN0cy1jb250YWluZXJcIj5cclxuXHJcblx0XHQ8aDI+TXkgcG9ydGZvbGlvPC9oMj5cclxuXHJcblx0XHR7I2lmIHNob3dJdGVtc31cclxuXHRcdFx0PGRpdiB0cmFuc2l0aW9uOmZhZGV8bG9jYWw9XCJ7eyBkdXJhdGlvbjogMTAwMCwgZGVsYXk6IDIwMDAgfX1cIj5cclxuXHRcdFx0XHQ8UGhvbmUge2xlZnRQb3N9IC8+XHJcblx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0PGRpdiBjbGFzcz1cInByb2plY3RzLWluZm8tY29udGFpbmVyXCJcclxuXHRcdFx0XHQgc3R5bGU9XCItLW9wYWNpdHk6IHtvcGFjaXR5Q29udGFpbmVycy5maXJzdH1cIlxyXG5cdFx0XHRcdCB0cmFuc2l0aW9uOmZhZGV8bG9jYWw9XCJ7eyBkdXJhdGlvbjogMTAwMCwgZGVsYXk6IDEwMDAgfX1cIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicHJvamVjdHMtaW5mb1wiPlxyXG5cdFx0XHRcdFx0PHA+XHJcblx0XHRcdFx0XHRcdEkndmUgYmVlbiBkZXZlbG9waW5nIHdlYiBhcHBsaWNhdGlvbnMgZm9yIGJ1c25pZXNzLCBmb3IgZ292ZXJubWVudCwgZm9yIHN0YXJ0dXBcclxuXHRcdFx0XHRcdFx0YW5kIG9mIGNvdXJzZSBmb3IgZnVuLiBVc2luZyBkaWZmZXJlbnQgdGVjaG5vbG9naWVzLCBhIGNyZWF0aXZlIG1pbmQgYW5kIHRhbGVudGVkIFxyXG5cdFx0XHRcdFx0XHRjb2xsZWFndWVzIEkndmUgbWFuYWdlIHRvIGNyZWF0ZSBzbW9vdGggYW5kIHJlc3BvbnNpdmUgYXBwbGljYXRpb25zIGZvciBib3RoIGRlc2t0b3AgXHJcblx0XHRcdFx0XHRcdGFuZCBtb2JpbGUuIEkgd2lsbCBub3cgc2hhcmUgc29tZSBvZiBteSBtb3N0IHN1Y2Nlc3NmdWwgcHJvamVjdHMhXHJcblx0XHRcdFx0XHQ8L3A+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0PGRpdiBjbGFzcz1cImhpZGUtaXBhZCBzY3JvbGxYLW9wYWNpdHlcIiBcclxuXHRcdFx0XHQgc3R5bGU9XCItLW9wYWNpdHk6IHtvcGFjaXR5Q29udGFpbmVycy5zZWNvbmR9XCJcclxuXHRcdFx0XHQgdHJhbnNpdGlvbjpmYWRlfGxvY2FsPVwie3sgZHVyYXRpb246IDEwMDAsIGRlbGF5OiA0MDAwIH19XCI+XHJcblx0XHRcdFx0PElQYWQgLz5cclxuXHRcdFx0PC9kaXY+XHJcblxyXG5cclxuXHRcdFx0PHVsIGNsYXNzPVwic2Nyb2xsWC1vcGFjaXR5XCJcclxuXHRcdFx0XHRzdHlsZT1cIi0tb3BhY2l0eToge29wYWNpdHlDb250YWluZXJzLnNlY29uZH1cIj5cclxuXHRcdFx0XHQ8aDMgaW46Zmx5fGxvY2FsPVwie3sgeTogLTUwLCBkdXJhdGlvbjogMjAwMCwgZGVsYXk6IDM1MDAgfX1cIj4gXHJcblx0XHRcdFx0XHRBIHBvdHBvcnJpIFxyXG5cdFx0XHRcdDwvaDM+XHJcblx0XHRcdFx0eyNlYWNoIHByb2plY3RzIGFzIHByb2plY3QsIGl9XHJcblx0XHRcdFx0XHQ8bGkgaW46Zmx5PVwie3sgeTogLTUwLCBkdXJhdGlvbjogMjAwMCwgZGVsYXk6IDM1MDAgKyAoaSsxKSoxMDAwIH19XCJcclxuXHRcdFx0XHRcdFx0b246Y2xpY2s9eyAoKSA9PiB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGFuaW1hdGVTY3JvbGwuc2Nyb2xsVG8oeyBcclxuXHRcdFx0XHRcdFx0XHRcdGVsZW1lbnQ6Jy5wb2Rkc29rLWNvbnRhaW5lcicsXHJcblx0XHRcdFx0XHRcdFx0XHRzY3JvbGxYOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0c2Nyb2xsWTogZmFsc2UsXHJcblx0XHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogMTI1MFxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0fX0+XHJcblx0XHRcdFx0XHRcdHtwcm9qZWN0Lm5hbWV9XHJcblx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdHsvZWFjaH1cclxuXHRcdFx0PC91bD5cclxuXHJcblx0XHRcdDxkaXYgY2xhc3M9XCJoaWRlLW1vYmlsZSBzY3JvbGxYLW9wYWNpdHlcIiBcclxuXHRcdFx0XHQgc3R5bGU9XCItLW9wYWNpdHk6IHtvcGFjaXR5Q29udGFpbmVycy5maXJzdH1cIlxyXG5cdFx0XHRcdCB0cmFuc2l0aW9uOmZhZGV8bG9jYWw9XCJ7eyBkdXJhdGlvbjogMTAwMCwgZGVsYXk6IDMwMDAgfX1cIj5cclxuXHRcdFx0XHQ8Q29tcHV0ZXIgLz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHR7L2lmfVxyXG5cdDwvZGl2PlxyXG5cclxuXHQ8ZGl2IGNsYXNzPVwicG9kZHNvay1jb250YWluZXJcIj5cclxuXHRcdDxQb2Rkc29rIC8+XHJcblx0PC9kaXY+XHJcbjwvZGl2PiJdLCJuYW1lcyI6WyJhbmltYXRlU2Nyb2xsLnNjcm9sbFRvIl0sIm1hcHBpbmdzIjoiOztBQUFBLFFBQWU7QUFDZixFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUU7QUFDZCxJQUFJLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO0FBQ3RDLE1BQU0sT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLEtBQUs7QUFDTCxJQUFJLE9BQU8sUUFBUSxDQUFDO0FBQ3BCLEdBQUc7QUFDSCxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUksRUFBRTtBQUNsQixJQUFJLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xDLEdBQUc7QUFDSCxFQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtBQUM1QixJQUFJLElBQUksR0FBRyxHQUFH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
