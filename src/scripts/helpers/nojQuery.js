const ready = (callback) => {
    if (document.readyState !== 'loading') callback();
    else document.addEventListener('DOMContentLoaded', callback);
};

const wrap = (nodes, wrapper) => {
    const parent = nodes[0].parentNode;
    parent.insertBefore(wrapper, nodes[0]);

    for (let i = 0; i < nodes.length; i += 1) {
        wrapper.appendChild(nodes[i]);
    }
};

const unwrap = (wrapEl) => {
    const parent = wrapEl.parentNode;
    while (wrapEl.firstChild) parent.insertBefore(wrapEl.firstChild, wrapEl);
    parent.removeChild(wrapEl);
};

function html(node, content) {
    function evalScript(elem) {
        const data = (elem.text || elem.textContent || elem.innerHTML || '');
        const head = document.getElementsByTagName('head')[0] || document.documentElement;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        try {
            script.appendChild(document.createTextNode(data));
        } catch (e) {
            script.text = data;
        }
        head.insertBefore(script, head.firstChild);
        head.removeChild(script);

        if (elem.parentNode) {
            elem.parentNode.removeChild(elem);
        }
    }

    if (node) {
        node.innerHTML = content;
        const scripts = [];

        const child = node.querySelectorAll('script');
        for (let i = 0; child[i]; i += 1) {
            if (scripts && (!child[i].type || child[i].type.toLowerCase() === 'text/javascript')) {
                if (child[i].parentNode) {
                    scripts.push(child[i].parentNode.removeChild(child[i]));
                } else {
                    scripts.push(child[i]);
                }
            }
        }

        if (scripts.length) {
            scripts.forEach((script) => {
                evalScript(script);
            });
        }
    }
}

function is(content, selector) {
    const div = document.createElement('div');
    div.innerHTML = content;
    return div.querySelector(selector);
}

export {
    ready, wrap, unwrap, html, is,
};
