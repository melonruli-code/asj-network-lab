const API_URL = "https://script.google.com/macros/s/AKfycbzMK21Fkh-uUuyCt6OxSGsKPjxOOjr4V_7r9qSZDi1PQpAlxeHtkX0D1_0nAJAx0uCW/exec";
let timerInterval, remaining=20*60, student={}, submitted=false;

const questions=[
 {type:'pg',text:'Perangkat yang berfungsi menghubungkan dua jaringan berbeda dan menentukan jalur paket adalah ...',opts:['Switch','Router','Access Point','Hub'],ans:1},
 {type:'pg',text:'Alamat IP 192.168.10.25/24 termasuk jaringan ...',opts:['192.168.10.0','192.168.10.25','192.168.1.0','255.255.255.0'],ans:0},
 {type:'pg',text:'Protokol yang digunakan untuk menerjemahkan nama domain menjadi alamat IP adalah ...',opts:['DHCP','FTP','DNS','SSH'],ans:2},
 {type:'pg',text:'Fungsi utama DHCP Server adalah ...',opts:['Membagikan alamat IP secara otomatis','Memblokir semua port','Mengubah kabel jaringan','Menyimpan file'],ans:0},
 {type:'pg',text:'Jika PC dapat ping gateway tetapi tidak dapat membuka website menggunakan nama domain, komponen yang perlu diperiksa terlebih dahulu adalah ...',opts:['DNS','RAM','Monitor','Keyboard'],ans:0},
 {type:'pg',text:'Perintah Linux yang umum digunakan untuk melihat konfigurasi/alamat IP interface adalah ...',opts:['ip addr','mkdir','passwd','clear'],ans:0},
 {type:'case',text:'STUDI KASUS 1 — Sebuah laboratorium memiliki 20 PC. Semua PC terhubung ke switch dan gateway router. PC dapat berkomunikasi dalam LAN, tetapi tidak dapat mengakses internet. Jelaskan minimal 3 langkah pemeriksaan yang akan kamu lakukan dan kemungkinan penyebabnya.',keywords:['gateway','ip','router','dns','internet','ping','routing','kabel','switch']},
 {type:'case',text:'STUDI KASUS 2 — Server Debian digunakan sebagai DHCP Server. Sebagian komputer mendapatkan IP 169.254.x.x dan tidak mendapatkan IP dari server. Jelaskan penyebab yang mungkin dan langkah perbaikannya.',keywords:['dhcp','server','service','network','kabel','switch','scope','pool','restart','config','ip']}
];

function showForm(){document.getElementById('intro').classList.add('hidden');document.getElementById('studentForm').classList.remove('hidden');scrollTo(0,0)}
function startExam(){
 student={nama:v('nama'),kelas:v('kelas'),absen:v('absen'),kelompok:v('kelompok')};
 if(!student.nama||!student.kelas||!student.absen){alert('Lengkapi Nama, Kelas, dan No. Absen.');return}
 document.getElementById('studentForm').classList.add('hidden');document.getElementById('exam').classList.remove('hidden');
 renderQuestions(); startTimer(); scrollTo(0,0);
}
function renderQuestions(){
 const box=document.getElementById('questions');
 box.innerHTML=questions.map((q,i)=>{
  if(q.type==='pg') return `<div class="card question"><div class="case-label">SOAL ${i+1} • PILIHAN GANDA</div><h3>${q.text}</h3><div class="options">${q.opts.map((o,j)=>`<label class="option"><input type="radio" name="q${i}" value="${j}"><span>${o}</span></label>`).join('')}</div></div>`;
  return `<div class="card question"><div class="case-label">SOAL ${i+1} • STUDI KASUS</div><h3>${q.text}</h3><textarea id="q${i}" placeholder="Tuliskan analisis, langkah pemeriksaan, dan solusi..."></textarea></div>`;
 }).join('');
}
function startTimer(){
 timerInterval=setInterval(()=>{remaining--; updateTimer(); if(remaining<=0){clearInterval(timerInterval);submitExam(true)}},1000); updateTimer();
}
function updateTimer(){const m=Math.floor(remaining/60).toString().padStart(2,'0'),s=(remaining%60).toString().padStart(2,'0');document.getElementById('timer').textContent=`${m}:${s}`}
function submitExam(auto=false){
 if(submitted)return;
 if(!auto && !confirm('Kirim tugas sekarang? Nilai akan dihitung.'))return;
 submitted=true; clearInterval(timerInterval);
 let pg=0, kasus=0, answers=[];
 questions.forEach((q,i)=>{
   if(q.type==='pg'){const el=document.querySelector(`input[name="q${i}"]:checked`);const val=el?Number(el.value):null;answers.push(val);if(val===q.ans)pg+=10}
   else {const text=(document.getElementById(`q${i}`).value||'').trim();answers.push(text);kasus+=scoreCase(text,q.keywords)}
 });
 const nilai=pg+kasus;
 const record={...student,nilai,pg,kasus,waktu:new Date().toLocaleString('id-ID'),answers};
 localStorage.setItem('asj_submissions',JSON.stringify([record,...JSON.parse(localStorage.getItem('asj_submissions')||'[]')]));
 sendToServer(record);
 document.getElementById('exam').classList.add('hidden');document.getElementById('result').classList.remove('hidden');
 document.getElementById('resultName').textContent=student.nama;
 document.getElementById('score').textContent=nilai;
 document.getElementById('pgScore').textContent=`${pg}/60`;document.getElementById('caseScore').textContent=`${kasus}/40`;
 document.getElementById('resultMessage').textContent=nilai>=85?'Sangat baik! Analisis jaringanmu sudah kuat.':nilai>=70?'Bagus! Tingkatkan lagi ketelitian saat troubleshooting.':'Terus berlatih. Fokus pada urutan troubleshooting dan konsep dasar jaringan.';
 scrollTo(0,0);
}
function scoreCase(text,keys){const t=text.toLowerCase();let hit=0;keys.forEach(k=>{if(t.includes(k))hit++});return Math.min(20,Math.round(hit/Math.min(keys.length,6)*20))}
async function sendToServer(record){
 if(!API_URL)return;
 try{await fetch(API_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify(record)})}catch(e){}
}
function v(id){return document.getElementById(id).value.trim()}
