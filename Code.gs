const SHEET_NAME = 'Nilai';

function setupSheet(){
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  let sh=ss.getSheetByName(SHEET_NAME);
  if(!sh) sh=ss.insertSheet(SHEET_NAME);
  if(sh.getLastRow()===0){
    sh.appendRow(['Timestamp','Nama','Kelas','Absen','Kelompok','Nilai','PG','Studi Kasus','Jawaban']);
  }
}

function doPost(e){
  setupSheet();
  const d=JSON.parse(e.postData.contents);
  const sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  sh.appendRow([new Date(),d.nama,d.kelas,d.absen,d.kelompok||'',d.nilai,d.pg,d.kasus,JSON.stringify(d.answers)]);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e){
  setupSheet();
  const sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const values=sh.getDataRange().getValues();
  if(values.length<=1) return ContentService.createTextOutput('[]').setMimeType(ContentService.MimeType.JSON);
  const rows=values.slice(1).map(r=>({waktu:r[0],nama:r[1],kelas:r[2],absen:r[3],kelompok:r[4],nilai:r[5],pg:r[6],kasus:r[7],jawaban:r[8]}));
  return ContentService.createTextOutput(JSON.stringify(rows)).setMimeType(ContentService.MimeType.JSON);
}
