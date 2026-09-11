// Composant SaveBar.tsx
// Ce composant représente une barre d'outils pour sauvegarder le dessin actuel.
// Il contient un bouton pour sauvegarder le dessin et un indicateur de statut.

interface SaveBarProps {
  title: string;
  setTitle: (title: string) => void;
  onSave: () => void;
  canSave: boolean;
}

export const SaveBar = ({
  title,
  setTitle,
  onSave,
  canSave,
}: SaveBarProps) => {
  return (
    <div className="saveControls">
      <label htmlFor="drawing-title">
        Titre :
      </label>

      <input
        id="drawing-title"
        title="Titre du dessin"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
        placeholder="Nom du dessin"
      />

      <button
        onClick={onSave}
        disabled={!canSave}
        className="button"
      >
        💾 Save
      </button>
    </div>
  );
};
