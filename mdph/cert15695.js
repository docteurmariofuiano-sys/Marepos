/* =====================================================================
   MDPH Assist — remplissage par SURIMPRESSION du certificat 15695*01
   (document fourni par l'utilisateur, mis en page type mdphclic/pdfmake).
   Aucune copie : on imprime le texte par-dessus le PDF original chargé.
   Coordonnées en points PDF (origine bas-gauche), pages A4 595x842.
   ===================================================================== */
'use strict';
window.CERT15695 = (function(){
  // Carte des champs texte : id app -> {p:index page, x, y, w?(largeur de retour), s?(taille)}
  const MAP={
    p_motiv:{p:1,x:185,y:747,s:9}, p_autres:{p:1,x:188,y:715,s:9},
    p_elements:{p:1,x:55,y:676,w:490,s:8}, h_atcd:{p:1,x:293,y:515,w:250,s:8},
    h_retard:{p:1,x:55,y:352,w:490,s:8},
    c_poids:{p:1,x:85,y:276,s:9}, c_taille:{p:1,x:200,y:276,s:9},
    c_precis:{p:1,x:90,y:92,w:480,s:8},
    s_audi:{p:2,x:112,y:602,w:430,s:8}, s_visu:{p:2,x:112,y:543,w:430,s:8},
    t_classes:{p:2,x:55,y:442,w:490,s:8}, t_effets:{p:2,x:55,y:385,w:490,s:8},
    t_contraintes:{p:2,x:55,y:327,w:490,s:8}, t_regime:{p:2,x:140,y:300,s:9},
    t_projet:{p:3,x:55,y:575,w:490,s:8}, a_precis:{p:3,x:55,y:60,w:490,s:8},
    r_perim:{p:4,x:205,y:760,s:9},
    r_cog_precis:{p:5,x:55,y:560,w:490,s:8},
    r_perso_precis:{p:6,x:95,y:545,w:455,s:8}, r_social:{p:6,x:95,y:430,w:455,s:8},
    r_scol:{p:6,x:55,y:345,w:490,s:8}, r_emploi:{p:6,x:55,y:250,w:490,s:8},
    o_remarques:{p:7,x:55,y:770,w:490,s:9}
  };
  const SIGNS=[{x:55,y:232},{x:55,y:197},{x:55,y:162}]; const SIGN_W=250;
  // zones de l'ancienne signature Doctolib à masquer (pages 1 et 8), sans cacher les libellés
  const SIGN_MASKS=[
    {p:7,x:80,y:92,width:185,height:58},   // page 8 (bloc signature du médecin)
    {p:0,x:388,y:330,width:158,height:48}  // page 1 (certificat simplifié)
  ];

  // ----- cases à cocher -----
  // colonnes des grilles d'appréciation A/B/C/D/NSP (position de dessin du X)
  const COLX={A:395,B:433,C:471,D:509,NSP:547};
  // grilles : page, y de chaque ligne, libellés app (ordre = lignes du PDF)
  const MAT={
    m_mot:{p:4,ys:[388,358,328,298,268,238],
      rows:['Marcher','Se déplacer à l\'intérieur','Se déplacer à l\'extérieur','Préhension (main non dominante)','Préhension (main dominante)','Motricité fine']},
    m_comm:{p:4,ys:[185,155,128],
      rows:['Communiquer avec autrui','Utiliser le téléphone','Utiliser d\'autres appareils/techniques de communication']},
    m_cog:{p:5,ys:[698,675,651,628],
      rows:['Orientation dans le temps','Orientation dans l\'espace','Gestion de la sécurité personnelle','Maîtrise du comportement']},
    m_perso:{p:5,ys:[225,205,185,155,135,115],
      rows:['Faire sa toilette','S\'habiller / se déshabiller','Manger et boire des aliments préparés','Couper ses aliments','Assurer l\'hygiène de l\'élimination urinaire','Assurer l\'hygiène de l\'élimination fécale']},
    m_dom:{p:6,ys:[748,724,703,682,660,638,617],
      rows:['Prendre son traitement','Gérer son stress','Faire les courses','Préparer le repas','Entretien courant du logement','Démarches administratives','Gérer son budget']}
  };
  // cases simples : champ app -> {valeur:[page,x,y(centre boîte)]}
  // (radio dans V : h_origine,h_date,c_lat,g_mt ; ensembles dans C : les autres)
  const CHK={
    h_origine:{'Congénitale':[1,52,506],'Maladie':[1,124,506],'Accident vie privée':[1,195,506],'Accident du travail':[1,52,481],'Maladie professionnelle':[1,140,481]},
    h_date:{'À la naissance':[1,52,434],'Depuis moins d\'un an':[1,140,434],'Depuis 1 à 5 ans':[1,52,411],'Depuis plus de 5 ans':[1,140,411]},
    c_lat:{'Droite':[1,445,276],'Gauche':[1,522,276]},
    c_evol:{'Stabilité':[2,50,780],'Aggravation':[2,50,757],'Incapacité fluctuante':[2,152,780],'Évolutivité majeure':[2,152,757],'Amélioration':[2,297,780],'Non définie':[2,297,757]},
    t_autres:{'Hospitalisations itératives ou programmées':[2,38,148],'Suivi médical spécialisé':[2,38,116],'Soins ou traitements nocturnes':[2,243,148],'Autres':[2,243,116]},
    t_sanit:{'Ergothérapeute':[3,38,763],'Infirmière':[3,38,716],'Kinésithérapeute':[3,38,672],'Orthophoniste':[3,38,631],'Orthoptiste':[3,38,588],'Psychologue':[3,38,545],'Psychomotricien':[3,38,503]},
    t_pluri:{'CMPP':[3,285,763],'CMP':[3,285,716],'CATTP':[3,285,672],'Hôpital de jour':[3,285,631]},
    a_audi:{'Unilatérale':[3,161,392],'Bilatérale':[3,281,392],'Appareillage':[3,388,392],'Implant':[3,500,392]},
    a_mob:{'Déambulateur':[3,161,360],'Canne':[3,281,360],'Orthèse/prothèse':[3,388,360],'Fauteuil roulant électrique':[3,161,340],'Fauteuil roulant manuel':[3,388,340],'Autre (scooter…)':[3,161,312]},
    a_vis:{'Télé-agrandisseur':[3,161,250],'Terminal-braille':[3,281,250],'Logiciel de basse vision':[3,388,250],'Loupe':[3,161,225],'Logiciel de synthèse vocale':[3,281,225]},
    a_alim:{'Gastro/jéjunostomie d\'alimentation':[3,161,195],'Stomie digestive d\'élimination':[3,388,195],'Sonde urinaire':[3,161,170],'Stomie urinaire':[3,281,170]},
    a_resp:{'Trachéotomie':[3,161,140],'O₂':[3,281,140],'Appareil de ventilation':[3,388,140]},
    a_parole:{'Prothèse phonatoire':[3,161,110]},
    r_aides_int:{'Cannes':[4,209,708],'Déambulateur':[4,209,686],'Fauteuil roulant manuel':[4,209,664],'Fauteuil roulant électrique':[4,209,642]},
    r_aides_ext:{'Cannes':[4,330,708],'Déambulateur':[4,330,686],'Fauteuil roulant manuel':[4,330,664],'Fauteuil roulant électrique':[4,330,642]},
    r_sait:{'Lire':[5,317,302],'Écrire':[5,364,302],'Calculer':[5,425,302],'Ne se prononce pas':[5,510,302]},
    g_mt:{'Oui':[7,426,358],'Non':[7,483,358]}
  };
  const FREQX={'Permanents':380,'Réguliers (>15j/mois)':455,'Ponctuel (<15j/mois)':518};
  const FREQY=[203,153,103];

  async function fill(pdfBytes, state, signs){
    if(!window.PDFLib) throw new Error('pdf-lib non chargé');
    const {PDFDocument,rgb,StandardFonts}=window.PDFLib;
    const V=(state&&state.V)||{}, M=(state&&state.M)||{};
    if(!signs && state && state.MROWS) signs=(state.MROWS.c_signes||[]).filter(r=>r.label&&r.label.trim()).map(r=>r.label.trim());
    const doc=await PDFDocument.load(pdfBytes);
    const font=await doc.embedFont(StandardFonts.Helvetica);
    const fontB=await doc.embedFont(StandardFonts.HelveticaBold);
    const P=doc.getPages();
    const COLOR=rgb(0.05,0.15,0.5);
    // la police standard (WinAnsi) n'encode pas certains caractères (indices ₂, ≈, flèches…) : on assainit.
    const SAN={'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9',
      '⁰':'0','¹':'1','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁺':'+','⁻':'-',
      '≈':'~','≤':'<=','≥':'>=','≠':'!=','→':'->','←':'<-','↔':'<->','⇒':'=>','·':'.','✓':'v','✔':'v','☒':'X','☐':'','′':"'",'″':'"','µ':'u'};
    const san=t=>String(t==null?'':t)
      .replace(/[₀-₉⁰¹⁴-⁹⁺⁻≈≤≥≠→←↔⇒·✓✔☒☐′″µ]/g,c=>SAN[c]!=null?SAN[c]:'')
      .replace(/[⁰-₟←-⇿∀-⋿]/g,'');
    const drawRaw=(pi,x,y,s,size,f)=>{ try{ P[pi].drawText(s,{x,y,size,font:f||font,color:COLOR}); }
      catch(e){ try{ P[pi].drawText(s.replace(/[^\x00-\xFF]/g,''),{x,y,size,font:f||font,color:COLOR}); }catch(_){ } } };
    const draw=(pi,x,y,txt,size)=>{ if(P[pi]) drawRaw(pi,x,y,san(txt),size); };
    const tick=(pi,x,y)=>{ if(P[pi]) drawRaw(pi,x,y,'X',9,fontB); };
    const wrap=(pi,x,y,maxW,txt,size,lh)=>{ if(!txt)return; lh=lh||size+3;
      const words=san(txt).split(/\s+/); let line='',yy=y;
      for(const w of words){ const t=line?line+' '+w:w;
        if(font.widthOfTextAtSize(t,size)>maxW){ drawRaw(pi,x,yy,line,size); line=w; yy-=lh; } else line=t; }
      if(line) drawRaw(pi,x,yy,line,size); };

    for(const id in MAP){ const m=MAP[id], v=V[id];
      if(v==null||String(v).trim()==='') continue;
      if(m.w) wrap(m.p,m.x,m.y,m.w,v,m.s||8); else draw(m.p,m.x,m.y,v,m.s||9); }
    (signs||[]).slice(0,3).forEach((s,i)=>{ if(SIGNS[i]) wrap(1,SIGNS[i].x,SIGNS[i].y,SIGN_W,s,7,9); });

    // ----- cases à cocher -----
    const C=(state&&state.C)||{}, MROWS=(state&&state.MROWS)||{};
    // grilles d'appréciation A/B/C/D/NSP
    for(const id in MAT){ const m=MAT[id], sel=M[id]||{};
      m.rows.forEach((rowLabel,i)=>{ const c=sel[rowLabel]; if(c&&COLX[c]) tick(m.p,COLX[c],m.ys[i]-3); }); }
    // cases discrètes (radio dans V, ensembles dans C)
    for(const id in CHK){ const map=CHK[id];
      const rv=V[id]; if(typeof rv==='string' && map[rv]){ const c=map[rv]; tick(c[0],c[1],c[2]-3); }
      const set=C[id]; if(set && set.forEach) set.forEach(v=>{ if(map[v]){ const c=map[v]; tick(c[0],c[1],c[2]-3); } });
    }
    // fréquence des signes invalidants (3 lignes, page 2)
    (MROWS.c_signes||[]).slice(0,3).forEach((r,i)=>{ const col=r&&r.col; if(col&&FREQX[col]!=null&&FREQY[i]!=null) tick(1,FREQX[col],FREQY[i]-3); });

    SIGN_MASKS.forEach(m=>{ if(P[m.p]) P[m.p].drawRectangle({x:m.x,y:m.y,width:m.width,height:m.height,color:rgb(1,1,1)}); });

    return await doc.save();
  }
  return { MAP, fill };
})();
