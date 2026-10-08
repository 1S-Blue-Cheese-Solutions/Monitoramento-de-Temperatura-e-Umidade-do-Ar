/* Dados de demonstração. Substitua gerarSerie() e cameras por leituras da sua API. */
const cameras = {
  1: {temp:8.9, humidity:92.7, ideal:94, tempIdeal:[8,12], humIdeal:[90,98], conformTemp:95, conformHum:94},
  2: {temp:9.6, humidity:95.4, ideal:93, tempIdeal:[8,12], humIdeal:[90,98], conformTemp:94, conformHum:94},
  3: {temp:8.1, humidity:81.2, ideal:89, tempIdeal:[6,8], humIdeal:[83,87], conformTemp:94, conformHum:94}
};
const alerts = [
 {type:'critical',name:'Crítico',cam:3,msg:'Temperatura 8,1 °C (ideal 6–8 °C)',time:'17:58'},
 {type:'warning',name:'Atenção',cam:3,msg:'Umidade 81,2% (ideal 83–87%)',time:'17:58'},
 {type:'warning',name:'Atenção',cam:3,msg:'Temperatura 8,3 °C (ideal 6–8 °C)',time:'17:56'},
 {type:'warning',name:'Atenção',cam:3,msg:'Umidade 81,5% (ideal 83–87%)',time:'17:56'},
 {type:'warning',name:'Atenção',cam:1,msg:'Umidade 86,1% (ideal 90–98%)',time:'17:42'},
 {type:'warning',name:'Atenção',cam:3,msg:'Temperatura 8,2 °C (ideal 6–8 °C)',time:'17:40'},
 {type:'warning',name:'Atenção',cam:3,msg:'Umidade 80,9% (ideal 83–87%)',time:'17:37'},
 {type:'warning',name:'Atenção',cam:1,msg:'Temperatura 12,1 °C (ideal 8–12 °C)',time:'17:29'},
 {type:'warning',name:'Atenção',cam:1,msg:'Umidade 87,1% (ideal 90–98%)',time:'17:22'},
 {type:'warning',name:'Atenção',cam:2,msg:'Temperatura 12,2 °C (ideal 8–12 °C)',time:'16:53'},
 {type:'warning',name:'Atenção',cam:2,msg:'Umidade 89,5% (ideal 90–98%)',time:'16:48'}
];
const $ = id => document.getElementById(id);
const pt = n => n.toFixed(1).replace('.',',');
const state = {cam:1,hours:24};
let chartTemperature, chartHumidity, chartCompliance;
function gerarSerie(cam,hours,mode) {
  const points = hours * 6 + 1;
  return Array.from({length:points}, (_,i)=>{
    const t=i/Math.max(points-1,1), phase=cam*.68;
    const v= mode==='temp'
      ? (10.2 + 1.15*Math.sin(t*5.5+phase) + .23*Math.sin(i*.81)+ .18*Math.cos(i*1.29) + (t>.93?1.4:0))
      : (93.1 + 2.1*Math.sin(t*3.1-.75+phase) + .34*Math.cos(i*.5) + (t>.93?-8.1:0));
    return Math.round(v*10)/10;
  });
}
const idealBand = {
  id:'idealBand',
  beforeDatasetsDraw(chart) {
    if(!chart.options.plugins.idealBand) return;
    const {ctx, chartArea, scales:{y}}=chart;
    const {min,max}=chart.options.plugins.idealBand;
    ctx.save();ctx.fillStyle='rgba(46, 139, 92, 0.105)';
    const top=Math.max(chartArea.top,y.getPixelForValue(max));
    const bottom=Math.min(chartArea.bottom,y.getPixelForValue(min));
    ctx.fillRect(chartArea.left,top,chartArea.right-chartArea.left,Math.max(0,bottom-top));ctx.restore();
  }
};
function lineChart(id, data, color, min, max, band, hours) {
  const labels = data.map((_,i) => {
    const minutes = (21*60+11 + Math.round(i*hours*60/(data.length-1)))%(24*60);
    return `${String(Math.floor(minutes/60)).padStart(2,'0')}:${String(minutes%60).padStart(2,'0')}`;
  });
  return new Chart($(id), {
    type:'line', data:{labels,datasets:[{data,borderColor:color,borderWidth:1.8,pointRadius:0,tension:.25,fill:false}]},
    plugins:[idealBand],
    options:{responsive:true,maintainAspectRatio:false,animation:false,interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:false},idealBand:{min:band[0],max:band[1]},tooltip:{callbacks:{label:context=>`${pt(context.parsed.y)} ${id==='graficoTemperatura'?'°C':'%'}`}}},
      scales:{x:{grid:{display:false},border:{display:false},ticks:{maxTicksLimit:8,color:'#607993',font:{size:10},maxRotation:0}},
      y:{min,max,grid:{color:'#ecf0ef'},border:{display:false},ticks:{color:'#607993',font:{size:10},callback:value=>`${value}${id==='graficoTemperatura'?'°':'%'}`}}}
    }
  });
}
function complianceChart() {
  return new Chart($('graficoConformidade'),{
    type:'bar',data:{labels:['Câmara 1','Câmara 2','Câmara 3'], datasets:[
      {label:'Temperatura',data:[95,94,94],backgroundColor:'#173f73',borderRadius:2,barPercentage:.78,categoryPercentage:.72},
      {label:'Umidade',data:[94,94,94],backgroundColor:'#29999b',borderRadius:2,barPercentage:.78,categoryPercentage:.72}]},
    options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,animation:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${c.dataset.label}: ${c.parsed.x}%`}}},
      scales:{x:{min:0,max:100,grid:{color:'#edf0f3'},border:{display:false},ticks:{stepSize:25,color:'#607993',font:{size:10}}},
      y:{grid:{display:false},border:{display:false},ticks:{color:'#607993',font:{size:10}}}}
    }
  });
}
function renderAlerts() {
  // Alertas reais deverão vir do backend com datas, valores e câmera correspondentes.
  const filtered = alerts.filter(a=>state.hours===24 || (state.hours===12 ? true : a.time>='17:00'));
  $('listaAlertas').innerHTML=filtered.map(a=>`<div class="dashboard-alert dashboard-${a.type}"><span class="alert-type">${a.type==='critical'?'✕':'!'} ${a.name}</span><span class="alert-description">Câmara ${a.cam} · ${a.msg}</span><time>${a.time}</time></div>`).join('');
  $('totalAlertas').textContent=filtered.length;
  $('resumoAlertas').textContent=`${filtered.filter(a=>a.type==='critical').length} crítico(s) · ${filtered.filter(a=>a.type==='warning').length} atenção`;
}
function render() {
  const c=cameras[state.cam];
  $('temperaturaAtual').innerHTML=`${pt(c.temp)}<span class="card-unit">°C</span>`;
  $('umidadeAtual').innerHTML=`${pt(c.humidity)}<span class="card-unit">%</span>`;
  $('tempoIdeal').innerHTML=`${c.ideal}<span class="card-unit">%</span>`;
  $('progressoIdeal').style.width=`${c.ideal}%`;
  for(const [key,value,range] of [['temperaturaBadge',c.temp,c.tempIdeal],['umidadeBadge',c.humidity,c.humIdeal]]) {
    const ok=value>=range[0]&&value<=range[1];
    $(key).textContent=ok?'✓ Dentro da faixa':'! Fora da faixa';
    $(key).className=`dashboard-badge ${ok?'dashboard-ok':'dashboard-bad'}`;
  }
  chartTemperature?.destroy();chartHumidity?.destroy();
  chartTemperature=lineChart('graficoTemperatura',gerarSerie(state.cam,state.hours,'temp'),'#173f73',7.5,13.0,c.tempIdeal,state.hours);
  chartHumidity=lineChart('graficoUmidade',gerarSerie(state.cam,state.hours,'humidity'),'#209598',80,100,c.humIdeal,state.hours);
  renderAlerts();
}
document.addEventListener('DOMContentLoaded',()=>{
  $('camaraSelect').addEventListener('change',e=>{state.cam=Number(e.target.value);render()});
  $('periodoSelect').addEventListener('change',e=>{state.hours=Number(e.target.value);render()});
  document.querySelector('.menu-sidebar-toggle').addEventListener('click',()=>{
    const isOpen=$('sidebar').classList.toggle('open');
    document.querySelector('.menu-sidebar-toggle').setAttribute('aria-expanded',String(isOpen));
  });
  document.querySelectorAll('[data-demo-link]').forEach(el=>el.addEventListener('click',e=>e.preventDefault()));
  if(typeof Chart!=='undefined') {chartCompliance=complianceChart();render();}
  else {document.querySelector('.dashboard-demo-notice').textContent='Não foi possível carregar a biblioteca de gráficos. Verifique a conexão com a internet.';}
});
