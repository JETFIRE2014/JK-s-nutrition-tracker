
const ids=['chicken','broccoli','potato','sprays','salt'];
ids.forEach(id=>document.getElementById(id).addEventListener('input',calc));
reset.onclick=()=>{chicken.value=250;broccoli.value=300;potato.value=250;sprays.value=15;salt.value=0;calc();};
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js');}
function calc(){
let c=+chicken.value||0,b=+broccoli.value||0,p=+potato.value||0,s=+sprays.value||0,saltg=+salt.value||0;
let kcal=c*1.2+b*0.34+p*0.86+s;
let protein=c*0.23+b*0.028+p*0.016;
let carbs=b*0.07+p*0.201;
let fat=c*0.026+b*0.004+p*0.001;
let fibre=b*0.026+p*0.03;
let sugar=b*0.017+p*0.042;
let sodium=c*0.74+b*0.33+p*0.55+saltg*393;
let potassium=c*2.56+b*3.16+p*3.37;
let calcium=b*0.47+p*0.30;
let iron=c*0.009+b*0.0073+p*0.0061;
tbl.innerHTML=`<tr><th>Item</th><th>Amount</th></tr>
<tr><td>Chicken</td><td>${c} g</td></tr>
<tr><td>Broccoli</td><td>${b} g</td></tr>
<tr><td>Sweet potato</td><td>${p} g</td></tr>
<tr><td>Oil spray</td><td>${s} sprays</td></tr>`;
totals.innerHTML=`<h3>Nutrition</h3>
Calories: ${kcal.toFixed(0)} kcal<br>
Protein: ${protein.toFixed(1)} g<br>
Carbs: ${carbs.toFixed(1)} g<br>
Fat: ${fat.toFixed(1)} g<br>
Fibre: ${fibre.toFixed(1)} g<br>
Sugar: ${sugar.toFixed(1)} g<br>
Sodium: ${sodium.toFixed(0)} mg<br>
Potassium: ${potassium.toFixed(0)} mg<br>
Calcium: ${calcium.toFixed(0)} mg<br>
Iron: ${iron.toFixed(1)} mg`;
}
calc();
