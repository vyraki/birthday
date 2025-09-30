const audioJingle=new Audio('happy-birthday.mp3'); 
const audioTiup=new Audio('blow.mp3'); 
let countTiup=0;
let currentKado=0;

function buatConfetti(intensity=50){
    const confetti=document.getElementById('confetti');
    confetti.innerHTML='';
    for(let i=0;i<intensity;i++){
        const p=document.createElement('div');
        p.className='particle';
        p.style.left=Math.random()*100+'vw';
        p.style.background=`hsl(${Math.random()*360},70%,60%)`;
        p.style.animationDelay=Math.random()*3+'s';
        p.style.animationDuration=(Math.random()*3+2)+'s';
        confetti.appendChild(p);
    }
    setTimeout(()=>{confetti.innerHTML='';},5000);
}

// Klik lampu
document.getElementById('lampu').addEventListener('click',()=>{
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    document.getElementById('adegan1').style.display='none';
    document.getElementById('adegan2').style.display='block';
    buatConfetti(30);
    audioJingle.play().catch(()=>{});
});

// Tiup lilin
const inputTiup=document.getElementById('inputTiup');
inputTiup.addEventListener('input',function(e){
    if(e.target.value.toUpperCase().trim()==='PUH'){
        countTiup++;
        audioTiup.play().catch(()=>{});
        if(countTiup===1) document.getElementById('lilin1').classList.add('off'), buatAsap();
        if(countTiup===2) document.getElementById('lilin2').classList.add('off'), buatAsap();
        document.getElementById('count').textContent=countTiup;
        document.getElementById('counter').style.display='block';
        e.target.value='';
        if(countTiup>=3){
            setTimeout(()=>{
                document.getElementById('adegan2').style.display='none';
                document.getElementById('adegan3').style.display='block';
                document.getElementById('kado1').style.display='block';
            },1000);
        }
    }
});

function buatAsap(){
    const smoke=document.createElement('div');
    smoke.className='smoke';
    smoke.innerHTML='💨';
    document.querySelector('.cake-wrapper').appendChild(smoke);
    setTimeout(()=>smoke.remove(),2000);
}

// Kado
document.getElementById('kado1').addEventListener('click',()=>{tampilkanUcapan(1),document.getElementById('kado1').style.display='none';});
document.getElementById('kado2').addEventListener('click',()=>{tampilkanUcapan(2),document.getElementById('kado2').style.display='none';});

function tampilkanUcapan(kadoNum){
    const popup=document.getElementById('popup');
    const content=document.getElementById('popupContent');
    if(kadoNum===1) content.innerHTML=`<h2>Kado Pertama: Harapan</h2><p>Bapak, selamat ulang tahun! Aku berharap Bapak selalu sehat, bahagia, dan dikelilingi cinta keluarga setiap hari.</p>`;
    if(kadoNum===2) content.innerHTML=`<h2>Kado Kedua: Doa</h2><p>Bapak, aku mendoakan Bapak selalu diberkahi, sukses, dan senantiasa bahagia. Selamat ulang tahun ke-45!</p>`;
    popup.style.display='block';
    currentKado=kadoNum;
}

function tutupPopup(){
    document.getElementById('popup').style.display='none';
    if(currentKado===1) document.getElementById('kado2').style.display='block';
    else if(currentKado===2){
        document.getElementById('adegan3').style.display='none';
        document.getElementById('adegan4').style.display='block';
        buatConfetti(100);
    }
}

// Keyboard listener
document.addEventListener('keydown',function(e){
    if(document.getElementById('adegan2').style.display!=='none'){
        if(e.key.length===1) inputTiup.value+=e.key.toUpperCase();
        const event=new Event('input',{bubbles:true});
        inputTiup.dispatchEvent(event);
    }
});