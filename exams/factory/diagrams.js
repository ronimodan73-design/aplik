/* מנוע השרטוטים של המחולל: כל שרטוט נכתב בקובץ המאגר כשדה d בשאלה, ומצויר כאן כ־SVG.
   בתוך שרטוט אין עברית (רק אותיות לטיניות, מספרים וסימנים). כיתוב בעברית נכתב בטקסט השאלה.
   סוגים:
   pl  מערכת צירים: {t:'pl', x:[-6,6], y:[-6,6], grid:1, nums:1, pts:[['A',2,3]], segs:[['A','B']], poly:[['A','B','C']], lab:0, w:62}
   nl  ציר מספרים: {t:'nl', min:-6, max:6, pts:[['A',-3]], nums:0}
   g   צורה הנדסית: {t:'g', P:{A:[0,0],B:[6,0]}, tri:{v:['A','B','C'], a:[50,60]}, pt:[{n:'D', l1:L, l2:L}],
       poly:[['A','B','C']], segs:[['C','D']], ang:[['A','B','C','50°']], rt:[['D','A','C']], tk:[['A','B',1]], sl:[['A','B','6']]}
       L = ['line',X,Y] | ['ray',P,Q,R,deg] (מ־P, מתחיל בכיוון PQ ומסתובב לעבר PR; deg='bis' = חצי הזווית) | ['perp',P,X,Y]
   ar  מלבן על משבצות שמחולק לשניים: {t:'ar', h:4, w:[5,2]}
   cw  תשבץ מספרים: {t:'cw', c:[['-3','×','6','=','□'], ...]}
   multi  כמה שרטוטים זה לצד זה, עם א׳ ב׳ ג׳ ד׳ מתחתם: {t:'multi', items:[...]} */
const INK='#1f2433',ACC='#1a4d45',GRID='#cfd8d6',MINUS='−';
const fmtN=v=>String(Math.round(v*100)/100).replace('-',MINUS);
const tx=(x,y,s,o)=>'<text x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" font-family="Rubik,Arial" font-size="'+((o&&o.fs)||12)+'" fill="'+((o&&o.c)||INK)+'" text-anchor="'+((o&&o.a)||'middle')+'" dominant-baseline="central" direction="ltr" style="direction:ltr;unicode-bidi:isolate"'+((o&&o.it)?' font-style="italic"':'')+((o&&o.b)?' font-weight="700"':'')+'>'+s+'</text>';
const ln=(x1,y1,x2,y2,o)=>'<line x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+((o&&o.c)||INK)+'" stroke-width="'+((o&&o.w)||1.6)+'"'+((o&&o.d)?' stroke-dasharray="'+o.d+'"':'')+'/>';
const svg=(w,h,body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w.toFixed(0)+' '+h.toFixed(0)+'" width="'+(w*0.265).toFixed(1)+'mm" height="'+(h*0.265).toFixed(1)+'mm" direction="ltr">'+body+'</svg>';

function D(d){
  if(!d)return '';
  if(d.t==='multi')return '<div class="fig multi">'+d.items.map((it,i)=>'<div><div>'+D1(it)+'</div><span>'+'אבגדהו'[i]+'.</span></div>').join('')+'</div>';
  if(d.t==='cw')return '<div class="fig">'+cw(d)+'</div>';
  return '<div class="fig">'+D1(d)+'</div>';
}
function D1(d){return {pl:plane,nl:numline,g:geo,ar:area}[d.t](d)}

// ---------- מערכת צירים ----------
function plane(d){
  const [x0,x1]=d.x,[y0,y1]=d.y,W=(d.w||62)/0.265,u=Math.min(W/(x1-x0+1.2),(d.hmax||300)/(y1-y0+1.2)),pad=u*0.6;
  const ex=(d.pts||[]).some(p=>p[3])?56:0;
  const X=v=>ex+pad+(v-x0)*u,Y=v=>pad+(y1-v)*u,w=2*ex+2*pad+(x1-x0)*u,h=2*pad+(y1-y0)*u;let s='';
  const step=(x1-x0)>14?2:1,fs=Math.max(8,Math.min(11,u*0.62));
  if(d.grid!==0){for(let i=Math.ceil(x0);i<=x1;i++)s+=ln(X(i),Y(y0),X(i),Y(y1),{c:GRID,w:.8});for(let j=Math.ceil(y0);j<=y1;j++)s+=ln(X(x0),Y(j),X(x1),Y(j),{c:GRID,w:.8})}
  s+=ln(X(x0)-pad*.5,Y(0),X(x1)+pad*.6,Y(0),{w:1.4})+ln(X(0),Y(y0)-0,X(0),Y(y1)-pad*.6,{w:1.4});
  s+='<path d="M'+(X(x1)+pad*.6)+' '+Y(0)+' l-6 -3.5 v7z M'+X(0)+' '+(Y(y1)-pad*.6)+' l-3.5 6 h7z" fill="'+INK+'"/>';
  s+=tx(X(x1)+pad*.55,Y(0)+11,'x',{it:1,fs:13})+tx(X(0)+10,Y(y1)-pad*.55,'y',{it:1,fs:13});
  if(d.nums!==0){for(let i=Math.ceil(x0);i<=x1;i++)if(i&&i%step===0)s+=ln(X(i),Y(0)-2.5,X(i),Y(0)+2.5,{w:1})+tx(X(i),Y(0)+fs*.95,fmtN(i),{fs});
    for(let j=Math.ceil(y0);j<=y1;j++)if(j&&j%step===0)s+=ln(X(0)-2.5,Y(j),X(0)+2.5,Y(j),{w:1})+tx(X(0)-4,Y(j),fmtN(j),{fs,a:'end'});
    s+=tx(X(0)-4,Y(0)+fs*.95,'0',{fs,a:'end'})}
  const P={};(d.pts||[]).forEach(p=>P[p[0]]=[p[1],p[2]]);
  (d.poly||[]).forEach(ns=>{s+='<polygon points="'+ns.map(n=>X(P[n][0])+','+Y(P[n][1])).join(' ')+'" fill="rgba(26,77,69,.08)" stroke="'+ACC+'" stroke-width="1.8"/>'});
  (d.segs||[]).forEach(([a,b])=>{s+=ln(X(P[a][0]),Y(P[a][1]),X(P[b][0]),Y(P[b][1]),{c:ACC,w:2})});
  (d.pts||[]).forEach(([n,x,y,show])=>{const qx=(show?x>(x0+x1)/2:x>=0)?1:-1,qy=y>=0?-1:1;s+='<circle cx="'+X(x)+'" cy="'+Y(y)+'" r="3.2" fill="'+ACC+'"/>';
    if(n)s+=tx(X(x)+qx*9,Y(y)+qy*9,n+(show?'('+fmtN(x)+', '+fmtN(y)+')':''),{fs:12,b:1,a:show?(qx>0?'start':'end'):'middle'})});
  return svg(w,h,s)}

// ---------- ציר מספרים ----------
function numline(d){
  const W=(d.w||70)/0.265,u=(W-40)/(d.max-d.min),X=v=>20+(v-d.min)*u,y=26;let s=ln(8,y,W-8,y,{w:1.5})+'<path d="M'+(W-8)+' '+y+' l-7 -4 v8z" fill="'+INK+'"/>';
  for(let i=d.min;i<=d.max;i++){s+=ln(X(i),y-4,X(i),y+4,{w:1});if(d.nums||i===0)s+=tx(X(i),y+14,fmtN(i),{fs:11})}
  (d.pts||[]).forEach(([n,v])=>{s+='<circle cx="'+X(v)+'" cy="'+y+'" r="3.6" fill="'+ACC+'"/>'+tx(X(v),y-13,n,{it:/^[a-z]$/.test(n),b:1,fs:14})});
  return svg(W,44,s)}

// ---------- צורה הנדסית ----------
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]],add=(a,b)=>[a[0]+b[0],a[1]+b[1]],mul=(a,k)=>[a[0]*k,a[1]*k],len=a=>Math.hypot(a[0],a[1]),nrm=a=>mul(a,1/len(a));
const rot=(v,deg)=>{const r=deg*Math.PI/180;return[v[0]*Math.cos(r)-v[1]*Math.sin(r),v[0]*Math.sin(r)+v[1]*Math.cos(r)]};
const cross=(a,b)=>a[0]*b[1]-a[1]*b[0];
function lineOf(L,P){
  if(L[0]==='line')return[P[L[1]],sub(P[L[2]],P[L[1]])];
  if(L[0]==='perp'){const v=sub(P[L[3]],P[L[2]]);return[P[L[1]],[-v[1],v[0]]]}
  const p=P[L[1]],a=sub(P[L[2]],p),b=sub(P[L[3]],p);
  const full=Math.acos(Math.max(-1,Math.min(1,(a[0]*b[0]+a[1]*b[1])/len(a)/len(b))))*180/Math.PI;
  const deg=L[4]==='bis'?full/2:L[4],sg=cross(a,b)>0?1:-1;return[p,rot(a,sg*deg)]}
function meet(l1,l2){const[p,v]=l1,[q,w]=l2,t=cross(sub(q,p),w)/cross(v,w);return add(p,mul(v,t))}
function geo(d){
  const P={};Object.entries(d.P||{}).forEach(([k,v])=>P[k]=v.slice());
  if(d.tri){const[A,B,C]=d.tri.v,[a,b]=d.tri.a,base=d.tri.base||6;P[A]=[0,0];P[B]=[base,0];
    const t=base*Math.sin(b*Math.PI/180)/Math.sin((a+b)*Math.PI/180);P[C]=[t*Math.cos(a*Math.PI/180),t*Math.sin(a*Math.PI/180)]}
  (d.pt||[]).forEach(p=>{P[p.n]=p.on?add(P[p.on[0]],mul(sub(P[p.on[1]],P[p.on[0]]),p.on[2])):meet(lineOf(p.l1,P),lineOf(p.l2,P))});
  const ks=Object.keys(P),xs=ks.map(k=>P[k][0]),ys=ks.map(k=>P[k][1]);
  const mnx=Math.min(...xs),mxx=Math.max(...xs),mny=Math.min(...ys),mxy=Math.max(...ys);
  const W=(d.w||58)/0.265,pad=24,k=Math.min((W-2*pad)/(mxx-mnx||1),(d.hmax||175)/(mxy-mny||1));
  const S=p=>[pad+(p[0]-mnx)*k,pad+(mxy-p[1])*k],w=2*pad+(mxx-mnx)*k,h=2*pad+(mxy-mny)*k;
  const polys=d.poly||(d.tri?[d.tri.v]:[]);const cen=mul(ks.reduce((s,n)=>add(s,P[n]),[0,0]),1/ks.length);let s='';
  polys.forEach(ns=>{s+='<polygon points="'+ns.map(n=>S(P[n]).join(',')).join(' ')+'" fill="rgba(26,77,69,.06)" stroke="'+INK+'" stroke-width="1.8" stroke-linejoin="round"/>'});
  (d.segs||[]).forEach(([a,b])=>{const p=S(P[a]),q=S(P[b]);s+=ln(p[0],p[1],q[0],q[1],{c:ACC,w:1.6})});
  const sdir=(v,p,q)=>{const a=sub(S(P[p]),S(P[v])),b=sub(S(P[q]),S(P[v]));return[Math.atan2(a[1],a[0]),Math.atan2(b[1],b[0])]};
  (d.ang||[]).forEach(([v,p,q,lab])=>{let[a1,a2]=sdir(v,p,q);let dd=a2-a1;while(dd>Math.PI)dd-=2*Math.PI;while(dd<-Math.PI)dd+=2*Math.PI;
    const c=S(P[v]),r=15,e=[c[0]+r*Math.cos(a1+dd),c[1]+r*Math.sin(a1+dd)],st=[c[0]+r*Math.cos(a1),c[1]+r*Math.sin(a1)];
    s+='<path d="M'+st.join(' ')+' A'+r+' '+r+' 0 0 '+(dd>0?1:0)+' '+e.join(' ')+'" fill="none" stroke="'+ACC+'" stroke-width="1.3"/>';
    const m=a1+dd/2,R=Math.abs(dd)<0.6?40:30;s+=tx(c[0]+R*Math.cos(m),c[1]+R*Math.sin(m),lab.replace('-',MINUS),{fs:11,c:ACC,b:1,it:/^[a-zα-ω]/.test(lab)})});
  (d.rt||[]).forEach(([v,p,q])=>{const c=S(P[v]),a=nrm(sub(S(P[p]),c)),b=nrm(sub(S(P[q]),c)),z=9;
    s+='<path d="M'+add(c,mul(a,z)).join(' ')+' L'+add(add(c,mul(a,z)),mul(b,z)).join(' ')+' L'+add(c,mul(b,z)).join(' ')+'" fill="none" stroke="'+INK+'" stroke-width="1.2"/>'});
  (d.tk||[]).forEach(([a,b,n])=>{const p=S(P[a]),q=S(P[b]),m=mul(add(p,q),.5),v=nrm(sub(q,p)),nn=[-v[1],v[0]];
    for(let i=0;i<(n||1);i++){const o=add(m,mul(v,(i-((n||1)-1)/2)*4));s+=ln(o[0]-nn[0]*5,o[1]-nn[1]*5,o[0]+nn[0]*5,o[1]+nn[1]*5,{w:1.4})}});
  (d.sl||[]).forEach(([a,b,lab])=>{const p=S(P[a]),q=S(P[b]),m=mul(add(p,q),.5),v=nrm(sub(q,p));let nn=[-v[1],v[0]];
    const cc=S(cen);if((m[0]-cc[0])*nn[0]+(m[1]-cc[1])*nn[1]<0)nn=mul(nn,-1);const o=add(m,mul(nn,11));s+=tx(o[0],o[1],lab,{fs:11})});
  const scen=S(cen);ks.filter(n=>!(d.hide||[]).includes(n)).forEach(n=>{const p=S(P[n]);let v=sub(p,scen);v=len(v)?nrm(v):[0,-1];const o=add(p,mul(v,12));s+=tx(o[0],o[1],n,{fs:13,b:1})});
  return svg(w,h,s)}

// ---------- מלבן על משבצות ----------
function area(d){const c=11,W=(d.w[0]+d.w[1])*c+20,H=d.h*c+20;let s='';
  for(let i=0;i<=d.w[0]+d.w[1];i++)s+=ln(10+i*c,10,10+i*c,10+d.h*c,{c:GRID,w:.8});for(let j=0;j<=d.h;j++)s+=ln(10,10+j*c,10+(d.w[0]+d.w[1])*c,10+j*c,{c:GRID,w:.8});
  s+='<rect x="10" y="10" width="'+d.w[0]*c+'" height="'+d.h*c+'" fill="rgba(37,99,235,.18)" stroke="'+INK+'" stroke-width="1.6"/>';
  s+='<rect x="'+(10+d.w[0]*c)+'" y="10" width="'+d.w[1]*c+'" height="'+d.h*c+'" fill="rgba(234,88,12,.18)" stroke="'+INK+'" stroke-width="1.6"/>';
  return svg(W,H,s)}

// ---------- תשבץ מספרים ----------
function cw(d){return '<table class="cw" dir="ltr">'+d.c.map(r=>'<tr>'+r.map(v=>{const op=/^[×:=+]$/.test(v),bl=v==='',box=/^-?\d|□/.test(v);return'<td class="'+(op?'op':bl?'bl':'nb')+'">'+(v==='□'?'':esc(v.replace('-',MINUS)))+'</td>'}).join('')+'</tr>').join('')+'</table>'}
