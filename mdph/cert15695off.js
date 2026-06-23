/* =====================================================================
   MDPH Assist — remplissage du VRAI Cerfa 15695*01 officiel (à champs).
   Champs texte par nom + cases (radio/checkbox) par position de widget.
   100% hors-ligne (pdf-lib). Le document produit EST le formulaire officiel.
   ===================================================================== */
'use strict';
window.CERT15695OFF = (function(){
  // ---- champs texte : id app -> nom exact du champ PDF ----
  const TXT={
    id_nom:'nom de naissance', id_usage:"nom d'usage", id_prenom:'préno', id_naiss:'date naissanc',
    id_adresse:'Adresse', id_dossier:'numéro dossier MDPH',
    p_motiv:'Pathologie motivant la demande :',
    p_autres:'Autres pathologies éventuelles : ',
    p_elements:'Eléments essentiels à retenir',
    c_poids:'KG', c_taille:'CM',
    h_atcd:'Antécédents médicaux',
    h_retard:'Pour un enfant, indiquer la présence éventuelle d’un retard dans les acquisitions principales',
    c_precis:'Précisions P2',
    s_audi:'Observations P3 1', s_visu:'Observations P3 2',
    t_classes:'Classes thérapeutiques ou nom des médicaments',
    t_effets:'Effets secondaires du traitement',
    t_contraintes:'Autres contraintes si connues',
    t_regime:'Régime alimentaire',
    t_projet:'Projet Therapeutique',
    a_precis:'Précisions (type, adaptation, circonstances d’utilisation, autonomie de la personne à l’utiliser, co',
    r_perim:'Deplacement',
    r_cog_precis:'Conduite émotionnelle et comportementale',
    r_perso_precis:'Précisions (si incontinence, si supervision ou stimulation nécessaire…)',
    r_scol:' Retentissement sur la scolarité et les études supérieures :',
    r_social:'Précisions P7 2', r_emploi:'Précisions P7',
    o_remarques:'Remarques ou observations complémentaires si besoin '
  };
  // ---- grilles A/B/C/D/NSP : page(0-based), y de chaque ligne, libellés app ----
  const COLX={A:393,B:430,C:467,D:504,NSP:541};
  const MAT={
    m_mot:{page:4,ys:[384,361,338,315,293,271],rows:['Marcher','Se déplacer à l\'intérieur','Se déplacer à l\'extérieur','Préhension (main non dominante)','Préhension (main dominante)','Motricité fine']},
    m_comm:{page:4,ys:[174,152,127],rows:['Communiquer avec autrui','Utiliser le téléphone','Utiliser d\'autres appareils/techniques de communication']},
    m_cog:{page:5,ys:[692,670,647,624],rows:['Orientation dans le temps','Orientation dans l\'espace','Gestion de la sécurité personnelle','Maîtrise du comportement']},
    m_perso:{page:5,ys:[223,200,178,154,133,109],rows:['Faire sa toilette','S\'habiller / se déshabiller','Manger et boire des aliments préparés','Couper ses aliments','Assurer l\'hygiène de l\'élimination urinaire','Assurer l\'hygiène de l\'élimination fécale']},
    m_dom:{page:6,ys:[748,726,703,680,658,635,612],rows:['Prendre son traitement','Gérer son stress','Faire les courses','Préparer le repas','Entretien courant du logement','Démarches administratives','Gérer son budget']}
  };
  // ---- cases (radio + simples) : champ app -> {valeur:[page,x,y]} ----
  const CHK={
    h_origine:{'Congénitale':[1,36,509],'Maladie':[1,120,509],'Accident vie privée':[1,184,509],'Accident du travail':[1,36,489],'Maladie professionnelle':[1,156,489]},
    h_date:{'À la naissance':[1,36,440],'Depuis moins d\'un an':[1,156,440],'Depuis 1 à 5 ans':[1,36,420],'Depuis plus de 5 ans':[1,156,420]},
    c_lat:{'Droite':[1,440,262],'Gauche':[1,506,262]},
    c_evol:{'Stabilité':[2,36,771],'Aggravation':[2,36,753],'Incapacité fluctuante':[2,127,771],'Évolutivité majeure':[2,127,753],'Amélioration':[2,254,771],'Non définie':[2,254,753]},
    t_sanit:{'Ergothérapeute':[3,36,756],'Infirmière':[3,36,734],'Kinésithérapeute':[3,36,712],'Orthophoniste':[3,36,689],'Orthoptiste':[3,36,667],'Psychologue':[3,36,645],'Psychomotricien':[3,36,622]},
    t_pluri:{'CMPP':[3,302,756],'CMP':[3,302,734],'CATTP':[3,302,712],'Hôpital de jour':[3,302,689]},
    g_mt:{'Oui':[7,425,350],'Non':[7,479,350]}
  };
  const FREQX={'Permanents':376,'Réguliers (>15j/mois)':448,'Ponctuel (<15j/mois)':518};
  const FREQY=[196,146,97];

  function buildWidgetIndex(doc,PL){
    const {PDFName}=PL; const pages=doc.getPages();
    const list=[];
    doc.getForm().getFields().forEach(f=>{
      if(f.constructor.name!=='PDFCheckBox') return;
      f.acroField.getWidgets().forEach(w=>{
        let pi=-1; try{ const pref=w.dict.get(PDFName.of('P')); pages.forEach((p,i)=>{ if(p.ref===pref) pi=i; }); }catch(e){}
        let on=null; try{ const ap=w.dict.lookup(PDFName.of('AP')); const N=ap&&ap.lookup(PDFName.of('N'));
          if(N&&N.keys) on=N.keys().find(k=>k.asString()!=='/Off'); }catch(e){}
        const r=w.getRectangle();
        list.push({field:f,widget:w,page:pi,x:r.x+r.width/2,y:r.y+r.height/2,on});
      });
    });
    return list;
  }
  function onNameOf(w,PDFName){ try{ const ap=w.dict.lookup(PDFName.of('AP')); const N=ap&&ap.lookup(PDFName.of('N'));
    if(N&&N.keys) return N.keys().find(k=>k.asString()!=='/Off')||null; }catch(e){} return null; }
  function setAt(idx,PL,page,x,y){
    const {PDFName}=PL; let best=null,bd=1e9;
    idx.forEach(it=>{ if(it.page!==page||!it.on) return; const d=Math.abs(it.x-x)+Math.abs(it.y-y); if(d<bd){bd=d;best=it;} });
    if(!best||bd>22) return false;
    const f=best.field, ws=f.acroField.getWidgets();
    // retrouver, DANS le champ, le widget le plus proche de (x,y)
    let tw=null,td=1e9,ton=null;
    ws.forEach(w=>{ const r=w.getRectangle(); const cx=r.x+r.width/2, cy=r.y+r.height/2;
      const d=Math.abs(cx-x)+Math.abs(cy-y); const on=onNameOf(w,PDFName); if(on&&d<td){ td=d; tw=w; ton=on; } });
    if(!tw) return false;
    try{
      f.acroField.dict.set(PDFName.of('V'),ton);
      ws.forEach(w=>{ const on=onNameOf(w,PDFName); w.dict.set(PDFName.of('AS'), (w===tw&&on)?on:PDFName.of('Off')); });
      return true;
    }catch(e){ return false; }
  }

  async function fill(pdfBytes, state){
    if(!window.PDFLib) throw new Error('pdf-lib non chargé');
    const PL=window.PDFLib; const {PDFDocument}=PL;
    const V=(state&&state.V)||{}, C=(state&&state.C)||{}, M=(state&&state.M)||{}, MROWS=(state&&state.MROWS)||{};
    const doc=await PDFDocument.load(pdfBytes);
    const form=doc.getForm();
    const T=(n,v)=>{ if(v==null||String(v).trim()==='')return; try{form.getTextField(n).setText(String(v));}catch(e){} };
    // texte
    for(const id in TXT) T(TXT[id], V[id]);
    { const s=String(V.id_ss||'').replace(/\s/g,''); for(let i=0;i<15;i++) if(s[i]) T('N° immatriculation SS '+(i+1),s[i]); }
    const sg=(MROWS.c_signes||[]).filter(r=>r.label&&r.label.trim());
    sg.slice(0,3).forEach((r,i)=>T('Description des signes cliniques '+(i+1), r.label.trim()));

    const idx=buildWidgetIndex(doc,PL);
    // grilles A/B/C/D
    for(const id in MAT){ const m=MAT[id], sel=M[id]||{};
      m.rows.forEach((row,i)=>{ const L=sel[row]; if(L&&COLX[L]!=null) setAt(idx,PL,m.page,COLX[L],m.ys[i]); }); }
    // cases discrètes
    for(const id in CHK){ const map=CHK[id];
      const rv=V[id]; if(typeof rv==='string'&&map[rv]){ const c=map[rv]; setAt(idx,PL,c[0],c[1],c[2]); }
      const set=C[id]; if(set&&set.forEach) set.forEach(v=>{ if(map[v]){ const c=map[v]; setAt(idx,PL,c[0],c[1],c[2]); } });
    }
    // fréquence des signes
    sg.slice(0,3).forEach((r,i)=>{ const col=r.col; if(col&&FREQX[col]!=null) setAt(idx,PL,1,FREQX[col],FREQY[i]); });

    try{ form.updateFieldAppearances&&form.updateFieldAppearances(); }catch(e){}
    return await doc.save();
  }
  return { fill, TXT };
})();
