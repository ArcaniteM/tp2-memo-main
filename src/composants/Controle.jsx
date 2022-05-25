import './Controle.scss';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Controle({etatTaches, utilisateur}) {  
  return (
    <footer className="Controle">
      <ToggleButtonGroup 
        size="small" 
        exclusive={true} 
      >
        <ToggleButton value={'toutes'}>Toutes</ToggleButton>
        <ToggleButton value={true}>Complétées</ToggleButton>
        <ToggleButton value={false}>Actives</ToggleButton>
      </ToggleButtonGroup>
      <span className="compte">
        ?? tâches actives
      </span>
      <IconButton 
        aria-label="Supprimer toutes les tâches complétées"
        color="error" 
        onClick={() => alert('À implémenter au point B du TP#2')} 
        title="Supprimer toutes les tâches complétées"
      >
        <DeleteIcon/>
      </IconButton>
    </footer>
  );
}