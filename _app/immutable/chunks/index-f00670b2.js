function p(){}function J(t,e){for(const n in e)t[n]=e[n];return t}function K(t){return t&&typeof t=="object"&&typeof t.then=="function"}function z(t){return t()}function M(){return Object.create(null)}function b(t){t.forEach(z)}function A(t){return typeof t=="function"}function mt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Q(t){return Object.keys(t).length===0}function U(t,...e){if(t==null)return p;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function pt(t,e,n){t.$$.on_destroy.push(U(e,n))}function yt(t,e,n,r){if(t){const i=B(t,e,n,r);return t[0](i)}}function B(t,e,n,r){return t[1]&&r?J(n.ctx.slice(),t[1](r(e))):n.ctx}function gt(t,e,n,r){if(t[2]&&r){const i=t[2](r(n));if(e.dirty===void 0)return i;if(typeof i=="object"){const l=[],s=Math.max(e.dirty.length,i.length);for(let u=0;u<s;u+=1)l[u]=e.dirty[u]|i[u];return l}return e.dirty|i}return e.dirty}function bt(t,e,n,r,i,l){if(i){const s=B(e,n,r,l);t.p(s,i)}}function xt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}function wt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function $t(t,e,n){return t.set(n),e}function kt(t){return t&&A(t.destroy)?t.destroy:p}const H=typeof window<"u";let vt=H?()=>window.performance.now():()=>Date.now(),L=H?t=>requestAnimationFrame(t):p;const m=new Set;function q(t){m.forEach(e=>{e.c(t)||(m.delete(e),e.f())}),m.size!==0&&L(q)}function Et(t){let e;return m.size===0&&L(q),{promise:new Promise(n=>{m.add(e={c:t,f:n})}),abort(){m.delete(e)}}}let k=!1;function V(){k=!0}function X(){k=!1}function Y(t,e,n,r){for(;t<e;){const i=t+(e-t>>1);n(i)<=r?t=i+1:e=i}return t}function Z(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let o=0;o<e.length;o++){const f=e[o];f.claim_order!==void 0&&c.push(f)}e=c}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let i=0;for(let c=0;c<e.length;c++){const o=e[c].claim_order,f=(i>0&&e[n[i]].claim_order<=o?i+1:Y(1,i,_=>e[n[_]].claim_order,o))-1;r[c]=n[f]+1;const a=f+1;n[a]=c,i=Math.max(a,i)}const l=[],s=[];let u=e.length-1;for(let c=n[i]+1;c!=0;c=r[c-1]){for(l.push(e[c-1]);u>=c;u--)s.push(e[u]);u--}for(;u>=0;u--)s.push(e[u]);l.reverse(),s.sort((c,o)=>c.claim_order-o.claim_order);for(let c=0,o=0;c<s.length;c++){for(;o<l.length&&s[c].claim_order>=l[o].claim_order;)o++;const f=o<l.length?l[o]:null;t.insertBefore(s[c],f)}}function tt(t,e){if(k){for(Z(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Nt(t,e,n){k&&!n?tt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function et(t){t.parentNode&&t.parentNode.removeChild(t)}function At(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function nt(t){return document.createElement(t)}function rt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function S(t){return document.createTextNode(t)}function St(){return S(" ")}function Tt(){return S("")}function jt(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function it(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Ct(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const r in e)e[r]==null?t.removeAttribute(r):r==="style"?t.style.cssText=e[r]:r==="__value"?t.value=t[r]=e[r]:n[r]&&n[r].set?t[r]=e[r]:it(t,r,e[r])}function ct(t){return Array.from(t.childNodes)}function st(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function F(t,e,n,r,i=!1){st(t);const l=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const u=t[s];if(e(u)){const c=n(u);return c===void 0?t.splice(s,1):t[s]=c,i||(t.claim_info.last_index=s),u}}for(let s=t.claim_info.last_index-1;s>=0;s--){const u=t[s];if(e(u)){const c=n(u);return c===void 0?t.splice(s,1):t[s]=c,i?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,u}}return r()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function R(t,e,n,r){return F(t,i=>i.nodeName===e,i=>{const l=[];for(let s=0;s<i.attributes.length;s++){const u=i.attributes[s];n[u.name]||l.push(u.name)}l.forEach(s=>i.removeAttribute(s))},()=>r(e))}function Dt(t,e,n){return R(t,e,n,nt)}function Mt(t,e,n){return R(t,e,n,rt)}function lt(t,e){return F(t,n=>n.nodeType===3,n=>{const r=""+e;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>S(e),!0)}function Ot(t){return lt(t," ")}function Pt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function zt(t,e,n,r){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,r?"important":"")}function Bt(t,e){const n=[];let r=0;for(const i of e.childNodes)if(i.nodeType===8){const l=i.textContent.trim();l===`HEAD_${t}_END`?(r-=1,n.push(i)):l===`HEAD_${t}_START`&&(r+=1,n.push(i))}else r>0&&n.push(i);return n}function Ht(t,e){return new t(e)}let g;function d(t){g=t}function T(){if(!g)throw new Error("Function called outside component initialization");return g}function Lt(t){T().$$.on_mount.push(t)}function qt(t){T().$$.after_update.push(t)}const y=[],O=[],w=[],P=[],W=Promise.resolve();let E=!1;function G(){E||(E=!0,W.then(j))}function Ft(){return G(),W}function N(t){w.push(t)}const v=new Set;let x=0;function j(){const t=g;do{for(;x<y.length;){const e=y[x];x++,d(e),ot(e.$$)}for(d(null),y.length=0,x=0;O.length;)O.pop()();for(let e=0;e<w.length;e+=1){const n=w[e];v.has(n)||(v.add(n),n())}w.length=0}while(y.length);for(;P.length;)P.pop()();E=!1,v.clear(),d(t)}function ot(t){if(t.fragment!==null){t.update(),b(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(N)}}const $=new Set;let h;function ut(){h={r:0,c:[],p:h}}function at(){h.r||b(h.c),h=h.p}function I(t,e){t&&t.i&&($.delete(t),t.i(e))}function ft(t,e,n,r){if(t&&t.o){if($.has(t))return;$.add(t),h.c.push(()=>{$.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}function Rt(t,e){const n=e.token={};function r(i,l,s,u){if(e.token!==n)return;e.resolved=u;let c=e.ctx;s!==void 0&&(c=c.slice(),c[s]=u);const o=i&&(e.current=i)(c);let f=!1;e.block&&(e.blocks?e.blocks.forEach((a,_)=>{_!==l&&a&&(ut(),ft(a,1,1,()=>{e.blocks[_]===a&&(e.blocks[_]=null)}),at())}):e.block.d(1),o.c(),I(o,1),o.m(e.mount(),e.anchor),f=!0),e.block=o,e.blocks&&(e.blocks[l]=o),f&&j()}if(K(t)){const i=T();if(t.then(l=>{d(i),r(e.then,1,e.value,l),d(null)},l=>{if(d(i),r(e.catch,2,e.error,l),d(null),!e.hasCatch)throw l}),e.current!==e.pending)return r(e.pending,0),!0}else{if(e.current!==e.then)return r(e.then,1,e.value,t),!0;e.resolved=t}}function Wt(t,e,n){const r=e.slice(),{resolved:i}=t;t.current===t.then&&(r[t.value]=i),t.current===t.catch&&(r[t.error]=i),t.block.p(r,n)}const Gt=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function It(t,e){const n={},r={},i={$$scope:1};let l=t.length;for(;l--;){const s=t[l],u=e[l];if(u){for(const c in s)c in u||(r[c]=1);for(const c in u)i[c]||(n[c]=u[c],i[c]=1);t[l]=u}else for(const c in s)i[c]=1}for(const s in r)s in n||(n[s]=void 0);return n}function Jt(t){t&&t.c()}function Kt(t,e){t&&t.l(e)}function dt(t,e,n,r){const{fragment:i,after_update:l}=t.$$;i&&i.m(e,n),r||N(()=>{const s=t.$$.on_mount.map(z).filter(A);t.$$.on_destroy?t.$$.on_destroy.push(...s):b(s),t.$$.on_mount=[]}),l.forEach(N)}function _t(t,e){const n=t.$$;n.fragment!==null&&(b(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ht(t,e){t.$$.dirty[0]===-1&&(y.push(t),G(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Qt(t,e,n,r,i,l,s,u=[-1]){const c=g;d(t);const o=t.$$={fragment:null,ctx:[],props:l,update:p,not_equal:i,bound:M(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:M(),dirty:u,skip_bound:!1,root:e.target||c.$$.root};s&&s(o.root);let f=!1;if(o.ctx=n?n(t,e.props||{},(a,_,...C)=>{const D=C.length?C[0]:_;return o.ctx&&i(o.ctx[a],o.ctx[a]=D)&&(!o.skip_bound&&o.bound[a]&&o.bound[a](D),f&&ht(t,a)),_}):[],o.update(),f=!0,b(o.before_update),o.fragment=r?r(o.ctx):!1,e.target){if(e.hydrate){V();const a=ct(e.target);o.fragment&&o.fragment.l(a),a.forEach(et)}else o.fragment&&o.fragment.c();e.intro&&I(t.$$.fragment),dt(t,e.target,e.anchor,e.customElement),X(),j()}d(c)}class Ut{$destroy(){_t(this,1),this.$destroy=p}$on(e,n){if(!A(n))return p;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const i=r.indexOf(n);i!==-1&&r.splice(i,1)}}$set(e){this.$$set&&!Q(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Ft as A,p as B,yt as C,Bt as D,tt as E,bt as F,xt as G,gt as H,pt as I,J,Ct as K,It as L,wt as M,rt as N,Mt as O,At as P,vt as Q,Et as R,Ut as S,kt as T,jt as U,b as V,$t as W,Gt as X,Rt as Y,Wt as Z,St as a,Nt as b,Ot as c,at as d,Tt as e,I as f,ut as g,et as h,Qt as i,qt as j,nt as k,Dt as l,ct as m,it as n,Lt as o,zt as p,S as q,lt as r,mt as s,ft as t,Pt as u,Ht as v,Jt as w,Kt as x,dt as y,_t as z};
