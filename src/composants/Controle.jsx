import './Controle.scss';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';

export default function Controle({etatTaches, utilisateur, taches, supprimerCompletees, filtre, setFiltre}) {  
  

  return (
    <footer className="Controle">
      <ToggleButtonGroup 
        size="small" 
        exclusive={true} 
      >
        <ToggleButton value={'toutes'} selected={(filtre='toutes')?true:false} onClick={() => setFiltre('toutes')}>Toutes</ToggleButton>
        <ToggleButton value={true} selected={(filtre=true)?true:false} onClick={() => setFiltre(true)}>Complétées</ToggleButton>
        <ToggleButton value={false} selected={(filtre=false)?true:false} onClick={() => setFiltre(false)}>Actives</ToggleButton>
      </ToggleButtonGroup>
      <span className="compte">
        ?? tâches actives
      </span>
      <IconButton 
        aria-label="Supprimer toutes les tâches complétées"
        color="error" 
        onClick={() => supprimerCompletees()} 
        title="Supprimer toutes les tâches complétées"
      >
        <DeleteIcon/>
      </IconButton>
    </footer>
  );
}