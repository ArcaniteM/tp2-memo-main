import Tache from './Tache';
import './Taches.scss';
import * as tacheModele from '../code/tache-modele';
import { useState, useEffect } from 'react';

export default function Taches({etatTaches, filtre, setFiltre, utilisateur}) {
  const uid = utilisateur.uid;
  const [taches, setTaches] = etatTaches;
  const [tri, setTri] = useState(['date', true]);

  useEffect(() => 
    tacheModele.lireTout(uid, tri).then(
      taches => setTaches(taches)
    )
  , [setTaches, uid, tri]);

  function gererAjoutTache(uid, e) {

    e.preventDefault();
    const texte = e.target.texteTache.value;
    if(texte.trim() !== '') {
      e.target.reset();
      tacheModele.creer(uid, {texte: texte, completee: false}).then(

        tache => {
            setTaches([tache, ...taches]);
            setFiltre('toutes');
        }
      );
    }
  }

  function supprimerTache(idTache) {
    tacheModele.supprimer(utilisateur.uid, idTache).then(
      () => setTaches(taches.filter(
        tache => tache.id !== idTache
      ))
    );
  }

  function basculerEtatTache(idTache, etatCompletee) {
    tacheModele.basculer(utilisateur.uid, idTache, etatCompletee).then(
      () => setTaches(
              taches.map((tache) => {
                if(tache.id === idTache) {
                  tache.completee = !etatCompletee;
                }
                return tache;
              })
      )
    )
  }

  return (
    <section className="Taches">
      <form onSubmit={e => gererAjoutTache(uid, e)}>
        <input 
          type="text"   
          placeholder="Ajoutez une tâche ..." 
          name="texteTache"
          autoComplete="off" 
          autoFocus={true} 
        />
      </form>
      <div className="titre-liste-taches">
        <span className="texte" onClick={() => setTri(['texte', !tri[1]])}>Tâche</span>
        <span className="date" onClick={() => setTri(['date', !tri[1]])}>Date d'ajout</span>
      </div>
      <div className="liste-taches">
        {
          taches
            .filter(
              tache => filtre == 'toutes' || tache.completee == filtre
            )
            .map(tache => <Tache key={tache.id} {... tache} supprimerTache={supprimerTache} basculerEtatTache={basculerEtatTache}/>)
        }
      </div>
    </section>
  );
}