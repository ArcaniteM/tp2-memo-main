import './Appli.scss';
import logo from '../images/memo-logo.png';
import Controle from './Controle';
import Taches from './Taches';
import Accueil from './Accueil';
import Utilisateur from './Utilisateur';
import { useEffect, useState } from 'react';
import { observerConnexion } from '../code/utilisateur-modele';
import * as tacheModele from '../code/tache-modele';

export default function Appli() {
  const [filtre, setFiltre] = useState('toutes');

  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => observerConnexion(setUtilisateur), []);

  const etatTaches = useState([]);
  const [taches, setTaches] = etatTaches;

  function supprimerCompletees() {
    tacheModele.supprimerComplets(utilisateur.uid).then(
      suppressionCompletee => setTaches(taches.filter(
        tache => tache.completee = false
      ))
    );
  }

  return (
    utilisateur ?
      <div className="Appli">
        <header className="appli-entete">
          <img src={logo} className="appli-logo" alt="Memo" />
          <Utilisateur utilisateur={utilisateur} />
        </header>
        <Taches etatTaches={etatTaches} filtre={filtre} setFiltre={setFiltre} utilisateur={utilisateur} />
        <Controle taches={taches} filtre={filtre} setFiltre={setFiltre} supprimerCompletees={supprimerCompletees} />
      </div>
    :
      <Accueil setUtilisateur={setUtilisateur} />
  );
}

