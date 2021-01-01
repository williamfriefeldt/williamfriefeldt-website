import { r as cubicInOut, n as noop, u as now, w as loop, S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, x as validate_each_argument, v as validate_slots, e as element, y as space, c as claim_element, a as children, z as claim_space, b as detach_dev, A as set_style, h as add_location, j as insert_dev, B as append_dev, C as destroy_each, f as attr_dev, o as onMount, D as fly, E as empty, t as transition_in, F as group_outros, p as transition_out, G as check_outros, H as text, I as claim_text, J as add_render_callback, K as create_bidirectional_transition, L as fade, k as create_component, l as claim_component, m as mount_component, M as create_in_transition, q as destroy_component, N as listen_dev } from './client.9b7e8a0b.js';

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

/* src\components\Poddsok.svelte generated by Svelte v3.29.3 */
const file$3 = "src\\components\\Poddsok.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (97:2) {#if showProjects}
function create_if_block(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*projects*/ ctx[1];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l: function claim(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*projects*/ 2) {
				each_value = /*projects*/ ctx[1];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(97:2) {#if showProjects}",
		ctx
	});

	return block;
}

// (98:3) {#each projects as project}
function create_each_block$1(ctx) {
	let div;
	let t0_value = /*project*/ ctx[2] + "";
	let t0;
	let t1;
	let div_transition;
	let current;

	const block = {
		c: function create() {
			div = element("div");
			t0 = text(t0_value);
			t1 = text("  hej\r\n\t\t\t\t");
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			t0 = claim_text(div_nodes, t0_value);
			t1 = claim_text(div_nodes, "  hej\r\n\t\t\t\t");
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "poddsok-project svelte-199xhs7");
			add_location(div, file$3, 98, 4, 3006);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, t0);
			append_dev(div, t1);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;

			if (local) {
				add_render_callback(() => {
					if (!div_transition) div_transition = create_bidirectional_transition(div, fly, { x: -50, duration: 2000, delay: 3500 }, true);
					div_transition.run(1);
				});
			}

			current = true;
		},
		o: function outro(local) {
			if (local) {
				if (!div_transition) div_transition = create_bidirectional_transition(div, fly, { x: -50, duration: 2000, delay: 3500 }, false);
				div_transition.run(0);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (detaching && div_transition) div_transition.end();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(98:3) {#each projects as project}",
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
	let current;
	let if_block = /*showProjects*/ ctx[0] && create_if_block(ctx);

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
			if (if_block) if_block.c();
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
			if (if_block) if_block.l(div0_nodes);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h1, "class", "svelte-199xhs7");
			add_location(h1, file$3, 85, 1, 1640);
			attr_dev(a, "href", "https://poddsok.nu");
			attr_dev(a, "target", "_blank");
			attr_dev(a, "class", "svelte-199xhs7");
			add_location(a, file$3, 88, 40, 1711);
			add_location(br0, file$3, 89, 2, 2079);
			add_location(br1, file$3, 89, 9, 2086);
			add_location(br2, file$3, 91, 2, 2508);
			add_location(br3, file$3, 91, 9, 2515);
			attr_dev(p, "class", "svelte-199xhs7");
			add_location(p, file$3, 87, 1, 1666);
			attr_dev(div0, "class", "poddsok-projects svelte-199xhs7");
			add_location(div0, file$3, 95, 1, 2916);
			attr_dev(div1, "class", "poddsok-description svelte-199xhs7");
			add_location(div1, file$3, 84, 0, 1604);
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
			if (if_block) if_block.m(div0, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*showProjects*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*showProjects*/ 1) {
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
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (if_block) if_block.d();
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
	let showProjects = false;

	onMount(() => {
		$$invalidate(0, showProjects = true);
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Poddsok> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ fly, onMount, projects, showProjects });

	$$self.$inject_state = $$props => {
		if ("projects" in $$props) $$invalidate(1, projects = $$props.projects);
		if ("showProjects" in $$props) $$invalidate(0, showProjects = $$props.showProjects);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [showProjects, projects];
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
function create_if_block$1(ctx) {
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
		id: create_if_block$1.name,
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
	let if_block = /*showItems*/ ctx[1] && create_if_block$1(ctx);
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
					if_block = create_if_block$1(ctx);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMuNDdlZDEzZWMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUtc2Nyb2xsdG8vc3JjL2hlbHBlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUtc2Nyb2xsdG8vc3JjL2luZGV4LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQ29tcHV0ZXIuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvUGhvbmUuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvaVBhZC5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Qb2Rkc29rLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvcHJvamVjdHMuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgJChzZWxlY3Rvcikge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9LFxuICBleHRlbmQoLi4uYXJncykge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKC4uLmFyZ3MpO1xuICB9LFxuICBjdW11bGF0aXZlT2Zmc2V0KGVsZW1lbnQpIHtcbiAgICBsZXQgdG9wID0gMDtcbiAgICBsZXQgbGVmdCA9IDA7XG5cbiAgICBkbyB7XG4gICAgICB0b3AgKz0gZWxlbWVudC5vZmZzZXRUb3AgfHwgMDtcbiAgICAgIGxlZnQgKz0gZWxlbWVudC5vZmZzZXRMZWZ0IHx8IDA7XG4gICAgICBlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gICAgfSB3aGlsZSAoZWxlbWVudCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiB0b3AsXG4gICAgICBsZWZ0OiBsZWZ0XG4gICAgfTtcbiAgfSxcbiAgZGlyZWN0U2Nyb2xsKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50ICE9PSBkb2N1bWVudCAmJiBlbGVtZW50ICE9PSBkb2N1bWVudC5ib2R5O1xuICB9LFxuICBzY3JvbGxUb3AoZWxlbWVudCwgdmFsdWUpIHtcbiAgICBsZXQgaW5TZXR0ZXIgPSB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmICh0aGlzLmRpcmVjdFNjcm9sbChlbGVtZW50KSkge1xuICAgICAgcmV0dXJuIGluU2V0dGVyID8gKGVsZW1lbnQuc2Nyb2xsVG9wID0gdmFsdWUpIDogZWxlbWVudC5zY3JvbGxUb3A7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpblNldHRlclxuICAgICAgICA/IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSB2YWx1ZSlcbiAgICAgICAgOiB3aW5kb3cucGFnZVlPZmZzZXQgfHxcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHxcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8XG4gICAgICAgICAgICAwO1xuICAgIH1cbiAgfSxcbiAgc2Nyb2xsTGVmdChlbGVtZW50LCB2YWx1ZSkge1xuICAgIGxldCBpblNldHRlciA9IHZhbHVlICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMuZGlyZWN0U2Nyb2xsKGVsZW1lbnQpKSB7XG4gICAgICByZXR1cm4gaW5TZXR0ZXIgPyAoZWxlbWVudC5zY3JvbGxMZWZ0ID0gdmFsdWUpIDogZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaW5TZXR0ZXJcbiAgICAgICAgPyAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgPSB2YWx1ZSlcbiAgICAgICAgOiB3aW5kb3cucGFnZVhPZmZzZXQgfHxcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IHx8XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHxcbiAgICAgICAgICAgIDA7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IHsgY3ViaWNJbk91dCB9IGZyb20gXCJzdmVsdGUvZWFzaW5nXCI7XG5pbXBvcnQgeyBub29wLCBsb29wLCBub3cgfSBmcm9tIFwic3ZlbHRlL2ludGVybmFsXCI7XG5pbXBvcnQgXyBmcm9tIFwiLi9oZWxwZXJcIjtcblxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gIGNvbnRhaW5lcjogXCJib2R5XCIsXG4gIGR1cmF0aW9uOiA1MDAsXG4gIGRlbGF5OiAwLFxuICBvZmZzZXQ6IDAsXG4gIGVhc2luZzogY3ViaWNJbk91dCxcbiAgb25TdGFydDogbm9vcCxcbiAgb25Eb25lOiBub29wLFxuICBvbkFib3J0aW5nOiBub29wLFxuICBzY3JvbGxYOiBmYWxzZSxcbiAgc2Nyb2xsWTogdHJ1ZVxufTtcblxuY29uc3QgX3Njcm9sbFRvID0gb3B0aW9ucyA9PiB7XG4gIGxldCB7XG4gICAgb2Zmc2V0LFxuICAgIGR1cmF0aW9uLFxuICAgIGRlbGF5LFxuICAgIGVhc2luZyxcbiAgICB4PTAsXG4gICAgeT0wLFxuICAgIHNjcm9sbFgsXG4gICAgc2Nyb2xsWSxcbiAgICBvblN0YXJ0LFxuICAgIG9uRG9uZSxcbiAgICBjb250YWluZXIsXG4gICAgb25BYm9ydGluZyxcbiAgICBlbGVtZW50XG4gIH0gPSBvcHRpb25zO1xuXG4gIGlmICh0eXBlb2Ygb2Zmc2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQoKTtcbiAgfVxuXG4gIHZhciBjdW11bGF0aXZlT2Zmc2V0Q29udGFpbmVyID0gXy5jdW11bGF0aXZlT2Zmc2V0KGNvbnRhaW5lcik7XG4gIHZhciBjdW11bGF0aXZlT2Zmc2V0VGFyZ2V0ID0gZWxlbWVudFxuICAgID8gXy5jdW11bGF0aXZlT2Zmc2V0KGVsZW1lbnQpXG4gICAgOiB7IHRvcDogeSwgbGVmdDogeCB9O1xuXG4gIHZhciBpbml0aWFsWCA9IF8uc2Nyb2xsTGVmdChjb250YWluZXIpO1xuICB2YXIgaW5pdGlhbFkgPSBfLnNjcm9sbFRvcChjb250YWluZXIpO1xuXG4gIHZhciB0YXJnZXRYID1cbiAgICBjdW11bGF0aXZlT2Zmc2V0VGFyZ2V0LmxlZnQgLSBjdW11bGF0aXZlT2Zmc2V0Q29udGFpbmVyLmxlZnQgKyBvZmZzZXQ7XG4gIHZhciB0YXJnZXRZID1cbiAgICBjdW11bGF0aXZlT2Zmc2V0VGFyZ2V0LnRvcCAtIGN1bXVsYXRpdmVPZmZzZXRDb250YWluZXIudG9wICsgb2Zmc2V0O1xuXG4gIHZhciBkaWZmWCA9IHRhcmdldFggLSBpbml0aWFsWDtcblx0dmFyIGRpZmZZID0gdGFyZ2V0WSAtIGluaXRpYWxZO1xuXG4gIGxldCBzY3JvbGxpbmcgPSB0cnVlO1xuICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xuICBsZXQgc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXk7XG4gIGxldCBlbmRfdGltZSA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbjtcblxuICBmdW5jdGlvbiBzY3JvbGxUb1RvcExlZnQoZWxlbWVudCwgdG9wLCBsZWZ0KSB7XG4gICAgaWYgKHNjcm9sbFgpIF8uc2Nyb2xsTGVmdChlbGVtZW50LCBsZWZ0KTtcbiAgICBpZiAoc2Nyb2xsWSkgXy5zY3JvbGxUb3AoZWxlbWVudCwgdG9wKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KGRlbGF5U3RhcnQpIHtcbiAgICBpZiAoIWRlbGF5U3RhcnQpIHtcbiAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgb25TdGFydChlbGVtZW50LCB7eCwgeX0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRpY2socHJvZ3Jlc3MpIHtcbiAgICBzY3JvbGxUb1RvcExlZnQoXG4gICAgICBjb250YWluZXIsXG4gICAgICBpbml0aWFsWSArIGRpZmZZICogcHJvZ3Jlc3MsXG4gICAgICBpbml0aWFsWCArIGRpZmZYICogcHJvZ3Jlc3NcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICBzY3JvbGxpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGxvb3Aobm93ID0+IHtcbiAgICBpZiAoIXN0YXJ0ZWQgJiYgbm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgIHN0YXJ0KGZhbHNlKVxuICAgIH1cblxuICAgIGlmIChzdGFydGVkICYmIG5vdyA+PSBlbmRfdGltZSkge1xuICAgICAgdGljaygxKTtcbiAgICAgIHN0b3AoKTtcbiAgICAgIG9uRG9uZShlbGVtZW50LCB7eCwgeX0pO1xuICAgIH1cblxuICAgIGlmICghc2Nyb2xsaW5nKSB7XG4gICAgICBvbkFib3J0aW5nKGVsZW1lbnQsIHt4LCB5fSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzdGFydGVkKSB7XG4gICAgICBjb25zdCBwID0gbm93IC0gc3RhcnRfdGltZTtcbiAgICAgIGNvbnN0IHQgPSAwICsgMSAqIGVhc2luZyhwIC8gZHVyYXRpb24pO1xuICAgICAgdGljayh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG5cbiAgc3RhcnQoZGVsYXkpO1xuXG4gIHRpY2soMCk7XG5cbiAgcmV0dXJuIHN0b3A7XG59O1xuXG5jb25zdCBwcm9jZWVkT3B0aW9ucyA9IG9wdGlvbnMgPT4ge1xuXHRsZXQgb3B0cyA9IF8uZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gIG9wdHMuY29udGFpbmVyID0gXy4kKG9wdHMuY29udGFpbmVyKTtcbiAgb3B0cy5lbGVtZW50ID0gXy4kKG9wdHMuZWxlbWVudCk7XG4gIHJldHVybiBvcHRzO1xufTtcblxuY29uc3Qgc2Nyb2xsQ29udGFpbmVySGVpZ2h0ID0gY29udGFpbmVyRWxlbWVudCA9PiB7XG4gIGlmIChcbiAgICBjb250YWluZXJFbGVtZW50ICYmXG4gICAgY29udGFpbmVyRWxlbWVudCAhPT0gZG9jdW1lbnQgJiZcbiAgICBjb250YWluZXJFbGVtZW50ICE9PSBkb2N1bWVudC5ib2R5XG4gICkge1xuICAgIHJldHVybiBjb250YWluZXJFbGVtZW50LnNjcm9sbEhlaWdodCAtIGNvbnRhaW5lckVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICB9IGVsc2Uge1xuICAgIGxldCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBsZXQgaHRtbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIHJldHVybiBNYXRoLm1heChcbiAgICAgIGJvZHkuc2Nyb2xsSGVpZ2h0LFxuICAgICAgYm9keS5vZmZzZXRIZWlnaHQsXG4gICAgICBodG1sLmNsaWVudEhlaWdodCxcbiAgICAgIGh0bWwuc2Nyb2xsSGVpZ2h0LFxuICAgICAgaHRtbC5vZmZzZXRIZWlnaHRcbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0R2xvYmFsT3B0aW9ucyA9IG9wdGlvbnMgPT4ge1xuXHRfLmV4dGVuZChkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyB8fCB7fSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2Nyb2xsVG8gPSBvcHRpb25zID0+IHtcbiAgcmV0dXJuIF9zY3JvbGxUbyhwcm9jZWVkT3B0aW9ucyhvcHRpb25zKSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2Nyb2xsVG9Cb3R0b20gPSBvcHRpb25zID0+IHtcbiAgb3B0aW9ucyA9IHByb2NlZWRPcHRpb25zKG9wdGlvbnMpO1xuXG4gIHJldHVybiBfc2Nyb2xsVG8oXG4gICAgXy5leHRlbmQob3B0aW9ucywge1xuICAgICAgZWxlbWVudDogbnVsbCxcbiAgICAgIHk6IHNjcm9sbENvbnRhaW5lckhlaWdodChvcHRpb25zLmNvbnRhaW5lcilcbiAgICB9KVxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IHNjcm9sbFRvVG9wID0gb3B0aW9ucyA9PiB7XG4gIG9wdGlvbnMgPSBwcm9jZWVkT3B0aW9ucyhvcHRpb25zKTtcblxuICByZXR1cm4gX3Njcm9sbFRvKFxuICAgIF8uZXh0ZW5kKG9wdGlvbnMsIHtcbiAgICAgIGVsZW1lbnQ6IG51bGwsXG4gICAgICB5OiAwXG4gICAgfSlcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBtYWtlU2Nyb2xsVG9BY3Rpb24gPSBzY3JvbGxUb0Z1bmMgPT4ge1xuICByZXR1cm4gKG5vZGUsIG9wdGlvbnMpID0+IHtcbiAgICBsZXQgY3VycmVudCA9IG9wdGlvbnM7XG4gICAgY29uc3QgaGFuZGxlID0gZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzY3JvbGxUb0Z1bmMoXG4gICAgICAgIHR5cGVvZiBjdXJyZW50ID09PSBcInN0cmluZ1wiID8geyBlbGVtZW50OiBjdXJyZW50IH0gOiBjdXJyZW50XG4gICAgICApO1xuICAgIH07XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlKTtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZShvcHRpb25zKSB7XG4gICAgICAgIGN1cnJlbnQgPSBvcHRpb25zO1xuICAgICAgfSxcbiAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZSk7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHNjcm9sbHRvID0gbWFrZVNjcm9sbFRvQWN0aW9uKHNjcm9sbFRvKTtcbmV4cG9ydCBjb25zdCBzY3JvbGx0b3RvcCA9IG1ha2VTY3JvbGxUb0FjdGlvbihzY3JvbGxUb1RvcCk7XG5leHBvcnQgY29uc3Qgc2Nyb2xsdG9ib3R0b20gPSBtYWtlU2Nyb2xsVG9BY3Rpb24oc2Nyb2xsVG9Cb3R0b20pO1xuIiwiPHNjcmlwdD5cclxuXHRcclxuXHRcdGxldCBzcmMgPVwiYWYtc2NyZWVuc2hvdC5wbmdcIjtcclxuXHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XHJcblxyXG5cdEBpbXBvcnQgJy4uLy4uL3N0YXRpYy9fdmFyaWFibGVzLnNjc3MnO1xyXG5cclxuXHQubGFwdG9wLWNvbnRhaW5lciB7XHJcblx0ICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHQgICAgbWFyZ2luLWxlZnQ6IDI5JTtcclxuXHQgICAgei1pbmRleDogLTE7XHJcblx0ICAgIGN1cnNvcjogcG9pbnRlcjtcclxuXHR9XHJcblxyXG5cdC5sYXB0b3Atc2NyZWVuIHtcclxuXHRcdHdpZHRoOiAzNTJweDtcclxuXHRcdGhlaWdodDogMjM1cHg7XHJcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZXk7XHJcblx0XHRib3JkZXItcmFkaXVzOiAyNXB4IDI1cHggMHB4IDBweDtcclxuXHRcdGJvcmRlci1yaWdodDogMTBweCBzb2xpZCBncmF5O1xyXG5cdH1cclxuXHJcblx0LmxhcHRvcC1pbm5lcnNjcmVlbiB7XHJcblx0XHR3aWR0aDogMzAwcHg7XHJcblx0XHRoZWlnaHQ6IDI1MHB4O1xyXG5cdFx0bWFyZ2luLWxlZnQ6IDI1cHg7XHJcblx0XHRtYXJnaW4tdG9wOiAyNXB4O1xyXG5cdFx0aW1nIHsgXHJcblx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRtYXJnaW4tdG9wOiAyMHB4O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LmxhcHRvcC1rZXlib2FyZCB7XHJcblx0XHRib3JkZXItdG9wOiAxcHggc29saWQgYmxhY2s7XHJcblx0XHRtYXJnaW4tbGVmdDogLTQzcHg7XHJcblx0XHR0cmFuc2Zvcm06IHNrZXdYKC0zMGRlZyk7XHJcblx0XHR3aWR0aDogMzUycHg7XHJcblx0XHRoZWlnaHQ6IDE1MHB4O1xyXG5cdFx0YmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmV5O1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMHB4IDBweCAyNXB4IDI1cHg7XHJcblx0XHRib3JkZXItcmlnaHQ6IDEwcHggc29saWQgZ3JheTtcclxuXHR9XHJcblxyXG5cdC5sYXB0b3Ata2V5cGFkIHtcclxuXHRcdHdpZHRoOiAxMDBweDtcclxuXHQgICAgaGVpZ2h0OiA0MHB4O1xyXG5cdCAgICBib3JkZXI6IDAuNXB4IHNvbGlkIGJsYWNrO1xyXG5cdCAgICBib3R0b206IDEwcHg7XHJcblx0ICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHQgICAgbGVmdDogMTMwcHg7XHJcblx0ICAgIGJvcmRlci1yYWRpdXM6IDE1JTtcdFxyXG5cdH1cclxuXHQubGFwdG9wLWtleXMge1xyXG5cdFx0d2lkdGg6IDMyMHB4O1xyXG5cdCAgICBoZWlnaHQ6IDgwcHg7XHJcblx0ICAgIGJvcmRlcjogMC41cHggc29saWQgYmxhY2s7XHJcblx0ICAgIHRvcDogMTBweDtcclxuXHQgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG5cdCAgICBsZWZ0OiAxNXB4O1xyXG5cdH1cclxuXHQubGFwdG9wLWtleSB7XHJcblx0XHR3aWR0aDogMTBweDtcclxuXHRcdGhlaWdodDogMTBweDtcclxuXHRcdGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xyXG5cdFx0bWFyZ2luOiAxLjVweDtcclxuXHR9XHJcblxyXG5cdEBtZWRpYSggbWF4LXdpZHRoOiAkZGVza3RvcC13aWR0aCApIHtcclxuXHRcdC5sYXB0b3AtY29udGFpbmVyIHtcclxuXHRcdFx0Ym90dG9tOiAxMHB4O1xyXG5cdFx0ICAgIGxlZnQ6IDQyJTtcclxuXHRcdCAgICBtYXJnaW4tbGVmdDogMDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdEBtZWRpYSggbWF4LXdpZHRoOiAkdGFibGV0LXdpZHRoICkge1xyXG5cdFx0LmxhcHRvcC1jb250YWluZXIge1xyXG5cdFx0ICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdCAgICBib3R0b206IDYwcHg7XHJcblx0XHQgICAgcmlnaHQ6IDMwcHg7XHJcblx0XHQgICAgbGVmdDogYXV0bztcclxuXHRcdCAgICB6LWluZGV4OiAtMTtcclxuXHRcdCAgICBjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHR9XHJcblxyXG5cdFx0LmxhcHRvcC1zY3JlZW4ge1xyXG5cdFx0XHR3aWR0aDogMTc2cHg7XHJcblx0XHRcdGhlaWdodDogMTE3LjVweDtcclxuXHRcdFx0YmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmV5O1xyXG5cdFx0XHRib3JkZXItcmFkaXVzOiAxMi41cHggMTIuNXB4IDBweCAwcHg7XHJcblx0XHRcdGJvcmRlci1yaWdodDogNnB4IHNvbGlkIGdyYXk7XHJcblx0XHR9XHJcblxyXG5cdFx0LmxhcHRvcC1pbm5lcnNjcmVlbiB7XHJcblx0XHRcdHdpZHRoOiAxNTBweDtcclxuXHRcdFx0aGVpZ2h0OiAxMjVweDtcclxuXHRcdFx0bWFyZ2luLWxlZnQ6IDI1cHg7XHJcblx0XHRcdG1hcmdpbi10b3A6IDI1cHg7XHJcblx0XHRcdGltZyB7IFxyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDEwcHg7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IC0xMHB4O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LmxhcHRvcC1rZXlib2FyZCB7XHJcblx0XHRcdGJvcmRlci10b3A6IDFweCBzb2xpZCBibGFjaztcclxuXHRcdFx0bWFyZ2luLWxlZnQ6IC0yMS41cHg7XHJcblx0XHRcdHRyYW5zZm9ybTogc2tld1goLTMwZGVnKTtcclxuXHRcdFx0d2lkdGg6IDE3NnB4O1xyXG5cdFx0XHRoZWlnaHQ6IDc1cHg7XHJcblx0XHRcdGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JleTtcclxuXHRcdFx0Ym9yZGVyLXJhZGl1czogMHB4IDBweCAxMi41cHggMTIuNXB4O1xyXG5cdFx0XHRib3JkZXItcmlnaHQ6IDZweCBzb2xpZCBncmF5O1xyXG5cdFx0fVxyXG5cclxuXHRcdC5sYXB0b3Ata2V5cGFkIHtcclxuXHRcdFx0d2lkdGg6IDUwcHg7XHJcblx0XHQgICAgaGVpZ2h0OiAxNXB4O1xyXG5cdFx0ICAgIGJvcmRlcjogMC41cHggc29saWQgYmxhY2s7XHJcblx0XHQgICAgYm90dG9tOiA1cHg7XHJcblx0XHQgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0ICAgIGxlZnQ6IDY1cHg7XHJcblx0XHQgICAgYm9yZGVyLXJhZGl1czogMTUlO1x0XHJcblx0XHR9XHJcblx0XHQubGFwdG9wLWtleXMge1xyXG5cdFx0XHR3aWR0aDogMTUycHg7XHJcblx0XHQgICAgaGVpZ2h0OiAzN3B4O1xyXG5cdFx0ICAgIGJvcmRlcjogMC41cHggc29saWQgYmxhY2s7XHJcblx0XHQgICAgdG9wOiAxMHB4O1xyXG5cdFx0ICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdCAgICBsZWZ0OiAxNXB4O1xyXG5cdFx0fVxyXG5cdFx0LmxhcHRvcC1rZXkge1xyXG5cdFx0XHR3aWR0aDogNC41cHg7XHJcblx0XHRcdGhlaWdodDogNC41cHg7XHJcblx0XHRcdGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xyXG5cdFx0XHRtYXJnaW46IDAuNzVweDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdEBtZWRpYSggbWF4LXdpZHRoOiAkbGFyZ2UtcGhvbmUgKSB7XHJcblx0XHQubGFwdG9wLWNvbnRhaW5lciB7XHJcblx0XHRcdHJpZ2h0OiAxMDBweDtcclxuXHRcdFx0Ym90dG9tOiAyMHB4O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbjwvc3R5bGU+XHJcblxyXG48ZGl2IGNsYXNzPVwibGFwdG9wLWNvbnRhaW5lclwiPlxyXG5cdDxkaXYgY2xhc3M9XCJsYXB0b3Atc2NyZWVuXCI+XHJcblx0XHQ8ZGl2IGNsYXNzPVwibGFwdG9wLWlubmVyc2NyZWVuXCI+XHJcblx0XHRcdDxpbWcge3NyY30gIGFsdD1cIkNvbXB1dGVyXCIgLz5cclxuXHRcdDwvZGl2PlxyXG5cdDwvZGl2PlxyXG5cdDxkaXYgY2xhc3M9XCJsYXB0b3Ata2V5Ym9hcmRcIj5cclxuXHRcdDxkaXYgY2xhc3M9XCJsYXB0b3Ata2V5c1wiPlxyXG5cdFx0XHR7I2VhY2ggQXJyYXkoNikgYXMgXywgan1cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPVwiZGlzcGxheTpmbGV4O1wiPlxyXG5cdFx0XHRcdFx0eyNlYWNoIEFycmF5KDI1KSBhcyBfLCBpfVxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibGFwdG9wLWtleVwiPjwvZGl2PlxyXG5cdFx0XHRcdFx0ey9lYWNofVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHR7L2VhY2h9XHJcblx0XHQ8L2Rpdj5cclxuXHRcdDxkaXYgY2xhc3M9XCJsYXB0b3Ata2V5cGFkXCI+PC9kaXY+XHJcblx0PC9kaXY+XHJcbjwvZGl2PiIsIjxzY3JpcHQ+XHJcblxyXG5cdGxldCBzcmMgPSBcInBvZGRzb2stcGhvbmUuanBnXCI7XHJcblxyXG5cdGV4cG9ydCBsZXQgbGVmdFBvcztcclxuXHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XHJcblxyXG4gXHRAaW1wb3J0ICcuLi8uLi9zdGF0aWMvX3ZhcmlhYmxlcy5zY3NzJztcclxuXHJcblx0LnBob25lLWNvbnRhaW5lciB7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHR0b3A6IDYwcHg7XHJcblx0XHRsZWZ0OiB2YXIoLS1sZWZ0KTtcclxuXHR9XHJcblx0aW1nIHtcclxuXHRcdHdpZHRoOiAyMDBweDtcclxuXHRcdGJvcmRlcjogMjVweCBzb2xpZCBibGFjaztcclxuXHRcdGJvcmRlci1yYWRpdXM6IDI1cHg7XHJcblx0XHRib3JkZXItbGVmdC13aWR0aDogMTVweDtcclxuICAgIFx0Ym9yZGVyLXJpZ2h0LXdpZHRoOiAxNXB4O1xyXG4gICAgXHRib3JkZXItYm90dG9tLXdpZHRoOiAzNXB4O1xyXG4gICAgXHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0fVxyXG5cdC5waG9uZS1idXR0b24ge1xyXG5cdCAgICB3aWR0aDogMjJweDtcclxuXHQgICAgaGVpZ2h0OiAyMnB4O1xyXG5cdCAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xyXG5cdCAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxuXHQgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG5cdCAgICBib3R0b206IDdweDtcclxuXHQgICAgbGVmdDogMTA1cHg7XHJcblx0ICAgIGJvcmRlcjogMnB4IHNvbGlkICMzMDMwMzA7XHJcblx0fVxyXG5cclxuXHRAbWVkaWEoIG1heC13aWR0aDogJHRhYmxldC13aWR0aCApIHtcclxuXHRcdC5waG9uZS1jb250YWluZXIge1xyXG5cdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdHRvcDogNjVweDtcclxuXHRcdH1cclxuXHRcdGltZyB7XHJcblx0XHRcdHdpZHRoOiAxMDBweDtcclxuXHRcdFx0Ym9yZGVyLXJhZGl1czogMTVweDtcclxuXHRcdFx0Ym9yZGVyLXRvcC13aWR0aDogMTJweDtcclxuXHRcdFx0Ym9yZGVyLWxlZnQtd2lkdGg6IDhweDtcclxuXHRcdFx0Ym9yZGVyLXJpZ2h0LXdpZHRoOiA4cHg7XHJcblx0XHRcdGJvcmRlci1ib3R0b20td2lkdGg6IDE4cHg7XHJcblx0XHR9XHJcblx0XHQucGhvbmUtYnV0dG9uIHtcclxuXHRcdCAgICB3aWR0aDogMTBweDtcclxuXHRcdCAgICBoZWlnaHQ6IDEwcHg7XHJcblx0XHQgICAgbGVmdDogNTNweDtcclxuXHRcdCAgICBib3R0b206IDZweDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG48L3N0eWxlPlxyXG5cclxuPGRpdiBjbGFzcz1cInBob25lLWNvbnRhaW5lclwiIHN0eWxlPVwiLS1sZWZ0OiB7bGVmdFBvc31cIj5cclxuXHQ8aW1nIHtzcmN9IGFsdD1cIm1vYmlsXCIgLz5cclxuXHQ8ZGl2IGNsYXNzPVwicGhvbmUtYnV0dG9uXCI+PC9kaXY+XHJcbjwvZGl2PiIsIjxzY3JpcHQ+XHJcblxyXG5cdGxldCBzcmMgPSBcInBsdW1wLWlwYWQucG5nXCI7XHJcblxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZT5cclxuXHJcbiAuaXBhZC1jb250YWluZXIge1xyXG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHR0b3A6IDYwcHg7XHJcblx0cmlnaHQ6IDE4cHg7XHJcbiB9XHJcbmltZyB7XHJcblx0d2lkdGg6IDMwMHB4O1xyXG5cdGhlaWdodDogMjAwcHg7XHJcbiBcdGJvcmRlcjogMTVweCBzb2xpZCBibGFjaztcclxuIFx0Ym9yZGVyLWxlZnQtd2lkdGg6IDMwcHg7XHJcbiBcdGJvcmRlci1yaWdodC13aWR0aDogMzBweDtcclxuIFx0Ym9yZGVyLXJhZGl1czogMjVweDtcclxuXHRjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuLmlwYWQtYnV0dG9uIHtcclxuICAgIHdpZHRoOiAxNXB4O1xyXG4gICAgaGVpZ2h0OiAxNXB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm90dG9tOiAxMDZweDtcclxuICAgIGxlZnQ6IDMzNHB4O1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgIzMwMzAzMDtcclxufVxyXG5cclxuPC9zdHlsZT5cclxuXHJcbjxkaXYgY2xhc3M9XCJpcGFkLWNvbnRhaW5lclwiPlxyXG5cdDxpbWcge3NyY30gLz5cclxuXHQ8ZGl2IGNsYXNzPVwiaXBhZC1idXR0b25cIj48L2Rpdj5cclxuPC9kaXY+IiwiPHNjcmlwdD5cclxuXHJcblx0aW1wb3J0IHsgZmx5IH0gZnJvbSAnc3ZlbHRlL3RyYW5zaXRpb24nO1xyXG5cdGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xyXG5cclxuXHRsZXQgcHJvamVjdHMgPSBbXHJcblx0XHQnV2Vic2l0ZScsICdBcHAnLCAnQWRtaW4nLCAnQUknXHJcblx0XTtcclxuXHJcblx0bGV0IHNob3dQcm9qZWN0cyA9IGZhbHNlO1xyXG5cclxuXHRvbk1vdW50KCAoKSA9PiB7XHJcblx0XHRzaG93UHJvamVjdHMgPSB0cnVlO1x0XHJcblx0fSk7XHJcblxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxyXG5cclxuXHRAaW1wb3J0ICcuLi8uLi9zdGF0aWMvZ2xvYmFsLnNjc3MnO1xyXG5cclxuXHQucG9kZHNvay1kZXNjcmlwdGlvbiB7XHJcblx0XHRtYXJnaW4tbGVmdDogMzIwcHg7XHJcblx0XHRtYXJnaW4tcmlnaHQ6IDQwcHg7XHJcblx0XHRtYXJnaW4tdG9wOiA2MHB4O1xyXG5cdH1cclxuXHJcblx0LnBvZGRzb2stcHJvamVjdHMge1xyXG5cdFx0ZGlzcGxheTogZmxleDtcclxuXHRcdG1hcmdpbi10b3A6IDEwMHB4O1xyXG5cdH1cclxuXHJcblx0LnBvZGRzb2stcHJvamVjdCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzAxOTM0O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgIHdpZHRoOiAyMCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IDIuNSU7XHJcbiAgICBib3gtc2hhZG93OiAtNHB4IC0xcHggNnB4IDRweCBsaWdodHNsYXRlZ3JleTtcclxuICAgIHBhZGRpbmc6IDMwcHggNTBweCAwcHggNTBweDtcclxuICAgIGhlaWdodDogMTAwcHg7XHJcbiAgICBmb250LXNpemU6IDMwcHg7XHJcblx0fVxyXG5cclxuICAucG9kZHNvay1wcm9qZWN0OmhvdmVyIHtcclxuICBcdGZvbnQtc2l6ZTogNDBweDtcclxuICBcdGhlaWdodDogMTIwcHg7XHJcbiAgfVxyXG5cclxuXHRoMSB7XHJcblx0XHRjb2xvcjogJHBvZGRzb2stY29sb3I7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0fVxyXG5cclxuXHRhIHtcclxuXHRcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRwb2Rkc29rLWNvbG9yO1xyXG4gICAgcGFkZGluZzogM3B4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG5cdH1cclxuXHJcblx0YTpob3ZlciB7XHJcblx0XHRmb250LXNpemU6IDE4cHg7XHJcblx0fVxyXG5cclxuXHRwIHtcclxuXHRcdGxpbmUtaGVpZ2h0OiAyM3B4O1xyXG5cdH1cclxuXHJcbjwvc3R5bGU+XHJcblxyXG48ZGl2IGNsYXNzPVwicG9kZHNvay1kZXNjcmlwdGlvblwiPlxyXG5cdDxoMT4gUG9kZHPDtmsubnUgPC9oMT5cclxuXHJcblx0PHA+XHJcblx0XHRPbmUgb2YgbXkgZmlyc3Qgc29mdHdhcmUgcHJvamVjdHMgd2FzIDxhIGhyZWY9XCJodHRwczovL3BvZGRzb2subnVcIiB0YXJnZXQ9XCJfYmxhbmtcIj5Qb2Rkc8O2ay5udTwvYT4gLiBUaGUgaWRlYSBjYW1lIHRvIG1lIGFmdGVyIGxpc3RlbmluZyB0byAzMDAgZXBpc29kZXMgb2YgQWxleCBhbmQgU2lnZ2VzIHBvZGNhc3QuIEhvdyB0byBmaW5kIGEgc2VnbWVudCB5b3UgaGVhcmQgaW4gYSBwcmV2aW91cyBlcGlzb2RlPyBJIGNvdWxkIG5vdCBnb29nbGUgaXQgc2luY2UgaXQncyBub3QgdGV4dC4gV2hhdCBpZiB0aGVyZSB3YXMgYW4gYXBwIHdoZXJlIHlvdSBjb3VsZCBzZWFyY2ggZm9yIHdvcmRzIG9yIHNlbnRlbmNlcyB0byBmaW5kIG91dCB3aGVyZSBpbiB0aGUgcG9kY2FzdCB0aGV5IHdlcmUgbWVudGlvbmVkP1xyXG5cdFx0PGJyIC8+IDxiciAvPlxyXG5cdFx0SXQgc3RhcnRlZCB3aXRoIGEgc2luZ2xlLXBhZ2UgYXBwbGljYXRpb24gYnVpbHQgd2l0aCBBbmd1bGFySlMsIHRoZSBmaXJzdCBmcmFtZXdvcmsgSSBsZWFybmVkLiBUaGVuIEkgaGFkIHRvIHBvcHVsYXRlIHRoZSBzaXRlIHdpdGggcG9kY2FzdHMgYW5kIGVwaXNvZGVzLiBMdWNrbGl5LCBTcG90aWZ5IGhhcyBhbiBBUEkgZm9yIHRoYXQuIEZvciB0aGlzIHBhcnQgSSB1c2VkIEFuZ3VsYXIgZm9yIHRoZSBmcm9udGVuZCBhbmQgTm9kZS5qcyBhcyBhIGJhY2tlbmQgdG8gYXV0aGVudGljYXRlIHRvIHRoZSBBUEkuIE5leHQsIGl0IHdhcyB0aW1lIHRvIGxhdW5jaCBhbiBpT1MgYXBwLiBGb3IgdGhpcyBJIHVzZWQgQXBhY2hlIENvcmRvdmEgdG8gYmUgYWJsZSB0byByZXVzZSBteSBjb2RlYmFzZSBmcm9tIHRoZSBTUEEuXHJcblx0XHQ8YnIgLz4gPGJyIC8+XHJcblx0XHRZb3UgbXVzdCBub3cgd29uZGVyLCB3aGVyZSBkbyB0aGUgc2VhcmNoYWJsZSBzZWdtZW50cyBjb21lIGZyb20/IEluIHRoZSBiZWdpbm5pbmcsIHVzZXJzIGNvdWxkIGFkZCBzZW50ZW5jZXMgbWVudGlvbmVkIG9uIHNwZWNpZmljIGVwaXNvZGVzIGluIHBvZGNhc3RzLiBOb3csIGFuIEFJIHByb2plY3QgSSBjaG9vc2UgdG8gY2FsbGVkIFBseXNzbGluZ2VuIGlzIHRyYW5zY3JpYmluZyBlcGlzb2Rlcy4gVXNpbmcgR29vZ2xlJ3Mgc3BlZWNoLXRvLXRleHkgbGlicmFyeSB3aXRoIFB5dGhvbiBhbmQgdGhlIGZyYW1ld29yayBGbGFzayB0aGUgbW9zdCByZWxldmFudHMgcGFydCBhcmUgc2F2ZWQgdG8gZmlsZXMgYW5kIGxhdGVyIHN0b3JlZCBpbiB0aGUgZGF0YWJhc2UuXHJcblx0PC9wPlxyXG5cclxuXHQ8ZGl2IGNsYXNzPVwicG9kZHNvay1wcm9qZWN0c1wiPlxyXG5cdFx0eyNpZiBzaG93UHJvamVjdHN9XHJcblx0XHRcdHsjZWFjaCBwcm9qZWN0cyBhcyBwcm9qZWN0fVxyXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwb2Rkc29rLXByb2plY3RcIlxyXG5cdFx0XHRcdFx0XHQgdHJhbnNpdGlvbjpmbHl8bG9jYWw9XCJ7eyB4OiAtNTAsIGR1cmF0aW9uOiAyMDAwLCBkZWxheTogMzUwMCB9fVwiPlxyXG5cdFx0XHRcdFx0e3Byb2plY3R9ICBoZWpcclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0ey9lYWNofVxyXG5cdFx0ey9pZn1cclxuXHQ8L2Rpdj5cclxuPC9kaXY+IiwiPHNjcmlwdD5cclxuXHJcblx0aW1wb3J0IHsgZmFkZSwgZmx5IH0gZnJvbSAnc3ZlbHRlL3RyYW5zaXRpb24nO1xyXG5cdGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xyXG5cdGltcG9ydCAqIGFzIGFuaW1hdGVTY3JvbGwgZnJvbSBcInN2ZWx0ZS1zY3JvbGx0b1wiO1xyXG5cclxuXHRpbXBvcnQgQ29tcHV0ZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvQ29tcHV0ZXIuc3ZlbHRlXCI7XHJcblx0aW1wb3J0IFBob25lIGZyb20gXCIuLi9jb21wb25lbnRzL1Bob25lLnN2ZWx0ZVwiO1xyXG5cdGltcG9ydCBJUGFkIGZyb20gXCIuLi9jb21wb25lbnRzL2lQYWQuc3ZlbHRlXCI7XHJcblx0aW1wb3J0IFBvZGRzb2sgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9kZHNvay5zdmVsdGVcIjtcclxuXHJcblx0bGV0IHNob3dJdGVtcyA9IGZhbHNlO1xyXG5cclxuXHRsZXQgcHJvamVjdHMgPSBbXHJcblx0XHR7IG5hbWU6IFwiUG9kZHPDtmsubnVcIiB9LFxyXG5cdFx0eyBuYW1lOiBcIkhpdHRhIHlya2VuXCIgfSxcclxuXHRcdHsgbmFtZTogXCJQbHVtcFwiIH0sXHJcblx0XHR7IG5hbWU6IFwiTWF0aGxlYWtzXCIgfVxyXG5cdF07XHJcblxyXG5cdGV4cG9ydCBsZXQgbGVmdFBvcyA9ICc1MHB4JztcclxuXHRsZXQgb3BhY2l0eUNvbnRhaW5lcnMgPSB7XHJcblx0XHRmaXJzdDogMSxcclxuXHRcdHNlY29uZDogMVxyXG5cdH07XHJcblxyXG5cdG9uTW91bnQoICgpID0+IHtcclxuXHRcdHNob3dJdGVtcyA9IHRydWU7XHJcblx0XHR3aW5kb3cub25zY3JvbGwgPSAoKSA9PiB7IFxyXG5cdFx0XHRsZWZ0UG9zID0gNTAgKyB3aW5kb3cuc2Nyb2xsWCArICdweCc7XHJcblx0XHRcdG9wYWNpdHlDb250YWluZXJzLmZpcnN0ID0gMSAtIDQgKiAod2luZG93LnNjcm9sbFggLyB3aW5kb3cuaW5uZXJXaWR0aCk7XHJcblx0XHRcdG9wYWNpdHlDb250YWluZXJzLnNlY29uZCA9IDEgLSAxLjUgKiAod2luZG93LnNjcm9sbFggLyB3aW5kb3cuaW5uZXJXaWR0aCk7XHJcbiBcdFx0fVxyXG5cdH0pO1xyXG5cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cclxuXHJcblx0QGltcG9ydCAnLi4vLi4vc3RhdGljL192YXJpYWJsZXMuc2Nzcyc7XHJcblxyXG5cdC5zY3JvbGxYd2luZG93IHtcclxuXHRcdHdpZHRoOiAyMDAlO1xyXG5cdFx0ZGlzcGxheTogZmxleDtcclxuXHR9XHJcblx0LnNjcm9sbFh3aW5kb3cgPiBkaXYge1xyXG5cdFx0d2lkdGg6IDUwJTtcclxuXHR9XHJcblxyXG5cdC5wcm9qZWN0cy1pbmZvLWNvbnRhaW5lciB7XHJcblx0XHRvcGFjaXR5OiB2YXIoLS1vcGFjaXR5KTtcclxuXHRcdGRpc3BsYXk6IGZsZXg7XHJcbiBcdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuIFx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHR9XHJcblx0LnByb2plY3RzLWluZm8ge1xyXG5cdFx0cGFkZGluZzogMjBweDtcclxuXHRcdG1hcmdpbi1yaWdodDogNDAwcHg7XHJcblx0XHRtYXJnaW4tbGVmdDogMjgwcHg7XHJcbiAgXHRcdHAge1xyXG4gIFx0XHRcdG1hcmdpbi1ibG9jay1zdGFydDogMDtcclxuICBcdFx0fVxyXG5cdH1cclxuXHQuc2Nyb2xsWC1vcGFjaXR5IHtcclxuXHRcdG9wYWNpdHk6IHZhcigtLW9wYWNpdHkpO1xyXG5cdH1cclxuXHRoMiwgaDMge1xyXG5cdFx0Y29sb3I6IGNhZGV0Ymx1ZTtcclxuXHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHR9XHJcblx0aDMge1xyXG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdH1cclxuXHR1bCB7XHJcblx0XHR3aWR0aDogMzAlO1xyXG4gICAgXHRtYXJnaW4tcmlnaHQ6IDMlO1xyXG4gICAgXHRtYXJnaW4tdG9wOiA4MHB4O1xyXG4gICAgXHRmbG9hdDogcmlnaHQ7XHJcbiAgICBcdGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICBcdGxpIHtcclxuICAgIFx0XHRwYWRkaW5nOiAxMHB4O1xyXG4gICAgXHRcdGJhY2tncm91bmQtY29sb3I6IGNhZGV0Ymx1ZTtcclxuXHRcdCAgICBjb2xvcjogd2hpdGU7XHJcblx0XHQgICAgY3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0ICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICBcdH1cclxuICAgIFx0bGk6aG92ZXIge1xyXG4gICAgXHRcdG1hcmdpbi1sZWZ0OiAyJTtcclxuICAgIFx0XHRoZWlnaHQ6IDIycHg7XHJcbiAgICBcdFx0Zm9udC1zaXplOiAyMHB4O1xyXG4gICAgXHR9XHJcblx0fVxyXG5cclxuXHRAbWVkaWEoIG1pbi13aWR0aDogJGxhcmdlLWRlc2t0b3AgKSB7XHJcblx0XHR1bCB7XHJcblx0XHRcdG1hcmdpbi1yaWdodDogMTMwcHg7XHJcblx0XHRcdG1hcmdpbi10b3A6IDIwMHB4O1xyXG5cdFx0fVxyXG5cdFx0LmhpZGUtbW9iaWxlIHtcclxuXHRcdFx0bWFyZ2luLXRvcDogMjA1cHg7XHJcblx0XHR9XHJcblx0XHQucHJvamVjdHMtaW5mby1jb250YWluZXIge1xyXG5cdFx0XHRmb250LXNpemU6IDIwcHg7XHJcblx0XHRcdHBhZGRpbmctbGVmdDogNSU7XHJcblx0XHRcdHBhZGRpbmctcmlnaHQ6IDMlXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRAbWVkaWEoIG1heC13aWR0aDogJGRlc2t0b3Atd2lkdGggKSB7XHJcblx0XHR1bCB7XHJcblx0XHRcdHdpZHRoOiBhdXRvO1xyXG5cdFx0XHRtYXJnaW4tbGVmdDogMjYwcHg7XHJcblx0XHRcdG1hcmdpbi1yaWdodDogMjVweDtcclxuXHRcdFx0ZmxvYXQ6IG5vbmU7XHJcblx0XHRcdG1hcmdpbi10b3A6IDA7XHJcblx0XHR9XHJcblx0XHRoMiB7XHJcblx0XHRcdHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgXHRcdG1hcmdpbi1yaWdodDogMjBweDtcclxuXHRcdH1cclxuXHRcdC5oaWRlLWlwYWQsIC5wcm9qZWN0cy1pbmZvLWNvbnRhaW5lciB7XHJcblx0XHRcdGRpc3BsYXk6IG5vbmU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRAbWVkaWEoIG1heC13aWR0aDogJHRhYmxldC13aWR0aCApIHtcclxuXHRcdC5wcm9qZWN0cy1pbmZvLWNvbnRhaW5lciB7XHJcblx0XHRcdGRpc3BsYXk6IGJsb2NrO1xyXG5cdFx0fVxyXG5cdFx0dWwge1xyXG5cdFx0XHRtYXJnaW4tdG9wOiAxMDBweDtcclxuXHRcdFx0bWFyZ2luLWxlZnQ6IDBweDtcclxuXHRcdFx0aDMge1xyXG5cdFx0XHRcdHdpZHRoOiA0MCU7XHJcblx0XHRcdH1cclxuXHRcdFx0bGkge1xyXG5cdFx0XHRcdHdpZHRoOiA0MCU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGgyIHtcclxuXHRcdFx0dGV4dC1hbGlnbjpjZW50ZXI7XHJcblx0XHRcdG1hcmdpbi1yaWdodDogMDtcclxuXHRcdH1cclxuXHRcdC5wcm9qZWN0cy1pbmZvIHtcclxuXHRcdCAgICB3aWR0aDogYXV0bztcclxuXHRcdCAgICBtYXJnaW4tdG9wOiAtMjBweDtcclxuXHRcdCAgICBtYXJnaW4tbGVmdDogMTY1cHg7XHJcblx0XHQgICAgYm94LXNoYWRvdzogbm9uZTtcclxuXHRcdCAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuXHRcdCAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcblx0XHQgICAgZm9udC1zaXplOiAzLjV2dztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdEBtZWRpYSggbWF4LXdpZHRoOiAkbGFyZ2UtcGhvbmUgKSB7XHJcblx0XHR1bCB7XHJcblx0XHRcdHdpZHRoOiBhdXRvO1xyXG5cdFx0XHRtYXJnaW4tcmlnaHQ6IDM1cHg7XHJcblx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0bWFyZ2luLXRvcDogLTI1cHg7XHJcblx0XHRcdGgzLCBsaSB7XHJcblx0XHRcdFx0d2lkdGg6IGF1dG87XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdC5oaWRlLW1vYmlsZSB7XHJcblx0XHRcdGRpc3BsYXk6IG5vbmU7XHJcblx0XHR9XHJcblx0fVxyXG48L3N0eWxlPlxyXG5cclxuPGRpdiBjbGFzcz1cInNjcm9sbFh3aW5kb3dcIj5cclxuXHQ8ZGl2IGNsYXNzPVwicHJvamVjdHMtY29udGFpbmVyXCI+XHJcblxyXG5cdFx0PGgyPk15IHBvcnRmb2xpbzwvaDI+XHJcblxyXG5cdFx0eyNpZiBzaG93SXRlbXN9XHJcblx0XHRcdDxkaXYgdHJhbnNpdGlvbjpmYWRlfGxvY2FsPVwie3sgZHVyYXRpb246IDEwMDAsIGRlbGF5OiAyMDAwIH19XCI+XHJcblx0XHRcdFx0PFBob25lIHtsZWZ0UG9zfSAvPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdDxkaXYgY2xhc3M9XCJwcm9qZWN0cy1pbmZvLWNvbnRhaW5lclwiXHJcblx0XHRcdFx0IHN0eWxlPVwiLS1vcGFjaXR5OiB7b3BhY2l0eUNvbnRhaW5lcnMuZmlyc3R9XCJcclxuXHRcdFx0XHQgdHJhbnNpdGlvbjpmYWRlfGxvY2FsPVwie3sgZHVyYXRpb246IDEwMDAsIGRlbGF5OiAxMDAwIH19XCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzcz1cInByb2plY3RzLWluZm9cIj5cclxuXHRcdFx0XHRcdDxwPlxyXG5cdFx0XHRcdFx0XHRJJ3ZlIGJlZW4gZGV2ZWxvcGluZyB3ZWIgYXBwbGljYXRpb25zIGZvciBidXNuaWVzcywgZm9yIGdvdmVybm1lbnQsIGZvciBzdGFydHVwXHJcblx0XHRcdFx0XHRcdGFuZCBvZiBjb3Vyc2UgZm9yIGZ1bi4gVXNpbmcgZGlmZmVyZW50IHRlY2hub2xvZ2llcywgYSBjcmVhdGl2ZSBtaW5kIGFuZCB0YWxlbnRlZCBcclxuXHRcdFx0XHRcdFx0Y29sbGVhZ3VlcyBJJ3ZlIG1hbmFnZSB0byBjcmVhdGUgc21vb3RoIGFuZCByZXNwb25zaXZlIGFwcGxpY2F0aW9ucyBmb3IgYm90aCBkZXNrdG9wIFxyXG5cdFx0XHRcdFx0XHRhbmQgbW9iaWxlLiBJIHdpbGwgbm93IHNoYXJlIHNvbWUgb2YgbXkgbW9zdCBzdWNjZXNzZnVsIHByb2plY3RzIVxyXG5cdFx0XHRcdFx0PC9wPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdDxkaXYgY2xhc3M9XCJoaWRlLWlwYWQgc2Nyb2xsWC1vcGFjaXR5XCIgXHJcblx0XHRcdFx0IHN0eWxlPVwiLS1vcGFjaXR5OiB7b3BhY2l0eUNvbnRhaW5lcnMuc2Vjb25kfVwiXHJcblx0XHRcdFx0IHRyYW5zaXRpb246ZmFkZXxsb2NhbD1cInt7IGR1cmF0aW9uOiAxMDAwLCBkZWxheTogNDAwMCB9fVwiPlxyXG5cdFx0XHRcdDxJUGFkIC8+XHJcblx0XHRcdDwvZGl2PlxyXG5cclxuXHJcblx0XHRcdDx1bCBjbGFzcz1cInNjcm9sbFgtb3BhY2l0eVwiXHJcblx0XHRcdFx0c3R5bGU9XCItLW9wYWNpdHk6IHtvcGFjaXR5Q29udGFpbmVycy5zZWNvbmR9XCI+XHJcblx0XHRcdFx0PGgzIGluOmZseXxsb2NhbD1cInt7IHk6IC01MCwgZHVyYXRpb246IDIwMDAsIGRlbGF5OiAzNTAwIH19XCI+IFxyXG5cdFx0XHRcdFx0QSBwb3Rwb3JyaSBcclxuXHRcdFx0XHQ8L2gzPlxyXG5cdFx0XHRcdHsjZWFjaCBwcm9qZWN0cyBhcyBwcm9qZWN0LCBpfVxyXG5cdFx0XHRcdFx0PGxpIGluOmZseT1cInt7IHk6IC01MCwgZHVyYXRpb246IDIwMDAsIGRlbGF5OiAzNTAwICsgKGkrMSkqMTAwMCB9fVwiXHJcblx0XHRcdFx0XHRcdG9uOmNsaWNrPXsgKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRhbmltYXRlU2Nyb2xsLnNjcm9sbFRvKHsgXHJcblx0XHRcdFx0XHRcdFx0XHRlbGVtZW50OicucG9kZHNvay1jb250YWluZXInLFxyXG5cdFx0XHRcdFx0XHRcdFx0c2Nyb2xsWDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdHNjcm9sbFk6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZHVyYXRpb246IDEyNTBcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdH19PlxyXG5cdFx0XHRcdFx0XHR7cHJvamVjdC5uYW1lfVxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHR7L2VhY2h9XHJcblx0XHRcdDwvdWw+XHJcblxyXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiaGlkZS1tb2JpbGUgc2Nyb2xsWC1vcGFjaXR5XCIgXHJcblx0XHRcdFx0IHN0eWxlPVwiLS1vcGFjaXR5OiB7b3BhY2l0eUNvbnRhaW5lcnMuZmlyc3R9XCJcclxuXHRcdFx0XHQgdHJhbnNpdGlvbjpmYWRlfGxvY2FsPVwie3sgZHVyYXRpb246IDEwMDAsIGRlbGF5OiAzMDAwIH19XCI+XHJcblx0XHRcdFx0PENvbXB1dGVyIC8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0ey9pZn1cclxuXHQ8L2Rpdj5cclxuXHJcblx0PGRpdiBjbGFzcz1cInBvZGRzb2stY29udGFpbmVyXCI+XHJcblx0XHQ8UG9kZHNvayAvPlxyXG5cdDwvZGl2PlxyXG48L2Rpdj4iXSwibmFtZXMiOlsiYW5pbWF0ZVNjcm9sbC5zY3JvbGxUbyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxRQUFlO0FBQ2YsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFO0FBQ2QsSUFBSSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtBQUN0QyxNQUFNLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QyxLQUFLO0FBQ0wsSUFBSSxPQUFPLFFBQVEsQ0FBQztBQUNwQixHQUFHO0FBQ0gsRUFBRSxNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFDbEIs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
