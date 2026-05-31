import { createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import Login from './Login';
import LoginWithCredentials from './LoginWithCredentials';
import { manifest } from './manifest';

const cssUrl = new URL('./remoteEntry.css', import.meta.url).href;
if (!document.querySelector(`link[href="${cssUrl}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    document.head.appendChild(link);
}

const roots = new WeakMap<HTMLElement, Root>();

const componentMap = {
    Login,
    LoginWithCredentials,
};

type ComponentKey = keyof typeof componentMap;

export default {
    manifest,
    mount(el: HTMLElement, component: string, props: Record<string, unknown> = {}): void {
        const Component = componentMap[component as ComponentKey] ?? Login;
        const root = createRoot(el);
        roots.set(el, root);
        root.render(createElement(Component, props));
    },
    unmount(el: HTMLElement): void {
        roots.get(el)?.unmount();
        roots.delete(el);
    },
};
