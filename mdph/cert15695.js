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
  // cases simples (radio) page 2 : origine + date d'apparition
  const ORI={'Congénitale':[52,506],'Maladie':[124,506],'Accident vie privée':[195,506],'Accident du travail':[52,481],'Maladie professionnelle':[140,481]};
  const DAT={'À la naissance':[52,434],'Depuis moins d\'un an':[140,434],'Depuis 1 à 5 ans':[52,411],'Depuis plus de 5 ans':[140,411]};

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
    const draw=(pi,x,y,txt,size)=>{ if(P[pi]) P[pi].drawText(String(txt),{x,y,size,font,color:COLOR}); };
    const tick=(pi,x,y)=>{ if(P[pi]) P[pi].drawText('X',{x,y,size:9,font:fontB,color:COLOR}); };
    const wrap=(pi,x,y,maxW,txt,size,lh)=>{ if(!txt)return; lh=lh||size+3;
      const words=String(txt).split(/\s+/); let line='',yy=y;
      for(const w of words){ const t=line?line+' '+w:w;
        if(font.widthOfTextAtSize(t,size)>maxW){ draw(pi,x,yy,line,size); line=w; yy-=lh; } else line=t; }
      if(line) draw(pi,x,yy,line,size); };

    for(const id in MAP){ const m=MAP[id], v=V[id];
      if(v==null||String(v).trim()==='') continue;
      if(m.w) wrap(m.p,m.x,m.y,m.w,v,m.s||8); else draw(m.p,m.x,m.y,v,m.s||9); }
    (signs||[]).slice(0,3).forEach((s,i)=>{ if(SIGNS[i]) wrap(1,SIGNS[i].x,SIGNS[i].y,SIGN_W,s,7,9); });

    // ----- cases à cocher -----
    // grilles d'appréciation A/B/C/D/NSP
    for(const id in MAT){ const m=MAT[id], sel=M[id]||{};
      m.rows.forEach((rowLabel,i)=>{ const c=sel[rowLabel]; if(c&&COLX[c]) tick(m.p,COLX[c],m.ys[i]-3); }); }
    // origine + date d'apparition (page 2)
    if(ORI[V.h_origine]) tick(1,ORI[V.h_origine][0],ORI[V.h_origine][1]);
    if(DAT[V.h_date]) tick(1,DAT[V.h_date][0],DAT[V.h_date][1]);

    SIGN_MASKS.forEach(m=>{ if(P[m.p]) P[m.p].drawRectangle({x:m.x,y:m.y,width:m.width,height:m.height,color:rgb(1,1,1)}); });

    return await doc.save();
  }
  return { MAP, fill };
})();
